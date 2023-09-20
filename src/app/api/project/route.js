import { connectionStr } from "@/lib/db";
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
  let payload = await request.json();
  await mongoose.connect(connectionStr);
  const project = new ProjectData(payload);
  const result = await project.save();
  return NextResponse.json({ result, success: true });
}
