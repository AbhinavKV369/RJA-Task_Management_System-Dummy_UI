const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length) {
    return <p className="text-muted">No tasks available</p>;
  }

  return (
    <div className="card p-3">
      <h5>Task List</h5>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.priority}</td>
              <td>{task.dueDate}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(task)}>
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(task.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
