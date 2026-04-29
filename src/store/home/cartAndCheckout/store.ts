"use client";

import { create } from "zustand";
import { loadStripe } from "@stripe/stripe-js";
import type {
  AddCustomerCartItemBody,
  AppliedPromo,
  CheckoutAddressOption,
  CustomerCartItemIdentifier,
  CustomerCartResponse,
  GuestCartItem,
  SyncCustomerCartBody,
} from "./types";
import {
  addCustomerCartItem,
  applyCustomerPromo,
  confirmCheckout,
  createCheckoutSession,
  decreaseCustomerCartItem,
  getCheckoutData,
  increaseCustomerCartItem,
  payWithPointsCheckout,
  removeCustomerCartItem,
  syncCustomerCart,
} from "./api";
 import toast from "react-hot-toast";

type AddCartItemInput = AddCustomerCartItemBody & {
  title: string;
  brand: string;
  image: string;
  finalPrice: number;
};

// ✅ Razorpay args hate, Stripe ke liye name/email same hai
// type StripeArgs = {
//   isSignedIn: boolean;
//   name: string;
//   email: string;
//   onSuccess: () => void;
// };



type StripeArgs = {
  isSignedIn: boolean;
  onSuccess: () => void; // ab sirf ye chahiye
};
type PointsArgs = {
  isSignedIn: boolean;
  onSuccess: () => void;
};

type CustomerCartAndCheckoutStore = {
  cart: CustomerCartResponse;
  isOpen: boolean;
  loading: boolean;
  addresses: CheckoutAddressOption[];
  selectedAddressId: string;
  promoInput: string;
  appliedPromo: AppliedPromo | null;
  points: number;
  promoLoading: boolean;
  checkoutLoading: boolean;
  pointsCheckoutLoading: boolean;
  setOpen: (value: boolean) => void;
  setCart: (cart: CustomerCartResponse) => void;
  loadCart: (isSignedIn: boolean) => Promise<void>;
  addItem: (item: AddCartItemInput, isSignedIn: boolean) => Promise<void>;
  increase: (item: CustomerCartItemIdentifier, isSignedIn: boolean) => Promise<void>;
  decrease: (item: CustomerCartItemIdentifier, isSignedIn: boolean) => Promise<void>;
  remove: (item: CustomerCartItemIdentifier, isSignedIn: boolean) => Promise<void>;
  setPromoInput: (value: string) => void;
  clearPromo: () => void;
  applyPromo: () => Promise<void>;
  startStripeCheckout: (args: StripeArgs) => Promise<void>; // ✅ renamed
  startPointsCheckout: (args: PointsArgs) => Promise<void>;
  clear: () => void;
};

const emptyCart: CustomerCartResponse = {
  items: [],
  totalQuantity: 0,
};

const defaultUiState = {
  loading: false,
  addresses: [] as CheckoutAddressOption[],
  selectedAddressId: "",
  promoInput: "",
  appliedPromo: null as AppliedPromo | null,
  points: 0,
  promoLoading: false,
  checkoutLoading: false,
  pointsCheckoutLoading: false,
};

// ─── Guest Cart Helpers ───────────────────────────────────────────────────────

const GUEST_CART_KEY = "guest_cart_items";

function readGuestItems(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const items = JSON.parse(
      window.localStorage.getItem(GUEST_CART_KEY) || "[]"
    );
    return Array.isArray(items)
      ? items.filter(
          (item) => item?.productId && Number(item?.quantity) > 0
        )
      : [];
  } catch {
    return [];
  }
}

function writeGuestItems(items: GuestCartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

function clearGuestItems() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(GUEST_CART_KEY);
}

function getGuestResponse(): CustomerCartResponse {
  const items = readGuestItems();
  return {
    items,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

function getGuestSyncPayload(): SyncCustomerCartBody {
  return {
    items: readGuestItems().map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
    })),
  };
}

function isSameItem(
  item: CustomerCartItemIdentifier,
  target: CustomerCartItemIdentifier
) {
  return (
    item.productId === target.productId &&
    (item.color || "") === (target.color || "") &&
    (item.size || "") === (target.size || "")
  );
}

function addGuestItem(item: Omit<GuestCartItem, "quantity">) {
  const items = readGuestItems();
  const index = items.findIndex((cartItem) => isSameItem(cartItem, item));

  if (index >= 0) {
    items[index] = { ...items[index], quantity: items[index].quantity + 1 };
  } else {
    items.push({ ...item, quantity: 1 });
  }

  writeGuestItems(items);
  return getGuestResponse();
}

