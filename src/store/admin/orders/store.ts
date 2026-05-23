// store/admin/orders/store.ts

import { create } from "zustand";
import { extractAdminOrders, updateAdminOrderStatus } from "./api";
import type { AdminOrder, AdminOrderStatus } from "@/components/admin/orders/types";

type AdminOrdersStore = {
  orders: AdminOrder[];
  error: string
  loading: boolean;
  hasLoaded: boolean
  updatingOrderId: string;
 
    fetchOrders: (search?: string) => Promise<void>;
  changeStatus: (orderId: string, orderStatus: AdminOrderStatus) => Promise<void>;
};

export const useAdminOrdersStore = create<AdminOrdersStore>((set) => ({
  orders: [],
  loading: true,
  updatingOrderId: "",
  hasLoaded: false,
  error: "",

 

  fetchOrders: async (search = "") => {
    try {
      set({ loading: true, orders: [], error: "" });
      const data = await extractAdminOrders(search);
      set({ orders: data?.items ?? [] });
    } catch {
      set({ orders: [], error: "Failed to fetch orders" });
    } finally {
      set({ loading: false, hasLoaded: true });
    }
  },
  changeStatus: async (orderId, orderStatus) => {
    try {
      set({ updatingOrderId: orderId });

      const res = await updateAdminOrderStatus(orderId, orderStatus);

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId
            ? {
              ...order,
              orderStatus: res.orderStatus,
              deliveredAt: res.deliveredAt ?? order.deliveredAt,
            }
            : order
        ),
      }));
    } catch (error) {
      console.error("Update Order Error:", error);
    } finally {
      set({ updatingOrderId: "" });
    }
  },
}));