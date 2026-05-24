// BASE_URL}/wishlist/items/${productId}`
import { NextRequest, NextResponse } from "next/server";
 

import { connectDB } from "@/lib/connectDB";
import { WishlistModel } from "@/models/WIshlist";
import { getWishlistResponse } from "../../route";
import { getAuthUser } from "@/lib/auth";
 

 

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  await connectDB();
 const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  const { productId } = await params;

  await WishlistModel.findOneAndUpdate(
    { user: auth.decoded!.id },
    {
      $pull: {
        products: productId,
      },
    }
  );

  return NextResponse.json({
    status: "success",
    data: await getWishlistResponse(auth.decoded!.id),
  });
}