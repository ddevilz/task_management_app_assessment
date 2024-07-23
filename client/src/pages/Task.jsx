import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Task = () => {
  return (
    <div className="w-full px-3 md:w-3/5 m-auto">
      <div>
        <h1 className="text-center my-12 uppercase text-2xl tracking-[1rem] font-bold">
          Task management app
        </h1>
      </div>
      <div>
        <TaskForm />
      </div>
      <div className="my-5">
        <TaskList />
      </div>
    </div>
  );
};

export default Task;
