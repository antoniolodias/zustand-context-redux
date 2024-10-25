import { useSelector, useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";

function TimeTravel() {
  const canUndo = useSelector((state) => state.todos.past.length > 0);
  const canRedo = useSelector((state) => state.todos.future.length > 0);
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => dispatch(ActionCreators.undo())}
        disabled={!canUndo}
        className={`px-3 py-1 rounded ${
          canUndo ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
        }`}
      >
        Undo
      </button>
      <button
        onClick={() => dispatch(ActionCreators.redo())}
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

export default TimeTravel;
