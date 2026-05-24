// /api/admin/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { CategoryModel } from "@/models/Category";
import { deleteFromCloudinary, uploadSingleBufferToCloudinary } from "@/utils/cloudinary";
import { requireAdmin } from "@/lib/auth";

// ✅ UPDATE category
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  try {
    const { id } = await params;

    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const file = formData.get("image") as File | null;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const category = await CategoryModel.findById(id);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const exists = await CategoryModel.findOne({
      _id: { $ne: id },
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (exists) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 }
      );
    }

    let image = category.image;

    // Upload new image if provided
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploaded = await uploadSingleBufferToCloudinary(
        buffer,
        "ecommerce-monster-video/categories"
      );

      // Delete old image from Cloudinary
      if (category.imagePublicId) {
        await deleteFromCloudinary(category.imagePublicId);
      }

      image = uploaded.url;
      category.imagePublicId = uploaded.publicId;
    }

    category.name = name;
    category.image = image;

    await category.save();

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// ✅ DELETE category + Cloudinary image
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

    const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  try {
    const { id } = await params;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    if (category.imagePublicId) {
      await deleteFromCloudinary(category.imagePublicId);
    }

    // Delete category from MongoDB
    await CategoryModel.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}