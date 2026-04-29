// import { NextResponse } from "next/server";
 
// import { Types } from "mongoose";
 
// import { Banner } from "@/models/Banner";
// import { CategoryModel } from "@/models/Category";
// import { ProductModel } from "@/models/Product";
// import { PromoModel } from "@/models/Promo";
// import { connectDB } from "@/lib/DB";

// type BannerRow = { _id: Types.ObjectId; imageUrl: string; createdAt: Date };
// type CategoryRow = { _id: Types.ObjectId; name: string };
// type ProductRow = {
//   _id: Types.ObjectId;
//   title: string;
//   brand: string;
//   price: number;
//   salePercentage: number;
//   images: Array<{ url: string; isCover?: boolean }>;
//   createdAt: Date;
// };
// type PromoRow = {
//   _id: Types.ObjectId;
//   code: string;
//   percentage: number;
//   count: number;
//   minimumOrderValue: number;
//   endsAt: Date;
// };

// export async function GET() {
//   try {
//     await connectDB();

//     const now = new Date();

//     const [banners, categories, recentProducts, promos] = await Promise.all([
//       Banner.find().sort({ createdAt: -1 }).limit(6).lean<BannerRow[]>(),
//       CategoryModel.find().sort({ name: 1 }).lean<CategoryRow[]>(),
//       ProductModel.find({ status: "active" })
//         .select("title brand price salePercentage images createdAt")
//         .sort({ createdAt: -1 })
//         .limit(4)
//         .lean<ProductRow[]>(),
//       PromoModel.find({
//         startsAt: { $lte: now },
//         endsAt: { $gte: now },
//         count: { $gt: 0 },
//       })
//         .sort({ createdAt: -1 })
//         .limit(4)
//         .lean<PromoRow[]>(),
//     ]);

//     return NextResponse.json({
//       banners: banners.map((b) => ({
//         _id: String(b._id),
//         imageUrl: b.imageUrl,
//         createdAt: b.createdAt.toISOString(),
//       })),
//       categories: categories.map((c) => ({
//         _id: String(c._id),
//         name: c.name,
//       })),
//       recentProducts: recentProducts.map((p) => {
//         const image =
//           p.images.find((i) => i.isCover)?.url ||
//           p.images[0]?.url ||
//           "";

//         const finalPrice = p.salePercentage
//           ? Math.round(p.price - (p.price * p.salePercentage) / 100)
//           : p.price;

//         return {
//           _id: String(p._id),
//           title: p.title,
//           brand: p.brand,
//           image,
//           price: p.price,
//           finalPrice,
//           salePercentage: p.salePercentage,
//           createdAt: p.createdAt.toISOString(),
//         };
//       }),
//       coupons: promos.map((promo) => ({
//         _id: String(promo._id),
//         code: promo.code,
//         percentage: promo.percentage,
//         count: promo.count,
//         minimumOrderValue: promo.minimumOrderValue,
//         endsAt: promo.endsAt.toISOString(),
//       })),
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }








import { NextResponse } from "next/server";
 
import { Types } from "mongoose";
 
import { Banner } from "@/models/Banner";
import { CategoryModel } from "@/models/Category";
import { ProductModel } from "@/models/Product";
import { PromoModel } from "@/models/Promo";
import { connectDB } from "@/lib/connectDB";

type BannerRow = { _id: Types.ObjectId; imageUrl: string; createdAt: Date };
type CategoryRow = { _id: Types.ObjectId; name: string };
type ProductRow = {
  _id: Types.ObjectId;
  title: string;
  brand: string;
  price: number;
  salePercentage: number;
  images: Array<{ url: string; isCover?: boolean }>;
  createdAt: Date;
};
type PromoRow = {
  _id: Types.ObjectId;
  code: string;
  percentage: number;
  count: number;
  minimumOrderValue: number;
  endsAt: Date;
};

export async function GET() {
  await connectDB();

  const now = new Date();

  const [banners, categories, recentProducts, promos] = await Promise.all([
    Banner.find().sort({ createdAt: -1 }).limit(6).lean<BannerRow[]>(),
    CategoryModel.find().sort({ name: 1 }).lean<CategoryRow[]>(),
    ProductModel.find({ status: "active" })
      .select("title brand price salePercentage images createdAt")
      .sort({ createdAt: -1 })
      .limit(4)
      .lean<ProductRow[]>(),
    PromoModel.find({
      startsAt: { $lte: now },
      endsAt: { $gte: now },
      count: { $gt: 0 },
    })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean<PromoRow[]>(),
  ]);

 
  

  return NextResponse.json({
    banners: banners.map((b) => ({
      _id: String(b._id),
      imageUrl: b.imageUrl,
      createdAt: b.createdAt.toISOString(),
    })),
    categories: categories.map((c) => ({
      _id: String(c._id),
      name: c.name,
    })),
    recentProducts: recentProducts.map((p) => {
      const image = p.images.find((i) => i.isCover)?.url || p.images[0]?.url || "";
      const finalPrice = p.salePercentage
        ? Math.round(p.price - (p.price * p.salePercentage) / 100)
        : p.price;

      return {
        _id: String(p._id),
        title: p.title,
        brand: p.brand,
        image,
        price: p.price,
        finalPrice,
        salePercentage: p.salePercentage,
        createdAt: p.createdAt.toISOString(),
      };
    }),
    coupons: promos.map((promo) => ({
      _id: String(promo._id),
      code: promo.code,
      percentage: promo.percentage,
      count: promo.count,
      minimumOrderValue: promo.minimumOrderValue,
      endsAt: promo.endsAt.toISOString(),
    })),
  });
}