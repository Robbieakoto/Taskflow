export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'health' | 'learning' | 'other';
export type TaskStatus = 'pending' | 'completed' | 'postponed';

export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    category: Category;
    dueDate?: string; // ISO Date string
    dueTime?: string; // HH:mm
    status: TaskStatus;
    completedAt?: string;
    reminder?: string; // ISO Date string for reminder
    createdAt: string;
}
