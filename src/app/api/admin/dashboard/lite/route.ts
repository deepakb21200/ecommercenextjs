
import { NextRequest, NextResponse } from "next/server";
import { ProductModel } from "@/models/Product";
import { CategoryModel } from "@/models/Category";
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";
import { requireAdmin } from "@/lib/auth";




export async function GET(req: NextRequest) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

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




  return NextResponse.json({
    totalProducts,
    totalCategories,
    totalSales: salesRows[0]?.totalSales || 0,
    totalOrders,

  });
}