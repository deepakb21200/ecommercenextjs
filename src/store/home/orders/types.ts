// export type CustomerOrderStatus =
//   | "placed"
//   | "shipped"
//   | "delivered"
//   | "cancelled";
// export type CustomerPaymentStatus =
//   | "pending"
//   | "paid"
//   | "failed";

// export type CustomerOrder = {
//   _id: string;
//   code: string;
//   totalItems: number;
//   totalAmount: number;
//   paymentStatus: CustomerPaymentStatus;
//   orderStatus: CustomerOrderStatus;
//   paidAt?: string | null;
//   deliveredAt?: string | null;
//   createdAt: string;

//   expiresAt?: string | null;
// };

// export type CustomerOrdersResponse = {
//   items: CustomerOrder[];
// };











// store/home/orders/types.ts

// ✅ "cancelled" added
export type CustomerOrderStatus =
  | "placed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type CustomerPaymentStatus =
  | "pending"
  | "paid"
  | "failed";

export type CustomerOrder = {
  _id: string;
  code: string;
  totalItems: number;
  totalAmount: number;
  paymentStatus: CustomerPaymentStatus;
  orderStatus: CustomerOrderStatus;
  paidAt?: string | null;
  deliveredAt?: string | null;
  createdAt: string;
  expiresAt?: string | null;
};

export type CustomerOrdersResponse = {
  items: CustomerOrder[];
};

// ─── Admin types ─────────────────────────────────────────────────────

export type AdminOrderStatus =
  | "placed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type AdminPaymentStatus = "pending" | "paid" | "failed";

export type AdminOrder = {
  _id: string;
  code: string;
  customerName: string;
  customerEmail: string;
  totalItems: number;
  totalAmount: number;
  paymentStatus: AdminPaymentStatus;
  orderStatus: AdminOrderStatus;
  paidAt?: string | null;
  deliveredAt?: string | null;
  createdAt: string;
};