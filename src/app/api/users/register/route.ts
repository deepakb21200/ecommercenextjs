

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { UserModel } from "@/models/User";
// import { connectDB } from "@/lib/connectDB";


// export async function POST(req: Request) {
//   await connectDB();

//   const { username, email, password, role } = await req.json();

//   const existing = await UserModel.findOne({ username });

//   if (existing) {
//     return NextResponse.json(
//       { message: "User already exists" },
//       { status: 400 }
//     );
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await UserModel.create({
//     username,
//     email,
//     password: hashedPassword,
//     role: role || "user", // 👈 admin ya user
//   });

//   return NextResponse.json({
//     message: "User created",
//     user,
//   });
// }








// app/api/users/register/route.ts and ye desktop ke claude ne bheja

// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/connectDB";
// import { UserModel } from "@/models/User";

// export async function POST(req: NextRequest) {
//   await connectDB();

//   const { username, email, password } = await req.json() as {
//     username: string;
//     email: string;
//     password: string;
//   };

//   if (!username || !email || !password) {
//     return NextResponse.json({ message: "All fields required" }, { status: 400 });
//   }

//   const existing = await UserModel.findOne({ username });
//   if (existing) {
//     return NextResponse.json({ message: "User already exists" }, { status: 400 });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await UserModel.create({
//     username,
//     email,
//     password: hashedPassword,
//     role: "user", // ✅ register se hamesha user — admin manually DB se banao
//   });

//   return NextResponse.json({ message: "User created" }, { status: 201 });
// }










import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import { UserModel } from "@/models/User";

export async function POST(req: NextRequest) {
  await connectDB();

  const { username, email, password } = await req.json() as {
    username: string;
    email: string;
    password: string;
  };

  if (!username || !email || !password) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  const existing = await UserModel.findOne({ $or: [{ username }, { email }] });
  if (existing) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.create({
    username,
    email,
    password: hashedPassword,
    role: "user",
  });

  return NextResponse.json({ message: "User created" }, { status: 201 });
}