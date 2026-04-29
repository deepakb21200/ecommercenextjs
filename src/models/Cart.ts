import mongoose, { HydratedDocument, model, Schema, Types } from "mongoose";
import { ProductSize } from "./Product";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartItem = {
  product: Types.ObjectId;
  quantity: number;
  color?: string;
  size?: ProductSize;
};

export type CartType = {
  user: Types.ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type CartDocument = HydratedDocument<CartType>;

// ─── Sub-Schema ───────────────────────────────────────────────────────────────

const cartItemSchema = new Schema<CartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    color: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL"] satisfies ProductSize[],
    },
  },
  { _id: false }
);

// ─── Main Schema ──────────────────────────────────────────────────────────────

const CartSchema = new Schema<CartType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// ─── Model (Next.js hot-reload safe) ─────────────────────────────────────────

// NOTE: Renamed export to 'CartModel' to avoid conflict with 'CartType' type above.
export const CartModel =
  (mongoose.models.Cart as mongoose.Model<CartType>) ||
  model<CartType>("Cart", CartSchema);
