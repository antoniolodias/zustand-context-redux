import useStore from "../store/TaskStore";

function UndoRedoControls() {
  const undo = useStore((state) => state.undo);
  const redo = useStore((state) => state.redo);
  const canUndo = useStore((state) => state.past.length > 0);
  const canRedo = useStore((state) => state.future.length > 0);
  console.log("UndoRedoControls rendered");

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={undo}
        disabled={!canUndo}
        className={`px-3 py-1 rounded ${
          canUndo ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
        }`}
      >
        Undo
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className={`px-3 py-1 rounded ${
          canRedo ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
        }`}
      >
        Redo
      </button>
    </div>
  );
}

export default UndoRedoControls;
