import { NextResponse } from "next/server";
 
import { CategoryModel } from "@/models/Category";
import { connectDB } from "@/lib/connectDB";
 

export async function GET() {
  await connectDB();
  const categories = await CategoryModel.find({}).sort({ name: 1 });
  return NextResponse.json(categories);
}