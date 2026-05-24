import { getAuthUser } from '@/lib/auth';

// ye hai user loggedin and user not lgogged bhi karlega

import { NextRequest, NextResponse } from "next/server";
 

import { PromoModel } from "@/models/Promo";
import { connectDB } from "@/lib/connectDB";

 
// POST /api/customer/promos/apply
 

// POST /api/customer/promos/apply
export async function POST(req: NextRequest) {
  await connectDB();

  const user =    getAuthUser(req);
  if (user.error) {
    return NextResponse.json({ message: user.error }, { status: user.status });
  }


  try {
    const body = await req.json();

    const code = String(body.code || "").trim().toUpperCase();
    const orderValue = Number(body.orderValue);

    // ❌ invalid code
    if (!code) {
      return NextResponse.json(
        { status: "error", message: "Promo code is required" },
        { status: 400 }
      );
    }

   

    if (isNaN(orderValue) || orderValue < 0) {
  return NextResponse.json(
    { status: "error", message: "Valid order value is required" },
    { status: 400 }
  );
}

    const promo = await PromoModel.findOne({ code });

    if (!promo) {
      return NextResponse.json(
        { status: "error", message: "Promo not found" },
        { status: 404 }
      );
    }

    const now = new Date();

    if (now < promo.startsAt) {
      return NextResponse.json(
        { status: "error", message: "Promo not active yet" },
        { status: 400 }
      );
    }

    if (now > promo.endsAt) {
      return NextResponse.json(
        { status: "error", message: "Promo expired" },
        { status: 400 }
      );
    }

    if (promo.count <= 0) {
      return NextResponse.json(
        { status: "error", message: "Promo limit exceeded" },
        { status: 400 }
      );
    }

    if (orderValue < promo.minimumOrderValue) {
      return NextResponse.json(
        {
          status: "error",
          message: `Minimum order value is ${promo.minimumOrderValue}`,
        },
        { status: 400 }
      );
    }

    // ✅ SAFE DISCOUNT CALCULATION (NO FRONTEND NEEDED)
    const discount = Number(
      ((orderValue * promo.percentage) / 100).toFixed(2)
    );

    const finalTotal = Number(
      Math.max(orderValue - discount, 0).toFixed(2)
    );

    return NextResponse.json({
      status: "success",
      data: {
        code: promo.code,
        percentage: promo.percentage,
        discount,
        finalTotal,
        minimumOrderValue: promo.minimumOrderValue,
        isLoggedIn: !!user,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "error",
        message: err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}