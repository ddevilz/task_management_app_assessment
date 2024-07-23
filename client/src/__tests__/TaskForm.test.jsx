import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../features/taskSlice";
import TaskForm from "../components/TaskForm";
import { describe, it, expect, vi, beforeEach } from "vitest";

globalThis.console = {
  ...console,
  log: vi.fn(),
};

const createMockStore = () => {
  return configureStore({
    reducer: { tasks: taskSlice },
    preloadedState: {
      tasks: {
        tasks: [],
        status: "succeeded",
        error: null,
        totalPages: 1,
        currentPage: 1,
      },
    },
  });
};

describe("TaskForm Component", () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
    globalThis.console.log.mockClear();
  });

  it("renders the form with correct fields", () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );

    expect(screen.getByLabelText("Title:")).toBeInTheDocument();
    expect(screen.getByLabelText("Description:")).toBeInTheDocument();
    expect(screen.getByLabelText("Priority:")).toBeInTheDocument();
    expect(screen.getByLabelText("Due Date:")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("logs an error when required fields are empty and form is submitted", async () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(globalThis.console.log).toHaveBeenCalledWith(
        "All fields are required!"
      );
    });
  });

  it("dispatches createTask and fetchTasks actions on form submission", async () => {
    const mockDispatch = vi.fn();
    store.dispatch = mockDispatch;
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Title:"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Description:"), {
      target: { value: "Task description" },
    });
    fireEvent.change(screen.getByLabelText("Priority:"), {
      target: { value: "HIGH" },
    });
    fireEvent.change(screen.getByLabelText("Due Date:"), {
      target: { value: "2024-08-01" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

      expect(globalThis.console.log).toHaveBeenCalledWith(
        "Task successfully added!"
      );
    });
  });
});
