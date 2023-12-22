import React from "react";

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span> {task.id}</span>
          <span>{task.title}</span>

          <div></div>
          <button onClick={() => onUpdate(task)}>Update</button>

          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
