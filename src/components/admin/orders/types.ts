// export type AdminOrderStatus =
//   | "placed"
//   | "shipped"
//   | "delivered";

// export type AdminPaymentStatus = "pending" | "paid" | "failed";

// export type AdminOrder = {
//   _id: string;
//   code: string;
//   customerName: string;
//   customerEmail: string;
//   totalItems: number;
//   totalAmount: number;
//   paymentStatus: AdminPaymentStatus;
//   orderStatus: AdminOrderStatus;
//   paidAt?: string | null;
//   deliveredAt?: string | null;
//   returnedAt?: string | null;
//   createdAt: string;
// };

// export type AdminOrdersResponse = {
//   items: AdminOrder[];
// };

// export type AdminUpdateOrderStatusResponse = {
//   _id: string;
//   orderStatus: AdminOrderStatus;
//   deliveredAt?: string | null;
//   returnedAt?: string | null;
// };




// components/admin/orders/types.ts

export type AdminPaymentStatus = "pending" | "paid" | "failed";

// Admin sirf placed/shipped/delivered set kar sakta hai
// cancelled webhook se hota hai — admin manually nahi karta
export type AdminOrderStatus = "placed" | "shipped" | "delivered" | "cancelled";

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

export type AdminOrdersResponse = {
  items: AdminOrder[];
};

export type AdminUpdateOrderStatusResponse = {
  _id: string;
  orderStatus: AdminOrderStatus;
  deliveredAt?: string | null;
};