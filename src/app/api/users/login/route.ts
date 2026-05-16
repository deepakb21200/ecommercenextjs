
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import { UserModel } from "@/models/User";
 

export async function POST(req: Request) {
  await connectDB();
 

  const { username, password } = await req.json();

  const user = await UserModel.findOne({ username });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_KEY!,
    { expiresIn: "7d" }
  );

  const res = NextResponse.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token,
  });



  console.log("token hia ", token )

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}