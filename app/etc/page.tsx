"use client";

import React, { FormEventHandler, useState, useEffect } from "react";
import data from "@/data/todos.json";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [newTaskValue, setNewTaskValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  interface Task {
    text: string;
  }

  useEffect(() => {
    setTasks(data.tasks);
  }, []);

  const addNewTask = () => {
    const newTask: Task = { text: newTaskValue };
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>Todo list</h1>
      <input
        value={newTaskValue}
        onChange={(e) => setNewTaskValue(e.target.value)}></input>
      <button onClick={addNewTask}>Add New task</button>

      <ul>
        {tasks?.map((task) => (
          <li>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}
