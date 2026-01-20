import { useState, useCallback } from "react";
import { initialTasks } from "../data/tasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = useCallback((task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  }, []);

  const updateTask = useCallback((updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    setEditingTask(null);
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const handleEdit = useCallback((task) => {
    setEditingTask(task);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* KEY IS THE FIX FOR EDITING */}
      <TaskForm
        key={editingTask?.id || "new"}
        addTask={addTask}
        editingTask={editingTask}
        updateTask={updateTask}
      />

      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={deleteTask} />
    </div>
  );
};

export default AdminDashboard;
