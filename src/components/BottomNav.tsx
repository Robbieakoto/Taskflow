import React from 'react';
import { Home, Calendar, PieChart, Settings, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BottomNavProps {
    onAddTask: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onAddTask }) => {
    const location = useLocation();
    const path = location.pathname;

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
        { icon: PieChart, label: 'Stats', path: '/stats' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="glass" style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '600px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '24px 24px 0 0',
            zIndex: 100,
            padding: '0 24px'
        }}>
            {/* Left items */}
            <div style={{ display: 'flex', gap: '48px' }}>
                {navItems.slice(0, 2).map(item => (
                    <Link to={item.path} key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: path === item.path ? 'var(--accent-primary)' : 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>
                        <item.icon size={24} strokeWidth={path === item.path ? 2.5 : 2} />
                    </Link>
                ))}
            </div>

            {/* FAB Container */}
            <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)' }}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAddTask}
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-glow), 0 10px 20px rgba(0,0,0,0.2)',
                        color: 'white',
                        border: '4px solid var(--bg-primary)'
                    }}
                >
                    <Plus size={32} />
                </motion.button>
            </div>

            {/* Right items */}
            <div style={{ display: 'flex', gap: '48px' }}>
                {navItems.slice(2, 4).map(item => (
                    <Link to={item.path} key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: path === item.path ? 'var(--accent-primary)' : 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>
                        <item.icon size={24} strokeWidth={path === item.path ? 2.5 : 2} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
