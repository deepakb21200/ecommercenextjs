import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { OrderModel } from "@/models/Order";
import { ProductModel } from "@/models/Product";
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  const { id: orderId } = await params;
  if (!orderId) return NextResponse.json({ message: "Order Id is required" }, { status: 400 });

  const order = await OrderModel.findOne({ _id: orderId, user: auth.decoded.id });
  if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

  if (order.orderStatus !== "delivered" || !order.deliveredAt) {
    return NextResponse.json({ message: "Only delivered orders can be returned" }, { status: 400 });
  }

  const sevenDaysReturnWindowTime = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - new Date(order.deliveredAt).getTime() > sevenDaysReturnWindowTime) {
    return NextResponse.json({ message: "Return window expired" }, { status: 400 });
  }

  for (const item of order.items) {
    await ProductModel.updateOne({ _id: item.product }, { $inc: { stock: item.quantity } });
  }

  await UserModel.updateOne(
    { _id: auth.decoded.id },
    { $inc: { points: order.totalAmount } }
  );

  order.orderStatus = "returned";
  order.returnedAt = new Date();
  await order.save();

  return NextResponse.json({
    _id: String(order._id),
    orderStatus: order.orderStatus,
    returnedAt: order.returnedAt,
  });
}