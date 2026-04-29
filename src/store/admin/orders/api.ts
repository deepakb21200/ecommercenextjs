import { AdminOrderStatus } from "@/components/admin/orders/types";

const BASE_URL = "/api/admin";

// ================= GET ORDERS =================

export async function extractAdminOrders() {
  const res = await fetch(`${BASE_URL}/orders`);

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json(); // AdminOrdersResponse
}

// ================= UPDATE STATUS =================

export async function updateAdminOrderStatus(
  orderId: string,
  orderStatus: AdminOrderStatus
) {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderStatus }),
  });

  if (!res.ok) {
    throw new Error("Failed to update order status");
  }

  return res.json(); // AdminUpdateOrderStatusResponse
}