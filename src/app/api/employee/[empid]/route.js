import { connectionStr } from "@/lib/db";
import { Employee } from "@/lib/model/employee";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
  try {
    let empID = content.params.empid;
    const filter = { _id: empID };
    const payload = await request.json();
    await mongoose.connect(connectionStr);
    const result = await Employee.findOneAndUpdate(filter, payload);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json({ error: error.message, success: false });
  }
}

export async function DELETE(request, content) {
  try {
    let empID = content.params.empid;
    const singlerecordid = { _id: empID };
    await mongoose.connect(connectionStr);
    const result = await Employee.deleteOne(singlerecordid);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return NextResponse.json({ error: error.message, success: false });
  }
}
