import { NextRequest, NextResponse } from "next/server";

import { ProductModel } from "@/models/Product";
import { connectDB } from "@/lib/connectDB";

type ProductSort = "recent" | "price-low" | "price-high";

export async function GET(req: NextRequest) {
  await connectDB();


  

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category")?.trim() || "";
  const brand = searchParams.get("brand")?.trim() || "";
  const color = searchParams.get("color")?.trim() || "";
  const size = searchParams.get("size")?.trim() || "";
  const sort = (searchParams.get("sort") as ProductSort) || "recent";

  const query: Record<string, unknown> = { status: "active" };
  if (category) query.category = category;
  if (brand) query.brand = brand;
  if (color) query.colors = color;
  if (size) query.sizes = size;

  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
  if (sort === "price-low") sortOption = { price: 1 };
  if (sort === "price-high") sortOption = { price: -1 };

  const products = await ProductModel.find(query)
    .populate("category", "name")
    .sort(sortOption);

  return NextResponse.json(products);
}