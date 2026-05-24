import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";
import { PromoModel } from "@/models/Promo";
import { CartModel } from "@/models/Cart";
import { getAuthUser } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  await connectDB();

   const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  try {
    const body = await req.json();
    const sessionId = String(body.sessionId || "").trim();

    if (!sessionId)
      return NextResponse.json(
        { message: "Session id required" },
        { status: 400 }
      );

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { message: "Payment not completed" },
        { status: 400 }
      );
    }

    const order = await OrderModel.findOne({
      stripePaymentIntentId: sessionId,
    });

    if (!order)
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );

    // ✅ Already paid hai toh skip karo — idempotent
    if (order.paymentStatus === "paid") {
      return NextResponse.json({
        status: "success",
        data: { _id: String(order._id) },
      });
    }

    // ✅ Stock decrease NAHI karna — create-session mein already ho chuka

    // Promo count kam karo
    if (order.promoCode) {
      await PromoModel.updateOne(
        { code: order.promoCode, count: { $gt: 0 } },
        { $inc: { count: -1 } }
      );
    }

    // Cart clear karo
    await CartModel.updateOne(
      { user: order.user },
      { $set: { items: [] } }
    );

    // Order paid mark karo
    order.paymentStatus = "paid";
    order.paidAt = new Date();
    order.paymentId = session.payment_intent as string;
    await order.save();

    return NextResponse.json({
      status: "success",
      data: { _id: String(order._id) },
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}