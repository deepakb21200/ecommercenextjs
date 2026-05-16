// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { CategoryModel } from "@/models/Category";
// import { uploadManyBuffersToCloudinary } from "@/utils/cloudinary";
// import { ProductModel } from "@/models/Product";
// import { connectDB } from "@/lib/connectDB";

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
 
//   await connectDB();
 
//   console.log("hh");
  

//   // auth check
//   const token = req.cookies.get("token")?.value;

 
  
//   if (!token) {
//     console.log(token,"tottttt");
    
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     jwt.verify(token, process.env.JWT_KEY!);
//     console.log("noerror");
    
//   } catch {
//     console.log("error hi");
    
//     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//   }

//   const formData = await req.formData();

//   const title = (formData.get("title") as string)?.trim();
//   const description = (formData.get("description") as string)?.trim();
//   const category = (formData.get("category") as string)?.trim();
//   const brand = (formData.get("brand") as string)?.trim();
//   const price = Number(formData.get("price"));
//   const salePercentage = Number(formData.get("salePercentage") || 0);
//   const stock = Number(formData.get("stock"));
//   const status = formData.get("status") as string;
//   const colors = formData.getAll("colors") as string[];
//   const sizes = formData.getAll("sizes") as string[];
//   const existingImages = JSON.parse(formData.get("existingImages") as string || "[]");
//   const coverImagePublicId = formData.get("coverImagePublicId") as string | null;

//   // validations
//   if (!title) return NextResponse.json({ message: "Title is required" }, { status: 400 });
//   if (!description) return NextResponse.json({ message: "Description is required" }, { status: 400 });
//   if (!category) return NextResponse.json({ message: "Category is required" }, { status: 400 });
//   if (!brand) return NextResponse.json({ message: "Brand is required" }, { status: 400 });

//   const existingCategory = await CategoryModel.findById(category);
//   if (!existingCategory) {
//     return NextResponse.json({ message: "Category not found" }, { status: 404 });
//   }


//   console.log("coverImagePublicId:", coverImagePublicId);
//   // naye images upload karo
//   const imageFiles = formData.getAll("images") as File[];
//   let newImages: { url: string; publicId: string; isCover: boolean }[] = [];

//   if (imageFiles.length) {
//     const buffers = await Promise.all(
//       imageFiles.map(async (file) => Buffer.from(await file.arrayBuffer()))
//     );
//     const uploaded = await uploadManyBuffersToCloudinary(buffers);
 
//     // ← yahan change karo
//   newImages = uploaded.map((img, idx) => ({
//     url: img.url,
//     publicId: img.publicId,
//     isCover: coverImagePublicId === `new-${idx}`,
//   }));
// }

//   // existing + new images merge karo
//   const allImages = [...existingImages, ...newImages];

 
//   // cover image set karo

// const finalImages = allImages.map((img: any) => {
//   if (coverImagePublicId?.startsWith("new-")) {
//     // new image cover hai - newImages mein already isCover set hai, wahi rakho
//     return img;
//   }
//   return {
//     ...img,
//     isCover: coverImagePublicId
//       ? img.publicId === coverImagePublicId
//       : img.isCover,
//   };
// });

//     const { id } = await params; // 👈 await karo
//   const updated = await ProductModel.findByIdAndUpdate(
//     // params.id,
//     id,
//     {
//       title,
//       description,
//       category,
//       brand,
//       colors,
//       sizes,
//       price,
//       salePercentage,
//       stock,
//       status,
//       images: finalImages,
//     },
//     { new: true }
//   ).populate("category", "name");

//   if (!updated) {
//     return NextResponse.json({ message: "Product not found" }, { status: 404 });
//   }

//   return NextResponse.json(updated);
// }


 


 


// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { CategoryModel } from "@/models/Category";
// import { uploadManyBuffersToCloudinary } from "@/utils/cloudinary";
// import { ProductModel } from "@/models/Product";
// import { connectDB } from "@/lib/connectDB";

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await connectDB();

//   try {
//     // ───── AUTH ─────
//     const token = req.cookies.get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     try {
//       jwt.verify(token, process.env.JWT_KEY!);
//     } catch {
//       return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//     }

//     // ───── FORM DATA ─────
//     const formData = await req.formData();

//     const title = String(formData.get("title") || "").trim();
//     const description = String(formData.get("description") || "").trim();
//     const category = String(formData.get("category") || "").trim();
//     const brand = String(formData.get("brand") || "").trim();

//     const price = Number(formData.get("price"));
//     const salePercentage = Number(formData.get("salePercentage") || 0);
//     const stock = Number(formData.get("stock"));
//     const status = String(formData.get("status") || "active");

//     const sizes = formData.getAll("sizes") as string[];

//     // ───── COLORS (ARRAY OF OBJECTS) ─────
//     let colors: { hex: string; name: string }[] = [];

//     const rawColors = formData.get("colors");

//     if (typeof rawColors === "string") {
//       try {
//         const parsed = JSON.parse(rawColors);

//         if (Array.isArray(parsed)) {
//           colors = parsed.map((c) => ({
//             hex: c.hex,
//             name: c.name,
//           }));
//         }
//       } catch {
//         return NextResponse.json(
//           { message: "Invalid colors format" },
//           { status: 400 }
//         );
//       }
//     }

