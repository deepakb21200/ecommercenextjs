"use client"

import { create } from "zustand";
import { AdminDashboardLite, getAdminDashboardLite } from "./api";

export const fallbackStats: AdminDashboardLite = {
  totalProducts: 0,
  totalCategories: 0,
  totalSales: 0,
  totalOrders: 0,
 
};

type AdminDashboardStore = {
  stats: AdminDashboardLite;
  loading: boolean;
  fetchDashboard: () => Promise<void>;
  error: string;
}


export const useAdminDashboardLiteStore =
  create<AdminDashboardStore>((set) => ({
    stats: fallbackStats,
    loading: true,
    error: "",
 
    fetchDashboard: async () => {
      try {
        set({ loading: true });
        const response = await getAdminDashboardLite();
        set({  stats: response ?? fallbackStats, error: "" });
      } catch {
        set({
          stats: fallbackStats,
          error: "Error while fetching store details!"

        });
      } finally {
        set({ loading: false});
      }
    },
  }));