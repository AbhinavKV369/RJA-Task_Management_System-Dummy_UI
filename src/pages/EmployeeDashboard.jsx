import { useAuth } from "../context/auth/useAuth";
import { useTask } from "../context/task/useTask";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { tasks, setTasks } = useTask();

  const myTasks = tasks.filter((task) => task.assignedTo === user.id);

  const updateStatus = (id, status) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  const statusBadge = (status) =>
    status === "Completed"
      ? "badge bg-success"
      : status === "In Progress"
        ? "badge bg-warning text-dark"
        : "badge bg-secondary";

  const priorityBadge = (priority) =>
    priority === "High"
      ? "badge bg-danger"
      : priority === "Medium"
        ? "badge bg-warning text-dark"
        : "badge bg-info text-dark";

  const statusCount = {
    pending: myTasks.filter((t) => t.status === "Pending").length,
    progress: myTasks.filter((t) => t.status === "In Progress").length,
    completed: myTasks.filter((t) => t.status === "Completed").length,
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Employee Dashboard</h2>
        <p className="text-muted mb-0">
          Welcome back, <strong>{user?.name}</strong>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {[
          { title: "Pending", count: statusCount.pending, bg: "bg-secondary" },
          {
            title: "In Progress",
            count: statusCount.progress,
            bg: "bg-warning text-dark",
          },
          {
            title: "Completed",
            count: statusCount.completed,
            bg: "bg-success",
          },
        ].map((card) => (
          <div className="col-12 col-md-4" key={card.title}>
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body text-center py-4">
                <h6 className="text-muted">{card.title}</h6>

                <h2 className={`fw-bold ${card.bg}`}>{card.count}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task Cards */}
      {myTasks.length === 0 ? (
        <div className="text-center py-5 text-muted">No tasks assigned yet</div>
      ) : (
        <div className="row g-4">
          {myTasks.map((task) => (
            <div className="col-12 col-md-6 col-lg-4" key={task.id}>
              <div className="card task-card border-0 rounded-4 h-100">
                <div className="card-body d-flex flex-column">
                  {/* Title */}
                  <h5 className="fw-bold mb-1">{task.title}</h5>

                  {/* Description */}
                  <p className="text-muted small mb-3">{task.description}</p>

                  {/* Badges */}
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span
                      className={`badge rounded-pill px-3 py-2 ${priorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>

                    <span
                      className={`badge rounded-pill px-3 py-2 ${statusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </div>

                  {/* Due Date */}
                  <small className="text-muted mb-3">
                    📅 Due: <strong>{task.dueDate}</strong>
                  </small>

                  {/* Status Update */}
                  <div className="mt-auto">
                    <label className="form-label small text-muted mb-1">
                      Update Status
                    </label>
                    <select
                      className="form-select form-select-sm rounded-3"
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
