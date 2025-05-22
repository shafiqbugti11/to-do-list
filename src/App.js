import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    if (index === editingIndex) {
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-area">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
        />
        <button onClick={addTask}>Add</button>
        <button onClick={clearAllTasks}>Clear All Tasks</button>
      </div>
      <ul className="task-list">
        {tasks.map((item, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={() => setEditingIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                {item}
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
