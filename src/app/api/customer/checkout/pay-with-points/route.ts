// import { OrderModel } from './../../../../../models/Order';
// import { PromoModel } from './../../../../../models/Promo';
// import { CartModel } from './../../../../../models/Cart';
// import { UserModel } from './../../../../../models/User';
// import { connectDB } from '@/lib/connectDB';
 
// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
 
// import { Types } from "mongoose";
// import { ProductModel } from '../../../../../models/Product';

// type UserAddressRow = {
//   _id: Types.ObjectId;
//   fullName: string;
//   address: string;
//   state: string;
//   postalCode: string;
// };

// type ProductRow = {
//   _id: Types.ObjectId;
//   price: number;
//   salePercentage: number;
//   stock: number;
//   status: "active" | "inactive";
// };

// type PromoRow = {
//   code: string;
//   percentage: number;
//   count: number;
//   minimumOrderValue: number;
//   startsAt: Date;
//   endsAt: Date;
// };

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

// // POST /api/customer/checkout/pay-with-points
// export async function POST(req: NextRequest) {
//  await connectDB()

//   const auth = getAuthUser(req);
//   if (auth.error) {
//     return NextResponse.json(
//       { status: "error", message: auth.error },
//       { status: auth.status }
//     );
//   }

//   try {
//     const body = await req.json();
//     const addressId = String(body.addressId || "").trim();
//     const promoCode = String(body.promoCode || "").trim().toUpperCase();

//     if (!addressId) {
//       return NextResponse.json(
//         { status: "error", message: "Address is required" },
//         { status: 400 }
//       );
//     }

//     const userId = auth.decoded.id;

//     const [user, cart] = await Promise.all([
//       UserModel.findById(userId).select("username email addresses points").lean(),
//       CartModel.findOne({ user: userId }).select("items").lean(),
//     ]);

//     if (!user) {
//       return NextResponse.json(
//         { status: "error", message: "User not found" },
//         { status: 404 }
//       );
//     }

//     if (!cart || !(cart as any).items?.length) {
//       return NextResponse.json(
//         { status: "error", message: "Cart is empty" },
//         { status: 400 }
//       );
//     }

//     const addresses = (user as any).addresses as UserAddressRow[];
//     const selectedAddress = addresses.find(
//       (item) => String(item._id) === addressId
//     );

//     if (!selectedAddress) {
//       return NextResponse.json(
//         { status: "error", message: "Address not found" },
//         { status: 404 }
//       );
//     }

//     const cartItems = (cart as any).items;

//     const products = await ProductModel.find({
//       _id: { $in: cartItems.map((item: any) => item.product) },
//     })
//       .select("price salePercentage stock status")
//       .lean<ProductRow[]>();

//     const productMap = new Map(
//       products.map((item) => [String(item._id), item])
//     );

//     let totalItems = 0;
//     let subTotal = 0;

//     const orderItems = cartItems.map((cartItem: any) => {
//       const product = productMap.get(String(cartItem.product));

//       if (!product || product.status !== "active") {
//         throw new Error("One or more cart items are not available");
//       }

//       if (product.stock < cartItem.quantity) {
//         throw new Error("Cart items are out of stock");
//       }

//       const finalPrice = product.salePercentage
//         ? Math.round(product.price - (product.price * product.salePercentage) / 100)
//         : product.price;

//       totalItems += cartItem.quantity;
//       subTotal += finalPrice * cartItem.quantity;

//       return { product: cartItem.product, quantity: cartItem.quantity };
//     });

//     let appliedPromoCode = "";
//     let discountAmount = 0;

//     if (promoCode) {
//       const promo = await PromoModel.findOne({ code: promoCode })
//         .select("code percentage count minimumOrderValue startsAt endsAt")
//         .lean<PromoRow | null>();

//       if (!promo) {
//         return NextResponse.json(
//           { status: "error", message: "Promo not found" },
//           { status: 404 }
//         );
//       }

//       const now = new Date();

//       if (now < promo.startsAt || now > promo.endsAt || promo.count < 1) {
//         return NextResponse.json(
//           { status: "error", message: "Promo code is not active" },
//           { status: 400 }
//         );
//       }

