 

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/connectDB";
import { WishlistModel } from "@/models/WIshlist";

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

export async function getWishlistResponse(userId: string) {
  const wishlist = await WishlistModel.findOne({ user: userId })
    .populate("products", "title brand price salePercentage images")
    .lean();

  const items = ((wishlist?.products as any[]) || []).map((p) => ({
    productId: String(p._id),
    title: p.title,
    brand: p.brand,
    image: p.images?.find((i: any) => i.isCover)?.url || p.images?.[0]?.url || "",
    finalPrice: p.salePercentage? Math.round(p.price - (p.price * p.salePercentage) / 100): p.price,
  }));

  return { items };
}

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

