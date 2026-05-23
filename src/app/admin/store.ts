// "use client";

// import { create } from "zustand";
// import { AdminDashboardLite, getAdminDashboardLite } from "./api";

// const fallbackStats: AdminDashboardLite = {
//   totalProducts: 0,
//   totalCategories: 0,
//   totalSales: 0,
//   totalOrders: 0,
//   totalReturnedOrders: 0,
// };

// type AdminDashboardStore = {
//   stats: AdminDashboardLite;
//   loading: boolean;
//   fetchDashboard: () => Promise<void>;
// };

// export const useAdminDashboardLiteStore =
//   create<AdminDashboardStore>((set) => ({
//     stats: fallbackStats,
//     loading: true,

//     fetchDashboard: async () => {
//       try {
//         set({ loading: true });

//         const response = await getAdminDashboardLite();

//         set({
//           stats: response ?? fallbackStats,
//         });
//       } catch {
//         set({
//           stats: fallbackStats,
//         });
//       } finally {
//         set({ loading: false });
//       }
//     },
//   }));















"use client";

import { create } from "zustand";
import { AdminDashboardLite, getAdminDashboardLite } from "./api";

const fallbackStats: AdminDashboardLite = {
  totalProducts: 0,
  totalCategories: 0,
  totalSales: 0,
  totalOrders: 0,
  totalReturnedOrders: 0,
};

type AdminDashboardStore = {
  stats: AdminDashboardLite;
  loading: boolean;
  fetchDashboard: () => Promise<void>;
};

export const useAdminDashboardLiteStore =
  create<AdminDashboardStore>((set) => ({
    stats: fallbackStats,
    loading: true,

    fetchDashboard: async () => {
      try {
        set({ loading: true });

        const response = await getAdminDashboardLite();

        set({
          stats: response ?? fallbackStats,
        });
      } catch {
        set({
          stats: fallbackStats,
        });
      } finally {
        set({ loading: false });
      }
    },
  }));