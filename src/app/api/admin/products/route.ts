import { NextRequest, NextResponse } from "next/server";
import { ProductModel } from "@/models/Product";
import { uploadManyBuffersToCloudinary } from "@/utils/cloudinary";
import { connectDB } from "@/lib/connectDB";
import { CategoryModel } from "@/models/Category";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await connectDB();


  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  const formData = await req.formData();

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const brand = String(formData.get("brand") || "").trim();
  const price = Number(formData.get("price"));
  const salePercentage = Number(formData.get("salePercentage") || 0);
  const stock = Number(formData.get("stock"));
  const status = String(formData.get("status") || "active");
  const sizes = formData.getAll("sizes") as string[];
  const coverImagePublicId = String(formData.get("coverImagePublicId") || "").trim();

  // Colors — JSON parse
  const colors = JSON.parse((formData.get("colors") as string) || "[]");

  // Validations
  if (!title) return NextResponse.json({ message: "Title is required" }, { status: 400 });
  if (!description) return NextResponse.json({ message: "Description is required" }, { status: 400 });
  if (!category) return NextResponse.json({ message: "Category is required" }, { status: 400 });
  if (!brand) return NextResponse.json({ message: "Brand is required" }, { status: 400 });
  if (!price) return NextResponse.json({ message: "Price is required" }, { status: 400 });
  if (!stock) return NextResponse.json({ message: "Stock is required" }, { status: 400 });

  const existingCategory = await CategoryModel.findById(category);
  if (!existingCategory) return NextResponse.json({ message: "Category not found" }, { status: 404 });

  const imageFiles = formData.getAll("images") as File[];
  if (!imageFiles.length) return NextResponse.json({ message: "At least one image is needed" }, { status: 400 });

  const buffers = await Promise.all(
    imageFiles.map(async (file) => Buffer.from(await file.arrayBuffer()))
  );

  const uploadedImages = await uploadManyBuffersToCloudinary(buffers);

  // Cover index
  const coverIndex = coverImagePublicId?.startsWith("new-")
    ? Number(coverImagePublicId.split("-")[1])
    : 0;

  const images = uploadedImages.map((img, index) => ({
    url: img.url,
    publicId: img.publicId,
    isCover: index === coverIndex,
  }));

  const product = await ProductModel.create({
    title,
    description,
    category,
    brand,
    images,
    colors,
    sizes,
    price,
    salePercentage,
    stock,
    status,
    createdBy: auth.decoded!.id,
  });

  const createdProduct = await ProductModel.findById(product._id).populate("category", "name");

  return NextResponse.json(createdProduct, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim();
  const query = search ? { title: { $regex: search, $options: "i" } } : {};

  const products = await ProductModel.find(query)
    .populate("category", "name")
    .sort({ createdAt: -1 });

  return NextResponse.json(products);
}