//       if (subTotal < promo.minimumOrderValue) {
//         return NextResponse.json(
//           { status: "error", message: "Minimum order value not met" },
//           { status: 400 }
//         );
//       }

//       appliedPromoCode = promo.code;
//       discountAmount = Math.round((subTotal * promo.percentage) / 100);
//     }

//     const totalAmount = Math.max(subTotal - discountAmount, 0);
//     const userPoints = (user as any).points || 0;

//     if (totalAmount > userPoints) {
//       return NextResponse.json(
//         { status: "error", message: "Not enough points for this order" },
//         { status: 400 }
//       );
//     }

//     // points deduct karo
//     const deducted = await UserModel.updateOne(
//       { _id: userId, points: { $gte: totalAmount } },
//       { $inc: { points: -totalAmount } }
//     );

//     if (!deducted.matchedCount) {
//       return NextResponse.json(
//         { status: "error", message: "Not enough points for this order" },
//         { status: 400 }
//       );
//     }

//     try {
//       // stock kam karo
//       for (const item of orderItems) {
//         const updated = await ProductModel.updateOne(
//           { _id: item.product, stock: { $gte: item.quantity } },
//           { $inc: { stock: -item.quantity } }
//         );

//         if (!updated.matchedCount) {
//           throw new Error("One or more cart items are out of stock");
//         }
//       }

//       // promo count kam karo
//       if (appliedPromoCode) {
//         await PromoModel.updateOne(
//           { code: appliedPromoCode, count: { $gt: 0 } },
//           { $inc: { count: -1 } }
//         );
//       }

//       // cart clear karo
//       await CartModel.updateOne({ user: userId }, { $set: { items: [] } });

//       const pointsPaymentId = `points_${Date.now()}`;

//       const deliveryAddress = [
//         selectedAddress.address,
//         selectedAddress.state,
//         selectedAddress.postalCode,
//       ]
//         .filter(Boolean)
//         .join(", ");

//       const order = await OrderModel.create({
//         user: userId,
//         customerName: (user as any).username || selectedAddress.fullName,
//         customerEmail: (user as any).email || "",
//         items: orderItems,
//         totalItems,
//         deliveryName: selectedAddress.fullName,
//         deliveryAddress,
//         promoCode: appliedPromoCode,
//         discountAmount,
//         totalAmount,
//         paymentStatus: "paid",
//         orderStatus: "placed",
//         stripePaymentIntentId: pointsPaymentId,
//         paymentId: pointsPaymentId,
//         paidAt: new Date(),
//       });

//       const updatedUser = await UserModel.findById(userId)
//         .select("points")
//         .lean() as { points: number } | null;

//       return NextResponse.json({
//         status: "success",
//         data: {
//           _id: String(order._id),
//           totalPoints: updatedUser?.points || 0,
//         },
//       });
//     } catch (error: any) {
//       // points wapas karo agar kuch fail ho
//       await UserModel.updateOne(
//         { _id: userId },
//         { $inc: { points: totalAmount } }
//       );
//       throw error;
//     }
//   } catch (err: any) {
//     return NextResponse.json(
//       { status: "error", message: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }









import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 
import { UserModel } from "@/models/User";
import { CartModel } from "@/models/Cart";
import { ProductModel } from "@/models/Product";
import { PromoModel } from "@/models/Promo";
import { OrderModel } from "@/models/Order";
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

