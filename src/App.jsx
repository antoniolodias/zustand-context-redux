import { useState } from "react";
import AppContext from "./contextAPI/AppContext";
import AppZustand from "./zustand/AppZustand";
import AppRedux from "./redux/AppRedux";

function App() {
  const [appUsing, setAppUsing] = useState("");

  const GoToAppButton = ({ label, app }) => (
    <button
      className={`${
        app === appUsing ? "bg-red-400" : "bg-blue-500"
      } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
      onClick={() => setAppUsing(app)}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex space-x-4">
        <GoToAppButton label="Zustand" app="zustand" />
        <GoToAppButton label="Context API" app="context" />
        <GoToAppButton label="Redux" app="redux" />
      </div>
      {appUsing === "context" && <AppContext />}
      {appUsing === "zustand" && <AppZustand />}
      {appUsing === "redux" && <AppRedux />}
    </div>
  );
}

export default App;
