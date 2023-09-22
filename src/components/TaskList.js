"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/task/?projectId=${projectId}`,
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

  return (
    <div>
      <div className="flex justify-center bg-slate-900 p-3 text-white">
        <h2 className="text-2xl font-semibold">Listing of Tasks</h2>
      </div>

      <div className="grid  grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-4">
        {tasks?.map((task) => (
          <div
            key={task._id}
            className="border bg-white rounded-lg p-4 shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300"
          >
            <Link
              href={`/project/projectdetails/${task.projectId}/task/${task._id}`}
            >
              <div className="p-4">
                <p className="text-lg font-semibold"> ID:-{task.taskId}</p>
                <p className="">{task.taskName}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
