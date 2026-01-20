import { useState, useCallback } from "react";
import TaskForm from "../components/TaskForm";
import { useTask } from "../context/task/useTask";

const AdminDashboard = () => {
  const { tasks, setTasks } = useTask();
  const [editingTask, setEditingTask] = useState(null);

  const addTask = useCallback(
    (task) => {
      setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    },
    [setTasks],
  );

  const updateTask = useCallback(
    (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
      setEditingTask(null);
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks],
  );

  const handleEdit = useCallback((task) => {
    setEditingTask(task);
  }, []);

  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Admin Dashboard</h2>
        <p className="text-muted mb-0">
          Manage tasks and assignments efficiently
        </p>
      </div>

      {/* Task Form Card */}
      <div className="card shadow-sm rounded-4 mb-4 border-0">
        <div
          className="card-header py-3 fw-semibold text-white"
          style={{
            background: "linear-gradient(90deg, #2563eb, #0ea5e9)",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}>
          {editingTask ? "Edit Task" : "Add New Task"}
        </div>
        <div className="card-body">
          <TaskForm
            key={editingTask?.id || "new"}
            addTask={addTask}
            editingTask={editingTask}
            updateTask={updateTask}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="row g-3">
        {tasks.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No tasks created yet.
          </div>
        ) : (
          tasks.map((task) => (
            <div className="col-12 col-md-6 col-lg-4" key={task.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 hover-shadow">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="fw-semibold mb-2">{task.title}</h6>
                    <h9 className=" mb-2">{task.description}</h9>

                    <div className="d-flex flex-wrap gap-2 mb-2">
                      <span
                        className={`badge ${
                          task.priority === "High"
                            ? "bg-danger"
                            : task.priority === "Medium"
                              ? "bg-warning text-dark"
                              : "bg-info text-dark"
                        }`}>
                        {task.priority}
                      </span>
                      <span
                        className={`badge ${
                          task.status === "Completed"
                            ? "bg-success"
                            : task.status === "In Progress"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                        }`}>
                        {task.status}
                      </span>
                      <span className="text-muted small">
                        Due: {task.dueDate}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-2 d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary flex-grow-1"
                      onClick={() => handleEdit(task)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger flex-grow-1"
                      onClick={() => deleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
