//

import mongoose from "mongoose";
import { parse } from "url";
import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/db";
import { ProjectData } from "@/lib/model/project";

export async function GET(request, content) {
  const url = parse(request.url, true);
  const projectId = url.query.project_id;

  await mongoose.connect(connectionStr);

  const specificUsers = await ProjectData.findById(projectId).populate(
    "projectMembers"
  );

  console.log("==============================", specificUsers);

  return NextResponse.json({
    status: "success",
    specificUsers: specificUsers?.projectMembers || [],
  });
}
