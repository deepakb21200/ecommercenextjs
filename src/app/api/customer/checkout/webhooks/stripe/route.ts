import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";
import { ProductModel } from "@/models/Product";
import { PromoModel } from "@/models/Promo";
import { CartModel } from "@/models/Cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return NextResponse.json(
      { message: "Invalid signature" },
      { status: 400 }
    );
  }

  // ✅ Payment success
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      await connectDB();

      const order = await OrderModel.findOne({
        stripePaymentIntentId: session.id,
      });

      // Already paid hai toh skip — idempotent
      if (!order || order.paymentStatus === "paid") {
        return NextResponse.json({ received: true });
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

      console.log("Order paid:", String(order._id));
    }
  }

  // ✅ Session expire — stock wapas karo, order delete karo
  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    await connectDB();

    const order = await OrderModel.findOne({
      stripePaymentIntentId: session.id,
      paymentStatus: "pending",
    });

    if (order) {
      // Stock wapas karo — create-session mein reserve hua tha
      for (const item of order.items) {
        await ProductModel.updateOne(
          { _id: item.product },
          { $inc: { stock: item.quantity } }
        );
      }

      // Pending order delete karo
      await OrderModel.findOneAndDelete({ _id: order._id });

      console.log("Session expired — stock released, order deleted:", String(order._id));
    }
  }

  return NextResponse.json({ received: true });
}