import React, { useState } from "react";

function AddTask({ projectId, onAddTask }) {
  const [taskName, setTaskName] = useState("");

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/project/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, taskName }),
      });
      if (response.ok) {
        const data = await response.json();
        onAddTask(data.task);
        setTaskName("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task name"
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
