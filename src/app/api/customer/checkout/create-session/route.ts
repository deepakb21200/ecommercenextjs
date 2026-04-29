// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import Stripe from "stripe";
// import { Types } from "mongoose";
// import { connectDB } from "@/lib/connectDB";
// import { CartModel } from "@/models/Cart";
// import { UserModel } from "@/models/User";
// import { ProductModel } from "@/models/Product";
// import { PromoModel } from "@/models/Promo";
// import { OrderModel } from "@/models/Order";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

// // POST /api/customer/checkout/create-session
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
//       UserModel.findById(userId).select("username email addresses").lean(),
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
//         ? Math.round(
//             product.price - (product.price * product.salePercentage) / 100
//           )
//         : product.price;

//       totalItems += cartItem.quantity;
//       subTotal += finalPrice * cartItem.quantity;

//       return {
//         product: cartItem.product,
//         quantity: cartItem.quantity,
//       };
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
//           { status: "error", message: "Minimum order value not met for this promo" },
//           { status: 400 }
//         );
//       }

//       appliedPromoCode = promo.code;
//       discountAmount = Math.round((subTotal * promo.percentage) / 100);
//     }

//     const totalAmount = Math.max(subTotal - discountAmount, 0);

//     const deliveryAddress = [
//       selectedAddress.address,
//       selectedAddress.state,
//       selectedAddress.postalCode,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     // Stripe payment intent banao
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: totalAmount * 100, // stripe paise mein leta hai (paise = rupees * 100)
//       currency: "inr",
//       metadata: {
//         userId: String(userId),
//         addressId,
//       },
//     });

//     const order = await OrderModel.create({
//       user: userId,
//       customerName: (user as any).username || selectedAddress.fullName,
//       customerEmail: (user as any).email || "",
//       items: orderItems,
//       totalItems,
//       deliveryName: selectedAddress.fullName,
//       deliveryAddress,
//       promoCode: appliedPromoCode,
//       discountAmount,
//       totalAmount,
//       paymentStatus: "pending",
//       orderStatus: "placed",
//       stripePaymentIntentId: paymentIntent.id,
//     });

//     return NextResponse.json({
//       status: "success",
//       data: {
//         stripe: {
//           publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
//           clientSecret: paymentIntent.client_secret,
//         },
//         order: {
//           _id: String(order._id),
//           totalItems,
//           discountAmount,
//           totalAmount,
//         },
//       },
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { status: "error", message: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }




// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import Stripe from "stripe";
// import { connectDB } from "@/lib/connectDB";
// import { CartModel } from "@/models/Cart";
// import { UserModel } from "@/models/User";
// import { ProductModel } from "@/models/Product";
// import { PromoModel } from "@/models/Promo";
// import { OrderModel } from "@/models/Order";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

// export async function POST(req: NextRequest) {
//   await connectDB();

//   const auth = getAuthUser(req);
//   if (auth.error) return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });

//   try {
//     const body = await req.json();
//     const addressId = String(body.addressId || "").trim();
//     const promoCode = String(body.promoCode || "").trim().toUpperCase();

//     if (!addressId) return NextResponse.json({ status: "error", message: "Address is required" }, { status: 400 });

//     const userId = auth.decoded.id;

//     const [user, cart] = await Promise.all([
//       UserModel.findById(userId).select("username email addresses points").lean(),
//       CartModel.findOne({ user: userId }).select("items").lean(),
//     ]);

//     if (!user) return NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });
//     if (!cart || !(cart as any).items?.length) return NextResponse.json({ status: "error", message: "Cart is empty" }, { status: 400 });

//     const addresses = (user as any).addresses;
//     const selectedAddress = addresses.find((a: any) => String(a._id) === addressId);
//     if (!selectedAddress) return NextResponse.json({ status: "error", message: "Address not found" }, { status: 404 });

//     const cartItems = (cart as any).items;

//     const products = await ProductModel.find({
//       _id: { $in: cartItems.map((item: any) => item.product) },
//     }).select("title price salePercentage stock status images").lean();

//     const productMap = new Map(products.map((p: any) => [String(p._id), p]));

//     let totalItems = 0;
//     let subTotal = 0;
//     const orderItems: any[] = [];
//     // const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

// // ✅ ye karo
// // const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
// const lineItems: any[] = [];

//     for (const cartItem of cartItems) {
//       const product: any = productMap.get(String(cartItem.product));
//       if (!product || product.status !== "active") throw new Error("One or more items unavailable");
//       if (product.stock < cartItem.quantity) throw new Error("Item out of stock");

//       const finalPrice = product.salePercentage
//         ? Math.round(product.price - (product.price * product.salePercentage) / 100)
//         : product.price;

