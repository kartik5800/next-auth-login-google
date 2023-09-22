import { connectionStr } from "@/lib/db";
import { Employee } from "@/lib/model/employee";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
  let empID = content.params.empid;
  const filter = { _id: empID };
  const payload = await request.json();
  await mongoose.connect(connectionStr);
  const result = await Employee.findOneAndUpdate(filter, payload);
  return NextResponse.json({ result, success: true });
}

export async function DELETE(request, content) {
  let empID = content.params.empid;
  const singlerecordid = { _id: empID };
  await mongoose.connect(connectionStr);
  const result = await Employee.deleteOne(singlerecordid);
  return NextResponse.json({ result, success: true });
}
