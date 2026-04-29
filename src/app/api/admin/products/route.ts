
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 
import { ProductModel } from "@/models/Product";
import { uploadManyBuffersToCloudinary } from "@/utils/cloudinary";
import { connectDB } from "@/lib/connectDB";
import { UserModel } from "@/models/User";
import { CategoryModel } from "@/models/Category";
 

export async function POST(req: NextRequest) {
  await connectDB();

  // 👇 cookie se user lo (Clerk ki jagah JWT)
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_KEY!);
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const dbUser = await UserModel.findById(decoded.id);
  if (!dbUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // 👇 formData parse karo
  const formData = await req.formData();

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const brand = (formData.get("brand") as string)?.trim();
  const price = Number(formData.get("price"));
  const salePercentage = Number(formData.get("salePercentage") || 0);
  const stock = Number(formData.get("stock"));
  const status = (formData.get("status") as string) || "active";
  const colors = formData.getAll("colors") as string[];
  const sizes = formData.getAll("sizes") as string[];

  // validations
  if (!title) return NextResponse.json({ message: "Title is required" }, { status: 400 });
  if (!description) return NextResponse.json({ message: "Description is required" }, { status: 400 });
  if (!category) return NextResponse.json({ message: "Category is required" }, { status: 400 });
  if (!brand) return NextResponse.json({ message: "Brand is required" }, { status: 400 });
  if (!price) return NextResponse.json({ message: "Price is required" }, { status: 400 });
  if (!stock) return NextResponse.json({ message: "Stock is required" }, { status: 400 });

  const existingCategory = await CategoryModel.findById(category);
  if (!existingCategory) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  // 👇 files lo formData se
  const imageFiles = formData.getAll("images") as File[];
  if (!imageFiles.length) {
    return NextResponse.json({ message: "Atleast one image is needed" }, { status: 400 });
  }

  // File → Buffer convert karo
  const buffers = await Promise.all(
    imageFiles.map(async (file) => Buffer.from(await file.arrayBuffer()))
  );

  const uploadedImages = await uploadManyBuffersToCloudinary(buffers);

  const images = uploadedImages.map((img, index) => ({
    url: img.url,
    publicId: img.publicId,
    isCover: index === 0,
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
    createdBy: dbUser._id, // 👈 store se nahi, JWT se
  });

  const createdProduct = await ProductModel.findById(product._id).populate("category", "name");
  console.log("successful");
  

  return NextResponse.json(createdProduct, { status: 201 });
}








export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim();

  const query = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const products = await ProductModel.find(query)
    .populate("category", "name")
    .sort({ createdAt: -1 });

  return NextResponse.json(products);
}