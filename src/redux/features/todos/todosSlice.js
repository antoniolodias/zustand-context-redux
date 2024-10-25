import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filter: "all",
  searchTerm: "",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        title: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
      });
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setFilter, setSearchTerm } =
  todosSlice.actions;

export default todosSlice.reducer;
