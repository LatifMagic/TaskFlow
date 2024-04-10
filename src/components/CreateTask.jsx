import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

function CreateTask({ setTasks }) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (task.name.length < 3)
      return toast.error("A task must have more than 3 characters ");
    if (task.name.length > 40)
      return toast.error("A task must not surpass 40 characters");

    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));

      return list;
    });

    toast.success("Task Created 🙂");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  }

  return (
    <>
      <h1 className="text-xl h1-semibold sm:text-3xl my-8 sm:my-16">
        Create/Manage your tasks
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-5"
      >
        <input
          type="text"
          className="w-64 h-10 p-2 border-2 border-violet-300 rounded-md"
          value={task.name}
          onChange={(e) =>
            setTask({ ...task, id: uuidv4(), name: e.target.value })
          }
        />

        <button
          className="p-2 w-20 rounded-md  font-medium bg-violet-500 text-stone-100 
        hover:bg-violet-800 transition duration-200"
        >
          Create
        </button>
      </form>
    </>
  );
}

export default CreateTask;
