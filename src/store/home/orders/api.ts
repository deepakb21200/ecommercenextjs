export async function getCustomerOrders() {
  const res = await fetch("/api/customer/orders", {
    method: "GET",
    credentials: "include", // 👈 important (withCredentials ka replacement)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export async function returnCustomerOrder(orderId: string) {
  const res = await fetch(`/api/customer/orders/${orderId}/return`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to return order");
  }

  return res.json();
}