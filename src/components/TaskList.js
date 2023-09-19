"use client";
import React, { useState, useEffect } from "react";

function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/project/task/?projectId=${projectId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    console.log("taskid", taskId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/project/task/${taskId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (data.success) {
        // Task deleted successfully. Update the tasks list by refetching.
        fetchTasks();
      } else {
        console.error("Error deleting task:", data.error);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditedTaskName(task.taskName);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditedTaskName("");
  };

  const handleUpdateTask = async (e, task) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/project/task/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskName: editedTaskName }),
        }
      );

      if (response.ok) {
        const updatedTask = await response.json();

        const updatedTasks = tasks.map((t) =>
          t._id === updatedTask._id ? updatedTask : t
        );

        setTasks(updatedTasks);

        cancelEdit();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h2>Listing of Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.taskName}
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            {editingTask && editingTask._id === task._id && (
              <form onSubmit={(e) => handleUpdateTask(e, task)}>
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                />
                <button type="submit">Update</button>
                <button onClick={() => cancelEdit()}>Cancel</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
