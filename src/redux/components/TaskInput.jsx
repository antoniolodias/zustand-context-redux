import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/todos/todosSlice";

function TaskInput() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  console.log("TaskInput rendered");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask(title.trim()));
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="w-full p-2 border rounded"
      />
    </form>
  );
}

export default TaskInput;
