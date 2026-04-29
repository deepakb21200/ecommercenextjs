import mongoose, { HydratedDocument, model, Schema } from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PromoType = {
  code: string;
  percentage: number;
  count: number;
  minimumOrderValue: number;
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type PromoDocument = HydratedDocument<PromoType>;

// ─── Schema ───────────────────────────────────────────────────────────────────

const PromoSchema = new Schema<PromoType>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    count: {
      type: Number,
      required: true,
      min: 1,
    },
    minimumOrderValue: {
      type: Number,
      required: true,
      min: 0,
    },
    startsAt: {
      type: Date,
      required: true,
    },
    endsAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// ─── Model (Next.js hot-reload safe) ─────────────────────────────────────────

// NOTE: Renamed export to 'PromoModel' to avoid conflict with 'PromoType' type above.
export const PromoModel =
  (mongoose.models.Promo as mongoose.Model<PromoType>) ||
  model<PromoType>("Promo", PromoSchema);
