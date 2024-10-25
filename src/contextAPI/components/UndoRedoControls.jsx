import { useTasks } from "../context/TaskContext";

function UndoRedoControls() {
  const { undo, redo, history } = useTasks();
  console.log("UndoRedoControls rendered");

  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={undo}
        className={`px-3 py-1 rounded ${
          history.past.length
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        Undo
      </button>
      <button
        onClick={redo}
        className={`px-3 py-1 rounded ${
          history.future.length
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        Redo
      </button>
    </div>
  );
}

export default UndoRedoControls;
