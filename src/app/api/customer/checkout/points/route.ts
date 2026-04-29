// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/connectDB";
// import { UserModel } from "@/models/User";

// function getAuthUser(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   if (!token) return { error: "Unauthorized", status: 401 };
//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
//     return { decoded };
//   } catch {
//     return { error: "Invalid token", status: 401 };
//   }
// }

// // GET /api/customer/checkout/points
// export async function GET(req: NextRequest) {
//   await connectDB();

//   const auth = getAuthUser(req);
//   if (auth.error) {
//     return NextResponse.json(
//       { status: "error", message: auth.error },
//       { status: auth.status }
//     );
//   }

//   try {
//     const user = await UserModel.findById(auth.decoded.id)
//       .select("points")
//       .lean() as { points: number } | null;

//     if (!user) {
//       return NextResponse.json(
//         { status: "error", message: "User not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       status: "success",
//       data: { points: user.points || 0 },
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { status: "error", message: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }





import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 
import { UserModel } from "@/models/User";
import { connectDB } from "@/lib/connectDB";

function getAuthUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return { error: "Unauthorized", status: 401 };
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });

  const user = await UserModel.findById(auth.decoded.id).select("points").lean();
  if (!user) return NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });

  return NextResponse.json({ status: "success", data: { points: (user as any).points || 0 } });
}