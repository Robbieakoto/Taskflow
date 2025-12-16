import React, { useMemo } from 'react';
import type { Task } from '../types';
import TaskCard from '../components/TaskCard';
import { AlertCircle, Calendar, Layers } from 'lucide-react';

interface HomeProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onPostpone: (id: string) => void;
    onEdit: (task: Task) => void;
}

const Home: React.FC<HomeProps> = ({ tasks, onToggle, onPostpone, onEdit }) => {
    const { overdue, today, upcoming, noDate, completed } = useMemo(() => {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        const groups = {
            overdue: [] as Task[],
            today: [] as Task[],
            upcoming: [] as Task[],
            noDate: [] as Task[],
            completed: [] as Task[]
        };

        tasks.forEach(task => {
            if (task.status === 'completed') {
                groups.completed.push(task);
                return;
            }

            if (!task.dueDate) {
                groups.noDate.push(task);
                return;
            }

            const taskDate = task.dueDate.split('T')[0];

            if (taskDate < todayStr) {
                groups.overdue.push(task);
            } else if (taskDate === todayStr) {
                groups.today.push(task);
            } else {
                groups.upcoming.push(task);
            }
        });

        // Sort function: Priority then Time
        const sorter = (a: Task, b: Task) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return (a.dueDate || '').localeCompare(b.dueDate || '');
        };

        groups.overdue.sort(sorter);
        groups.today.sort(sorter);
        groups.upcoming.sort(sorter);
        groups.noDate.sort(sorter);

        // Sort completed by most recent
        groups.completed.sort((a, b) =>
            (b.completedAt || b.createdAt).localeCompare(a.completedAt || a.createdAt)
        );

        return groups;
    }, [tasks]);

    const Section = ({ title, icon: Icon, items, color }: { title: string, icon: any, items: Task[], color?: string }) => {
        if (items.length === 0) return null;
        return (
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: color || 'var(--text-secondary)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                }}>
                    <Icon size={16} />
                    {title} ({items.length})
                </h2>
                {items.map(task => (
                    <TaskCard key={task.id} task={task} onToggle={onToggle} onPostpone={onPostpone} onEdit={onEdit} />
                ))}
            </div>
        );
    };

    const totalPending = overdue.length + today.length + upcoming.length + noDate.length;

    return (
        <div className="fade-in">
            <header style={{ marginBottom: '32px', paddingTop: '10px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Daily Overview
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '16px' }}>
                    You have <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{totalPending}</span> pending tasks.
                </p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {totalPending === 0 && completed.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                        <p style={{ fontSize: '18px' }}>All caught up!</p>
                        <p style={{ fontSize: '14px', opacity: 0.7 }}>Enjoy your free time.</p>
                    </div>
                )}

                <Section title="Overdue" icon={AlertCircle} items={overdue} color="var(--accent-danger)" />
                <Section title="Today" icon={Calendar} items={today} color="var(--accent-primary)" />
                <Section title="Upcoming" icon={Calendar} items={upcoming} />
                <Section title="Backlog" icon={Layers} items={noDate} />

                {completed.length > 0 && (
                    <div style={{ marginTop: '20px', opacity: 0.8 }}>
                        <h2 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>Completed</h2>
                        {completed.map(task => (
                            <TaskCard key={task.id} task={task} onToggle={onToggle} onPostpone={onPostpone} onEdit={onEdit} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
