import { create } from "zustand";
import type { CustomerWishlistItem } from "./types";
import toast from "react-hot-toast";
import { getCustomerWishlist, removeCustomerWishlistItem } from "./api";

type CustomerWishlistStore = {
  items: CustomerWishlistItem[];
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
    setOpen: (value) => set({ isOpen: value }),
    setItems: (items) => set({ items }),
    clear: () => set({ items: [], isOpen: false }),
//  const { isOpen, setOpen, items, removeItem } = useCustomerWishlistStore();
    loadWishlist: async () => {
      try {
        const response = await getCustomerWishlist();
        console.log("wisheee", response);

        set({ items: response.items ?? [] });
      } catch {
        set({ items: [] });
      }
    },

    removeItem: async (productId) => {
      try {
        const response = await removeCustomerWishlistItem(productId);
        set({ items: response?.items ?? [] });
        toast.success("Removed from wishlist");
      } catch {
        toast.error("Failed to remove from wishlist");
      }
    },
  })
);
