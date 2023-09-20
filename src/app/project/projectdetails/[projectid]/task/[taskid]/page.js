"use client";

import { useRouter } from "next/navigation";
// pages/task/[taskId].js

import { useEffect, useState } from "react";

function TaskDetailPage({ params }) {
  const router = useRouter();
  const { taskId } = params.taskid;
  const [taskDetails, setTaskDetails] = useState([]);
  const [assignedUser, setAssignedUser] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (!taskId) return;

      try {
        const response = await fetch(`/api/task/details/${taskId}`);
        if (response.ok) {
          const data = await response.json();
          setTaskDetails(data.taskDetails);
        } else {
          console.error("Error fetching task details");
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleUpdateTaskDetails = async () => {
    try {
      const response = await fetch(`/api/task/details/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assignedUser, status }),
      });

      if (response.ok) {
        const data = await response.json();
        setTaskDetails([data.taskDetail]);
      } else {
        console.error("Error updating task details");
      }
    } catch (error) {
      console.error("Error updating task details:", error);
    }
  };

  return (
    <div>
      <h1>Task Details</h1>
      <p>Task ID: {taskId}</p>
      <input
        type="text"
        placeholder="Assigned User"
        value={assignedUser}
        onChange={(e) => setAssignedUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={handleUpdateTaskDetails}>Update Task Details</button>

      <h2>Task Details:</h2>
      <ul>
        {taskDetails.map((taskDetail) => (
          <li key={taskDetail._id}>
            Assigned User: {taskDetail.assignedUser}
            <br />
            Status: {taskDetail.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskDetailPage;
