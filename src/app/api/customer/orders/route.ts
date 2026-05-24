
// app/api/customer/orders/route.ts

import { NextRequest, NextResponse } from "next/server";
 
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";
import { getAuthUser } from "@/lib/auth";


 




export async function GET(req: NextRequest) {
  await connectDB();

 const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    const userId = (auth.decoded as { id: string }).id;

    // ← Expired pending orders cancel karo pehle
    await OrderModel.updateMany(
      {
        user: userId,
        paymentStatus: "pending",
        orderStatus: "placed",
        expiresAt: { $lt: new Date() },
      },
      {
        $set: {
          orderStatus: "cancelled",
          paymentStatus: "failed",
        },
      }
    );

    const orders = await OrderModel.find({ user: userId })
      .select("totalItems totalAmount paymentStatus orderStatus paidAt deliveredAt createdAt expiresAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      items: orders.map((order: any) => ({
        _id: String(order._id),
        code: String(order._id).slice(-8).toUpperCase(),
        totalItems: order.totalItems,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        paidAt: order.paidAt ?? null,
        deliveredAt: order.deliveredAt ?? null,
        createdAt: order.createdAt,
        expiresAt: order.expiresAt ?? null,
      })),
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}