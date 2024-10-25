import useStore from "../store/TaskStore";

function TaskFilters() {
  // Select only the specific pieces of state we need
  // TODO: check if this works
  // const {filter,searchTerm,setFilter,setSearchTerm} = useStore((state) => (state));
  const filter = useStore((state) => state.filter);
  const searchTerm = useStore((state) => state.searchTerm);
  const setFilter = useStore((state) => state.setFilter);
  const setSearchTerm = useStore((state) => state.setSearchTerm);
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
