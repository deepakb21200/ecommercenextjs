//fetch(`${BASE_URL}/wishlist/items`
import { NextRequest, NextResponse } from "next/server";
 
import { connectDB } from "@/lib/connectDB";
import { WishlistModel } from "@/models/WIshlist";
 

 
 import { Types } from "mongoose";
import { getWishlistResponse } from "../route";
import { getAuthUser } from "@/lib/auth";

 
 

export async function POST(req: NextRequest) {
  console.log("post route");
  
  await connectDB();

 const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  try {
    const body = await req.json();
    const productId = String(body.productId || "").trim();

    if (!productId) {
      return NextResponse.json(
        { status: "error", message: "productId is required" },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { status: "error", message: "Invalid productId" },
        { status: 400 }
      );
    }

    // Wishlist dhundo ya naya banao
    let wishlist = await WishlistModel.findOne({ user: auth.decoded!.id });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: auth.decoded!.id,
        products: [new Types.ObjectId(productId)],
      });
    } else {
      // Already exist karta hai to skip karo — duplicate mat daalo
      const alreadyExists = wishlist.products.some(
        (p: Types.ObjectId) => String(p) === productId
      );

      if (!alreadyExists) {
        wishlist.products.push(new Types.ObjectId(productId));
        await wishlist.save();
      }
    }

    const data = await getWishlistResponse(auth.decoded!.id)

    
    return NextResponse.json({ status: "success", data });

  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}


