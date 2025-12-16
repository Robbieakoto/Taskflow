import type { Task } from '../types';
import type { NotificationSettings } from '../hooks/useNotificationSettings';

interface NotificationPayload {
    title: string;
    body: string;
    icon?: string;
    tag?: string;
    data?: any;
}

class NotificationService {
    private notifiedReminders = new Set<string>();
    private notifiedOverdue = new Set<string>();

    async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            return false;
        }

        if (Notification.permission === 'granted') {
            return true;
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }

        return false;
    }

    async sendNotification(payload: NotificationPayload, settings: NotificationSettings): Promise<void> {
        if (!settings.enabled) return;

        const hasPermission = await this.requestPermission();
        if (!hasPermission) return;

        try {
            // Try to use Service Worker notification for better mobile support
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.ready;
                await registration.showNotification(payload.title, {
                    body: payload.body,
                    icon: payload.icon || '/icon.svg',
                    badge: '/icon.svg',
                    tag: payload.tag,
                    data: payload.data,
                    requireInteraction: false,
                    silent: !settings.sound,
                    ...(settings.sound && { vibrate: [200, 100, 200] })
                } as any);
            } else {
                // Fallback to regular notification
                new Notification(payload.title, {
                    body: payload.body,
                    icon: payload.icon || '/icon.svg',
                    tag: payload.tag,
                    silent: !settings.sound
                });
            }
        } catch (error) {
            console.error('Failed to send notification:', error);
        }
    }

    checkReminders(tasks: Task[], settings: NotificationSettings): void {
        if (!settings.enabled || !settings.reminders) return;

        const now = new Date();

        tasks.forEach(task => {
            if (task.status !== 'pending' || !task.reminder) return;

            const reminderTime = new Date(task.reminder);
            const timeDiff = now.getTime() - reminderTime.getTime();

            // Check if reminder is due (within last minute and not already notified)
            if (timeDiff >= 0 && timeDiff < 60000 && !this.notifiedReminders.has(task.id)) {
                this.sendNotification({
                    title: `⏰ Reminder: ${task.title}`,
                    body: task.description || 'It\'s time to work on this task.',
                    tag: `reminder-${task.id}`,
                    data: { taskId: task.id, type: 'reminder' }
                }, settings);

                this.notifiedReminders.add(task.id);

                // Clean up after 5 minutes to allow re-notification if needed
                setTimeout(() => this.notifiedReminders.delete(task.id), 5 * 60 * 1000);
            }
        });
    }

    checkOverdueTasks(tasks: Task[], settings: NotificationSettings): void {
        if (!settings.enabled || !settings.overdueTasks) return;

        const now = new Date();

        tasks.forEach(task => {
            if (task.status !== 'pending' || !task.dueDate) return;

            const dueDateTime = task.dueTime
                ? new Date(`${task.dueDate}T${task.dueTime}`)
                : new Date(`${task.dueDate}T23:59:59`);

            const timeSinceDue = now.getTime() - dueDateTime.getTime();

            // Check if task is 30 minutes overdue and not already notified
            const thirtyMinutes = 30 * 60 * 1000;
            if (timeSinceDue >= thirtyMinutes &&
                timeSinceDue < thirtyMinutes + 60000 &&
                !this.notifiedOverdue.has(task.id)) {

                this.sendNotification({
                    title: `⚠️ Overdue: ${task.title}`,
                    body: `This task was due ${Math.round(timeSinceDue / 60000)} minutes ago.`,
                    tag: `overdue-${task.id}`,
                    data: { taskId: task.id, type: 'overdue' }
                }, settings);

                this.notifiedOverdue.add(task.id);

                // Keep in memory for 24 hours to avoid repeated notifications
                setTimeout(() => this.notifiedOverdue.delete(task.id), 24 * 60 * 60 * 1000);
            }
        });
    }

    clearNotifiedTask(taskId: string): void {
        this.notifiedReminders.delete(taskId);
        this.notifiedOverdue.delete(taskId);
    }
}

export const notificationService = new NotificationService();
