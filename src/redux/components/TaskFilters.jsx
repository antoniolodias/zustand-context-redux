import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSearchTerm } from "../features/todos/todosSlice";

function TaskFilters() {
  const filter = useSelector((state) => state.todos.filter);
  const searchTerm = useSelector((state) => state.todos.searchTerm);
  const dispatch = useDispatch();
  console.log("TaskFilters rendered");

  return (
    <div className="mb-4">
      <div className="flex gap-2 mb-2">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => dispatch(setFilter(f))}
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
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search tasks..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default TaskFilters;
