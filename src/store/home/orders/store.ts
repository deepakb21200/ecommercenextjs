import { create } from "zustand";
import type { CustomerOrder } from "./types";
import { getCustomerOrders,  } from "./api";
 

type CustomerOrdersStore = {
  isOpen: boolean;
  loading: boolean;
  items: CustomerOrder[];
  openOrders: () => Promise<void>;
  closeOrders: () => void;
  loadOrders: () => Promise<void>;
 
  clear: () => void;
};

export const useCustomerOrdersStore = create<CustomerOrdersStore>(
  (set, get) => ({
    isOpen: false,
    loading: false,
    items: [],
    loadOrders: async () => {
      try {
        set({ loading: true });
        const response = await getCustomerOrders();
        set({ items: response?.items ?? [] });
      } catch {
        set({ items: [] });
      } finally {
        set({ loading: false });
      }
    },

    openOrders: async () => {
      set({ isOpen: true });
      await get().loadOrders();
    },
    closeOrders: () => set({ isOpen: false }),
    clear: () => {
      set({
        isOpen: false,
        loading: false,
        items: [],
      });
    },
   
  }),
);
