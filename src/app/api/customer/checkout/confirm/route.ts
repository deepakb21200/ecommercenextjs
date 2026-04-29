import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

import { OrderModel } from "@/models/Order";
import { ProductModel } from "@/models/Product";
import { PromoModel } from "@/models/Promo";
import { CartModel } from "@/models/Cart";
import { connectDB } from "@/lib/connectDB";
 
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

// POST /api/customer/checkout/confirm
export async function POST(req: NextRequest) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json(
      { status: "error", message: auth.error },
      { status: auth.status }
    );
  }

  try {
    const body = await req.json();
    const orderId = String(body.orderId || "").trim();
    const paymentIntentId = String(body.paymentIntentId || "").trim();

    if (!orderId) {
      return NextResponse.json(
        { status: "error", message: "Order id is required" },
        { status: 400 }
      );
    }

    if (!paymentIntentId) {
      return NextResponse.json(
        { status: "error", message: "Payment intent id is required" },
        { status: 400 }
      );
    }

    const userId = auth.decoded.id;

    const order = await OrderModel.findOne({ _id: orderId, user: userId });

    if (!order) {
      return NextResponse.json(
        { status: "error", message: "Order not found" },
        { status: 404 }
      );
    }

    // already paid hai toh direct return karo
    if (order.paymentStatus === "paid") {
      return NextResponse.json({
        status: "success",
        data: { _id: String(order._id) },
      });
    }

    // Stripe se payment intent verify karo
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { status: "error", message: "Payment not completed" },
        { status: 400 }
      );
    }

    if (order.stripePaymentIntentId !== paymentIntentId) {
      return NextResponse.json(
        { status: "error", message: "Payment intent mismatch" },
        { status: 400 }
      );
    }

    // stock kam karo
    for (const item of order.items) {
      const updated = await ProductModel.updateOne(
        { _id: item.product, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } }
      );

      if (!updated.matchedCount) {
        return NextResponse.json(
          { status: "error", message: "One or more cart items are out of stock" },
          { status: 400 }
        );
      }
    }

    // promo use hua toh count kam karo
    if (order.promoCode) {
      await PromoModel.updateOne(
        { code: order.promoCode, count: { $gt: 0 } },
        { $inc: { count: -1 } }
      );
    }

    // cart clear karo
    await CartModel.updateOne({ user: userId }, { $set: { items: [] } });

    // order update karo
    order.paymentStatus = "paid";
    order.paymentId = paymentIntentId;
    order.paidAt = new Date();
    await order.save();

    return NextResponse.json({
      status: "success",
      data: { _id: String(order._id) },
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}