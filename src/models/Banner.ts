import mongoose, { HydratedDocument, model, Schema, Types } from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BannerItem = {
  imageUrl: string;
  imagePublicId: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type BannerDocument = HydratedDocument<BannerItem>;

// ─── Schema ───────────────────────────────────────────────────────────────────

const bannerSchema = new Schema<BannerItem>(
  {
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    imagePublicId: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ─── Model (Next.js hot-reload safe) ─────────────────────────────────────────

export const Banner =
  (mongoose.models.Banner as mongoose.Model<BannerItem>) ||
  model<BannerItem>("Banner", bannerSchema);
