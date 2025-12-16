import { useEffect, useState } from 'react';

export interface NotificationSettings {
    enabled: boolean;
    reminders: boolean;
    overdueTasks: boolean;
    sound: boolean;
}

const DEFAULT_SETTINGS: NotificationSettings = {
    enabled: true,
    reminders: true,
    overdueTasks: true,
    sound: true
};

export const useNotificationSettings = () => {
    const [settings, setSettings] = useState<NotificationSettings>(() => {
        try {
            const saved = localStorage.getItem('taskflow_notification_settings');
            return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
        } catch (e) {
            return DEFAULT_SETTINGS;
        }
    });

    useEffect(() => {
        localStorage.setItem('taskflow_notification_settings', JSON.stringify(settings));
    }, [settings]);

    const updateSettings = (updates: Partial<NotificationSettings>) => {
        setSettings(prev => ({ ...prev, ...updates }));
    };

    return { settings, updateSettings };
};
