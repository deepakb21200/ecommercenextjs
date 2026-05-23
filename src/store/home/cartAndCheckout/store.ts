"use client";

import { create } from "zustand";
import type {
  AddCustomerCartItemBody,
  AppliedPromo,
  CheckoutAddressOption,
  CustomerCartItemIdentifier,
  CustomerCartResponse,
} from "./types";
import {
  addCustomerCartItem,
  applyCustomerPromo,
  createCheckoutSession,
  decreaseCustomerCartItem,
  getCheckoutData,
  increaseCustomerCartItem,
  removeCustomerCartItem,
} from "./api";
import toast from "react-hot-toast";

type AddCartItemInput = AddCustomerCartItemBody & {
  title: string;
  brand: string;
  image: string;
  finalPrice: number;
};

type CustomerCartAndCheckoutStore = {
  cart: CustomerCartResponse;
  isOpen: boolean;
  loading: boolean;
  addresses: CheckoutAddressOption[];
  selectedAddressId: string;
  promoInput: string;
  appliedPromo: AppliedPromo | null;
  promoLoading: boolean;
  checkoutLoading: boolean;
  setOpen: (value: boolean) => void;
  setCart: (cart: CustomerCartResponse) => void;
  loadCart: () => Promise<void>;
  addItem: (item: AddCartItemInput) => Promise<void>;
  increase: (item: CustomerCartItemIdentifier) => Promise<void>;
  decrease: (item: CustomerCartItemIdentifier) => Promise<void>;
  remove: (item: CustomerCartItemIdentifier) => Promise<void>;
  setPromoInput: (value: string) => void;
  clearPromo: () => void;
  applyPromo: () => Promise<void>;
  startStripeCheckout: () => Promise<void>;
  clear: () => void;
};

const emptyCart: CustomerCartResponse = { items: [], totalQuantity: 0 };

const defaultUiState = {
  loading: false,
  addresses: [] as CheckoutAddressOption[],
  selectedAddressId: "",
  promoInput: "",
  appliedPromo: null as AppliedPromo | null,
  promoLoading: false,
  checkoutLoading: false,
};

export const useCustomerCartAndCheckoutStore = create<CustomerCartAndCheckoutStore>((set, get) => ({
  cart: emptyCart,
  isOpen: false,
  ...defaultUiState,

  setOpen: (value) => set({ isOpen: value }),
  setCart: (cart) => set({ cart }),

  loadCart: async () => {
    try {
      set({ loading: true });
      const response = await getCheckoutData();
      const cart = response?.cart ?? emptyCart;
      const addresses = response?.addresses?.items ?? [];
      const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0] || null;
      set({ cart, addresses, selectedAddressId: defaultAddress?._id ?? "" });
    } catch {
      set({ cart: emptyCart });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (item) => {
    try {
      const response = await addCustomerCartItem({
        productId: item.productId,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      });
      set({ cart: response ?? emptyCart });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add to cart");
    }
  },

  increase: async (item) => {
    try {
      const response = await increaseCustomerCartItem(item);
      set({ cart: response ?? emptyCart, appliedPromo: null, promoInput: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update cart");
    }
  },

  decrease: async (item) => {
    try {
      const response = await decreaseCustomerCartItem(item);
      set({ cart: response ?? emptyCart, appliedPromo: null, promoInput: "" });
    } catch {
      toast.error("Failed to update cart");
    }
  },

  remove: async (item) => {
    try {
      const response = await removeCustomerCartItem(item);
      set({ cart: response ?? emptyCart, appliedPromo: null, promoInput: "" });
      toast.success("Cart item removed");
    } catch {
      toast.error("Failed to remove from cart");
    }
  },

  setPromoInput: (value) => set({ promoInput: value }),
  clearPromo: () => set({ promoInput: "", appliedPromo: null }),

  applyPromo: async () => {
    const { promoInput, cart } = get();
    if (!promoInput.trim()) { set({ appliedPromo: null }); return; }

    const subtotal = cart.items.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

    try {
      set({ promoLoading: true });
      const response = await applyCustomerPromo({ code: promoInput.trim(), orderValue: subtotal });
      set({ appliedPromo: response.data, promoInput: response.data.code });
      toast.success("Promo applied");
    } catch {
      set({ appliedPromo: null });
      toast.error("Unable to apply promo");
    } finally {
      set({ promoLoading: false });
    }
  },

  clear: () => set({ cart: emptyCart, isOpen: false, ...defaultUiState }),

  startStripeCheckout: async () => {
    const { selectedAddressId, appliedPromo, cart } = get();
    if (!selectedAddressId) { toast.error("Add a default address"); return; }
    if (!cart.items.length) { toast.error("Cart is empty"); return; }

    try {
      set({ checkoutLoading: true });
      const session = await createCheckoutSession({
        addressId: selectedAddressId,
        promoCode: appliedPromo?.code || undefined,
      });
      if (!session.url) throw new Error("No redirect URL");
      window.location.href = session.url;
    } catch {
      set({ checkoutLoading: false });
      toast.error("Unable to start checkout");
    }
  },
}));