import mongoose, { HydratedDocument, model, Schema, Types } from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WishlistType = {
  user: Types.ObjectId;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export type WishlistDocument = HydratedDocument<WishlistType>;

// ─── Schema ───────────────────────────────────────────────────────────────────

const wishlistSchema = new Schema<WishlistType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

// ─── Model (Next.js hot-reload safe) ─────────────────────────────────────────

// NOTE: Renamed export to 'WishlistModel' to avoid conflict with 'WishlistType' type above.
export const WishlistModel =
  (mongoose.models.Wishlist as mongoose.Model<WishlistType>) ||
  model<WishlistType>("Wishlist", wishlistSchema);
