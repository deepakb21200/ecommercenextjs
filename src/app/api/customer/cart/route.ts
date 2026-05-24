import { NextRequest, NextResponse } from "next/server";
 
import { CartModel } from "@/models/Cart";
import { connectDB } from "@/lib/connectDB";
import { getAuthUser } from "@/lib/auth";
 
 
 // ye checke karnahai claude se 
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

  return {
    productId: String(product._id),
    title: product.title,
    brand: product.brand,
    image,
    finalPrice,
  };
}

async function getCartResponse(userId: string) {
  const cart = await CartModel.findOne({ user: userId }).populate(
    "items.product",
    "title brand price salePercentage images"
  );




const cartItems = (cart?.items || []) as unknown as CartPreviewItem[];

  const items = cartItems.flatMap((cartItem) => {
    if (!cartItem.product) return [];
    return [{
      ...formatProduct(cartItem.product),
      quantity: cartItem.quantity,
      color: cartItem.color,
      size: cartItem.size,
    }];
  });

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, totalQuantity };
}

// GET /api/customer/cart
export async function GET(req: NextRequest) {
  await connectDB();

 const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  try {
    const data = await getCartResponse(auth.decoded!.id);

    
    return NextResponse.json({ status: "success", data });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}






 