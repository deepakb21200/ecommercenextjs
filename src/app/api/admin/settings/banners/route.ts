import { NextRequest, NextResponse } from "next/server";
import { uploadManyBuffersToCloudinary } from "@/utils/cloudinary";
import { Banner } from "@/models/Banner";
import { connectDB } from "@/lib/connectDB";
import { requireAdmin } from "@/lib/auth";
 


const BANNER_FOLDER = "ecommerce-monster-video/banners";

export async function GET(req: NextRequest) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }
  const items = await Banner.find().sort({ createdAt: -1 });

  console.log("Get req called");
  

  return NextResponse.json({
    items: items.map((item) => ({
      _id: String(item._id),
      imageUrl: item.imageUrl,
      imagePublicId: item.imagePublicId,
      createdAt: item.createdAt.toISOString(),
    })),
  });
}



export async function POST(req: NextRequest) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  const formData   = await req.formData();
  const imageFiles = formData.getAll("images") as File[];

  if (!imageFiles.length) {
    return NextResponse.json(
      { message: "At least one image is required" },
      { status: 400 }
    );
  }

  const buffers = await Promise.all(
    imageFiles.map(async (file) => Buffer.from(await file.arrayBuffer()))
  );

  const uploaded = await uploadManyBuffersToCloudinary(buffers, BANNER_FOLDER);

  // ✅ createdBy — JWT se seedha, extra DB call nahi
  await Banner.insertMany(
    uploaded.map((img) => ({
      imageUrl:      img.url,
      imagePublicId: img.publicId,
      createdBy:     auth.decoded!.id,
    }))
  );

  const allBanners = await Banner.find().sort({ createdAt: -1 }).lean();

  return NextResponse.json({
    items: allBanners.map((item) => ({
      _id:          String(item._id),
      imageUrl:     item.imageUrl,
      imagePublicId: item.imagePublicId,
      createdAt:    (item.createdAt as Date).toISOString(),
    })),
  });
}