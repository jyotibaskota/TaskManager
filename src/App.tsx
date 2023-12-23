import React, { useState, useEffect } from "react";
import TaskList from "./components/Tasklist";
import TaskForm from "./components/Taskform";

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteTask = async (taskId: number) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: "DELETE",
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = (task: Task) => {
    const updatedTitle = prompt("Enter the updated title:", task.title);

    if (updatedTitle !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, title: updatedTitle } : t
        )
      );
    }
  };

  const addTask = async (newTaskTitle: string) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTaskTitle,
            completed: false,
          }),
        }
      );

      const newTaskData: Task = await response.json();

      setTasks((prevTasks) => [...prevTasks, newTaskData]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="bg-blue-400 bg-opacity-70">
      <h1 className="flex justify-center text-3xl font-bold underline">
        Task List
      </h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
    </div>
  );
};

export default App;
