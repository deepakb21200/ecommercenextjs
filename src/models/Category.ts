

import mongoose, { HydratedDocument } from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CategoryType = {
  name: string;
  image: string;
  imagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryDocument = HydratedDocument<CategoryType>;

// ─── Schema ───────────────────────────────────────────────────────────────────

const CategorySchema = new mongoose.Schema<CategoryType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    // Cloudinary public_id
    imagePublicId: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Model ────────────────────────────────────────────────────────────────────

export const CategoryModel =
  (mongoose.models.Category as mongoose.Model<CategoryType>) ||
  mongoose.model<CategoryType>("Category", CategorySchema);