function increaseGuestItem(item: CustomerCartItemIdentifier) {
  const items = readGuestItems().map((cartItem) =>
    isSameItem(cartItem, item)
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
  writeGuestItems(items);
  return getGuestResponse();
}

function decreaseGuestItem(item: CustomerCartItemIdentifier) {
  const items = readGuestItems()
    .map((cartItem) =>
      isSameItem(cartItem, item)
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
    .filter((cartItem) => cartItem.quantity > 0);
  writeGuestItems(items);
  return getGuestResponse();
}

function removeGuestItem(item: CustomerCartItemIdentifier) {
  const items = readGuestItems().filter(
    (cartItem) => !isSameItem(cartItem, item)
  );
  writeGuestItems(items);
  return getGuestResponse();
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCustomerCartAndCheckoutStore =
  create<CustomerCartAndCheckoutStore>((set, get) => ({
    cart: emptyCart,
    isOpen: false,
    ...defaultUiState,

    setOpen: (value) => set({ isOpen: value }),
    setCart: (cart) => set({ cart }),

    loadCart: async (isSignedIn) => {
      try {
        set({ loading: true });

        if (isSignedIn) {
          const guestPayload = getGuestSyncPayload();
          console.log("your ar login");
          

          if (guestPayload.items.length) {
            const syncedCart = await syncCustomerCart(guestPayload);
            clearGuestItems();
            set({ cart: syncedCart ?? emptyCart });
            console.log("s");
            
          }

          const response = await getCheckoutData();
          console.log(response);
          
          const cart = response?.cart ?? emptyCart;
          const addresses = response?.addresses?.items ?? [];
          const defaultAddress =
            addresses.find((item) => item.isDefault) || addresses[0] || null;
            console.log(defaultAddress);
            

          set({
            loading: false,
            cart,
            addresses,
            selectedAddressId: defaultAddress?._id ?? "",
            points: response?.points ?? 0,
          });

          return;
        }

        set({
          loading: false,
          cart: getGuestResponse(),
          addresses: [],
          selectedAddressId: "",
          points: 0,
        });
      } catch {
        set({
          loading: false,
          cart: isSignedIn ? emptyCart : getGuestResponse(),
        });
      }
    },

    addItem: async (item, isSignedIn) => {
      try {
        if (isSignedIn) {
          const response = await addCustomerCartItem({
            productId: item.productId,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          });
          console.log(response,"sssssssssssssss");
          
          set({ cart: response ?? emptyCart });
        } else {
          set({
            cart: addGuestItem({
              productId: item.productId,
              title: item.title,
              brand: item.brand,
              color: item.color,
              image: item.image,
              finalPrice: item.finalPrice,
              size: item.size,
            }),
          });
        }
        toast.success("Added to cart");}
      // } catch {
      //   toast.error("Failed to add in cart");
      // }

catch (error) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Failed to add in cart");
  }
}
    },

    increase: async (item, isSignedIn) => {
      try {
        const response = isSignedIn
          ? await increaseCustomerCartItem(item)
          : increaseGuestItem(item);
        set({ cart: response ?? emptyCart });
        toast.success("Cart updated");
      } 
      
      // catch {
      //   toast.error("Failed to update cart");
      // }

      catch (error) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Failed to add in cart");
  }
}
    },

    decrease: async (item, isSignedIn) => {
      try {
        const response = isSignedIn
          ? await decreaseCustomerCartItem(item)
          : decreaseGuestItem(item);
        set({ cart: response ?? emptyCart });
        toast.success("Cart updated");
      } catch {
        toast.error("Failed to update cart");
      }
    },

    remove: async (item, isSignedIn) => {
      try {
        const response = isSignedIn
          ? await removeCustomerCartItem(item)
          : removeGuestItem(item);
        set({ cart: response ?? emptyCart });
        toast.success("Cart item removed");
      } catch {
        toast.error("Failed to remove from cart");
      }
    },

    setPromoInput: (value) => set({ promoInput: value }),
    clearPromo: () => set({ promoInput: "", appliedPromo: null }),

    applyPromo: async () => {
      const { promoInput, cart } = get();

      const subtotal = cart.items.reduce(
        (sum, item) => sum + item.finalPrice * item.quantity,
        0
      );

      if (!promoInput.trim()) {
        set({ appliedPromo: null });
        return;
      }

      try {
        set({ promoLoading: true });
        const response = await applyCustomerPromo({
          code: promoInput.trim(),
          orderValue: subtotal,
        });

        if (!response?.code) {
          set({ appliedPromo: null, promoLoading: false });
          return;
        }

        set({ appliedPromo: response, promoInput: response.code, promoLoading: false });
        toast.success("Promo successfully applied");
      } catch {
        set({ appliedPromo: null, promoLoading: false });
        toast.error("Unable to apply promo");
      }
    },

    clear: () => set({ cart: emptyCart, isOpen: false, ...defaultUiState }),

    // ✅ Razorpay hata ke Stripe
    // startStripeCheckout: async ({ isSignedIn, name, email, onSuccess }) => {
    //   const { selectedAddressId, appliedPromo, cart } = get();

    //   if (!isSignedIn) { toast.error("Sign in to checkout"); return; }
    //   if (!selectedAddressId) { toast.error("Add a default address from profile section"); return; }
    //   if (!cart.items.length) { toast.error("Your cart is empty"); return; }

    //   try {
    //     set({ checkoutLoading: true });

    //     const session = await createCheckoutSession({
    //       addressId: selectedAddressId,
    //       promoCode: appliedPromo?.code || undefined,
    //     });

    //     if (!session.stripe?.clientSecret || !session.order._id) {
    //       throw new Error("Invalid checkout session");
    //     }

    //     // Stripe load karo
    //     const stripe = await loadStripe(session.stripe.publishableKey);

    //     if (!stripe) throw new Error("Stripe failed to load");

    //     // Payment confirm karo
    //     const { error, paymentIntent } = await stripe.confirmCardPayment(
    //       session.stripe.clientSecret,
    //       {
    //         payment_method: {
    //           card: { token: "tok_visa" }, // test mode mein test token
    //           billing_details: { name, email },
    //         },
    //       }
    //     );

    //     if (error) {
    //       set({ checkoutLoading: false });
    //       toast.error(error.message || "Payment failed");
    //       return;
    //     }

    //     if (paymentIntent?.status === "succeeded") {
    //       const confirmed = await confirmCheckout({
    //         orderId: session.order._id,
    //         paymentIntentId: paymentIntent.id,
    //       });

    //       if (!confirmed._id) throw new Error("Order confirmation failed");

    //       set({ cart: emptyCart, isOpen: false, ...defaultUiState });
    //       toast.success("Payment successful");
    //       onSuccess();
    //     }
    //   } catch {
    //     set({ checkoutLoading: false });
    //     toast.error("Unable to start checkout");
    //   }
    // },

    startStripeCheckout: async ({ isSignedIn, onSuccess }) => {
  const { selectedAddressId, appliedPromo, cart } = get();

  if (!isSignedIn) { toast.error("Sign in to checkout"); return; }
  if (!selectedAddressId) { toast.error("Add a default address"); return; }
  if (!cart.items.length) { toast.error("Cart is empty"); return; }

  try {
    set({ checkoutLoading: true });

    const session = await createCheckoutSession({
      addressId: selectedAddressId,
      promoCode: appliedPromo?.code || undefined,
    });

    if (!session.url) throw new Error("No redirect URL");

    // 👇 Stripe hosted page pe redirect
    window.location.href = session.url;

  } catch {
    set({ checkoutLoading: false });
    toast.error("Unable to start checkout");
  }
},

    startPointsCheckout: async ({ isSignedIn, onSuccess }) => {
      const { selectedAddressId, appliedPromo, points, cart } = get();

      const subTotal = cart.items.reduce(
        (sum, item) => sum + item.finalPrice * item.quantity,
        0
      );
      const discountAmount = appliedPromo
        ? Math.round((subTotal * appliedPromo.percentage) / 100)
        : 0;
      const totalAmount = Math.max(subTotal - discountAmount, 0);

      if (!isSignedIn) { toast.error("Sign in to checkout"); return; }
      if (!selectedAddressId) { toast.error("Add a default address from profile section"); return; }
      if (!cart.items.length) { toast.error("Your cart is empty"); return; }
      if (points < totalAmount) { toast.error("Not enough points"); return; }

      try {
        set({ pointsCheckoutLoading: true });

        const response = await payWithPointsCheckout({
          addressId: selectedAddressId,
          promoCode: appliedPromo?.code || undefined,
        });

        if (!response._id) throw new Error("Unable to place order");

        set({
          cart: emptyCart,
          isOpen: false,
          ...defaultUiState,
          points: response.totalPoints ?? Math.max(points - totalAmount, 0),
        });

        toast.success("Order placed");
        onSuccess();
      } catch {
        set({ pointsCheckoutLoading: false });
        toast.error("Failed to place order with points");
      }
    },
  }));