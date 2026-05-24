// app/api/admin/orders/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";
import { requireAdmin } from "@/lib/auth";


// ─── GET /api/admin/orders ────────────────────────────────────────────────────



export async function GET(req: NextRequest) {
  await connectDB();
  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  const search = req.nextUrl.searchParams.get("search")?.trim();

  const query: Record<string, unknown> = {
    $nor: [{ orderStatus: "cancelled", paymentStatus: "failed" }],
  };

  if (search) {
    query.$or = [
      { customerName: { $regex: search, $options: "i" } },
      { customerEmail: { $regex: search, $options: "i" } },
    ];
  }

  const orders = await OrderModel.find(query)
    .select("customerName customerEmail totalItems totalAmount paymentStatus orderStatus paidAt deliveredAt createdAt")
    .sort({ createdAt: -1 })
    .lean();

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
      createdAt: order.createdAt,
    })),
  });
}