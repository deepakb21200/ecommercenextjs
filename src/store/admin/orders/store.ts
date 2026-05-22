// store/admin/orders/store.ts

import { create } from "zustand";
import { extractAdminOrders, updateAdminOrderStatus } from "./api";
import type { AdminOrder, AdminOrderStatus } from "@/components/admin/orders/types";

type AdminOrdersStore = {
  orders: AdminOrder[];
  loading: boolean;
  updatingOrderId: string;
  fetchOrders: () => Promise<void>;
  changeStatus: (orderId: string, orderStatus: AdminOrderStatus) => Promise<void>;
};

export const useAdminOrdersStore = create<AdminOrdersStore>((set) => ({
  orders: [],
  loading: true,
  updatingOrderId: "",

  fetchOrders: async () => {
    try {
      set({ loading: true });

      const data = await extractAdminOrders();

      set({ orders: data?.items ?? [] });
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      set({ orders: [] });
    } finally {
      set({ loading: false });
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