import API from "../services/api";

export default function TaskCard({ task, onTaskUpdated }) {
  const handleToggleStatus = async () => {
    try {
      await API.put(`/tasks/${task._id}`);
      onTaskUpdated();
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this task?");
      if (!confirm) return;

      await API.delete(`/tasks/${task._id}`);
      onTaskUpdated();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-sm text-gray-600">{task.description}</p>
        <span
          className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleToggleStatus}
          className={`px-4 py-1 rounded-md font-medium text-white text-sm ${
            task.status === "pending" ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          Mark as {task.status === "pending" ? "Completed" : "Pending"}
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-1 rounded-md bg-red-600 text-white font-medium text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
