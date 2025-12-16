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
        reminder?: string
    ) => {

        // If reminder string is passed directly use it, otherwise calculate if autoRemind was passed as boolean (backwards compat but I will remove autoRemind arg)
        // Actually, let's just use the reminder string directly as the single source of truth now.

        const newTask: Task = {
            id: uuidv4(),
            title,
            description,
            priority,
            category,
            dueDate,
            dueTime,
            status: 'pending',
            reminder, // Use passed reminder directly
            createdAt: new Date().toISOString()
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(t => {
            if (t.id !== id) return t;

            const newStatus: TaskStatus = t.status === 'completed' ? 'pending' : 'completed';
            return {
                ...t,
                status: newStatus,
                completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
            };
        }));
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
