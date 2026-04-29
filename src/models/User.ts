


import mongoose, { HydratedDocument } from "mongoose";

// ─── Types ───────────────────────────────────────────────────

export type UserRole = "user" | "admin";

export type Address = {
  fullName: string;
  address: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
};

export type UserType = {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  points: number;
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
};

export type UserDocument = HydratedDocument<UserType>;

// ─── Sub-schema ───────────────────────────────────────────────

const addressSchema = new mongoose.Schema<Address>(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  // { _id: false }
);

// ─── Main Schema ──────────────────────────────────────────────

const UserSchema = new mongoose.Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    points: {
      type: Number,
      default: 0,
    },
    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// ─── Model ───────────────────────────────────────────────────

export const UserModel =
  (mongoose.models.User as mongoose.Model<UserType>) ||
  mongoose.model<UserType>("User", UserSchema);
