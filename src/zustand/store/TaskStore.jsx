import { create } from "zustand";

const useStore = create((set, get) => ({
  tasks: [],
  filter: "all",
  searchTerm: "",
  filteredTasks: [], // Initialize filteredTasks as empty array
  stats: {
    total: 0,
    completed: 0,
    active: 0,
  },

  addTask: (title) =>
    set((state) => {
      const newTasks = [
        ...state.tasks,
        {
          id: Date.now(),
          title,
          completed: false,
          createdAt: new Date(),
        },
      ];
      return {
        tasks: newTasks,
        filteredTasks: filterTasks(newTasks, state.filter, state.searchTerm),
        stats: calculateStats(newTasks),
      };
    }),

  toggleTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return {
        tasks: newTasks,
        filteredTasks: filterTasks(newTasks, state.filter, state.searchTerm),
        stats: calculateStats(newTasks),
      };
    }),

  deleteTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      return {
        tasks: newTasks,
        filteredTasks: filterTasks(newTasks, state.filter, state.searchTerm),
        stats: calculateStats(newTasks),
      };
    }),

  setFilter: (filter) =>
    set((state) => ({
      filter,
      filteredTasks: filterTasks(state.tasks, filter, state.searchTerm),
    })),

  setSearchTerm: (searchTerm) =>
    set((state) => ({
      searchTerm,
      filteredTasks: filterTasks(state.tasks, state.filter, searchTerm),
    })),
}));

// Helper function to calculate stats
function calculateStats(tasks) {
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    active: tasks.filter((t) => !t.completed).length,
  };
}

// Helper function to filter tasks
function filterTasks(tasks, filter, searchTerm) {
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

export default useStore;
