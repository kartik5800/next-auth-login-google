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
        <div className="gap-2 p-2 flex flex-col">
          <div className="flex justify-between gap-2 bg-slate-200 p-2 rounded-md">
            <p>
              <span className="font-bold">Created At:- </span>
              {moment(taskData?.createdTime).format("DD/MM/YYYY") ?? ""}
            </p>

            <p>
              {" "}
              <span className="font-bold">Last Updated At:- </span>{" "}
              {moment(taskData?.lastUpdatedDate).format("DD/MM/YYYY") ?? ""}
            </p>
          </div>
          <div className="flex justify-between gap-2 bg-slate-200 p-2 rounded-md">
            <p>
              <span className=" font-bold"> Created By:- </span>
              {taskData?.createdBy ?? ""}
            </p>

            <p>
              <span className=" font-bold">Assigned to:- </span>
              {taskData?.assignedUser?.name ?? ""}
            </p>
          </div>
        </div>

        <div className=" gap-8 bg-slate-200 p-2 rounded-md m-3">
          <p className="font-bold">Task Description :-</p>
          <p>{taskData?.taskDescription ?? ""}</p>
        </div>

        <div className="gap-2 p-2 flex flex-col">
          <div className="flex justify-between gap-2 bg-slate-200 p-2 rounded-md">
            <p>
              <span className="font-bold">Start date :-</span>
              {moment(taskData?.startDate).format("DD/MM/YYYY") ?? ""}
            </p>

            <p>
              {" "}
              <span className="font-bold">End date:- </span>{" "}
              {moment(taskData?.endDate).format("DD/MM/YYYY") ?? ""}
            </p>
          </div>
          <div className="flex justify-between gap-2 bg-slate-200 p-2 rounded-md">
            <p>
              <span className=" font-bold"> Status:- </span>
              {taskData?.status ?? ""}
            </p>

            <p>
              <span className=" font-bold"> priority:- </span>
              {taskData?.priority ?? ""}
            </p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-blue-700 dark:text-white">
                % Done
              </span>
              <span className="text-sm font-medium text-blue-700 dark:text-white">
                {taskData?.done ?? 0}%
              </span>
            </div>
            <div className="p-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${taskData?.done ?? 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-2">
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
