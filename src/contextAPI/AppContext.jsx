import { TaskProvider } from "./context/TaskContext";
import TaskStats from "./components/TaskStats";
import TaskFilters from "./components/TaskFilters";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import UndoRedoControls from "./components/UndoRedoControls";

function AppContext() {
  return (
    <TaskProvider>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">
          Task Manager using Context API
        </h1>
        <UndoRedoControls />
        <TaskStats />
        <TaskFilters />
        <TaskInput />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default AppContext;
