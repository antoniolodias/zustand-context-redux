// Memoized selectors using createSelector would be great here
import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = (state) => state.todos.present.tasks;
export const selectFilter = (state) => state.todos.present.filter;
export const selectSearchTerm = (state) => state.todos.present.searchTerm;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilter, selectSearchTerm],
  (tasks, filter, searchTerm) => {
    return tasks
      .filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
      })
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }
);

export const selectStats = createSelector([selectTasks], (tasks) => ({
  total: tasks.length,
  completed: tasks.filter((t) => t.completed).length,
  active: tasks.filter((t) => !t.completed).length,
}));
