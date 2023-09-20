import { connectionStr } from "@/lib/db";
import { ProjectData } from "@/lib/model/project";
import { TaskData } from "@/lib/model/task";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { parse } from "url";

export async function GET(request) {
  try {
    const url = parse(request.url, true);
    const projectId = url.query.projectId;
    await mongoose.connect(connectionStr);

    const project = await ProjectData.findById(projectId);

    if (!project) {
      return {
        status: 404,
        body: JSON.stringify({ result: "error", error: "Project not found" }),
      };
    }

    const tasks = await TaskData.find({ projectId: project._id });

    mongoose.connection.close();

    return NextResponse.json({ tasks, success: true });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "error", success: false });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();

    await mongoose.connect(connectionStr);

    const project = await ProjectData.findById(payload.projectId);

    if (!project) {
      return NextResponse.json({
        status: 404,
        result: "error",
        error: "Project not found",
      });
    }
    const lastTask = await TaskData.findOne().sort({ taskId: -1 });
    let newTaskId = 1000;
    if (lastTask) {
      newTaskId = lastTask.taskId + 1;
    }

    const newTask = new TaskData({
      projectId: project._id,
      taskName: payload.taskName,
      taskId: newTaskId,
    });

    await newTask.save();

    project.tasks.push(newTask);
    await project.save();

    mongoose.connection.close();

    return NextResponse.json({
      status: 200,
      result: "success",
      success: true,
    });
  } catch (error) {
    console.error("Error adding task:", error);

    return NextResponse.json({
      status: 500,
      result: "error",
      error: error.message,
    });
  }
}
