// ye hai  sirf user loggedin me chalega non loggedin user nhi karpayega 

// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
 
// import { PromoModel } from "@/models/Promo";
// import { connectDB } from "@/lib/connectDB";

// function getAuthUser(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   if (!token) return { error: "Unauthorized", status: 401 };
//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
//     return { decoded };
//   } catch {
//     return { error: "Invalid token", status: 401 };
//   }
// }

// // POST /api/customer/promos/apply
// export async function POST(req: NextRequest) {
//   await connectDB();

//   const auth = getAuthUser(req);
//   if (auth.error) {
//     return NextResponse.json(
//       { status: "error", message: auth.error },
//       { status: auth.status }
//     );
//   }

//   try {
//     const body = await req.json();
//     const code = String(body.code || "").trim().toUpperCase();
//     const orderValue = Number(body.orderValue || 0);

//     if (!code) {
//       return NextResponse.json(
//         { status: "error", message: "Promo code is required" },
//         { status: 400 }
//       );
//     }

//     if (isNaN(orderValue) || orderValue < 0) {
//       return NextResponse.json(
//         { status: "error", message: "Valid order value is required" },
//         { status: 400 }
//       );
//     }

//     const promo = await PromoModel.findOne({ code });

//     if (!promo) {
//       return NextResponse.json(
//         { status: "error", message: "Promo not found" },
//         { status: 404 }
//       );
//     }

//     const now = new Date();

//     if (now < promo.startsAt) {
//       return NextResponse.json(
//         { status: "error", message: "Promo code is not activated yet" },
//         { status: 400 }
//       );
//     }

//     if (now > promo.endsAt) {
//       return NextResponse.json(
//         { status: "error", message: "Promo code is expired" },
//         { status: 400 }
//       );
//     }

//     if (promo.count < 1) {
//       return NextResponse.json(
//         { status: "error", message: "Promo code limit exceeded" },
//         { status: 400 }
//       );
//     }

//     if (orderValue < promo.minimumOrderValue) {
//       return NextResponse.json(
//         {
//           status: "error",
//           message: `Minimum order value for this promo is ${promo.minimumOrderValue}`,
//         },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({
//       status: "success",
//       data: {
//         code: promo.code,
//         percentage: promo.percentage,
//         count: promo.count,
//         minimumOrderValue: promo.minimumOrderValue,
//       },
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { status: "error", message: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }








// ye hai user loggedin and user not lgogged bhi karlega

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { PromoModel } from "@/models/Promo";
import { connectDB } from "@/lib/connectDB";

// ✅ OPTIONAL auth (no blocking)
function getAuthUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    return decoded;
  } catch {
    return null;
  }
}

// POST /api/customer/promos/apply
export async function POST(req: NextRequest) {
  await connectDB();

  const user = getAuthUser(req); // 👈 optional

  try {
    const body = await req.json();
    const code = String(body.code || "").trim().toUpperCase();
    const orderValue = Number(body.orderValue || 0);

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
        { status: "error", message: "Promo code is not activated yet" },
        { status: 400 }
      );
    }

    if (now > promo.endsAt) {
      return NextResponse.json(
        { status: "error", message: "Promo code is expired" },
        { status: 400 }
      );
    }

    if (promo.count < 1) {
      return NextResponse.json(
        { status: "error", message: "Promo code limit exceeded" },
        { status: 400 }
      );
    }

    if (orderValue < promo.minimumOrderValue) {
      return NextResponse.json(
        {
          status: "error",
          message: `Minimum order value for this promo is ${promo.minimumOrderValue}`,
        },
        { status: 400 }
      );
    }

    // ✅ calculate preview discount
    const discount = Math.round(
      (orderValue * promo.percentage) / 100
    );
    const finalTotal = Math.max(orderValue - discount, 0);

    return NextResponse.json({
      status: "success",
      data: {
        code: promo.code,
        percentage: promo.percentage,
        discount,
        finalTotal,
        minimumOrderValue: promo.minimumOrderValue,
        isLoggedIn: !!user, // 👈 useful for UI
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}