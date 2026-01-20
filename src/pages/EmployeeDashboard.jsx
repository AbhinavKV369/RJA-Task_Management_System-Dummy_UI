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
        <div className="row g-3">
          {myTasks.map((task) => (
            <div className="col-12 col-md-6 col-lg-4" key={task.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 hover-shadow">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h3 className="fw-semibold mb-2">{task.title}</h3>
                    <h6 className=" my-3 fw-normal">{task.description}</h6>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      <span className={priorityBadge(task.priority)}>
                        {task.priority}
                      </span>
                      <span className={statusBadge(task.status)}>
                        {task.status}
                      </span>
                      <span className="text-muted small">
                        Due: {task.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <select
                      className="form-select form-select-sm"
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
