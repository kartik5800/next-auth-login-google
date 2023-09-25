import { connectionStr } from "@/lib/db";
import { Employee } from "@/lib/model/employee";
import { ProjectData } from "@/lib/model/project";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  try {
    await mongoose.connect(connectionStr);
    data = await ProjectData.find();
  } catch (error) {
    data = { success: false };
  }
  return NextResponse.json({ result: data, success: true });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const selectedEmployeeIds = payload.projectMembers || [];
    await mongoose.connect(connectionStr);
    const project = new ProjectData(payload);
    const result = await project.save();

    if (selectedEmployeeIds.length > 0) {
      const employees = await Employee.find({
        _id: { $in: selectedEmployeeIds },
      });

      project.projectMembers = employees.map((employee) => employee._id);
      await project.save();
    }

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
