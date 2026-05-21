
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { connectDB } from "@/lib/connectDB";
// import { OrderModel } from "@/models/Order";
// import { PromoModel } from "@/models/Promo";
 

 

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// function getOrderQuery(session: Stripe.Checkout.Session) {
//   return {
//     $or: [
//       { stripeSessionId: session.id },
//       { _id: session.metadata?.orderId },
//     ],
//   };
// }

// export async function POST(req: NextRequest) {
//   const body = await req.text();
//   const sig = req.headers.get("stripe-signature")!;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch {
//     return NextResponse.json(
//       { message: "Invalid signature" },
//       { status: 400 }
//     );
//   }

//   await connectDB();

//   // =========================
//   // 🟢 PAYMENT SUCCESS
//   // =========================
// // 🟢 PAYMENT SUCCESS
// if (event.type === "checkout.session.completed") {
//   const session = event.data.object as Stripe.Checkout.Session;

//   if (session.payment_status !== "paid") {
//     return NextResponse.json({ received: true });
//   }

//   const order = await OrderModel.findOne({
//     ...getOrderQuery(session),
//     paymentStatus: "pending",
//   });

//   if (!order) return NextResponse.json({ received: true });

//   // idempotent guard
//   if (order.paymentStatus === "paid") {
//     return NextResponse.json({ received: true });
//   }

//   // ✅ SAFE PROMO DECREMENT (NO extra field needed)
//   if (order.promoCode) {
//     const alreadyProcessed = (order as any).promoDecremented;

//     if (!alreadyProcessed) {
//       await PromoModel.updateOne(
//         { code: order.promoCode },
//         { $inc: { count: -1 } }
//       );

//       // mark internally (no schema required if not strict)
//       (order as any).promoDecremented = true;
//     }
//   }

//   order.paymentStatus = "paid";
//   order.orderStatus = "placed";
//   order.paidAt = new Date();
//   order.paymentId = session.payment_intent as string;

//   await order.save();

//   console.log("✅ ORDER PAID:", order._id);
// }

//   // =========================
//   // 🔴 SESSION EXPIRED
//   // =========================
// if (event.type === "checkout.session.expired") {
//   const session = event.data.object as Stripe.Checkout.Session;

//   const order = await OrderModel.findOne({
//     ...getOrderQuery(session),
//     paymentStatus: "pending",
//   });

//   if (!order) return NextResponse.json({ received: true });

//   if (order.paymentStatus !== "pending") {
//     return NextResponse.json({ received: true });
//   }

//   order.paymentStatus = "failed";
//   order.orderStatus = "cancelled"; // ✅ FIXED
//   order.updatedAt = new Date();

//   await order.save();

//   console.log("⛔ ORDER EXPIRED:", order._id);
// }

//   return NextResponse.json({ received: true });
// }
 








// ye hai webhooks
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";
import { PromoModel } from "@/models/Promo";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function getOrderQuery(session: Stripe.Checkout.Session) {
  return {
    $or: [
      { stripeSessionId: session.id },
      { _id: session.metadata?.orderId },
    ],
  };
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ message: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  await connectDB();

  // ── Payment success ───────────────────────────────────────────────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    const order = await OrderModel.findOne({
      ...getOrderQuery(session),
      paymentStatus: "pending",
    });

    if (!order) return NextResponse.json({ received: true });
    if (order.paymentStatus === "paid") return NextResponse.json({ received: true }); // idempotent

    // Promo count decrement
    if (order.promoCode) {
      await PromoModel.updateOne(
        { code: order.promoCode, count: { $gt: 0 } },
        { $inc: { count: -1 } }
      );
    }

    order.paymentStatus = "paid";
    order.orderStatus   = "placed";
    order.paidAt        = new Date();
    order.paymentId     = session.payment_intent as string;
    await order.save();

    console.log("✅ ORDER PAID:", String(order._id));
  }

  // ── Session expired ───────────────────────────────────────────────────────
  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;

    const order = await OrderModel.findOne({
      ...getOrderQuery(session),
      paymentStatus: "pending",
    });

    if (!order) return NextResponse.json({ received: true });
    if (order.paymentStatus !== "pending") return NextResponse.json({ received: true }); // idempotent

    // ✅ "cancelled" — schema mein enum mein add kiya hai
    order.paymentStatus = "failed";
    order.orderStatus   = "cancelled";
    await order.save();

    console.log("⛔ ORDER EXPIRED → cancelled:", String(order._id));
  }

  return NextResponse.json({ received: true });
}