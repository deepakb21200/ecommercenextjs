import { NextRequest, NextResponse } from "next/server";
 
import { CartModel } from "@/models/Cart";
import { ProductModel } from "@/models/Product";
import { connectDB } from "@/lib/connectDB";
import { getAuthUser } from "@/lib/auth";

type ProductPreview = {
  _id: string;
  title: string;
  brand: string;
  price: number;
  salePercentage: number;
  images: Array<{ url: string; isCover?: boolean }>;
};

type CartPreviewItem = {
  product: ProductPreview | null;
  quantity: number;
  color?: string;
  size?: string;
};

 

function formatProduct(product: ProductPreview) {
  const image =
    product.images.find((item) => item.isCover)?.url ||
    product.images[0]?.url ||
    "";
  const finalPrice = product.salePercentage
    ? Math.round(product.price - (product.price * product.salePercentage) / 100)
    : product.price;
  return { productId: String(product._id), title: product.title, brand: product.brand, image, finalPrice };
}

async function getCartResponse(userId: string) {
  const cart = await CartModel.findOne({ user: userId }).populate(
    "items.product", "title brand price salePercentage images"
  );
  //   const cartItems = (cart?.items || []) as CartPreviewItem[];
  const cartItems = (cart?.items || []) as unknown as CartPreviewItem[];
  const items = cartItems.flatMap((cartItem) => {
    if (!cartItem.product) return [];
    return [{ ...formatProduct(cartItem.product), quantity: cartItem.quantity, color: cartItem.color, size: cartItem.size }];
  });
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return { items, totalQuantity };
}


// DELETE /api/customer/cart/items/[productId]
//    /api/customer/cart/items/123?color=Black&size=M
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  try {
    const { productId } = await params;
    const colorValue = String(req.nextUrl.searchParams.get("color") || "").trim();
    const sizeValue = String(req.nextUrl.searchParams.get("size") || "").trim();

    if (!productId) {
      return NextResponse.json({ status: "error", message: "Product id is required" }, { status: 400 });
    }

    const cart = await CartModel.findOne({ user: auth.decoded!.id });

    if (!cart) {
      return NextResponse.json({ status: "success", data: { items: [], totalQuantity: 0 } });
    }

    const product = await ProductModel.findOne({ _id: productId, status: "active" });
    if (!product) {
      return NextResponse.json({ status: "error", message: "Product not found" }, { status: 404 });
    }

    let color: string | undefined;
    let size: string | undefined;

    if (product.colors.length > 0) color = colorValue || undefined;
    if (product.sizes.length > 0) size = sizeValue || undefined;

    // cart.items = cart.items.filter((item: any) => !isSameCartItem(item, productId, color, size));

    cart.items = cart.items = cart.items.filter((item: any) => {
      return (
        String(item.product) !== productId ||
        (item.color || "") !== (color || "") ||
        (item.size || "") !== (size || "")
      );
    });

    await cart.save();

    const data = await getCartResponse(auth.decoded!.id);
    return NextResponse.json({ status: "success", data });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err.message || "Something went wrong" }, { status: 500 });
  }
}