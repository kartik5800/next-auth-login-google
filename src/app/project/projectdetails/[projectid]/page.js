"use client";
import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SingleProject({ params }) {
  const [projectData, setProjectData] = useState({});

  const ID = params.projectid;

  useEffect(() => {
    getProjectData();
  }, [ID]);

  const getProjectData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/project/${ID}`);
      if (response.ok) {
        const data = await response.json();
        setProjectData(data.result);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const handleTaskAdded = (task) => {
    console.log("task", task);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold underline text-center">
          Project Details ................
        </h1>
      </div>
      <div className="p-4">
        <p>Project Name: {projectData.projectname}</p>
        <p>Front-end: {projectData.frontend}</p>
        <p>Back-end: {projectData.backend}</p>
      </div>
      <div>
        <AddTask
          projectId={projectData._id}
          onAddTask={(task) => handleTaskAdded(task)}
        />
      </div>
      <div>
        <TaskList projectId={projectData._id} />
      </div>
    </div>
  );
}
