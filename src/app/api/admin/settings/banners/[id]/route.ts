import { NextRequest, NextResponse } from "next/server";
 
import { Banner } from "@/models/Banner";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/connectDB";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const banner = await Banner.findById(params.id);

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    // Delete from Cloudinary
    if (banner.imagePublicId) {
      await cloudinary.uploader.destroy(banner.imagePublicId);
    }

    // Delete from DB
    await Banner.findByIdAndDelete(params.id);

    // Return updated list
    const banners = await Banner.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      items: banners.map((b: any) => ({
        _id: String(b._id),
        imageUrl: b.imageUrl,
        imagePublicId: b.imagePublicId,
        createdAt: b.createdAt,
      })),
    });
  } catch (err) {
    console.error("Banner delete error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}