import { NextRequest, NextResponse } from "next/server";
import { ProductModel } from "@/models/Product";
import "@/models/Category";
import { connectDB } from "@/lib/connectDB";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const { id } = await params;


  const product = await ProductModel.findOne({ _id: id, status: "active" })
    .populate("category", "name");


  if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

  const relatedProducts = await ProductModel.find({
    _id: { $ne: product._id },
    category: product.category,
    status: "active",
  })
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .limit(4);


  // return NextResponse.json({ product, relatedProducts });
  // route.ts mein product format karte waqt
  return NextResponse.json({
    product: {
      ...product.toObject(),
      images: [...product.images].sort((a, b) => {
        if (a.isCover) return -1;
        if (b.isCover) return 1;
        return 0;
      }),
    },
    relatedProducts,
  });
}