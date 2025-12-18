import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Stats from './pages/Stats';
import History from './pages/History';
import Settings from './pages/Settings';
import CreateTaskModal from './components/CreateTaskModal';
import EditTaskModal from './components/EditTaskModal';
import InstallPWA from './components/InstallPWA';
import { useTasks } from './hooks/useTasks';
import { useNotificationSettings } from './hooks/useNotificationSettings';
import { notificationService } from './services/notificationService';
import { registerSW } from 'virtual:pwa-register';
import type { Task } from './types';

function App() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
  const { settings } = useNotificationSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  // PWA Update handling
  useEffect(() => {
    registerSW({
      onNeedRefresh() {
        setUpdateAvailable(true);
      },
      onOfflineReady() {
        console.log('App ready to work offline');
      }
    });
  }, []);

  // Request notification permission on mount
  // Permissions are now handled in Settings page on user interaction
  useEffect(() => {
    // Only verify permission status, don't request
    if (settings.enabled && 'Notification' in window && Notification.permission !== 'granted') {
      // Optionally disable setting if permission was revoked, or just do nothing
    }
  }, [settings.enabled]);

  // Handle splash screen
  useEffect(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      // Minimum display time for splash screen (e.g. 500ms)
      setTimeout(() => {
        splash.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
          splash.remove();
        }, 500);
      }, 500);
    }
  }, []);

  // Check for reminders and overdue tasks
  useEffect(() => {
    const checkAll = () => {
      notificationService.checkReminders(tasks, settings);
      notificationService.checkOverdueTasks(tasks, settings);
    };

    // Initial check
    checkAll();

    // Set up interval to check every minute
    const interval = setInterval(checkAll, 60000);

    // Re-check immediately when app comes to foreground
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAll();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [tasks, settings]);

  // Clean up notifications when task is completed or deleted
  const handleToggle = (id: string) => {
    toggleTask(id);
    notificationService.clearNotifiedTask(id);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    notificationService.clearNotifiedTask(id);
  };

  const handleUpdate = (id: string, updates: Partial<Task>) => {
    updateTask(id, updates);
    if (updates.reminder) {
      notificationService.clearNotifiedTask(id);
    }
  };

  return (
    <Router>
      <Layout onAddTask={() => setIsModalOpen(true)}>
        <Routes>
          <Route path="/" element={<Home tasks={tasks} onToggle={handleToggle} onEdit={setEditingTask} />} />
          <Route path="/calendar" element={<History tasks={tasks} />} />
          <Route path="/stats" element={<Stats tasks={tasks} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <InstallPWA />
      </Layout>

      {/* Update Banner */}
      {updateAvailable && (
        <div style={{
          position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)',
          padding: '12px 24px', borderRadius: '50px',
          display: 'flex', alignItems: 'center', gap: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', zIndex: 2000,
          width: '90%', maxWidth: '400px'
        }}>
          <div style={{ flex: 1, fontSize: '14px', fontWeight: 500 }}>
            New version available
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'var(--accent-primary)', color: 'white',
              border: 'none', padding: '8px 16px', borderRadius: '20px',
              fontWeight: 600, fontSize: '12px'
            }}
          >
            Update
          </button>
          <button
            onClick={() => setUpdateAvailable(false)}
            style={{
              background: 'transparent', color: 'var(--text-secondary)',
              border: 'none', padding: '4px'
            }}
          >
            ✕
          </button>
        </div>
      )}

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTask}
      />
      <EditTaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        task={editingTask}
      />
    </Router>
  );
}

export default App;
