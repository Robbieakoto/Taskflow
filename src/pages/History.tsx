import React from 'react';
import type { Task } from '../types';
import { CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface HistoryProps {
    tasks: Task[];
}

const History: React.FC<HistoryProps> = ({ tasks }) => {
    const completedTasks = tasks
        .filter(t => t.status === 'completed' && t.completedAt)
        .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());

    // Group by date
    const grouped = completedTasks.reduce((acc, task) => {
        const date = task.completedAt!.split('T')[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(task);
        return acc;
    }, {} as Record<string, Task[]>);

    const dates = Object.keys(grouped).sort().reverse();

    return (
        <div className="fade-in">
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>History</h1>

            {dates.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>
                    No completed tasks yet.
                </div>
            )}

            {dates.map(date => (
                <div key={date} style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px', position: 'sticky', top: 0 }}>
                        {format(new Date(date), 'MMMM d, yyyy')}
                    </h3>
                    {grouped[date].map(task => (
                        <div key={task.id} className="glass-panel" style={{ padding: '16px', borderRadius: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.8 }}>
                            <CheckCircle2 size={20} color="var(--accent-success)" />
                            <div style={{ flex: 1 }}>
                                <div style={{ textDecoration: 'line-through', color: 'var(--text-secondary)' }}>{task.title}</div>
                                <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{format(new Date(task.completedAt!), 'h:mm a')}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default History;
