
// import { NextResponse } from "next/server";
// import { Banner } from "@/models/Banner";
// import { CategoryModel } from "@/models/Category";
// import { ProductModel } from "@/models/Product";
// import { PromoModel } from "@/models/Promo";
// import { connectDB } from "@/lib/connectDB";


// export async function GET() {
//   await connectDB();

//   const now = new Date();

//   const [banners, categories, recentProducts, promos] = await Promise.all([
//     Banner.find().sort({ createdAt: -1 }).limit(6).lean(),
//     CategoryModel.find().sort({ name: 1 }).lean(),

//     ProductModel.find({ status: "active" })
//       .populate("category", "name")
//       .sort({ createdAt: -1 })
//       .limit(4),

//     PromoModel.find({
//       startsAt: { $lte: now },
//       endsAt: { $gte: now },
//       count: { $gt: 0 },
//     })
//       .sort({ createdAt: -1 })
//       .limit(4)
//   ]);




//   return NextResponse.json({
//     banners: banners.map((b) => ({
//       _id: String(b._id),
//       imageUrl: b.imageUrl,
//       createdAt: b.createdAt.toISOString(),
//     })),
//     categories: categories.map((c) => ({
//       _id: String(c._id),
//       name: c.name,
//     })),
//     recentProducts: recentProducts.map((p) => {
//       const image = p.images.find((i) => i.isCover)?.url || p.images[0]?.url || "";
//       const finalPrice = p.salePercentage
//         ? Math.round(p.price - (p.price * p.salePercentage) / 100)
//         : p.price;

//       return {
//         _id: String(p._id),
//         title: p.title,
//         brand: p.brand,
//         image,
//         price: p.price,
//         finalPrice,
//         salePercentage: p.salePercentage,
//         createdAt: p.createdAt.toISOString(),
//         stock: p.stock,
//         colors: p.colors,
//       };
//     }),
//     coupons: promos.map((promo) => ({
//       _id: String(promo._id),
//       code: promo.code,
//       percentage: promo.percentage,
//       count: promo.count,
//       minimumOrderValue: promo.minimumOrderValue,
//       endsAt: promo.endsAt.toISOString(),
//     })),
//   });
// }









import { NextResponse } from "next/server";
import { Banner } from "@/models/Banner";
import { CategoryModel } from "@/models/Category";
import { ProductModel } from "@/models/Product";
import { PromoModel } from "@/models/Promo";
import { connectDB } from "@/lib/connectDB";

// ─── Helpers ───────────────────────────────────────────

function formatProduct(product: any) {
  const image = product.images.find((i: any) => i.isCover)?.url || product.images?.[0]?.url || "";

  return {
    _id: String(product._id),
    title: product.title,
    brand: product.brand,
    image,
    price: product.price,
    finalPrice:
      product.salePercentage > 0
        ? Math.round(  product.price -(product.price * product.salePercentage) / 100 )
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