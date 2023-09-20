"use client";

import { useEffect, useState } from "react";

function TaskDetailPage({ params }) {
  const [task, setTask] = useState([]);
  const id = params.taskid;

  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    let data = await fetch(`http://localhost:3000/api/project/task/${id}`, {
      cache: "no-store",
    });
    data = await data.json();

    if (data.success) {
      setTask(data.task);
    } else {
      return { success: false };
    }
  };

  return (
    <div>
      <div>
        <p className="text-4xl text-center">task details</p>
        <p className="text-3xl">{task.taskName}</p>
      </div>

      <div className="p-10">
        <div></div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
