import React from 'react';
import type { Task } from '../types';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onPostpone?: (id: string) => void;
    onEdit?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onPostpone, onEdit }) => {
    const priorityColors = {
        low: 'var(--accent-success)',
        medium: 'var(--accent-warning)',
        high: 'var(--accent-danger)'
    };

    const isCompleted = task.status === 'completed';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="glass-panel"
            style={{
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background-color 0.3s',
                opacity: isCompleted ? 0.6 : 1
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    backgroundColor: priorityColors[task.priority]
                }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={() => onToggle(task.id)} style={{ color: isCompleted ? 'var(--accent-success)' : 'var(--text-secondary)' }}>
                    {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                {!isCompleted && onPostpone && (
                    <button onClick={() => onPostpone(task.id)} style={{ color: 'var(--accent-warning)' }}>
                        <Clock size={20} />
                    </button>
                )}
            </div>

            <div
                style={{ flex: 1, cursor: !isCompleted && onEdit ? 'pointer' : 'default' }}
                onClick={() => !isCompleted && onEdit && onEdit(task)}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '4px',
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        color: isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)',
                        transition: 'color 0.3s'
                    }}>
                        {task.title}
                    </h3>
                    <span style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.1)',
                        textTransform: 'capitalize',
                        color: 'var(--text-secondary)'
                    }}>
                        {task.category}
                    </span>
                </div>
                {task.description && (
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        {task.description}
                    </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {task.dueDate && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CalendarIcon size={12} />
                            <span>{format(new Date(task.dueDate), 'MMM d')} {task.dueTime}</span>
                        </div>
                    )}
                    {task.reminder && !isCompleted && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-primary)' }}>
                            <span>🔔 {format(new Date(task.reminder), 'h:mm a')}</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default TaskCard;
