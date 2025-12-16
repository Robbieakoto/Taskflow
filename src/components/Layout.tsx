import React from 'react';
import BottomNav from './BottomNav';

interface LayoutProps {
    children: React.ReactNode;
    onAddTask: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onAddTask }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            maxWidth: '100%',
            margin: '0 auto',
            background: 'transparent'
        }}>
            <main style={{
                flex: 1,
                padding: '24px',
                paddingBottom: '120px',
                overflowY: 'auto',
                maxWidth: '600px',
                width: '100%',
                margin: '0 auto'
            }}>
                {children}
            </main>
            <BottomNav onAddTask={onAddTask} />
        </div>
    );
};

export default Layout;