//     const existingImages = JSON.parse(
//       (formData.get("existingImages") as string) || "[]"
//     );

//     const coverImagePublicId = formData.get("coverImagePublicId") as string;

//     // ───── VALIDATION ─────
//     if (!title || !description || !category || !brand) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const existingCategory = await CategoryModel.findById(category);
//     if (!existingCategory) {
//       return NextResponse.json(
//         { message: "Category not found" },
//         { status: 404 }
//       );
//     }

//     // ───── IMAGE UPLOAD ─────
//     const imageFiles = formData.getAll("images") as File[];

//     let newImages: any[] = [];

//     if (imageFiles.length) {
//       const buffers = await Promise.all(
//         imageFiles.map(async (file) =>
//           Buffer.from(await file.arrayBuffer())
//         )
//       );

//       const uploaded = await uploadManyBuffersToCloudinary(buffers);

//       newImages = uploaded.map((img, idx) => ({
//         url: img.url,
//         publicId: img.publicId,
//         isCover: coverImagePublicId === `new-${idx}`,
//       }));
//     }

//     // ───── MERGE IMAGES ─────
//     const allImages = [...existingImages, ...newImages];

//     const finalImages = allImages.map((img: any) => ({
//       ...img,
//       isCover: coverImagePublicId
//         ? coverImagePublicId.startsWith("new-")
//           ? img.isCover
//           : img.publicId === coverImagePublicId
//         : img.isCover,
//     }));

//     // ───── UPDATE PRODUCT ─────
//     const updated = await ProductModel.findByIdAndUpdate(
//       params.id,
//       {
//         title,
//         description,
//         category,
//         brand,
//         price,
//         salePercentage,
//         stock,
//         status,
//         sizes,
//         colors, // ✅ ARRAY OF OBJECTS
//         images: finalImages,
//       },
//       { new: true }
//     ).populate("category", "name");

//     if (!updated) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updated);
//   } catch (error: any) {
//     console.error("UPDATE ERROR:", error);

//     return NextResponse.json(
//       { message: "Internal Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }





// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await connectDB();

//   const { id } = await params;

//   const product = await ProductModel.findById(id).populate("category", "name");

//   if (!product) {
//     return NextResponse.json({ message: "Product not found" }, { status: 404 });
//   }

//   return NextResponse.json(product);
// }










import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CategoryModel } from "@/models/Category";
import { uploadManyBuffersToCloudinary } from "@/utils/cloudinary";
import { ProductModel } from "@/models/Product";
import { connectDB } from "@/lib/connectDB";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    // const token = req.cookies.get("token")?.value;
    // if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // try {
    //   jwt.verify(token, process.env.JWT_KEY!);
    // } catch {
    //   return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    // }

    const formData = await req.formData();

    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const brand = String(formData.get("brand") || "").trim();
    const price = Number(formData.get("price"));
    const salePercentage = Number(formData.get("salePercentage") || 0);
    const stock = Number(formData.get("stock"));
    const status = String(formData.get("status") || "active");
    const sizes = formData.getAll("sizes") as string[];
    const coverImagePublicId = String(formData.get("coverImagePublicId") || "").trim();
    const existingImages = JSON.parse(String(formData.get("existingImages") || "[]"));

    // Colors — JSON parse
    let colors: { hex: string; name: string }[] = [];
    const rawColors = formData.get("colors");
    if (typeof rawColors === "string") {
      try {
        const parsed = JSON.parse(rawColors);
        if (Array.isArray(parsed)) {
          colors = parsed.map((c) => ({ hex: c.hex, name: c.name }));
        }
      } catch {
        return NextResponse.json({ message: "Invalid colors format" }, { status: 400 });
      }
    }

    if (!title || !description || !category || !brand) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingCategory = await CategoryModel.findById(category);
    if (!existingCategory) return NextResponse.json({ message: "Category not found" }, { status: 404 });

    // New images upload
    const imageFiles = formData.getAll("images") as File[];
    let newImages: any[] = [];

    if (imageFiles.length) {
      const buffers = await Promise.all(
        imageFiles.map(async (file) => Buffer.from(await file.arrayBuffer()))
      );
      const uploaded = await uploadManyBuffersToCloudinary(buffers);
      newImages = uploaded.map((img, idx) => ({
        url: img.url,
        publicId: img.publicId,
        isCover: coverImagePublicId === `new-${idx}`,
      }));
    }

    // Merge images
    const allImages = [...existingImages, ...newImages];

    const finalImages = allImages.map((img: any) => ({
      ...img,
      isCover: coverImagePublicId.startsWith("new-")
        ? img.isCover
        : img.publicId === coverImagePublicId,
    }));

    const { id } = await params;

    const updated = await ProductModel.findByIdAndUpdate(
      id,
      { title, description, category, brand, price, salePercentage, stock, status, sizes, colors, images: finalImages },
      { new: true }
    ).populate("category", "name");

    if (!updated) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    return NextResponse.json(updated);

  } catch (error: any) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = await params;
  const product = await ProductModel.findById(id).populate("category", "name");
  if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}
