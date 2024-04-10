import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import Tasks from "./components/Tasks";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <main className=" flex flex-col items-center">
        <CreateTask setTasks={setTasks} tasks={tasks} />
        <Tasks tasks={tasks} setTasks={setTasks} />
      </main>
    </DndProvider>
  );
}

export default App;
