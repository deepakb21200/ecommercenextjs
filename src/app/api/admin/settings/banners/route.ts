import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 
 
import { uploadManyBuffersToCloudinary } from "@/utils/cloudinary";
import { Banner } from "@/models/Banner";
import { connectDB } from "@/lib/connectDB";
 

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return { error: "Unauthorized", status: 401 };
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    if (decoded.role !== "admin") return { error: "Admin access only", status: 403 };
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

const BANNER_FOLDER = "ecommerce-monster-video/banners";

export async function GET(req: NextRequest) {
  await connectDB();

  // const auth = requireAdmin(req);
  // if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  const items = await Banner.find().sort({ createdAt: -1 });

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
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

  // JWT se user lo


  
  const decoded: any = auth.decoded;
  const { UserModel } = await import("@/models/User");
  const dbUser = await UserModel.findById(decoded.id);
  if (!dbUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const formData = await req.formData();
  const imageFiles = formData.getAll("images") as File[];

  if (!imageFiles.length) {
    return NextResponse.json({ message: "At least one image is required" }, { status: 400 });
  }

  const buffers = await Promise.all(
    imageFiles.map(async (file) => Buffer.from(await file.arrayBuffer()))
  );

  const uploadedImages = await uploadManyBuffersToCloudinary(buffers, BANNER_FOLDER);

  const created = await Banner.insertMany(
    uploadedImages.map((item) => ({
      imageUrl: item.url,
      imagePublicId: item.publicId,
      createdBy: dbUser._id,
    }))
  );

//   return NextResponse.json({
//     items: created.map((item: any) => ({
//       _id: String(item._id),
//       imageUrl: item.imageUrl,
//       imagePublicId: item.imagePublicId,
//       createdAt: item.createdAt.toISOString(),
//     })),
//   });
// }


// Ab — sab banners return karo
const allBanners = await Banner.find().sort({ createdAt: -1 }).lean();

return NextResponse.json({
  items: allBanners.map((item) => ({
    _id: String(item._id),
    imageUrl: item.imageUrl,
    imagePublicId: item.imagePublicId,
    createdAt: (item.createdAt as Date).toISOString(),
  })),
})}
