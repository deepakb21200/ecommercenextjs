 
import { NextResponse } from "next/server";
import { Banner } from "@/models/Banner";
import { CategoryModel } from "@/models/Category";
import { ProductImage, ProductModel } from "@/models/Product";
import { PromoModel } from "@/models/Promo";
import { connectDB } from "@/lib/connectDB";

// ─── Helpers ───────────────────────────────────────────

function formatProduct(product: any) {
  // const image = product.images.find((i: any) => i.isCover)?.url || product.images?.[0]?.url || "";
  const image = product.images.find((img: ProductImage) => img.isCover === true)?.url || product.images?.[0]?.url || ""

  return {
    _id: String(product._id),
    title: product.title,
    brand: product.brand,
    image,
    price: product.price,
    finalPrice:
      product.salePercentage > 0
        ? Math.round(product.price - (product.price * product.salePercentage) / 100)
        : product.price,
    salePercentage: product.salePercentage,
    stock: product.stock,
    colors: product.colors,
    createdAt: product.createdAt,
  };
}

export async function GET() {
  await connectDB();

  const now = new Date();

  const [banners, categories, recentProducts, promos] =
    await Promise.all([
      Banner.find()
        .sort({ createdAt: -1 })
        .limit(6)
        .select("imageUrl createdAt")
        .lean(),

      CategoryModel.find()
        .sort({ name: 1 })
        .select("name")
        .lean(),

      ProductModel.find({ status: "active" })
        .sort({ createdAt: -1 })
        .limit(4)
        .select(
          "title brand images price salePercentage stock colors createdAt"
        )
        .lean(),

      PromoModel.find({
        startsAt: { $lte: now },
        endsAt: { $gte: now },
        count: { $gt: 0 },
      })
        .sort({ createdAt: -1 })
        .limit(4)
        .select(
          "code percentage count minimumOrderValue endsAt"
        )
        .lean(),
    ]);

  console.log("babnners,", banners);


  return NextResponse.json({
    banners,
    categories,

    recentProducts: recentProducts.map(formatProduct),

    coupons: promos,
  });
}