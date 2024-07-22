import mongoose from "mongoose";
import { Priority } from "../utils/priority.js";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      maxLength: [50, "Name should not exceed 50 character"],
      trim: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: Object.values(Priority),
      default: Priority.LOW,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
