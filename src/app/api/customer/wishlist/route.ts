import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/connectDB";
import { WishlistModel } from "@/models/WIshlist";
 

 


function getAuthUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {

    console.log("token hi",token);
    
    return { error: "Unauthorized", status: 401 };
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

type ProductPreview = {
  _id: string;
  title: string;
  brand: string;
  price: number;
  salePercentage: number;
  images: Array<{ url: string; isCover?: boolean }>;
};

function formatProduct(product: ProductPreview) {
  const image = product.images.find((i) => i.isCover)?.url || product.images[0]?.url || "";
  const finalPrice = product.salePercentage
    ? Math.round(product.price - (product.price * product.salePercentage) / 100)
    : product.price;
  return { productId: String(product._id), title: product.title, brand: product.brand, image, finalPrice };
}

export async function getWishlistResponse(userId: string) {
  const wishlist = await WishlistModel.findOne({ user: userId }).populate("products", "title brand price salePercentage images");
  // const products = (wishlist?.products || []) as Array<ProductPreview | null>;
  const products = (wishlist?.products || []) as unknown as Array<ProductPreview | null>;
  const items = products.flatMap((p) => p ? [formatProduct(p)] : []);
  return { items };
}

 
// wishlist/route.ts
export async function GET(req: NextRequest) {
  await connectDB();
  const auth = getAuthUser(req);
  if (auth.error) return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });

  try {
    const data = await getWishlistResponse(auth.decoded.id);
    return NextResponse.json({ status: "success", data });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

 










// app/api/customer/wishlist/items/route.ts
 
 