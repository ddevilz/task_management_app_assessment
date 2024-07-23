import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditTaskModal = ({ task, isOpen, onClose, onSave }) => {
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  const handleDueDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      updatedTask.dueDate = task.dueDate;
      return alert("Please select a valid date");
    } else {
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        dueDate: e.target.value,
      }));
    }
  };

  useEffect(() => {
    if (task) {
      setUpdatedTask({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: new Date(task.dueDate).toISOString().split("T")[0],
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    onSave(task._id, updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog id="edit_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Task</h3>
        <form>
          <div className="py-4">
            <label htmlFor="edit_title" className="block">
              Title:
            </label>
            <input
              type="text"
              id="title"
              defaultValue={updatedTask.title}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="py-4">
            <label htmlFor="description" className="block">
              Description:
            </label>
            <textarea
              id="description"
              defaultValue={updatedTask.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div className="py-4">
            <label htmlFor="priority" className="block">
              Priority:
            </label>
            <select
              id="priority"
              defaultValue={updatedTask.priority}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div className="py-4">
            <label htmlFor="dueDate" className="block">
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              defaultValue={updatedTask.dueDate}
              onChange={handleDueDateChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleSave}>
              Save Changes
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

EditTaskModal.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditTaskModal;
