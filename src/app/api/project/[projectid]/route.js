import { connectionStr } from "@/lib/db";
import { ProjectData } from "@/lib/model/project";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
  let projectId = content.params.projectid;
  const filter = { _id: projectId };
  const payload = await request.json();
  await mongoose.connect(connectionStr);
  const result = await ProjectData.findOneAndUpdate(filter, payload);
  return NextResponse.json({ result, success: true });
}

export async function GET(request, content) {
  let projectId = content.params.projectid;
  const singlerecordid = { _id: projectId };
  await mongoose.connect(connectionStr);
  const result = await ProjectData.findById(singlerecordid);
  return NextResponse.json({ result, success: true });
}

export async function DELETE(request, content) {
  let projectId = content.params.projectid;
  const singlerecordid = { _id: projectId };
  await mongoose.connect(connectionStr);
  const result = await ProjectData.deleteOne(singlerecordid);
  return NextResponse.json({ result, success: true });
}
