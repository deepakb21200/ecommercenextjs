import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CategoryModel } from "@/models/Category";
import { uploadManyBuffersToCloudinary } from "@/utils/cloudinary";
import { ProductModel } from "@/models/Product";
import { connectDB } from "@/lib/connectDB";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
 
  await connectDB();
 
  console.log("hh");
  

  // auth check
  const token = req.cookies.get("token")?.value;

 
  
  if (!token) {
    console.log(token,"tottttt");
    
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_KEY!);
    console.log("noerror");
    
  } catch {
    console.log("error hi");
    
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const formData = await req.formData();

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const brand = (formData.get("brand") as string)?.trim();
  const price = Number(formData.get("price"));
  const salePercentage = Number(formData.get("salePercentage") || 0);
  const stock = Number(formData.get("stock"));
  const status = formData.get("status") as string;
  const colors = formData.getAll("colors") as string[];
  const sizes = formData.getAll("sizes") as string[];
  const existingImages = JSON.parse(formData.get("existingImages") as string || "[]");
  const coverImagePublicId = formData.get("coverImagePublicId") as string | null;

  // validations
  if (!title) return NextResponse.json({ message: "Title is required" }, { status: 400 });
  if (!description) return NextResponse.json({ message: "Description is required" }, { status: 400 });
  if (!category) return NextResponse.json({ message: "Category is required" }, { status: 400 });
  if (!brand) return NextResponse.json({ message: "Brand is required" }, { status: 400 });

  const existingCategory = await CategoryModel.findById(category);
  if (!existingCategory) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }


  console.log("coverImagePublicId:", coverImagePublicId);
  // naye images upload karo
  const imageFiles = formData.getAll("images") as File[];
  let newImages: { url: string; publicId: string; isCover: boolean }[] = [];

  if (imageFiles.length) {
    const buffers = await Promise.all(
      imageFiles.map(async (file) => Buffer.from(await file.arrayBuffer()))
    );
    const uploaded = await uploadManyBuffersToCloudinary(buffers);
    newImages = uploaded.map((img) => ({
      url: img.url,
      publicId: img.publicId,
      isCover: false,
    }));
  }

  // existing + new images merge karo
  const allImages = [...existingImages, ...newImages];

  // cover image set karo
  const finalImages = allImages.map((img: any) => ({
    ...img,
    isCover: coverImagePublicId
      ? img.publicId === coverImagePublicId
      : img.isCover,
  }));

    const { id } = await params; // 👈 await karo
  const updated = await ProductModel.findByIdAndUpdate(
    // params.id,
    id,
    {
      title,
      description,
      category,
      brand,
      colors,
      sizes,
      price,
      salePercentage,
      stock,
      status,
      images: finalImages,
    },
    { new: true }
  ).populate("category", "name");

  if (!updated) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}