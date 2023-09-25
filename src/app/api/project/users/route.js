import mongoose from "mongoose";
import { parse } from "url";
import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/db";
import { ProjectData } from "@/lib/model/project";

export async function GET(request, content) {
  try {
    const url = parse(request.url, true);
    const projectId = url.query.projectId;
    await mongoose.connect(connectionStr);
    const specificUsers = await ProjectData.findById(projectId).populate(
      "projectMembers"
    );

    return NextResponse.json({
      status: "success",
      specificUsers: specificUsers?.projectMembers || [],
    });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: error.message, success: false });
  } finally {
    mongoose.connection.close();
  }
}
