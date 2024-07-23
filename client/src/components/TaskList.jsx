import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask, fetchTasks } from "../features/taskSlice";
import EditTaskModal from "./EditTaskModal";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error, totalPages, totalTasks } = useSelector(
    (state) => state.tasks
  );
  const [page, setPage] = useState(1);
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    dispatch(fetchTasks({ page, limit: 10, sortBy }));
  }, [dispatch, page, sortBy]);

  useEffect(() => {
    if (status === "failed") {
      Toastify({
        text: "Could not establish a connection to the server!",
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
  }, [status, error]);
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const isLongDescription = (description) => {
    return description.length > 10;
  };

  const openModal = (id) => {
    document.getElementById(id).showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id).close();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const resultAction = await dispatch(deleteTask(id));
    if (deleteTask.fulfilled.match(resultAction)) {
      Toastify({
        text: "Task deleted successfully!",
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
    } else {
      Toastify({
        text: "There was an error while deleting the task.",
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
  };

  const handleSaveChanges = async (id, updatedTask) => {
    const resultAction = await dispatch(editTask({ id, updatedTask }));
    if (editTask.fulfilled.match(resultAction)) {
      Toastify({
        text: "Task updated successfully.",
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
    } else {
      Toastify({
        text: "There was an error while editing the task.",
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
    setIsEditModalOpen(false);
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };
  return (
    <div className="overflow-x-auto h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span>Total task: {totalTasks}</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort">Sort by :</label>
          <select
            id="sort"
            className="px-2 py-2 rounded-md"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <>
          <table className="table h-max">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks &&
                tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="break-words">{task.title}</td>
                    <td>
                      {isLongDescription(task.description) ? (
                        <>
                          <button
                            className="btn btn-xs"
                            onClick={() => openModal(`modal-${task._id}`)}
                          >
                            View Description
                          </button>
                          <dialog id={`modal-${task._id}`} className="modal">
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">
                                Task Description
                              </h3>
                              <p className="py-4 break-words">
                                {task.description}
                              </p>
                              <button
                                className="btn btn-sm"
                                onClick={() => closeModal(`modal-${task._id}`)}
                              >
                                Close
                              </button>
                            </div>
                          </dialog>
                        </>
                      ) : (
                        <p>{task.description}</p>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge badge-ghost badge-sm ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                    <td className="flex flex-wrap gap-2">
                      <button
                        className="btn btn-sm"
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm text-red-500"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {isEditModalOpen && currentTask && (
            <EditTaskModal
              task={currentTask}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSave={handleSaveChanges}
            />
          )}

          <div className="flex justify-between items-center mt-4">
            <button
              className="btn btn-outline"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-outline"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
