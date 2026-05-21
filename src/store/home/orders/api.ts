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

 



export async function payCustomerOrder(orderId: string) {
  const res = await fetch(`/api/customer/orders/${orderId}/pay`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to create payment session");
  }

  return data as {
    url: string;
  };
}