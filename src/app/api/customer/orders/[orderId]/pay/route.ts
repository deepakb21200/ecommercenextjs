  // /api/customer/orders/[orderId]/pay/route.ts


import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  await connectDB();

  const { orderId } = await params; // ✅ FIX HERE

  const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    console.log("ORDER ID:", orderId);
    console.log("USER ID:", auth.decoded.id);

    const order = await OrderModel.findOne({
      _id: orderId,
      user: auth.decoded.id,
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (
      order.expiresAt &&
      new Date(order.expiresAt).getTime() < Date.now()
    ) {
      order.paymentStatus = "failed";
      await order.save();

      return NextResponse.json(
        { message: "Payment session expired. Please place a new order." },
        { status: 400 }
      );
    }

 if (
  order.paymentStatus !== "pending" ||
  order.orderStatus !== "placed"
) {
  return NextResponse.json(
    { message: "Order is not payable anymore" },
    { status: 400 }
  );
}

    if (!order.stripeSessionId) {
      return NextResponse.json(
        { message: "No active payment session found" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(
      order.stripeSessionId
    );

    if (!session.url) {
      return NextResponse.json(
        { message: "Payment session expired" },
        { status: 400 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}







 