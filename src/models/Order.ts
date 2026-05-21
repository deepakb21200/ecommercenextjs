// import mongoose, { HydratedDocument, model, Schema, Types } from "mongoose";

// // ─── Types ─────────────────────────────────────────────────────────────

// export type PaymentStatus = "pending" | "paid" | "failed";

// export type OrderStatus =
//   | "placed"
//   | "shipped"
//   | "delivered"
//   | "cancelled";

// export type OrderItem = {
//   product: Types.ObjectId;
//   quantity: number;
// };

// export type OrderType = {
//   user: Types.ObjectId;
//   customerName: string;
//   customerEmail: string;
//   items: OrderItem[];
//   totalItems: number;
//   deliveryName: string;
//   deliveryAddress: string;
//   promoCode?: string;
//   discountAmount: number;
//   totalAmount: number;
//   paymentStatus: PaymentStatus;
//   orderStatus: OrderStatus;
//   stripeSessionId: string;

//   paymentId?: string;
//   paidAt?: Date | null;
//   deliveredAt?: Date | null;

//   createdAt: Date;
//   updatedAt: Date;

//   expiresAt?: Date | null;
// };

// export type OrderDocument = HydratedDocument<OrderType>;

// // ─── Sub-Schema ───────────────────────────────────────────────────────

// const OrderItemsSchema = new Schema<OrderItem>(
//   {
//     product: {
//       type: Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//   },
//   { _id: false }
// );

// // ─── Main Schema ───────────────────────────────────────────────────────

// const OrderSchema = new Schema<OrderType>(
//   {
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     customerName: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     customerEmail: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     items: {
//       type: [OrderItemsSchema],
//       default: [],
//     },

//     totalItems: {
//       type: Number,
//       required: true,
//       min: 1,
//     },

//     deliveryName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     deliveryAddress: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     promoCode: {
//       type: String,
//       default: "",
//       uppercase: true,
//       trim: true,
//     },

//     discountAmount: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     totalAmount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "failed"],
//       default: "pending",
//     },

//     orderStatus: {
//       type: String,
//       enum: ["placed", "shipped", "delivered"],
//       default: "placed",
//     },

//     stripeSessionId: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     paymentId: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     paidAt: {
//       type: Date,
//       default: null,
//     },

//     deliveredAt: {
//       type: Date,
//       default: null,
//     },

//     expiresAt: {
//       type: Date,
//       default: null,
//       index: true,
//     },
//   },
//   { timestamps: true }
// );

// // ─── Indexes ───────────────────────────────────────────────────────────

// OrderSchema.index({ user: 1, createdAt: -1 });
// OrderSchema.index({ orderStatus: 1, createdAt: -1 });
// OrderSchema.index({ paymentStatus: 1, createdAt: -1 });

// // ─── Model ─────────────────────────────────────────────────────────────

// export const OrderModel =
//   (mongoose.models.Order as mongoose.Model<OrderType>) ||
//   model<OrderType>("Order", OrderSchema);














import mongoose, { HydratedDocument, model, Schema, Types } from "mongoose";

// ─── Types ─────────────────────────────────────────────────────────────

export type PaymentStatus = "pending" | "paid" | "failed";

// ✅ "cancelled" added — webhook session.expired me set hoga
export type OrderStatus =
  | "placed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  product: Types.ObjectId;
  quantity: number;
};

export type OrderType = {
  user: Types.ObjectId;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalItems: number;
  deliveryName: string;
  deliveryAddress: string;
  promoCode?: string;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  stripeSessionId: string;
  paymentId?: string;
  paidAt?: Date | null;
  deliveredAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date | null;
};

export type OrderDocument = HydratedDocument<OrderType>;

// ─── Sub-Schema ───────────────────────────────────────────────────────

const OrderItemsSchema = new Schema<OrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

// ─── Main Schema ───────────────────────────────────────────────────────

const OrderSchema = new Schema<OrderType>(
  {
    user:          { type: Schema.Types.ObjectId, ref: "User", required: true },
    customerName:  { type: String, default: "", trim: true },
    customerEmail: { type: String, default: "", trim: true },
    items:         { type: [OrderItemsSchema], default: [] },
    totalItems:    { type: Number, required: true, min: 1 },
    deliveryName:  { type: String, required: true, trim: true },
    deliveryAddress: { type: String, required: true, trim: true },
    promoCode:     { type: String, default: "", uppercase: true, trim: true },
    discountAmount: { type: Number, default: 0, min: 0 },
    totalAmount:   { type: Number, required: true, min: 0 },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"] satisfies PaymentStatus[],
      default: "pending",
    },

    // ✅ "cancelled" enum mein add kiya
    orderStatus: {
      type: String,
      enum: ["placed", "shipped", "delivered", "cancelled"] satisfies OrderStatus[],
      default: "placed",
    },

    stripeSessionId: { type: String, default: "", trim: true },
    paymentId:       { type: String, default: "", trim: true },
    paidAt:          { type: Date, default: null },
    deliveredAt:     { type: Date, default: null },
    expiresAt:       { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ orderStatus: 1, createdAt: -1 });
OrderSchema.index({ paymentStatus: 1, createdAt: -1 });

export const OrderModel =
  (mongoose.models.Order as mongoose.Model<OrderType>) ||
  model<OrderType>("Order", OrderSchema);