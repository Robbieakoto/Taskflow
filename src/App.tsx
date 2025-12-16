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
  const { tasks, addTask, toggleTask, deleteTask, postponeTask, updateTask } = useTasks();
  const { settings } = useNotificationSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Request notification permission on mount
  useEffect(() => {
    if (settings.enabled) {
      notificationService.requestPermission();
    }
  }, [settings.enabled]);

  // Check for reminders and overdue tasks
  useEffect(() => {
    // Initial check
    notificationService.checkReminders(tasks, settings);
    notificationService.checkOverdueTasks(tasks, settings);

    // Set up interval to check every 10 seconds
    const interval = setInterval(() => {
      notificationService.checkReminders(tasks, settings);
      notificationService.checkOverdueTasks(tasks, settings);
    }, 10000);

    return () => clearInterval(interval);
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
          <Route path="/" element={<Home tasks={tasks} onToggle={handleToggle} onPostpone={postponeTask} onEdit={setEditingTask} />} />
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
