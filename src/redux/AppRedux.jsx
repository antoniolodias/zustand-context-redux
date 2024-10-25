import { Provider } from "react-redux";
import { store } from "./app/store";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";
import TaskStats from "./components/TaskStats";
import TimeTravel from "./components/TimeTravel";

function AppRedux() {
  return (
    <Provider store={store}>
      <div className="container mx-auto max-w-2xl p-4">
        <h1 className="text-2xl font-bold mb-4">Task Manager with Redux</h1>
        <TimeTravel />
        <TaskStats />
        <TaskFilters />
        <TaskInput />
        <TaskList />
      </div>
    </Provider>
  );
}

export default AppRedux;
