import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/connectDB";
import { UserModel } from "@/models/User";
import { OrderModel } from "@/models/Order";
import { ProductModel } from "@/models/Product";

const ALLOWED_ORDER_STATUSES = ["placed", "shipped", "delivered", "returned"] as const;
type AdminOrderStatus = (typeof ALLOWED_ORDER_STATUSES)[number];

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  const { id: orderId } = await params;
  if (!orderId) return NextResponse.json({ message: "Order id is required" }, { status: 400 });

  const body = await req.json();
  const orderStatus = String(body.orderStatus || "").trim() as AdminOrderStatus;

  if (!orderStatus) return NextResponse.json({ message: "orderStatus is required" }, { status: 400 });
  if (!ALLOWED_ORDER_STATUSES.includes(orderStatus)) return NextResponse.json({ message: "Invalid order status" }, { status: 400 });

  const order = await OrderModel.findById(orderId);
  if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

  // returned → stock wapas karo
  if (orderStatus === "returned" && order.orderStatus !== "returned") {
    for (const item of order.items) {
      await ProductModel.updateOne(
        { _id: item.product },
        { $inc: { stock: item.quantity } }
      );
    }
  }

  // delivered → deliveredAt set karo
  if (orderStatus === "delivered" && !order.deliveredAt) {
    order.deliveredAt = new Date();


     // 👇 ye add karo
  await UserModel.updateOne(
    { _id: order.user },
    { $inc: { points: Math.floor(order.totalAmount * 0.10) } }
  );
  }

  order.orderStatus = orderStatus;
  await order.save();

  return NextResponse.json({
    _id: String(order._id),
    orderStatus: order.orderStatus,
    deliveredAt: order.deliveredAt ?? null,
    returnedAt: order.returnedAt ?? null,
  });
}