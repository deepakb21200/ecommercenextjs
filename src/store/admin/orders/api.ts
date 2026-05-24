// store/admin/orders/api.ts

import type { AdminOrderStatus, AdminOrdersResponse, AdminUpdateOrderStatusResponse } from "@/components/admin/orders/types";

const BASE_URL = "/api/admin";
 

// export async function extractAdminOrders(search = ""): Promise<AdminOrdersResponse> {
//   const query = search.trim()
//     ? `?search=${encodeURIComponent(search.trim())}`
//     : "";

//   const res = await fetch(`${BASE_URL}/orders${query}`, {
//     credentials: "include",
//   });

//   if (!res.ok) throw new Error("Failed to fetch orders");
//   return res.json();
// }


export async function extractAdminOrders(
  search = "",
  signal?: AbortSignal
) {
  const query = search.trim()
    ? `?search=${encodeURIComponent(search.trim())}`
    : "";

  const res = await fetch(
    `/api/admin/orders${query}`,
    {
      credentials: "include",
      signal,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}

export async function updateAdminOrderStatus(
  orderId: string,
  orderStatus: AdminOrderStatus
): Promise<AdminUpdateOrderStatusResponse> {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderStatus }),
  });

  if (!res.ok) throw new Error("Failed to update order status");

  return res.json();
}