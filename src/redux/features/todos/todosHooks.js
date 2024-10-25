import { useSelector } from "react-redux";
import { selectFilteredTasks, selectStats } from "./todosSelectors";

export const useFilteredTasks = () => {
  return useSelector(selectFilteredTasks);
};

export const useTaskStats = () => {
  return useSelector(selectStats);
};
