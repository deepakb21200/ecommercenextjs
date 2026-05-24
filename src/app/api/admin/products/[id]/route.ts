



import { NextRequest, NextResponse } from "next/server";
import { CategoryModel } from "@/models/Category";
import { uploadManyBuffersToCloudinary } from "@/utils/cloudinary";
import { ProductModel } from "@/models/Product";
import { connectDB } from "@/lib/connectDB";
import { requireAdmin } from "@/lib/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

type ImageDoc = { url: string; publicId: string; isCover: boolean };

// ─── PUT /api/admin/products/[id] ────────────────────────────────────────────

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  // ✅ params pehle await karo
  const { id } = await params;

  try {
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
    const existingImages = JSON.parse(String(formData.get("existingImages") || "[]")) as ImageDoc[];
    const colors = JSON.parse(String(formData.get("colors") || "[]"));

    if (!title || !description || !category || !brand) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingCategory = await CategoryModel.findById(category);
    if (!existingCategory) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    const imageFiles = formData.getAll("images") as File[];
    let newImages: ImageDoc[] = [];

    if (imageFiles.length) {
      const buffers = await Promise.all(
        imageFiles.map(async (file) => Buffer.from(await file.arrayBuffer()))
      );
      const uploaded = await uploadManyBuffersToCloudinary(buffers);
      newImages = uploaded.map((img, idx) => ({
        url: img.url,
        publicId: img.publicId,
        isCover: coverImagePublicId === `new-${idx}`,
      }));
    }

    const allImages = [...existingImages, ...newImages];
    const finalImages = allImages.map((img) => ({
      ...img,
      isCover: coverImagePublicId.startsWith("new-")
        ? img.isCover
        : img.publicId === coverImagePublicId,
    }));

    const updated = await ProductModel.findByIdAndUpdate(
      id,
      { title, description, category, brand, price, salePercentage, stock, status, sizes, colors, images: finalImages },
      { new: true }
    ).populate("category", "name");

    if (!updated) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated);

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ message: "Internal Server Error", error: message }, { status: 500 });
  }
}

// ─── GET /api/admin/products/[id] ────────────────────────────────────────────

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = requireAdmin(req);

  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  // ✅ params pehle await karo
  const { id } = await params;

  const product = await ProductModel.findById(id).populate("category", "name");

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}