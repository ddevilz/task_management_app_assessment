import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api";

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
  totalPages: 0,
  currentPage: 0,
  totalTasks: 0,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ page, limit, sortBy }) => {
    const response = await axios.get(`${BASE_URL}/tasks`, {
      params: { page, limit, sortBy },
    });
    return response.data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, task);
      return response.data.task;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, updatedTask }, { rejectWithValue }) => {
    try {
      console.log(updatedTask);

      const response = await axios.put(`${BASE_URL}/update/${id}`, updatedTask);
      return response.data.task;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "Something went wrong"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload.tasks;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalTasks = action.payload.totalTasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(editTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default tasksSlice.reducer;
