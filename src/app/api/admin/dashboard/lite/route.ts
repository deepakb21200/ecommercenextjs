

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ProductModel } from "@/models/Product";
import { CategoryModel } from "@/models/Category";
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";


function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return { error: "Unauthorized", status: 401 };
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    if (decoded.role !== "admin") return { error: "Admin access only", status: 403 };
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}


export async function GET(req: NextRequest) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  const [totalProducts, totalCategories, totalOrders, salesRows] =
    await Promise.all([
      ProductModel.countDocuments(),
      CategoryModel.countDocuments(),
      OrderModel.countDocuments({
        paymentStatus: "paid",
      }),
      OrderModel.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } },
      ]),
    ]);

    // console.log("1",totalProducts);
    // console.log("2",totalCategories);
    // console.log("3",totalOrders);
    // console.log("4",salesRows);
    

  return NextResponse.json({
    totalProducts,
    totalCategories,
    totalSales: salesRows[0]?.totalSales || 0,
    totalOrders,

  });
}