// app/api/admin/orders/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";

// ─── Types ────────────────────────────────────────────────────────────────────

type DecodedToken = { id: string; role: string };

type AuthResult =
  | { decoded: DecodedToken; error?: never; status?: never }
  | { error: string; status: number; decoded?: never };

 

// ─── Auth helper ──────────────────────────────────────────────────────────────

function requireAdmin(req: NextRequest): AuthResult {
  const token = req.cookies.get("token")?.value;
  if (!token) return { error: "Unauthorized", status: 401 };

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY!) as DecodedToken;
    if (decoded.role !== "admin") return { error: "Admin access only", status: 403 };
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

// ─── GET /api/admin/orders ────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  const orders = await OrderModel.find({
  $nor: [
    { orderStatus: "cancelled", paymentStatus: "failed" }
  ]
})
    .select("customerName customerEmail totalItems totalAmount paymentStatus orderStatus paidAt deliveredAt createdAt")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({
    items: orders.map((order) => ({
      _id:           String(order._id),
      code:          String(order._id).slice(-8).toUpperCase(),
      customerName:  order.customerName,
      customerEmail: order.customerEmail,
      totalItems:    order.totalItems,
      totalAmount:   order.totalAmount,
      paymentStatus: order.paymentStatus,
      orderStatus:   order.orderStatus,
      paidAt:        order.paidAt ?? null,
      deliveredAt:   order.deliveredAt ?? null,
      createdAt:     order.createdAt,
    })),
  });
}