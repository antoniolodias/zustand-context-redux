import { useMemo } from "react";
import useStore from "../store/TaskStore";

function TaskList() {
  const tasks = useStore((state) => state.present.tasks);
  const filter = useStore((state) => state.present.filter);
  const searchTerm = useStore((state) => state.present.searchTerm);
  const toggleTask = useStore((state) => state.toggleTask);
  const deleteTask = useStore((state) => state.deleteTask);
  console.log("TaskList rendered");

  // Calculate filtered tasks only when tasks, filter, or searchTerm changes
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
      })
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [tasks, filter, searchTerm]);

  return (
    <div className="space-y-2">
      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No tasks found</div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 bg-white border rounded shadow-sm"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-5 w-5"
              />
              <span
                className={task.completed ? "line-through text-gray-500" : ""}
              >
                {task.title}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
