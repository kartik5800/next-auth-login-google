import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

function AddTask({ projectId, onAddTask }) {
  const { data: session } = useSession();
  const [taskName, setTaskName] = useState("");
  const [createdBy] = useState(session.user.name);
  const [assignedUser, setAssignedUser] = useState("Dummy User");
  const [status, setStatus] = useState("Progress");

  console.log(session.user.name);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleAssignedUserChange = (e) => {
    setAssignedUser(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/project/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          taskName,
          createdBy,
          assignedUser,
          status,
        }),
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
            className="border rounded p-2 mt-2 w-full"
          />
          <br />

          <select
            value={assignedUser}
            onChange={handleAssignedUserChange}
            className="border rounded p-2 mt-2 w-full"
          >
            <option value="kartik">kartik</option>
            <option value="deep">deep</option>
            <option value="sujal">sujal</option>
          </select>
          <br />
          <select
            value={status}
            onChange={handleStatusChange}
            className="border rounded p-2 mt-2 w-full"
          >
            <option value="Progress">Progress</option>
            <option value="Complete">Complete</option>
          </select>
          <br />
          <button className="m-2 p-2 bg-slate-300" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
