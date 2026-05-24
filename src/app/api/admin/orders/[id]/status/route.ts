

// app/api/admin/orders/[id]/status/route.ts

import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";
import { requireAdmin } from "@/lib/auth";


// Admin sirf yeh 3 set kar sakta hai — cancelled webhook se hota hai
const ALLOWED_STATUSES = ["placed", "shipped", "delivered"] as const;
type AdminOrderStatus = (typeof ALLOWED_STATUSES)[number];


// ─── PATCH /api/admin/orders/[id]/status ─────────────────────────────────────

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  const { id: orderId } = await params;

  if (!orderId) {
    return NextResponse.json({ message: "Order id is required" }, { status: 400 });
  }

  const body = await req.json() as { orderStatus?: string };
  const orderStatus = (body.orderStatus ?? "").trim() as AdminOrderStatus;


  if (!orderStatus) {
    return NextResponse.json({ message: "orderStatus is required" }, { status: 400 });
  }

  if (!ALLOWED_STATUSES.includes(orderStatus)) {
    return NextResponse.json({ message: "Invalid order status" }, { status: 400 });
  }

  const order = await OrderModel.findById(orderId);

  if (!order) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  // ✅ Cancelled orders admin change nahi kar sakta
  if (order.orderStatus === "cancelled") {
    return NextResponse.json({ message: "Cancelled orders cannot be updated" }, { status: 400 });
  }

  if (order.orderStatus === orderStatus) {
    return NextResponse.json({ message: "Order already in this status" }, { status: 400 });
  }

  // ✅ Delivered timestamp
  // if (orderStatus === "delivered" && !order.deliveredAt) {
  //   order.deliveredAt = new Date();
  // }

  if (orderStatus === "delivered") {
    if (!order.deliveredAt) {
      order.deliveredAt = new Date();
    }
  }

  order.orderStatus = orderStatus;
  await order.save();

  return NextResponse.json({
    _id: String(order._id),
    orderStatus: order.orderStatus,
    deliveredAt: order.deliveredAt ?? null,
  });
}