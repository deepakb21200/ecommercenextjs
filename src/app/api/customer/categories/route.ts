import { NextRequest, NextResponse } from "next/server";
 
import { CategoryModel } from "@/models/Category";
import { connectDB } from "@/lib/connectDB";
import { getAuthUser } from "@/lib/auth";
 

export async function GET(req:NextRequest) {
  await connectDB();
   const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  const categories = await CategoryModel.find({}).sort({ name: 1 });
  return NextResponse.json(categories);
}
