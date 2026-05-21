
// app/api/customer/orders/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/connectDB";
import { OrderModel } from "@/models/Order";


function getAuthUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

// export async function GET(req: NextRequest) {
//   await connectDB();

//   const auth = getAuthUser(req);

//   console.log("authentication", auth);

//   if (auth.error) {
//     return NextResponse.json(
//       { message: auth.error },
//       { status: auth.status }
//     );
//   }

//   try {
 

//     const orders = await OrderModel.find({ user: auth.decoded.id })
//       .select(
//         "totalItems totalAmount paymentStatus orderStatus paidAt deliveredAt returnedAt createdAt expiresAt"
//       )
//       .sort({ createdAt: -1 })
//       .lean();


//     console.log("This is order get", orders);

//     return NextResponse.json({
//       items: orders.map((order: any) => ({
//         _id: String(order._id),
//         code: String(order._id).slice(-8).toUpperCase(),
//         totalItems: order.totalItems,
//         totalAmount: order.totalAmount,
//         paymentStatus: order.paymentStatus,
//         orderStatus: order.orderStatus,
//         paidAt: order.paidAt,
//         deliveredAt: order.deliveredAt,
//         returnedAt: order.returnedAt,
//         createdAt: order.createdAt,
//         expiresAt: order.expiresAt, // ✅ ADD THIS
//       })),
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { message: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }







export async function GET(req: NextRequest) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    const userId = (auth.decoded as { id: string }).id;

    // ← Expired pending orders cancel karo pehle
    await OrderModel.updateMany(
      {
        user: userId,
        paymentStatus: "pending",
        orderStatus: "placed",
        expiresAt: { $lt: new Date() },
      },
      {
        $set: {
          orderStatus: "cancelled",
          paymentStatus: "failed",
        },
      }
    );

    const orders = await OrderModel.find({ user: userId })
      .select("totalItems totalAmount paymentStatus orderStatus paidAt deliveredAt createdAt expiresAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      items: orders.map((order: any) => ({
        _id: String(order._id),
        code: String(order._id).slice(-8).toUpperCase(),
        totalItems: order.totalItems,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        paidAt: order.paidAt ?? null,
        deliveredAt: order.deliveredAt ?? null,
        createdAt: order.createdAt,
        expiresAt: order.expiresAt ?? null,
      })),
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}