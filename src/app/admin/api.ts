// api.ts



export type AdminDashboardLite = {
  totalProducts: number;
  totalCategories: number;
  totalSales: number;
  totalOrders: number;
  totalReturnedOrders: number;
};


export async function getAdminDashboardLite(): Promise<AdminDashboardLite> {
  const res = await fetch("/api/admin/dashboard/lite", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
}