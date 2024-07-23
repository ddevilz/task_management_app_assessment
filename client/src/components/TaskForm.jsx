import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { createTask, fetchTasks } from "../features/taskSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.tasks);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleDueDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      Toastify({
        text: "Due date cannot be in the past",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
      return;
    } else {
      setTask((prevTask) => ({
        ...prevTask,
        dueDate: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.dueDate || !task.title || !task.dueDate) {
      console.log("All fields are required!");
      return Toastify({
        text: "All fields are required!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {},
      }).showToast();
    }

    try {
      await dispatch(createTask(task));
      await dispatch(fetchTasks({ currentPage, limit: 10 }));
      console.log("Task successfully added!");
      Toastify({
        text: "Task successfully added!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {},
      }).showToast();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full rounded-md px-3 py-2"
              value={task.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              className="w-full rounded-md px-3 py-2"
              value={task.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              name="priority"
              className="w-full rounded-md px-3 py-2"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="">Select Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="w-full rounded-md px-3 py-2"
              value={task.dueDate}
              onChange={handleDueDateChange}
            />
          </div>
          <button
            className="md:col-span-2 bg-indigo-500 w-full rounded-md px-3 py-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
