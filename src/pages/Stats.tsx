import React from 'react';
import type { Task } from '../types';

interface StatsProps {
    tasks: Task[];
}

const Stats: React.FC<StatsProps> = ({ tasks }) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const postponed = tasks.filter(t => t.status === 'postponed').length;

    const todayStr = new Date().toISOString().split('T')[0];
    const completedToday = tasks.filter(t => t.status === 'completed' && t.completedAt?.startsWith(todayStr)).length;

    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const StatCard = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', aspectRatio: '1/1' }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color, marginBottom: '8px' }}>{value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
        </div>
    );

    return (
        <div className="fade-in">
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Analytics</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <StatCard label="Completed Today" value={completedToday} color="var(--accent-success)" />
                <StatCard label="Completion Rate" value={`${rate}%`} color="var(--accent-primary)" />
                <StatCard label="Pending" value={pending} color="var(--accent-warning)" />
                <StatCard label="Postponed" value={postponed} color="var(--text-secondary)" />
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Weekly Progress</h2>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px' }}>
                {Array.from({ length: 7 }).map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (6 - i));
                    const dateStr = d.toISOString().split('T')[0];
                    const count = tasks.filter(t => t.status === 'completed' && t.completedAt?.startsWith(dateStr)).length;
                    const max = Math.max(1, ...Array.from({ length: 7 }).map((_, j) => {
                        const d2 = new Date();
                        d2.setDate(d2.getDate() - (6 - j));
                        const ds = d2.toISOString().split('T')[0];
                        return tasks.filter(t => t.status === 'completed' && t.completedAt?.startsWith(ds)).length;
                    }));

                    const height = (count / max) * 100;

                    return (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <div style={{
                                width: '8px',
                                height: `${Math.max(4, height)}%`,
                                background: count > 0 ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                                borderRadius: '10px',
                                transition: 'height 0.5s ease'
                            }} />
                            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                                {d.toLocaleDateString('en-US', { weekday: 'narrow' })}
                            </span>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default Stats;
