import { useDrop } from "react-dnd";
import Task from "./Task";
import toast from "react-hot-toast";

function TaskSection({ status, tasks, setTasks, closed, inProgress, todos }) {
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  let bg = "bg-blue-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    bg = "bg-emerald-500";
    tasksToMap = inProgress;
  }
  if (status === "closed") {
    bg = "bg-red-500";
    tasksToMap = closed;
  }

  const addItemToSection = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, status: status } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      toast.success("Task status changed.", {
        position: "bottom-right",
        style: {
          padding: "16px",
          color: "#fff",
          background: "#333",
        },
        iconTheme: {
          primary: "rgb(20 184 166)",
          secondary: "#FFFAEE",
        },
      });

      return updatedTasks;
    });
  };

  return (
    <div
      ref={drop}
      className={`w-full rounded-md h-52 ${isOver ? "bg-slate-200" : ""}`}
    >
      <h3 className={`uppercase ${bg} p-2 rounded-md text-center font-medium`}>
        {status}
      </h3>
      {tasksToMap?.map((task) => (
        <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
      ))}
    </div>
  );
}

export default TaskSection;
