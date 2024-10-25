import { useTasks } from "../context/TaskContext";

function TaskFilters() {
  const { filter, setFilter, searchTerm, setSearchTerm } = useTasks();
  console.log("TaskFilters rendered");

  return (
    <div className="mb-4">
      <div className="flex gap-2 mb-2">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default TaskFilters;
