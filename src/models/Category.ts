import mongoose, { HydratedDocument } from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CategoryType = {
  name: string;
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
  },
  { timestamps: true }
);

// ─── Model (Next.js hot-reload safe) ─────────────────────────────────────────

// NOTE: Renamed export to 'CategoryModel' to avoid conflict with 'CategoryType' type above.
export const CategoryModel =
  (mongoose.models.Category as mongoose.Model<CategoryType>) ||
  mongoose.model<CategoryType>("Category", CategorySchema);
