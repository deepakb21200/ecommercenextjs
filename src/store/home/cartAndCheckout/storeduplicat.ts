"use client"

import { create } from "zustand";
import { loadStripe } from "@stripe/stripe-js"
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
  createCheckoutSession,
  decreaseCustomerCartItem,
  getCheckoutData,
  increaseCustomerCartItem,
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


type StripeArgs = {
  isSignedIn: boolean;


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
  loadCart: (isSignedIn: boolean) => Promise<void>;
  addItem: (item: AddCartItemInput, isSignedIn: boolean) => Promise<void>;
  increase: (item: CustomerCartItemIdentifier, isSignedIn: boolean) => Promise<void>
  decrease: (item: CustomerCartItemIdentifier, isSignedIn: boolean) => Promise<void>
  remove: (item: CustomerCartItemIdentifier, isSignedIn: boolean) => Promise<void>;
  setPromoInput: (value: string) => void;
  clearPromo: () => void;
  applyPromo: () => Promise<void>;
  startStripeCheckout: (args: StripeArgs) => Promise<void>; // ✅ renamed

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
 
  promoLoading: false,
  checkoutLoading: false,

};

// ─── Guest Cart Helpers ───────────────────────────────────────────────────────

const GUEST_CART_KEY = "guest_cart_items";

function readGuestItems(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const items = JSON.parse(
      window.localStorage.getItem(GUEST_CART_KEY) || "[]"
    );
    // return Array.isArray(items)
    //   ? items.filter((item) => item?.productId && Number(item?.quantity) > 0)
    //   : [];

    return Array.isArray(items) ? items : [];
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

  console.log("final", {
    items,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
  });
  
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

// function isSameItem(
//   item: CustomerCartItemIdentifier,
//   target: CustomerCartItemIdentifier
// ) {
//   return (
//     item.productId === target.productId &&
//     (item.color || "") === (target.color || "") &&
//     (item.size || "") === (target.size || "")
//   );
// }


function isSameItem(
  item: CustomerCartItemIdentifier,
  target: CustomerCartItemIdentifier
) {
  return (
    String(item.productId) === String(target.productId) &&
    String(item.color || "") === String(target.color || "") &&
    String(item.size || "") === String(target.size || "")
  );
}
 
 


// function addGuestItem(item: Omit<GuestCartItem, "quantity">) {
//   const items = readGuestItems();
//   console.log("read guestitems returned value",items);
  
//   const index = items.findIndex((cartItem) => isSameItem(cartItem, item));

//   console.log("findindex return value", index);
  

//   if (index >= 0) {
//     items[index] = { ...items[index], quantity: items[index].quantity + 1 };
//   } else {
//     items.push({ ...item, quantity: 1 });
//   }

//   writeGuestItems(items);
//   return getGuestResponse();
// }


function addGuestItem(item: Omit<GuestCartItem, "quantity">) {
  const items = readGuestItems();

  // const index = items.findIndex((cartItem) =>
  //   isSameItem(cartItem, item)
  // );
  const index = items.findIndex(
  (cartItem) =>cartItem.productId === item.productId &&cartItem.color === item.color && cartItem.size === item.size
);

  // SAME PRODUCT
  if (index !== -1) {

    // MAX LIMIT
    if (items[index].quantity >= 5) {
      toast.error("Max 5 quantity allowed");
      return getGuestResponse();
    }

    items[index] = {
      ...items[index],
      quantity: items[index].quantity + 1,
    };
  }

  // NEW PRODUCT
  else {
    items.push({
      ...item,
      quantity: 1,
    });
  }

localStorage.setItem(GUEST_CART_KEY,JSON.stringify(items));

  toast.success("Added to cart");

  return getGuestResponse();
}





// function increaseGuestItem(item: CustomerCartItemIdentifier) {
//   const items = readGuestItems().map((cartItem) =>
//     isSameItem(cartItem, item)
//       ? { ...cartItem, quantity: cartItem.quantity + 1 }
//       : cartItem
//   );
//   writeGuestItems(items);
//   return getGuestResponse();
// }


function increaseGuestItem(item: CustomerCartItemIdentifier) {

  let isUpdated = false;

  const items = readGuestItems().map((cartItem) => {

    // Different item
    if (!isSameItem(cartItem, item)) {
      return cartItem;
    }

    // Max limit
    if (cartItem.quantity >= 5) {
      toast.error("Max 5 quantity allowed");
      return cartItem;
    }

    isUpdated = true;

    return {
      ...cartItem,
      quantity: cartItem.quantity + 1,
    };
  });

  writeGuestItems(items);

  // Success toast only if updated
  if (isUpdated) {
    toast.success("Cart updated45");
  }

  return getGuestResponse();
}




 
 
// function decreaseGuestItem(item: CustomerCartItemIdentifier) {
//   const items = readGuestItems()
//     .map((cartItem) =>
//       isSameItem(cartItem, item)
//         ? { ...cartItem, quantity: cartItem.quantity - 1 }
//         : cartItem
//     )
//     .filter((cartItem) => cartItem.quantity > 0);
//   writeGuestItems(items);
//   return getGuestResponse();
// }

function decreaseGuestItem(item: CustomerCartItemIdentifier) {

  const items = readGuestItems()
    .map((cartItem) =>
      isSameItem(cartItem, item)
        ? {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          }
        : cartItem
    )
    .filter((cartItem) => cartItem.quantity > 0);

  writeGuestItems(items);

  toast.success("Cart updated");

  return getGuestResponse();
}

 

function removeGuestItem(item: CustomerCartItemIdentifier) {
  const items = readGuestItems().filter(
    (cartItem) => !isSameItem(cartItem, item)
  );
  localStorage.setItem(GUEST_CART_KEY,JSON.stringify(items));

  return getGuestResponse();
}

 


 
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
          
          });

          return;
        }

        set({
          loading: false,
          cart: getGuestResponse(),
          addresses: [],
          selectedAddressId: "",
       
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
          console.log(response, "sssssssssssssss");

          set({ cart: response ?? emptyCart });
        } 
        
        else {
          set({
            cart: addGuestItem({
              productId: item.productId,
              color: item.color,
              size: item.size,
              title: item.title,
              brand: item.brand,

              image: item.image,
              finalPrice: item.finalPrice,

            }),
          });
          
        }

        // toast.success("Added to cart2");
      }


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
        const response = isSignedIn ? await increaseCustomerCartItem(item) : increaseGuestItem(item);
        set({ cart: response ?? emptyCart });
        toast.success("Cart updated");
      }
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
        const response = isSignedIn ? await decreaseCustomerCartItem(item)  : decreaseGuestItem(item);
        set({ cart: response ?? emptyCart });
        toast.success("Cart updated");
      } catch {
        toast.error("Failed to update cart");
      }
    },

    remove: async (item, isSignedIn) => {
      try {
        const response = isSignedIn? await removeCustomerCartItem(item): removeGuestItem(item);
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
        set({ promoLoading: true })
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


    startStripeCheckout: async ({ isSignedIn }) => {
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

    
    
  }));