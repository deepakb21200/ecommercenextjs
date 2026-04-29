import { NextResponse } from "next/server";
 
import { CategoryModel } from "@/models/Category";
import { connectDB } from "@/lib/connectDB";

 

// ✅ GET all categories
export async function GET() {
  await connectDB();

  const categories = await CategoryModel.find().sort({ createdAt: -1 });

  return NextResponse.json(categories);
}

// ✅ CREATE category
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  if (!body.name) {
    return NextResponse.json(
      { message: "Name is required" },
      { status: 400 }
    );
  }

  const exists = await CategoryModel.findOne({ name: body.name });

  if (exists) {
    return NextResponse.json(
      { message: "Category already exists" },
      { status: 400 }
    );
  }

  const category = await CategoryModel.create({
    name: body.name,
  });

  return NextResponse.json(category, { status: 201 });
}