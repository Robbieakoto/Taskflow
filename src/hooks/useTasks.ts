import { useState, useEffect } from 'react';
import type { Task, Priority, Category, TaskStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const saved = localStorage.getItem('taskflow_tasks');
            if (!saved) return [];
            const parsed = JSON.parse(saved);
            // Migration for old data
            return parsed.map((t: any) => ({
                ...t,
                status: t.status || (t.completed ? 'completed' : 'pending'),
                category: t.category || 'other',
                // Ensure other new fields exist if needed
            }));
        } catch (e) {
            console.error('Failed to load tasks', e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (
        title: string,
        priority: Priority,
        category: Category,
        dueDate?: string,
        dueTime?: string,
        description?: string,
        reminder?: string,
        recurring?: boolean
    ) => {

        const newTask: Task = {
            id: uuidv4(),
            title,
            description,
            priority,
            category,
            dueDate,
            dueTime,
            status: 'pending',
            reminder,
            recurring,
            createdAt: new Date().toISOString()
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const toggleTask = (id: string) => {
        setTasks(prev => {
            const task = prev.find(t => t.id === id);
            if (!task) return prev;

            const newStatus: TaskStatus = task.status === 'completed' ? 'pending' : 'completed';

            // If completing a recurring task, create a new one for tomorrow
            if (newStatus === 'completed' && task.recurring && task.dueDate) {
                const tomorrow = new Date(task.dueDate);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowStr = tomorrow.toISOString().split('T')[0];

                // Calculate new reminder if task had one
                let newReminder: string | undefined;
                if (task.reminder && task.dueDate && task.dueTime) {
                    const dueDateTime = new Date(`${tomorrowStr}T${task.dueTime}`);
                    let minutesToSubtract = 0;
                    switch (task.priority) {
                        case 'high': minutesToSubtract = 30; break;
                        case 'medium': minutesToSubtract = 60; break;
                        case 'low': minutesToSubtract = 120; break;
                    }
                    const reminderTime = new Date(dueDateTime.getTime() - minutesToSubtract * 60000);
                    // Format as local ISO string
                    const offset = reminderTime.getTimezoneOffset() * 60000;
                    newReminder = new Date(reminderTime.getTime() - offset).toISOString().slice(0, 16);
                }

                const recurringTask: Task = {
                    id: uuidv4(),
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    category: task.category,
                    dueDate: tomorrowStr,
                    dueTime: task.dueTime,
                    status: 'pending',
                    reminder: newReminder,
                    recurring: true,
                    createdAt: new Date().toISOString()
                };

                return [
                    recurringTask,
                    ...prev.map(t => t.id === id ? {
                        ...t,
                        status: newStatus,
                        completedAt: new Date().toISOString()
                    } : t)
                ];
            }

            return prev.map(t => {
                if (t.id !== id) return t;
                return {
                    ...t,
                    status: newStatus,
                    completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
                };
            });
        });
    };

    const postponeTask = (id: string) => {
        setTasks(prev => prev.map(t => {
            if (t.id !== id) return t;
            return { ...t, status: 'postponed' };
        }));
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const getStats = () => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        const pending = tasks.filter(t => t.status === 'pending').length;
        // Filter for today
        const todayStr = new Date().toISOString().split('T')[0];
        const completedToday = tasks.filter(t => t.status === 'completed' && t.completedAt?.startsWith(todayStr)).length;

        return { total, completed, pending, completedToday };
    };

    return { tasks, addTask, toggleTask, deleteTask, updateTask, postponeTask, getStats };
};
