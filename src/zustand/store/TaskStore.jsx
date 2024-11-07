import { create } from "zustand";

const useStore = create((set, get) => ({
  past: [],
  present: {
    tasks: [],
    filter: "all",
    searchTerm: "",
  },
  future: [],

  stats: { total: 0, completed: 0, active: 0 },

  // Helper function to save the current state to past
  saveToPast() {
    const { past, present } = get();
    set({ past: [...past, present], future: [] });
  },

  addTask: (title) =>
    set((state) => {
      state.saveToPast();
      const newTasks = [
        ...state.present.tasks,
        { id: Date.now(), title, completed: false, createdAt: new Date() },
      ];
      return {
        present: {
          ...state.present,
          tasks: newTasks,
        },
        stats: calculateStats(newTasks),
      };
    }),

  toggleTask: (id) =>
    set((state) => {
      state.saveToPast();
      const newTasks = state.present.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return {
        present: {
          ...state.present,
          tasks: newTasks,
        },
        stats: calculateStats(newTasks),
      };
    }),

  deleteTask: (id) =>
    set((state) => {
      state.saveToPast();
      const newTasks = state.present.tasks.filter((task) => task.id !== id);
      return {
        present: {
          ...state.present,
          tasks: newTasks,
        },
        stats: calculateStats(newTasks),
      };
    }),

  setFilter: (filter) =>
    set((state) => ({
      present: { ...state.present, filter },
    })),

  setSearchTerm: (searchTerm) =>
    set((state) => ({
      present: { ...state.present, searchTerm },
    })),

  // Computed property for filtered tasks
  filteredTasks: () => {
    const { tasks, filter, searchTerm } = get().present;
    return filterTasks(tasks, filter, searchTerm);
  },

  undo: () =>
    set((state) => {
      if (state.past.length > 0) {
        const previous = state.past[state.past.length - 1];
        const newPast = state.past.slice(0, state.past.length - 1);
        return {
          future: [state.present, ...state.future],
          past: newPast,
          present: previous,
          stats: calculateStats(previous.tasks),
        };
      }
      return state;
    }),

  redo: () =>
    set((state) => {
      if (state.future.length > 0) {
        const next = state.future[0];
        const newFuture = state.future.slice(1);
        return {
          past: [...state.past, state.present],
          present: next,
          future: newFuture,
          stats: calculateStats(next.tasks),
        };
      }
      return state;
    }),
}));

// Helper functions remain the same
function calculateStats(tasks) {
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    active: tasks.filter((t) => !t.completed).length,
  };
}

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
