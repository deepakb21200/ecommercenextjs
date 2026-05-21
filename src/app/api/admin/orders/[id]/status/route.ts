// // ${BASE_URL}/orders/${orderId}/status`

// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/connectDB";
 
// import { OrderModel } from "@/models/Order";
 

// const ALLOWED_ORDER_STATUSES = [
//   "placed",
//   "shipped",
//   "delivered",
 
// ] as const;

// type AdminOrderStatus = (typeof ALLOWED_ORDER_STATUSES)[number];

// function requireAdmin(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) return { error: "Unauthorized", status: 401 };

//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_KEY!);

//     if (decoded.role !== "admin") {
//       return { error: "Admin access only", status: 403 };
//     }

//     return { decoded };
//   } catch {
//     return { error: "Invalid token", status: 401 };
//   }
// }

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   await connectDB();

//   const auth = requireAdmin(req);
//   if (auth.error) {
//     return NextResponse.json(
//       { message: auth.error },
//       { status: auth.status }
//     );
//   }

//   const { id: orderId } = await params;

//   if (!orderId) {
//     return NextResponse.json(
//       { message: "Order id is required" },
//       { status: 400 }
//     );
//   }

//   const body = await req.json();
//   const orderStatus = String(body.orderStatus || "").trim() as AdminOrderStatus;

//   if (!orderStatus) {
//     return NextResponse.json(
//       { message: "orderStatus is required" },
//       { status: 400 }
//     );
//   }

//   if (!ALLOWED_ORDER_STATUSES.includes(orderStatus)) {
//     return NextResponse.json(
//       { message: "Invalid order status" },
//       { status: 400 }
//     );
//   }

//   const order = await OrderModel.findById(orderId);

//   if (!order) {
//     return NextResponse.json(
//       { message: "Order not found" },
//       { status: 404 }
//     );
//   }
//   if (order.orderStatus === orderStatus) {
//   return NextResponse.json(
//     { message: "Order already in this status" },
//     { status: 400 }
//   );
// }
 

//   // ─────────────────────────────────────────────
//   // 🚚 DELIVERED LOGIC
//   // ─────────────────────────────────────────────
//   if (orderStatus === "delivered" && !order.deliveredAt) {
//     order.deliveredAt = new Date();
//   }

//   // ─────────────────────────────────────────────
//   // 📝 UPDATE STATUS
//   // ─────────────────────────────────────────────
//   order.orderStatus = orderStatus;

//   await order.save();

//   return NextResponse.json({
//     _id: String(order._id),
//     orderStatus: order.orderStatus,
//     deliveredAt: order.deliveredAt ?? null,
     
//   });
// }













// app/api/admin/orders/[id]/status/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";

// ─── Types ────────────────────────────────────────────────────────────────────

type DecodedToken = { id: string; role: string };

type AuthResult =
  | { decoded: DecodedToken; error?: never; status?: never }
  | { error: string; status: number; decoded?: never };

// Admin sirf yeh 3 set kar sakta hai — cancelled webhook se hota hai
const ALLOWED_STATUSES = ["placed", "shipped", "delivered"] as const;
type AdminOrderStatus = (typeof ALLOWED_STATUSES)[number];

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
  if (orderStatus === "delivered" && !order.deliveredAt) {
    order.deliveredAt = new Date();
  }

  order.orderStatus = orderStatus;
  await order.save();

  return NextResponse.json({
    _id:         String(order._id),
    orderStatus: order.orderStatus,
    deliveredAt: order.deliveredAt ?? null,
  });
}