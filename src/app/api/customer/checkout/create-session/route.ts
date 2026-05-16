import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { connectDB } from "@/lib/connectDB";
import { CartModel } from "@/models/Cart";
import { UserModel } from "@/models/User";
import { ProductModel } from "@/models/Product";
import { PromoModel } from "@/models/Promo";
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

export async function POST(req: NextRequest) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error)
    return NextResponse.json(
      { status: "error", message: auth.error },
      { status: auth.status }
    );

  try {
    const body = await req.json();
    const addressId = String(body.addressId || "").trim();
    const promoCode = String(body.promoCode || "").trim().toUpperCase();

    if (!addressId)
      return NextResponse.json(
        { status: "error", message: "Address is required" },
        { status: 400 }
      );

    const userId = auth.decoded.id;

    const [user, cart] = await Promise.all([
      UserModel.findById(userId)
        .select("username email addresses points")
        .lean(),
      CartModel.findOne({ user: userId }).select("items").lean(),
    ]);

    if (!user)
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    if (!cart || !(cart as any).items?.length)
      return NextResponse.json(
        { status: "error", message: "Cart is empty" },
        { status: 400 }
      );

    const addresses = (user as any).addresses;
    const selectedAddress = addresses.find(
      (a: any) => String(a._id) === addressId
    );
    if (!selectedAddress)
      return NextResponse.json(
        { status: "error", message: "Address not found" },
        { status: 404 }
      );

    const cartItems = (cart as any).items;

    const products = await ProductModel.find({
      _id: { $in: cartItems.map((item: any) => item.product) },
    })
      .select("title price salePercentage stock status")
      .lean();

    const productMap = new Map(
      products.map((p: any) => [String(p._id), p])
    );

    let totalItems = 0;
    let subTotal = 0;
    const orderItems: any[] = [];
    const lineItems: any[] = [];

    // Track karo ki kitne products ka stock reserve ho chuka hai
    // Agar koi fail ho toh rollback kar sakein
    const reservedProducts: { id: string; quantity: number }[] = [];

    for (const cartItem of cartItems) {
      const product: any = productMap.get(String(cartItem.product));

      if (!product || product.status !== "active") {
        // Rollback — jo reserve ho chuke unhe wapas karo
        for (const r of reservedProducts) {
          await ProductModel.updateOne(
            { _id: r.id },
            { $inc: { stock: r.quantity } }
          );
        }
        return NextResponse.json(
          { status: "error", message: "One or more items unavailable" },
          { status: 400 }
        );
      }

      // ✅ Atomic stock decrease — race condition safe
      const updated = await ProductModel.findOneAndUpdate(
        {
          _id: cartItem.product,
          stock: { $gte: cartItem.quantity },
          status: "active",
        },
        { $inc: { stock: -cartItem.quantity } },
        { new: true }
      );

      if (!updated) {
        // Stock nahi tha — rollback
        for (const r of reservedProducts) {
          await ProductModel.updateOne(
            { _id: r.id },
            { $inc: { stock: r.quantity } }
          );
        }
        return NextResponse.json(
          {
            status: "error",
            message: `${product.title} is out of stock`,
          },
          { status: 400 }
        );
      }

      // Reserve track karo
      reservedProducts.push({
        id: String(cartItem.product),
        quantity: cartItem.quantity,
      });

      const finalPrice = product.salePercentage
        ? Math.round(
            product.price - (product.price * product.salePercentage) / 100
          )
        : product.price;

      totalItems += cartItem.quantity;
      subTotal += finalPrice * cartItem.quantity;

      orderItems.push({
        product: cartItem.product,
        quantity: cartItem.quantity,
      });

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
      if (!promo) {
        // Rollback stock
        for (const r of reservedProducts) {
          await ProductModel.updateOne(
            { _id: r.id },
            { $inc: { stock: r.quantity } }
          );
        }
        return NextResponse.json(
          { status: "error", message: "Promo not found" },
          { status: 404 }
        );
      }

      const now = new Date();
      if (now < promo.startsAt || now > promo.endsAt || promo.count < 1) {
        for (const r of reservedProducts) {
          await ProductModel.updateOne(
            { _id: r.id },
            { $inc: { stock: r.quantity } }
          );
        }
        return NextResponse.json(
          { status: "error", message: "Promo not active" },
          { status: 400 }
        );
      }

      if (subTotal < promo.minimumOrderValue) {
        for (const r of reservedProducts) {
          await ProductModel.updateOne(
            { _id: r.id },
            { $inc: { stock: r.quantity } }
          );
        }
        return NextResponse.json(
          { status: "error", message: "Minimum order value not met" },
          { status: 400 }
        );
      }

      appliedPromoCode = promo.code;
      discountAmount = Math.round((subTotal * promo.percentage) / 100);
    }

    const totalAmount = Math.max(subTotal - discountAmount, 0);
    const deliveryAddress = [
      selectedAddress.address,
      selectedAddress.state,
      selectedAddress.postalCode,
    ]
      .filter(Boolean)
      .join(", ");

    // Stripe session banao 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      metadata: { userId: String(userId) },
    });

    // Order banao — stock already reserve ho chuka hai
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
      stripePaymentIntentId: session.id,
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
    return NextResponse.json(
      { status: "error", message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}