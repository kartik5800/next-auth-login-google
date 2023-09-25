import { connectionStr } from "@/lib/db";
import { Employee } from "@/lib/model/employee";
import { ProjectData } from "@/lib/model/project";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
  try {
    let projectId = content.params.projectid;
    const filter = { _id: projectId };
    const payload = await request.json();
    await mongoose.connect(connectionStr);
    const result = await ProjectData.findOneAndUpdate(filter, payload);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json({ error: error.message, success: false });
  } finally {
    mongoose.connection.close();
  }
}

export async function DELETE(request, content) {
  try {
    let projectId = content.params.projectid;
    const singlerecordid = { _id: projectId };
    await mongoose.connect(connectionStr);
    const result = await ProjectData.deleteOne(singlerecordid);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return NextResponse.json({ error: error.message, success: false });
  } finally {
    mongoose.connection.close();
  }
}

export async function GET(request, content) {
  const projectId = content.params.projectid;
  try {
    await mongoose.connect(connectionStr);
    const result = await ProjectData.findById(projectId).populate(
      "projectMembers"
    );

    if (!result) {
      return NextResponse.error("Project not found", 404);
    }
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