//       totalItems += cartItem.quantity;
//       subTotal += finalPrice * cartItem.quantity;

//       orderItems.push({ product: cartItem.product, quantity: cartItem.quantity });

//       // 👇 Stripe line items
//       lineItems.push({
//         price_data: {
//           currency: "inr",
//           product_data: { name: product.title },
//           unit_amount: finalPrice * 100, // paise mein
//         },
//         quantity: cartItem.quantity,
//       });
//     }

//     let appliedPromoCode = "";
//     let discountAmount = 0;

//     if (promoCode) {
//       const promo: any = await PromoModel.findOne({ code: promoCode }).lean();
//       if (!promo) return NextResponse.json({ status: "error", message: "Promo not found" }, { status: 404 });

//       const now = new Date();
//       if (now < promo.startsAt || now > promo.endsAt || promo.count < 1)
//         return NextResponse.json({ status: "error", message: "Promo not active" }, { status: 400 });

//       if (subTotal < promo.minimumOrderValue)
//         return NextResponse.json({ status: "error", message: "Minimum order value not met" }, { status: 400 });

//       appliedPromoCode = promo.code;
//       discountAmount = Math.round((subTotal * promo.percentage) / 100);
//     }

//     const totalAmount = Math.max(subTotal - discountAmount, 0);
//     const deliveryAddress = [selectedAddress.address, selectedAddress.state, selectedAddress.postalCode].filter(Boolean).join(", ");

//     // 👇 Order pehle banao
//     const order = await OrderModel.create({
//       user: userId,
//       customerName: (user as any).username || selectedAddress.fullName,
//       customerEmail: (user as any).email || "",
//       items: orderItems,
//       totalItems,
//       deliveryName: selectedAddress.fullName,
//       deliveryAddress,
//       promoCode: appliedPromoCode,
//       discountAmount,
//       totalAmount,
//       paymentStatus: "pending",
//       orderStatus: "placed",
//     });

//     // 👇 Stripe Checkout Session banao
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?orderId=${order._id}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
//       metadata: {
//         orderId: String(order._id),
//         userId: String(userId),
//       },
//     });

//     return NextResponse.json({
//       status: "success",
//       data: {
//         url: session.url, // 👈 redirect URL
//         order: {
//           _id: String(order._id),
//           totalItems,
//           discountAmount,
//           totalAmount,
//         },
//       },
//     });
//   } catch (err: any) {
//       console.error("Stripe error:", err.message, err); // 👈 ye add karo
//     return NextResponse.json({ status: "error", message: err.message || "Something went wrong" }, { status: 500 });
//   }
// }










import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

import { CartModel } from "@/models/Cart";
import { UserModel } from "@/models/User";
import { ProductModel } from "@/models/Product";
import { PromoModel } from "@/models/Promo";
import { OrderModel } from "@/models/Order";
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
    }).select("title price salePercentage stock status").lean();

    const productMap = new Map(products.map((p: any) => [String(p._id), p]));

    let totalItems = 0;
    let subTotal = 0;
    const orderItems: any[] = [];
    const lineItems: any[] = [];

    for (const cartItem of cartItems) {
      const product: any = productMap.get(String(cartItem.product));
      if (!product || product.status !== "active") throw new Error("One or more items unavailable");
      if (product.stock < cartItem.quantity) throw new Error("Item out of stock");

      const finalPrice = product.salePercentage
        ? Math.round(product.price - (product.price * product.salePercentage) / 100)
        : product.price;

      totalItems += cartItem.quantity;
      subTotal += finalPrice * cartItem.quantity;

      orderItems.push({ product: cartItem.product, quantity: cartItem.quantity });

      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: { name: product.title },
          unit_amount: finalPrice * 100,
        },
        quantity: cartItem.quantity,
      });
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
    const deliveryAddress = [selectedAddress.address, selectedAddress.state, selectedAddress.postalCode]
      .filter(Boolean)
      .join(", ");

    // 👇 PEHLE Stripe session banao
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 👈 ye add karo star g
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      metadata: { userId: String(userId) },
    });

    // 👇 PHIR order banao session id ke saath
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
      paymentStatus: "pending",
      orderStatus: "placed",
      stripePaymentIntentId: session.id, // 👈 session id
    });

    return NextResponse.json({
      status: "success",
      data: {
        url: session.url,
        order: {
          _id: String(order._id),
          totalItems,
          discountAmount,
          totalAmount,
        },
      },
    });
  } catch (err: any) {
    console.error("Stripe error:", err.message, err);
    return NextResponse.json({ status: "error", message: err.message || "Something went wrong" }, { status: 500 });
  }
}