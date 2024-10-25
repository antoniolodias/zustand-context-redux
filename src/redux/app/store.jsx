import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import undoable from "redux-undo";

export const store = configureStore({
  reducer: {
    todos: undoable(todosReducer), // Wrap reducer with undoable
  },
});
