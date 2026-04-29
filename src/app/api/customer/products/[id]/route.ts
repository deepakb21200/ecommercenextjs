import { NextRequest, NextResponse } from "next/server";

import { ProductModel } from "@/models/Product";
import "@/models/Category";
import { connectDB } from "@/lib/connectDB";
export async function GET(
  req: NextRequest,
{ params }: { params: Promise<{ id: string }> }
  // { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = await params;
  // const { id } =  params;

  const product = await ProductModel.findOne({ _id: id, status: "active" })
    .populate("category", "name");
// console.log(product);

  if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

  const relatedProducts = await ProductModel.find({
    _id: { $ne: product._id },
    category: product.category,
    status: "active",
  })
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .limit(4);

// console.log("idproduct",product);
//     console.log("re",relatedProducts);
    
  return NextResponse.json({ product, relatedProducts });
}