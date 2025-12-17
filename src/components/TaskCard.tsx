import React from 'react';
import type { Task } from '../types';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Calendar as CalendarIcon, Repeat } from 'lucide-react';
import { format } from 'date-fns';
import { getTaskIcon } from '../utils/taskIcons';

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onEdit?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onEdit }) => {
    const priorityColors = {
        low: 'var(--accent-success)',
        medium: 'var(--accent-warning)',
        high: 'var(--accent-danger)'
    };

    const isCompleted = task.status === 'completed';
    const SmartIcon = getTaskIcon(task.title, task.description);

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

            {/* Smart Task Icon (Left) */}
            <div
                onClick={() => !isCompleted && onEdit && onEdit(task)}
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    flexShrink: 0,
                    cursor: !isCompleted && onEdit ? 'pointer' : 'default'
                }}
            >
                <SmartIcon size={24} />
            </div>

            {/* Task Details (Middle) */}
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
                </div>
                {task.description && (
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {task.description}
                    </p>
                )}

                {/* Metadata Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
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

                    {task.recurring && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-info)' }}>
                            <Repeat size={12} />
                            <span>Daily</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons (Right) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '8px', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                <button
                    onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
                    style={{
                        color: isCompleted ? 'var(--accent-success)' : 'var(--text-secondary)',
                        padding: '4px',
                        borderRadius: '8px',
                        transition: '0.2s'
                    }}
                    title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                >
                    {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
            </div>
        </motion.div>
    );
};

export default TaskCard;
