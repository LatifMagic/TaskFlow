import { useEffect, useState } from "react";
import TaskSection from "./TaskSection";

function Tasks({ tasks, setTasks }) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClossed] = useState([]);

  useEffect(() => {
    const fTodos = tasks?.filter((task) => task.status === "todo") || [];
    const fInProgress =
      tasks?.filter((task) => task.status === "inprogress") || [];
    const fClosed = tasks?.filter((task) => task.status === "closed") || [];

    setTodos(fTodos);
    setInProgress(fInProgress);
    setClossed(fClosed);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];
  return (
    <div className="md:m-10 flex flex-col sm:flex-row gap-6 w-full md:w-4/5 p-12 md:p-0 text-stone-100">
      {statuses?.map((status, index) => (
        <TaskSection
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          closed={closed}
          todos={todos}
          inProgress={inProgress}
        />
      ))}
    </div>
  );
}

export default Tasks;
