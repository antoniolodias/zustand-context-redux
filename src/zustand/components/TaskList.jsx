import useStore from "../store/TaskStore";

function TaskList() {
  const tasks = useStore((state) => state.filteredTasks);
  const toggleTask = useStore((state) => state.toggleTask);
  const deleteTask = useStore((state) => state.deleteTask);
  console.log("TaskList rendered");

  return (
    <div className="space-y-2">
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No tasks found</div>
      ) : (
        tasks.map((task) => (
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
