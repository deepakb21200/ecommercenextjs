
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { ProductModel } from "@/models/Product";
import { CategoryModel } from "@/models/Category";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const categoryNames = searchParams.getAll("category");
  const sizes = searchParams.getAll("size");
  const colors = searchParams.getAll("color"); 
  const brands = searchParams.getAll("brand");
  const sort = searchParams.get("sort") || "newest";
  const onSale = searchParams.get("onSale") === "true";

  const allCategories = await CategoryModel.find().select("_id name").lean();

  const query: any = { status: "active" };

  if (categoryNames.length) {
    const formatted = categoryNames.map((n) => n.replace(/-/g, " ").trim().toLowerCase());
    const matched = allCategories.filter((cat: any) => formatted.includes(cat.name.toLowerCase()));
    query.category = { $in: matched.map((c: any) => c._id) };
  }

  if (sizes.length) query.sizes = { $in: sizes };
 if (brands.length) query.brand = { $in: brands };

  if (onSale) query.salePercentage = { $gt: 0 };

  // Color filter by name
  if (colors.length) {
    query["colors.name"] = {
      $in: colors.map((c) => new RegExp(`^${c.replace(/-/g, " ")}$`, "i")),
    };
  }

 

  const sortOption: any =sort === "price_asc" ? { price: 1 } :
    sort === "price_desc" ? { price: -1 } :
    { createdAt: -1 };

  const products = await ProductModel.find(query)
    .populate("category", "name")
    .sort(sortOption)
    .lean();

  const formattedProducts = products.map((p: any) => ({
    _id: String(p._id),
    title: p.title,
    description: p.description,
    brand: p.brand,
    price: p.price,
    finalPrice: p.salePercentage
      ? Math.round(p.price - (p.price * p.salePercentage) / 100)
      : p.price,
    salePercentage: p.salePercentage,
    stock: p.stock,
    sizes: p.sizes || [],
    colors: p.colors || [], 
    image: p.images?.find((i: any) => i.isCover)?.url || p.images?.[0]?.url || "",
    category: p.category,
    status: p.status,
  }));

  // Brands aggregate
  const brandAgg = await ProductModel.aggregate([
    { $match: { status: "active" } },
    { $group: { _id: "$brand", count: { $sum: 1 } } },
  ]);


  const allBrands = brandAgg
  .map((b) => ({ name: b._id, count: b.count }))
  .sort((a, b) => a.name.localeCompare(b.name));

  // Colors aggregate — group by name
  const colorAgg = await ProductModel.aggregate([
    { $match: { status: "active" } },
    { $unwind: "$colors" },
    { $group: { _id: "$colors.name", count: { $sum: 1 } } },
  ]);

  const allColors = colorAgg
    .map((c) => ({ label: c._id, count: c.count }))
    .sort((a, b) => a.label.localeCompare(b.label));

    console.log({
    products: formattedProducts,
    filterOptions: {
      categories: allCategories.map((c: any) => ({ _id: String(c._id), name: c.name })),
      brands: allBrands,
      sizes: ["S", "M", "L", "XL"],
      colors: allColors,
    },
  });
    

  return NextResponse.json({
    products: formattedProducts,
    filterOptions: {
      categories: allCategories.map((c: any) => ({ _id: String(c._id), name: c.name })),
      brands: allBrands,
      sizes: ["S", "M", "L", "XL"],
      colors: allColors,
    },
  });
}






