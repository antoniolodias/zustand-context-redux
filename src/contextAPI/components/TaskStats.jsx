import { useTasks } from "../context/TaskContext";

function TaskStats() {
  const { stats } = useTasks();
  console.log("TaskStats rendered");

  return (
    <div className="flex gap-4 mb-4 bg-gray-100 p-4 rounded">
      <div>Total: {stats.total}</div>
      <div>Active: {stats.active}</div>
      <div>Completed: {stats.completed}</div>
    </div>
  );
}

export default TaskStats;
