import { NextRequest, NextResponse } from "next/server";
import { ProductModel } from "@/models/Product";
import "@/models/Category";
import { connectDB } from "@/lib/connectDB";
 

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

 
  const { id } = await params;

  const product = await ProductModel.findOne({
    _id: id,
    status: "active",
  }).populate("category", "name");

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  const relatedProducts = await ProductModel.find({
    _id: { $ne: product._id },
    category: product.category,
    status: "active",
  })
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  // Related products me sirf cover image ka URL return karo
  const formattedRelatedProducts = relatedProducts.map((item: any) => {

    const coverImage =
      item.images?.find((img: any) => img.isCover)?.url ||
      item.images?.[0]?.url ||
      null;

    // remove unwanted fields
    const {
      _id,
      createdAt,
      updatedAt,
      createdBy,
      __v,
      ...rest
    } = item;

    return {
      ...rest,
      _id: String(_id),

      finalPrice: item.salePercentage
        ? Math.round(item.price - (item.price * item.salePercentage) / 100)
        : item.price,

      image: coverImage,
    };
  });

  console.log("gta", product)


  return NextResponse.json({
    product: {
      ...product.toObject(),
      images: [...product.images].sort((a, b) => {
        if (a.isCover) return -1;
        if (b.isCover) return 1;
        return 0;
      }),
    },
    relatedProducts: formattedRelatedProducts,
  });
}