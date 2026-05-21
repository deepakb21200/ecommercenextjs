// ye hai create sessison ka route.ts
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

export async function POST(req: NextRequest) {
  await connectDB();

  const auth = getAuthUser(req);

  if (auth.error) {
    return NextResponse.json(
      {
        status: "error",
        message: auth.error,
      },
      {
        status: auth.status,
      }
    );
  }

  try {
    const body = await req.json();

    const addressId = String(body.addressId || "").trim();
    const promoCode = String(body.promoCode || "")
      .trim()
      .toUpperCase();

    const userId = auth.decoded.id;

    const [user, cart] = await Promise.all([
      UserModel.findById(userId).lean(),
      CartModel.findOne({ user: userId }).lean(),
    ]);

    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    if (!cart || !(cart as any).items?.length) {
      return NextResponse.json(
        {
          status: "error",
          message: "Cart is empty",
        },
        {
          status: 400,
        }
      );
    }

    const selectedAddress = (user as any).addresses?.find(
      (address: any) => String(address._id) === addressId
    );

    if (!selectedAddress) {
      return NextResponse.json(
        {
          status: "error",
          message: "Address not found",
        },
        {
          status: 404,
        }
      );
    }

    const cartItems = (cart as any).items;

    const products = await ProductModel.find({
      _id: {
        $in: cartItems.map((item: any) => item.product),
      },
    }).lean();

    const productMap = new Map(
      products.map((product: any) => [
        String(product._id),
        product,
      ])
    );

    let totalItems = 0;
    let subTotal = 0;

    const orderItems: any[] = [];

    // Stripe line item ke liye temporary data
    const tempItems: {
      name: string;
      quantity: number;
      lineTotal: number;
    }[] = [];

    // ================= CALCULATE SUBTOTAL =================
    for (const cartItem of cartItems) {
      const product: any = productMap.get(
        String(cartItem.product)
      );

      if (!product || product.status !== "active") {
        return NextResponse.json(
          {
            status: "error",
            message: "Item unavailable",
          },
          {
            status: 400,
          }
        );
      }

      // Product sale price
      const finalPrice = product.salePercentage
        ? Math.round(
          product.price -
          (product.price * product.salePercentage) / 100
        )
        : product.price;

      const lineTotal =
        finalPrice * cartItem.quantity;

      totalItems += cartItem.quantity;
      subTotal += lineTotal;

      orderItems.push({
        product: cartItem.product,
        quantity: cartItem.quantity,
      });

      tempItems.push({
        name: product.title,
        quantity: cartItem.quantity,
        lineTotal,
      });
    }

    // ================= APPLY PROMO =================
    let discountAmount = 0;
    let appliedPromoCode = "";

    if (promoCode) {
      const promo: any = await PromoModel.findOne({
        code: promoCode,
      }).lean();

      if (promo) {
        const now = new Date();

        const isValid =
          now >= promo.startsAt &&
          now <= promo.endsAt &&
          promo.count > 0 &&
          subTotal >= promo.minimumOrderValue;

        if (isValid) {
          appliedPromoCode = promo.code;

          // Same as frontend:
          // Math.round((subTotal * percentage) / 100)
          discountAmount = Math.round(
            (subTotal * promo.percentage) / 100
          );
        }
      }
    }

    // Final amount exactly like frontend
    const totalAmount = Math.max(
      subTotal - discountAmount,
      0
    );

    // ================= STRIPE LINE ITEMS =================
    // IMPORTANT:
    // Frontend subtotal = item.finalPrice * quantity
    // Frontend discount = Math.round(subTotal * percentage / 100)
    // Frontend total = subTotal - discountAmount
    //
    // Stripe me exact same total lane ke liye:
    // 1. Saare products normal price par bhejo
    // 2. Ek negative line item bhejo for discount

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      [];

    // Product line items
    for (const item of tempItems) {
      const unitAmount = Math.round(
        item.lineTotal / item.quantity
      );

      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: unitAmount * 100,
        },
        quantity: item.quantity,
      });
    }

    // Discount as separate negative adjustment
    // Stripe direct negative item support nahi deta,
    // isliye coupon create karenge.
    let discounts:
      | Stripe.Checkout.SessionCreateParams.Discount[]
      | undefined = undefined;

    if (discountAmount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: discountAmount * 100,
        currency: "inr",
        duration: "once",
        name: appliedPromoCode || "Promo Discount",
      });

      discounts = [
        {
          coupon: coupon.id,
        },
      ];
    }

    // ================= DELIVERY ADDRESS =================
    const deliveryAddress = [
      selectedAddress.address,
      selectedAddress.state,
      selectedAddress.postalCode,
    ]
      .filter(Boolean)
      .join(", ");

    const expiresAt = new Date(
      Date.now() + 30 * 60 * 1000
    );

    // ================= CREATE ORDER =================
    const order = await OrderModel.create({
      user: userId,
      customerName:
        (user as any).username ||
        selectedAddress.fullName,
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

      stripeSessionId: "",
      expiresAt,
    });

    // ================= CREATE STRIPE SESSION =================
    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",

        line_items: lineItems,
        discounts,

        expires_at:
          Math.floor(Date.now() / 1000) +
          30 * 60,

        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,

        metadata: {
          orderId: String(order._id),
          userId: String(userId),
        },
      });

    // ================= UPDATE ORDER =================
    await OrderModel.updateOne(
      {
        _id: order._id,
      },
      {
        stripeSessionId: session.id,
        expiresAt: new Date(
          (session.expires_at ?? 0) * 1000
        ),
      }
    );

    // ================= CLEAR CART =================
    await CartModel.updateOne(
      {
        user: userId,
      },
      {
        $set: {
          items: [],
        },
      }
    );

    return NextResponse.json({
      status: "success",
      data: {
        url: session.url,
        orderId: order._id,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "error",
        message:
          err?.message ||
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
