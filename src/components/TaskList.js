"use client";

import React, { useState, useEffect } from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";

function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);

  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
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
    try {
      const response = await fetch(
        `http://localhost:3000/api/project/task/${taskId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (data.success) {
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

  // Function to handle adding a new task
  const handleAddTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/project/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName: newTaskName, projectId }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Listing of Tasks</h2>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button color="gray">Create Task</Button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Create Task</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              After creating task you got task ID
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="border rounded p-2 mt-2 w-full"
              />
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button onClick={handleAddTask}>Create task</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border rounded p-4 shadow-md hover:shadow-lg hover:bg-white transition duration-300"
          >
            <Link
              href={`/project/projectdetails/${task.projectId}/task/${task._id}`}
            >
              <p className="text-lg font-semibold">{task.taskName}</p>
            </Link>
            <p>{task.taskId}</p>

            {editingTask && editingTask._id === task._id ? (
              <form onSubmit={(e) => handleUpdateTask(e, task)}>
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                  className="border rounded p-2 mt-2 w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded p-2 mt-2"
                >
                  Update
                </button>

                <button
                  onClick={() => cancelEdit()}
                  className="bg-red-500 text-white rounded p-2 mt-2 ml-2"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="mt-2">
                <button
                  onClick={() => handleEditTask(task)}
                  className="bg-yellow-500 text-white rounded p-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 text-white rounded p-2 ml-2"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
