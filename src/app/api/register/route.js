import { connectionStr } from "@/lib/db";
import { RagisterData } from "@/lib/model/register";
// import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    let payload = await request.json();
    const { username, email, phone, password } = payload;

    await mongoose.connect(connectionStr);

    // const salt = bcrypt.genSaltSync(12);
    // const hashedpassword = bcrypt.hashSync(password, salt);

    const user = new RagisterData({
      username,
      email,
      phone,
      password,
      // password: hashedpassword,
    });

    const result = await user.save();

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: error.message, success: false });
  } finally {
    mongoose.connection.close();
  }
}
