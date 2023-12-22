import React, { useState, useEffect } from "react";
import TaskList from "./components/Tasklist";
import TaskForm from "./components/Taskform";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: "DELETE",
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = (task) => {
    const updatedTitle = prompt("Enter the updated title:", task.title);

    if (updatedTitle !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, title: updatedTitle } : t
        )
      );
    }
  };

  const addTask = async (newTaskTitle) => {
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

      const newTaskData = await response.json();

      setTasks((prevTasks) => [...prevTasks, newTaskData]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
      <TaskForm onAdd={addTask} />
    </div>
  );
};

export default App;
