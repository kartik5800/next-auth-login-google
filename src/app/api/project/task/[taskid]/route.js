import { connectionStr } from "@/lib/db";
import { ProjectData } from "@/lib/model/project";
import { TaskData } from "@/lib/model/task";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
  try {
    const { taskid } = content.params;
    const payload = await request.json();

    await mongoose.connect(connectionStr);

    const task = await TaskData.findById(taskid);

    if (!task) {
      return NextResponse.json({
        status: 404,
        result: "error",
        error: "Task not found",
      });
    }

    task.taskName = payload.taskName;
    await task.save();

    mongoose.connection.close();

    return NextResponse.json({
      status: 200,
      result: "success",
      success: true,
    });
  } catch (error) {
    console.error("Error updating task:", error);

    return NextResponse.json({
      status: 500,
      result: "error",
      error: error.message,
    });
  }
}

export async function DELETE(request, content) {
  try {
    const { taskid } = content.params;

    await mongoose.connect(connectionStr);

    const task = await TaskData.findById(taskid);

    if (!task) {
      return NextResponse.json({
        result: "error",
        error: "Task not found",
        success: false,
      });
    }

    const project = await ProjectData.findById(task.projectId);
    project.tasks.pull(taskid);
    await project.save();

    await TaskData.deleteOne({ _id: taskid });

    mongoose.connection.close();

    return NextResponse.json({ result: "success", success: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ result: "error", success: false });
  }
}

export async function GET(request, content) {
  const { taskid } = content.params;
  await mongoose.connect(connectionStr);
  const task = await TaskData.findById({ _id: taskid });
  return NextResponse.json({ task, success: true });
}
