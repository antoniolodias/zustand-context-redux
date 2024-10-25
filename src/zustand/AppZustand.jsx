import TaskStats from "./components/TaskStats";
import TaskFilters from "./components/TaskFilters";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function AppContext() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Task Manager with Zustand</h1>
      <TaskStats />
      <TaskFilters />
      <TaskInput />
      <TaskList />
    </div>
  );
}

export default AppContext;
