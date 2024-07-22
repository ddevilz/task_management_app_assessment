import { asyncHandler } from "../utils/asyncHandler.js";
import Task from "../model/task.schema.js";

export const create = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  if (new Date(dueDate).getTime() < Date.now()) {
    return res
      .status(400)
      .json({ success: false, message: "Date cannot be in the past." });
  }

  if (!title || !priority || !dueDate) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided.",
    });
  }

  const task = await Task.create({ title, description, priority, dueDate });

  res.status(201).json({
    success: true,
    task,
  });
});

export const getTasks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;
  const tasks = await Task.find().skip(skip).limit(parseInt(limit));

  const totalTasks = await Task.countDocuments();
  const totalPages = Math.ceil(totalTasks / limit);

  res.status(200).json({
    success: true,
    totalTasks,
    totalPages,
    currentPage: page,
    tasks,
  });
});

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate } = req.body;

  if (dueDate && new Date(dueDate).getTime() < Date.now()) {
    return res
      .status(400)
      .json({ success: false, message: "Date cannot be in the past." });
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, priority, dueDate },
    { new: true, runValidators: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ success: false, message: "Task not found." });
  }

  res.status(200).json({
    success: true,
    task: updatedTask,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    return res.status(404).json({ success: false, message: "Task not found." });
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully.",
  });
});
