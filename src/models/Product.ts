// import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export type ProductImage = {
//   url: string;
//   publicId: string;
//   isCover: boolean;
// };

// export type ProductSize = "S" | "M" | "L" | "XL";
// export type ProductStatus = "active" | "inactive";

// export type ProductType = {
//   title: string;
//   description: string;
//   category: Types.ObjectId;
//   brand: string;
//   stock: number;
//   images: ProductImage[];
//   colors: string[];
//   sizes: ProductSize[];
//   price: number;
//   salePercentage: number;
//   status: ProductStatus;
//   createdBy: Types.ObjectId;
//   createdAt: Date;
//   updatedAt: Date;
// };

// export type ProductDocument = HydratedDocument<ProductType>;

// // ─── Sub-Schema ───────────────────────────────────────────────────────────────

// const productImageSchema = new mongoose.Schema<ProductImage>(
//   {
//     url: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     publicId: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     isCover: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { _id: false }
// );

// // ─── Main Schema ──────────────────────────────────────────────────────────────

// const ProductSchema = new mongoose.Schema<ProductType>(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     category: {
//       type: Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     brand: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     stock: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     images: {
//       type: [productImageSchema],
//       default: [],
//     },
//     colors: {
//       type: [String],
//       default: [],
//     },
//     sizes: {
//       type: [String],
//       default: [],
//       enum: ["S", "M", "L", "XL"] satisfies ProductSize[],
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     salePercentage: {
//       type: Number,
//       default: 0,
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive"] satisfies ProductStatus[],
//       default: "active",
//     },
//     createdBy: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// // ─── Model (Next.js hot-reload safe) ─────────────────────────────────────────

// // NOTE: Renamed export to 'ProductModel' to avoid conflict with 'ProductType' type above.
// export const ProductModel =
//   (mongoose.models.Product as mongoose.Model<ProductType>) ||
//   mongoose.model<ProductType>("Product", ProductSchema);





import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

// ─── Types ─────────────────────────────────────────────

export type ProductImage = {
  url: string;
  publicId: string;
  isCover: boolean;
};

export type ProductSize = "S" | "M" | "L" | "XL";
export type ProductStatus = "active" | "inactive";

export type ProductColor = {
  hex: string;
  name: string;
};

export type ProductType = {
  title: string;
  description: string;
  category: Types.ObjectId;
  brand: string;
  stock: number;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
  price: number;
  salePercentage: number;
  status: ProductStatus;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductDocument = HydratedDocument<ProductType>;

// ─── Sub Schemas ───────────────────────────────────────

const productImageSchema = new mongoose.Schema<ProductImage>(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, required: true, trim: true },
    isCover: { type: Boolean, default: false },
  },
  { _id: false }
);

const productColorSchema = new mongoose.Schema<ProductColor>(
  {
    hex: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
  },
  { _id: false }
);

// ─── Main Schema ───────────────────────────────────────

const ProductSchema = new mongoose.Schema<ProductType>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: { type: String, required: true, trim: true },

    stock: { type: Number, required: true, min: 0 },

    images: {
      type: [productImageSchema],
      default: [],
    },

    colors: {
      type: [productColorSchema],
      default: [],
    },

    sizes: {
      type: [String],
      default: [],
      enum: ["S", "M", "L", "XL"] satisfies ProductSize[],
    },

    price: { type: Number, required: true },

    salePercentage: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive"] satisfies ProductStatus[],
      default: "active",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ─── Model ─────────────────────────────────────────────

export const ProductModel =
  (mongoose.models.Product as mongoose.Model<ProductType>) ||
  mongoose.model<ProductType>("Product", ProductSchema);






 


 