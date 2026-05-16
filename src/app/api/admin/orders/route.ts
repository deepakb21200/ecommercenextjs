import { connectDB } from "@/lib/connectDB";
import { OrderModel } from './../../../../models/Order';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 
import { Types } from "mongoose";

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return { error: "Unauthorized", status: 401 };
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    if (decoded.role !== "admin") return { error: "Admin access only", status: 403 };

    console.log("done");
    
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

type AdminOrderRow = {
  _id: Types.ObjectId;
  customerName: string;
  customerEmail: string;
  totalItems: number;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  paidAt?: Date | null;
  deliveredAt?: Date | null;
  returnedAt?: Date | null;
  createdAt: Date;
};
 
export async function GET(req: NextRequest) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  const orders = await OrderModel.find()
    .select("customerName customerEmail totalItems totalAmount paymentStatus orderStatus paidAt deliveredAt returnedAt createdAt")
    .sort({ createdAt: -1 })
    .lean<AdminOrderRow[]>();

  return NextResponse.json({
    items: orders.map((order) => ({
      _id: String(order._id),
      code: String(order._id).slice(-8).toUpperCase(),
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      totalItems: order.totalItems,
      totalAmount: order.totalAmount,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      paidAt: order.paidAt ?? null,
      deliveredAt: order.deliveredAt ?? null,
      returnedAt: order.returnedAt ?? null,
      createdAt: order.createdAt,
    })),
  });
}