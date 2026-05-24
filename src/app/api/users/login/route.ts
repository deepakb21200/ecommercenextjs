
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/connectDB";
// import { UserModel } from "@/models/User";
 

// export async function POST(req: Request) {
//   await connectDB();
 

//   const { username, password } = await req.json();

//   const user = await UserModel.findOne({ username });

//   if (!user) {
//     return NextResponse.json(
//       { message: "Invalid credentials" },
//       { status: 401 }
//     );
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return NextResponse.json(
//       { message: "Invalid credentials" },
//       { status: 401 }
//     );
//   }

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_KEY!,
//     { expiresIn: "7d" }
//   );

//   const res = NextResponse.json({
//     _id: user._id,
//     username: user.username,
//     email: user.email,
//     role: user.role,
//     token,
//   });



//   console.log("token hia ", token )

//   res.cookies.set("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//   });

//   return res;
// }











// app/api/users/login/route.ts and ye desktop ke claude ne bheja 

// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/connectDB";
// import { UserModel } from "@/models/User";

// export async function POST(req: NextRequest) {
//   await connectDB();

//   const { username, password } = await req.json() as {
//     username: string;
//     password: string;
//   };

//   if (!username || !password) {
//     return NextResponse.json({ message: "All fields required" }, { status: 400 });
//   }

//   const user = await UserModel.findOne({ username });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
//   }

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_KEY!,
//     { expiresIn: "7d" }
//   );

//   const res = NextResponse.json({
//     _id:      user._id,
//     username: user.username,
//     email:    user.email,
//     role:     user.role,
//   });

//   // ✅ Cookie set — admin aur user dono ke liye same
//   res.cookies.set("token", token, {
//     httpOnly: true,
//     secure:   process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path:     "/",
//   });

//   return res;
// }





import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import { UserModel } from "@/models/User";

export async function POST(req: NextRequest) {
  await connectDB();

  const { username, password } = await req.json() as { username: string; password: string };

  if (!username || !password) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  const user = await UserModel.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_KEY!,
    { expiresIn: "7d" }
  );

  const res = NextResponse.json({
    _id: String(user._id),
    username: user.username,
    email: user.email,
    role: user.role,
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}