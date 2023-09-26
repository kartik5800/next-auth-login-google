import moment from "moment";
import DeleteTask from "@/components/DeleteTask";
import EditTask from "@/components/EditTask";

async function getData(id) {
  let data = await fetch(`http://localhost:3000/api/task/${id}`, {
    cache: "no-store",
  });

  try {
    let result = await data.json();
    return result.task;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

async function TaskDetailPage({ params }) {
  const id = params.taskid;
  const taskData = await getData(id);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-3/4 p-3 m-4 rounded-lg">
        <h1 className="text-3xl font-bold underline text-center">
          {taskData?.taskName ?? ""}
        </h1>

        <div className="flex justify-between m-3">
          <div className="flex gap-2 bg-slate-200 p-2 rounded-md">
            <p>
              <span className="font-bold">Created At:- </span>
              {moment(taskData?.createdTime).format("DD/MM/YYYY") ?? ""}
            </p>
            <p>|</p>
            <p>
              {" "}
              <span className="font-bold">Last Updated At:- </span>{" "}
              {moment(taskData?.lastUpdatedDate).format("DD/MM/YYYY") ?? ""}
            </p>
          </div>
          <div className="flex gap-2 bg-slate-200 p-2 rounded-md">
            <p>
              <span className=" font-bold"> Created By:- </span>
              {taskData?.createdBy ?? ""}
            </p>
            <p>|</p>
            <p>
              <span className=" font-bold">Assigned to:- </span>
              {taskData?.assignedUser?.name ?? ""}
            </p>
          </div>
        </div>

        <div className=" flex gap-8 bg-slate-200 p-2 rounded-md m-3">
          <p className="font-bold">Status</p>
          <p>{taskData?.status ?? ""}</p>
        </div>
        <div className="flex justify-end gap-2">
          <EditTask id={id} taskData={taskData} />
          <DeleteTask
            taskId={taskData?._id}
            projectId={taskData?.projectId}
            UID={taskData?.taskId}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
