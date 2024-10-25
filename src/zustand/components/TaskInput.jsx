import { useState } from "react";
import useStore from "../store/TaskStore";

function TaskInput() {
  const addTask = useStore((state) => state.addTask);
  const [title, setTitle] = useState("");
  console.log("TaskInput rendered");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task..."
        className="w-full p-2 border rounded"
      />
    </form>
  );
}

export default TaskInput;
