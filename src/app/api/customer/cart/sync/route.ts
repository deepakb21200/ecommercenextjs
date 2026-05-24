import { NextRequest, NextResponse } from "next/server";
 
import { connectDB } from "@/lib/connectDB";
import { CartItem, CartModel } from "@/models/Cart";
import { ProductModel } from "@/models/Product";
import { getAuthUser } from "@/lib/auth";
 
 
// helper
function isSameCartItem(
  item: any,
  productId: string,
  color?: string,
  size?: string
) {
  return (
    String(item.product) === productId &&
    (item.color || "") === (color || "") &&
    (item.size || "") === (size || "")
  );
}



export async function POST(req: NextRequest) {
  await connectDB();

 const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  const userId = auth.decoded!.id;

  console.log(userId ,"sdfs", typeof userId,auth.decoded);

  const body = await req.json();
  const incomingItems = Array.isArray(body.items) ? body.items : [];

  let cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    cart = await CartModel.create({
      user: userId,
      items: [],
    });
  }

  for (const rawItem of incomingItems) {
    const productId = String(rawItem.productId || "").trim();
    const quantity = Number(rawItem.quantity || 0);
    const color = String(rawItem.color || "").trim();
    // const size = String(rawItem.size || "").trim();
    const size = rawItem.size || undefined;

    if (!productId || quantity < 1) continue;

    const product = await ProductModel.findOne({
      _id: productId,
      status: "active",
    });

    if (!product || product.stock < 1) continue;

    const itemIndex = cart.items.findIndex((item: CartItem) =>
      isSameCartItem(item, productId, color, size)
    );

    if (itemIndex >= 0) {
      const nextQty = cart.items[itemIndex].quantity + quantity;

      cart.items[itemIndex].quantity = Math.min(
        nextQty,
        product.stock
      );
    } else {
      cart.items.push({
        product: product._id,
        quantity: Math.min(quantity, product.stock),
        color,
        size,
      });
    }
  }

  await cart.save();

 
return NextResponse.json({
  data: {
    items: cart.items,
    totalQuantity: cart.items.reduce((sum: number, i: any) => sum + i.quantity, 0),
  },
});

}