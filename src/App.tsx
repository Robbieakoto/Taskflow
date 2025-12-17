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
import type { Task } from './types';

function App() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
  const { settings } = useNotificationSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

    // Set up interval to check every 10 seconds
    const interval = setInterval(checkAll, 10000);

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
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTask}
      />
      <EditTaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onUpdate={updateTask}
        onDelete={handleDelete}
        task={editingTask}
      />
    </Router>
  );
}

export default App;
