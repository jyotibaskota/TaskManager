import { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      onAdd(newTask);
      setNewTask("");
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
        <button type="submit">
          <a href="https://github.com/raunakjoshi/TaskManager">Git</a>
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
