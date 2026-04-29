

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserModel } from "@/models/User";
import { connectDB } from "@/lib/connectDB";


export async function POST(req: Request) {
  await connectDB();

  const { username, email, password, role } = await req.json();

  const existing = await UserModel.findOne({ username });

  if (existing) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
    role: role || "user", // 👈 admin ya user
  });

  return NextResponse.json({
    message: "User created",
    user,
  });
}