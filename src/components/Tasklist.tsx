import React from "react";

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
  onUpdate: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onUpdate }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <div className="flex justify-center">
          <li key={task.id}>
            <span> {task.id}</span>
            <span>{task.title}</span>

            <div></div>
            <div className="flex space-x-4 flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => onUpdate(task)}
              >
                Update
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
};

export default TaskList;
