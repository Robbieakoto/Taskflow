import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Trash2, Repeat } from 'lucide-react';
import type { Priority, Category, Task } from '../types';

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (id: string, updates: Partial<Task>) => void;
    onDelete: (id: string) => void;
    task: Task | null;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, onUpdate, onDelete, task }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [category, setCategory] = useState<Category>('personal');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [autoRemind, setAutoRemind] = useState(false);
    const [reminderTime, setReminderTime] = useState('');
    const [recurring, setRecurring] = useState(false);

    // Initialize form with task data
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setPriority(task.priority);
            setCategory(task.category);
            setDueDate(task.dueDate || '');
            setDueTime(task.dueTime || '');
            setAutoRemind(!!task.reminder);
            setReminderTime(task.reminder || '');
            setRecurring(!!task.recurring);
        }
    }, [task]);

    // Smart suggestion calculation
    useEffect(() => {
        if (autoRemind && dueDate) {
            const dueDateTime = dueTime
                ? new Date(`${dueDate}T${dueTime}`)
                : new Date(`${dueDate}T09:00:00`);

            let minutesToSubtract = 0;
            switch (priority) {
                case 'high': minutesToSubtract = 30; break;
                case 'medium': minutesToSubtract = 60; break;
                case 'low': minutesToSubtract = 120; break;
            }

            const calculated = new Date(dueDateTime.getTime() - minutesToSubtract * 60000);

            // Format for datetime-local input (YYYY-MM-DDTHH:mm) - Use local time
            const offset = calculated.getTimezoneOffset() * 60000;
            const localDate = new Date(calculated.getTime() - offset);
            setReminderTime(localDate.toISOString().slice(0, 16));
        } else if (!autoRemind) {
            setReminderTime('');
        }
    }, [dueDate, dueTime, priority, autoRemind]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !task) return;

        // Pass updates to parent
        onUpdate(task.id, {
            title,
            description: description || undefined,
            priority,
            category,
            dueDate: dueDate || undefined,
            dueTime: dueTime || undefined,
            reminder: autoRemind ? reminderTime : undefined,
            recurring
        });

        onClose();
    };

    const categories: Category[] = ['work', 'personal', 'health', 'learning', 'other'];

    // Helper to format suggestion text
    const getSuggestionText = () => {
        if (!dueDate || !autoRemind) return null;

        const priorityLabels = {
            high: '30 minutes',
            medium: '1 hour',
            low: '2 hours'
        };

        return `Suggested: ${priorityLabels[priority]} before task`;
    };

    if (!task) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 200 }}
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            position: 'fixed', bottom: 0, left: 0, right: 0,
                            background: 'var(--bg-secondary)',
                            borderRadius: '24px 24px 0 0',
                            padding: '24px',
                            zIndex: 201,
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            borderTop: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Edit Task</h2>
                            <button onClick={onClose} style={{ padding: '8px' }}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="What needs to be done?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                                style={{
                                    width: '100%', background: 'transparent', border: 'none',
                                    fontSize: '18px', marginBottom: '16px', padding: '8px 0',
                                    borderBottom: '1px solid var(--bg-tertiary)', color: 'white'
                                }}
                            />

                            <textarea
                                placeholder="Description (optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{
                                    width: '100%', background: 'transparent', border: 'none',
                                    fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px',
                                    resize: 'none', minHeight: '60px', fontFamily: 'inherit'
                                }}
                            />

                            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Due Date</label>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ background: 'var(--bg-tertiary)', border: 'none', padding: '12px', borderRadius: '12px', color: 'white', width: '100%' }} />
                                        <input type="time" value={dueTime} onChange={e => setDueTime(e.target.value)} style={{ background: 'var(--bg-tertiary)', border: 'none', padding: '12px', borderRadius: '12px', color: 'white', width: '100%' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Category */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Category</label>
                                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                                    {categories.map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setCategory(c)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '20px',
                                                border: `1px solid ${category === c ? 'var(--accent-primary)' : 'var(--bg-tertiary)'}`,
                                                background: category === c ? 'var(--accent-primary)' : 'transparent',
                                                color: category === c ? 'white' : 'var(--text-secondary)',
                                                whiteSpace: 'nowrap',
                                                fontSize: '13px'
                                            }}
                                        >
                                            {c.charAt(0).toUpperCase() + c.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Priority</label>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    {(['low', 'medium', 'high'] as Priority[]).map(p => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setPriority(p)}
                                            style={{
                                                flex: 1, padding: '12px', borderRadius: '12px',
                                                border: `1px solid ${priority === p ? 'var(--accent-primary)' : 'var(--bg-tertiary)'}`,
                                                background: priority === p ? 'rgba(139, 92, 246, 0.2)' : 'var(--bg-tertiary)',
                                                color: priority === p ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                                textTransform: 'capitalize', fontWeight: priority === p ? 600 : 400
                                            }}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recurring Task Toggle */}
                            {dueDate && (
                                <div style={{ marginBottom: '16px' }}>
                                    <div
                                        onClick={() => setRecurring(!recurring)}
                                        style={{
                                            padding: '12px',
                                            borderRadius: '12px',
                                            background: recurring ? 'rgba(56, 189, 248, 0.1)' : 'var(--bg-tertiary)',
                                            border: `1px solid ${recurring ? 'var(--accent-info)' : 'transparent'} `,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            cursor: 'pointer'
                                        }}>
                                        <div style={{ color: recurring ? 'var(--accent-info)' : 'var(--text-secondary)' }}>
                                            <Repeat size={20} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '14px', fontWeight: 500, color: recurring ? 'var(--accent-info)' : 'var(--text-primary)' }}>Repeat Daily</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                                Task will reappear daily when completed
                                            </div>
                                        </div>
                                        {recurring && <Checkmark />}
                                    </div>
                                </div>
                            )}

                            {/* Smart Reminder Toggle */}
                            {dueDate && (
                                <div style={{ marginBottom: '32px' }}>
                                    <div
                                        onClick={() => setAutoRemind(!autoRemind)}
                                        style={{
                                            padding: '12px',
                                            borderRadius: '12px',
                                            background: autoRemind ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-tertiary)',
                                            border: `1px solid ${autoRemind ? 'var(--accent-primary)' : 'transparent'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            cursor: 'pointer',
                                            marginBottom: autoRemind ? '12px' : 0
                                        }}>
                                        <div style={{ color: autoRemind ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                                            <Zap size={20} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '14px', fontWeight: 500, color: autoRemind ? 'var(--accent-primary)' : 'var(--text-primary)' }}>Smart Reminder</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                                {autoRemind ? getSuggestionText() : 'Get notified before your task'}
                                            </div>
                                        </div>
                                        {autoRemind && <Checkmark />}
                                    </div>

                                    {/* Manual Edit of Reminder Time */}
                                    {autoRemind && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                                            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', marginLeft: '4px' }}>
                                                Reminder Time (you can edit this)
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={reminderTime}
                                                onChange={(e) => setReminderTime(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    background: 'var(--bg-tertiary)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    padding: '12px',
                                                    borderRadius: '12px',
                                                    color: 'white'
                                                }}
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '16px',
                                    background: 'var(--accent-primary)', color: 'white',
                                    fontWeight: 600, fontSize: '16px', boxShadow: 'var(--shadow-glow)',
                                    marginBottom: '12px'
                                }}
                            >
                                Update Task
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    if (task && window.confirm('Are you sure you want to delete this task?')) {
                                        onDelete(task.id);
                                        onClose();
                                    }
                                }}
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '16px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid var(--accent-danger)',
                                    color: 'var(--accent-danger)',
                                    fontWeight: 600, fontSize: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Trash2 size={20} />
                                Delete Task
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const Checkmark = () => (
    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

export default EditTaskModal;
