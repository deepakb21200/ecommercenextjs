import { NextRequest, NextResponse } from "next/server";
 
import { Banner } from "@/models/Banner";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/connectDB";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



 
type BannerDoc = {
  _id: unknown;
  imageUrl: string;
  imagePublicId: string;
  createdAt: Date;
};

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return NextResponse.json(
        { error: "Banner not found" },
        { status: 404 }
      );
    }

    if (banner.imagePublicId) {
      await cloudinary.uploader.destroy(banner.imagePublicId);
    }

    await Banner.findByIdAndDelete(id);

    const banners = await Banner.find()
      .sort({ createdAt: -1 })
      .lean<BannerDoc[]>();

    return NextResponse.json({
      items: banners.map((b) => ({
        _id: String(b._id),
        imageUrl: b.imageUrl,
        imagePublicId: b.imagePublicId,
        createdAt: b.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    console.error("Banner delete error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}