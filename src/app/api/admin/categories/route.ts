
// /api/admin/categories/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { CategoryModel } from "@/models/Category";
import { uploadSingleBufferToCloudinary } from "@/utils/cloudinary";
import { requireAdmin } from "@/lib/auth";

// ✅ GET all categories
export async function GET(req: NextRequest) {
  await connectDB();


  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  const categories = await CategoryModel.find().sort({ createdAt: -1 });

  return NextResponse.json(categories);
}

// ✅ CREATE category
export async function POST(req: NextRequest) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }


  try {
    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const file = formData.get("image") as File | null;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const exists = await CategoryModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (exists) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 }
      );
    }

    // Convert File -> Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploaded = await uploadSingleBufferToCloudinary(
      buffer,
      "ecommerce-monster-video/categories"
    );

    // Save category
    const category = await CategoryModel.create({
      name,
      image: uploaded.url,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}