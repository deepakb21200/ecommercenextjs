// BASE_URL}/wishlist/items/${productId}`
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/connectDB";
import { WishlistModel } from "@/models/WIshlist";
import { getWishlistResponse } from "../../route";

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

 

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  await connectDB();

  const auth = getAuthUser(req);

  if (auth.error) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  const { productId } = await params;

  await WishlistModel.findOneAndUpdate(
    { user: auth.decoded.id },
    {
      $pull: {
        products: productId,
      },
    }
  );

  return NextResponse.json({
    status: "success",
    data: await getWishlistResponse(auth.decoded.id),
  });
}