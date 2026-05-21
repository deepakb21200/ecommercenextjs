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

  console.log(res);
  

  return res.json();
}








export const dummyPromos = [
  {
    _id: "p1",
    code: "WELCOME10",
    percentage: 10,
    count: 120,
    minimumOrderValue: 499,
    startsAt: "2025-01-01T00:00:00.000Z",
    endsAt: "2026-12-31T00:00:00.000Z",
  },
  {
    _id: "p2",
    code: "SALE20",
    percentage: 20,
    count: 80,
    minimumOrderValue: 999,
    startsAt: "2025-02-01T00:00:00.000Z",
    endsAt: "2026-11-30T00:00:00.000Z",
  },
  {
    _id: "p3",
    code: "FLAT15",
    percentage: 15,
    count: 50,
    minimumOrderValue: 799,
    startsAt: "2025-03-10T00:00:00.000Z",
    endsAt: "2026-10-10T00:00:00.000Z",
  },
  {
    _id: "p4",
    code: "NEWUSER5",
    percentage: 5,
    count: 300,
    minimumOrderValue: 199,
    startsAt: "2025-01-15T00:00:00.000Z",
    endsAt: "2026-09-15T00:00:00.000Z",
  },
  {
    _id: "p5",
    code: "BIGSAVE25",
    percentage: 25,
    count: 40,
    minimumOrderValue: 1499,
    startsAt: "2025-04-01T00:00:00.000Z",
    endsAt: "2026-08-01T00:00:00.000Z",
  },
  {
    _id: "p6",
    code: "HOTDEAL30",
    percentage: 30,
    count: 25,
    minimumOrderValue: 1999,
    startsAt: "2025-05-01T00:00:00.000Z",
    endsAt: "2026-07-01T00:00:00.000Z",
  },
  {
    _id: "p7",
    code: "FESTIVE50",
    percentage: 50,
    count: 10,
    minimumOrderValue: 2999,
    startsAt: "2025-06-01T00:00:00.000Z",
    endsAt: "2026-06-01T00:00:00.000Z",
  },
  {
    _id: "p8",
    code: "LAST10",
    percentage: 10,
    count: 60,
    minimumOrderValue: 599,
    startsAt: "2025-07-01T00:00:00.000Z",
    endsAt: "2026-12-01T00:00:00.000Z",
  },
];