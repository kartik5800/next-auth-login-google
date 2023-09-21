"use client";
import DeleteTask from "@/components/DeleteTask";
import EditTask from "@/components/EditTask";
import moment from "moment";
import { useEffect, useState } from "react";

function TaskDetailPage({ params }) {
  const [task, setTask] = useState([]);
  const id = params.taskid;
  console.log("task", task);
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
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-3/4 p-3 m-4 rounded-lg">
        <h1 className="text-3xl font-bold underline text-center">
          {task?.taskName ?? ""}
        </h1>

        <div className="flex justify-between m-3">
          <div className="flex gap-2 bg-slate-200 p-2 rounded-md">
            <p>
              <span className="font-bold">Created At:- </span>
              {moment(task?.createdTime).format("DD/MM/YYYY") ?? ""}
            </p>
            <p>|</p>
            <p>
              {" "}
              <span className="font-bold">Last Updated At:- </span>{" "}
              {moment(task?.lastUpdatedDate).format("DD/MM/YYYY") ?? ""}
            </p>
          </div>
          <div className="flex gap-2 bg-slate-200 p-2 rounded-md">
            <p>
              <span className=" font-bold"> Created By:- </span>
              {task?.createdBy ?? ""}
            </p>
            <p>|</p>
            <p>
              <span className=" font-bold">Assigned to:- </span>
              {task?.assignedUser ?? ""}
            </p>
          </div>
        </div>

        <div className=" flex gap-8 bg-slate-200 p-2 rounded-md m-3">
          <p className="font-bold">Status</p>
          <p>{task?.status ?? ""}</p>
        </div>
        <div className="flex justify-end gap-2">
          <EditTask id={id} projectId={task?.projectId} />
          <DeleteTask
            taskId={task?._id}
            projectId={task?.projectId}
            UID={task?.taskId}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
