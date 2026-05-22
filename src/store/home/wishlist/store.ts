import { create } from "zustand";
import type { CustomerWishlistItem } from "./types";
import toast from "react-hot-toast";
import { getCustomerWishlist, removeCustomerWishlistItem } from "./api";

type CustomerWishlistStore = {
  items: CustomerWishlistItem[];
  loading: boolean;
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  setItems: (items: CustomerWishlistItem[]) => void;
  loadWishlist: () => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clear: () => void;
};

export const useCustomerWishlistStore = create<CustomerWishlistStore>(
  (set) => ({
    items: [],
    isOpen: false,
    loading: false,
    setOpen: (value) => set({ isOpen: value }),
    setItems: (items) => set({ items }),
    clear: () => set({ items: [], isOpen: false }),
    loadWishlist: async () => {
      try {
        set({ loading: true });
        const response = await getCustomerWishlist();
        console.log("wisheee", response);

        set({ items: response.items ?? [] });
      } catch {
        set({ items: [] });
      }
      finally {
        set({ loading: false });
      }
    },

    removeItem: async (productId) => {
      try {
        const response = await removeCustomerWishlistItem(productId);

        console.log(response);

        set({ items: response?.items ?? [] });
        toast.success("Removed from wishlist");
      } catch {
        toast.error("Failed to remove from wishlist");
      }
    },
  })
);
