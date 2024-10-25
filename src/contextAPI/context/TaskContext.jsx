import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState({ past: [], future: [] });
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [searchTerm, setSearchTerm] = useState("");

  // Helper function to update tasks and maintain history
  const updateTasks = (newTasks) => {
    setHistory((prev) => ({
      past: [...prev.past, tasks], // Save current state to past
      future: [], // Clear future on new action
    }));
    setTasks(newTasks);
  };

  // Undo Function
  const undo = () => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev; // Nothing to undo
      const previousTasks = prev.past[prev.past.length - 1];
      setTasks(previousTasks); // Set previous tasks as the current tasks
      return {
        past: prev.past.slice(0, -1),
        future: [tasks, ...prev.future], // Move current tasks to future
      };
    });
  };

  // Redo Function
  const redo = () => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev; // Nothing to redo
      const nextTasks = prev.future[0];
      setTasks(nextTasks); // Set next tasks as the current tasks
      return {
        past: [...prev.past, tasks], // Move current tasks to past
        future: prev.future.slice(1),
      };
    });
  };

  const addTask = (title) => {
    updateTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date(),
      },
    ]);
  };

  const toggleTask = (id) => {
    updateTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    updateTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    active: tasks.filter((t) => !t.completed).length,
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        toggleTask,
        deleteTask,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        stats,
        undo,
        redo, // Expose undo and redo functions
        history,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
