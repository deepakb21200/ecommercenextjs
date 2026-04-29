import { NextResponse } from "next/server";
 
import { CategoryModel } from "@/models/Category";
import { connectDB } from "@/lib/connectDB";
 
 

// ✅ UPDATE category
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const body = await req.json();

  const updated = await CategoryModel.findByIdAndUpdate(
    params.id,
    { name: body.name },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}