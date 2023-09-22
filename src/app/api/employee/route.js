import { connectionStr } from "@/lib/db";
import { Employee } from "@/lib/model/employee";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    const data = await Employee.find();
    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    return NextResponse.error("Internal Server Error", 500);
  }
}

async function generateNextEmployeeCode() {
  const highestCodeEmployee = await Employee.findOne(
    {},
    { empCode: 1 },
    { sort: { empCode: -1 } }
  );
  if (highestCodeEmployee) {
    const currentCode = highestCodeEmployee.empCode;
    const numericPart = parseInt(currentCode.split("-")[1], 10);
    const nextNumericPart = (numericPart + 1).toString().padStart(3, "0");
    return `EMP-${nextNumericPart}`;
  } else {
    return "EMP-001";
  }
}

export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);
    const payload = await request.json();

    const empCode = await generateNextEmployeeCode();
    const employee = new Employee({ ...payload, empCode });
    const result = await employee.save();

    return NextResponse.json({ result, success: true });
  } catch (error) {
    return NextResponse.error("Internal Server Error", 500);
  }
}
