"use client";
import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import moment from "moment";
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

  const handleTaskAdded = (task) => {};

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-3/4 p-3 m-4 rounded-lg">
        <h1 className="text-3xl font-bold underline text-center">
          {projectData.projectName}
        </h1>

        <div className="flex justify-between m-3">
          <div className="flex gap-8 bg-slate-200 p-2 rounded-md">
            <p>
              <span className="font-bold">Front-end: </span>
              {projectData.frontend ?? ""}
            </p>
            <p>|</p>
            <p>
              {" "}
              <span className="font-bold">Back-end: </span>{" "}
              {projectData.backend ?? ""}
            </p>
          </div>
          <div className="flex gap-8 bg-slate-200 p-2 rounded-md">
            <p>
              <span className=" font-bold"> Start-Date: </span>
              {moment(projectData.startDate).format("DD/MM/YYYY") ?? ""}
            </p>
            <p>|</p>
            <p>
              <span className=" font-bold">End-Date: </span>
              {moment(projectData.endDate).format("DD/MM/YYYY") ?? ""}
            </p>
          </div>
        </div>
        <div className=" gap-8 bg-slate-200 p-2 rounded-md m-3">
          <p className="font-bold">Description</p>
          <p>{projectData.projectDescription ?? ""}</p>
        </div>
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
