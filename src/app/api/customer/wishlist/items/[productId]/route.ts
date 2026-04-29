import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 

import { Types } from "mongoose";
import { getWishlistResponse } from "../../route";
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  await connectDB();
  const auth = getAuthUser(req);
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  const { productId } = await params;

  const wishlist = await WishlistModel.findOne({ user: auth.decoded.id });
  if (!wishlist) return NextResponse.json({ items: [] });

  wishlist.products = wishlist.products.filter((item: Types.ObjectId) => String(item) !== productId);
  await wishlist.save();

  return NextResponse.json(await getWishlistResponse(auth.decoded.id));
}