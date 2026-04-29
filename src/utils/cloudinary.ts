import { v2 as cloudinary } from "cloudinary";

type CloudinaryUploadResult = {
  url: string;
  publicId: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// SINGLE UPLOAD
export function uploadSingleBufferToCloudinary(
  fileBuffer: Buffer,
  folder = "ecommerce-monster-video/products",
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed"));

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
}

// MULTIPLE UPLOAD
export async function uploadManyBuffersToCloudinary(
  files: Buffer[],
  folder = "NextJS_Projects/products",
): Promise<CloudinaryUploadResult[]> {
  return Promise.all(
    files.map((file) =>
      uploadSingleBufferToCloudinary(file, folder)
    )
  );
}