export async function POST(req: NextRequest) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });

  try {
    const body = await req.json();
    const addressId = String(body.addressId || "").trim();
    const promoCode = String(body.promoCode || "").trim().toUpperCase();

    if (!addressId) return NextResponse.json({ status: "error", message: "Address is required" }, { status: 400 });

    const userId = auth.decoded.id;

    const [user, cart] = await Promise.all([
      UserModel.findById(userId).select("username email addresses points").lean(),
      CartModel.findOne({ user: userId }).select("items").lean(),
    ]);

    if (!user) return NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });
    if (!cart || !(cart as any).items?.length) return NextResponse.json({ status: "error", message: "Cart is empty" }, { status: 400 });

    const addresses = (user as any).addresses;
    const selectedAddress = addresses.find((a: any) => String(a._id) === addressId);
    if (!selectedAddress) return NextResponse.json({ status: "error", message: "Address not found" }, { status: 404 });

    const cartItems = (cart as any).items;

    const products = await ProductModel.find({
      _id: { $in: cartItems.map((item: any) => item.product) },
    }).select("price salePercentage stock status").lean();

    const productMap = new Map(products.map((p: any) => [String(p._id), p]));

    let totalItems = 0;
    let subTotal = 0;
    const orderItems: any[] = [];

    for (const cartItem of cartItems) {
      const product: any = productMap.get(String(cartItem.product));
      if (!product || product.status !== "active") return NextResponse.json({ status: "error", message: "One or more items unavailable" }, { status: 400 });
      if (product.stock < cartItem.quantity) return NextResponse.json({ status: "error", message: "Item out of stock" }, { status: 400 });

      const finalPrice = product.salePercentage
        ? Math.round(product.price - (product.price * product.salePercentage) / 100)
        : product.price;

      totalItems += cartItem.quantity;
      subTotal += finalPrice * cartItem.quantity;
      orderItems.push({ product: cartItem.product, quantity: cartItem.quantity });
    }

    let appliedPromoCode = "";
    let discountAmount = 0;

    if (promoCode) {
      const promo: any = await PromoModel.findOne({ code: promoCode }).lean();
      if (!promo) return NextResponse.json({ status: "error", message: "Promo not found" }, { status: 404 });

      const now = new Date();
      if (now < promo.startsAt || now > promo.endsAt || promo.count < 1)
        return NextResponse.json({ status: "error", message: "Promo not active" }, { status: 400 });

      if (subTotal < promo.minimumOrderValue)
        return NextResponse.json({ status: "error", message: "Minimum order value not met" }, { status: 400 });

      appliedPromoCode = promo.code;
      discountAmount = Math.round((subTotal * promo.percentage) / 100);
    }

    const totalAmount = Math.max(subTotal - discountAmount, 0);
    const userPoints = (user as any).points || 0;

    if (totalAmount > userPoints) {
      return NextResponse.json({ status: "error", message: "Not enough points" }, { status: 400 });
    }

    // points deduct karo
    const deducted = await UserModel.updateOne(
      { _id: userId, points: { $gte: totalAmount } },
      { $inc: { points: -totalAmount } }
    );

    if (!deducted.matchedCount) {
      return NextResponse.json({ status: "error", message: "Not enough points" }, { status: 400 });
    }

    try {
      // stock kam karo
      for (const item of orderItems) {
        const updated = await ProductModel.updateOne(
          { _id: item.product, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } }
        );
        if (!updated.matchedCount) throw new Error("One or more cart items are out of stock");
      }

      // promo count kam karo
      if (appliedPromoCode) {
        await PromoModel.updateOne(
          { code: appliedPromoCode, count: { $gt: 0 } },
          { $inc: { count: -1 } }
        );
      }

      // cart clear karo
      await CartModel.updateOne({ user: userId }, { $set: { items: [] } });

      const pointsPaymentId = `points_${Date.now()}`;
      const deliveryAddress = [selectedAddress.address, selectedAddress.state, selectedAddress.postalCode]
        .filter(Boolean).join(", ");

      // order banao — directly paid
      const order = await OrderModel.create({
        user: userId,
        customerName: (user as any).username || selectedAddress.fullName,
        customerEmail: (user as any).email || "",
        items: orderItems,
        totalItems,
        deliveryName: selectedAddress.fullName,
        deliveryAddress,
        promoCode: appliedPromoCode,
        discountAmount,
        totalAmount,
        paymentStatus: "paid", // 👈 directly paid
        orderStatus: "placed",
        stripePaymentIntentId: pointsPaymentId, // 👈 points id
        paymentId: pointsPaymentId,
        paidAt: new Date(),
      });

      const updatedUser = await UserModel.findById(userId).select("points").lean();

      return NextResponse.json({
        status: "success",
        data: {
          _id: String(order._id),
          totalPoints: (updatedUser as any)?.points || 0,
        },
      });

    } catch (err: any) {
      // points wapas karo agar kuch fail hua
      await UserModel.updateOne({ _id: userId }, { $inc: { points: totalAmount } });
      throw err;
    }

  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err.message || "Something went wrong" }, { status: 500 });
  }
}