


import { getCustomerAddresses } from "../profile/api";
import type {
  AddCustomerCartItemBody,
  AppliedPromo,
  CheckoutConfirmBody,
  CheckoutConfirmResponse,
  CheckoutDataResponse,
  CheckoutPayWithPointsResponse,
  CheckoutPointsResponse,
  CustomerCartItemIdentifier,
  CustomerCartResponse,
  SyncCustomerCartBody,
} from "./types";

const BASE_URL = "/api/customer";

// ================= HELPER =================
function buildCartItemUrl(
  item: CustomerCartItemIdentifier,
  action?: "increase" | "decrease"
) {
  const searchParams = new URLSearchParams();

  if (item.color) searchParams.set("color", item.color);
  if (item.size) searchParams.set("size", item.size);

  const query = searchParams.toString();
  const actionPath = action ? `/${action}` : "";
  const path = `${BASE_URL}/cart/items/${item.productId}${actionPath}`;

  console.log("path", path);
  

  return query ? `${path}?${query}` : path;
}



// ================= CART =================

export async function getCustomerCart(): Promise<CustomerCartResponse> {
  const res = await fetch(`${BASE_URL}/cart`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch cart");

  const data = await res.json();
  return data.data;
}


export async function addCustomerCartItem(
  body: AddCustomerCartItemBody
): Promise<CustomerCartResponse> {
  const res = await fetch(`${BASE_URL}/cart/items`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
 
    throw new Error(err.message || "Failed to add item");
  }

  const data = await res.json();
  return data.data;
}


 


export async function increaseCustomerCartItem(
  item: CustomerCartItemIdentifier
): Promise<CustomerCartResponse> {
  const res = await fetch(buildCartItemUrl(item, "increase"), {
    method: "PATCH",
    credentials: "include",
  });

  // if (!res.ok) throw new Error("Failed to increase item");
    if (!res.ok) {
          const err = await res.json();
 
    
    // backend ka exact message throw karo
    throw new Error(err.message || "Failed to add item");
    }

  const data = await res.json();
  return data.data;
}

export async function decreaseCustomerCartItem(
  item: CustomerCartItemIdentifier
): Promise<CustomerCartResponse> {
  const res = await fetch(buildCartItemUrl(item, "decrease"), {
    method: "PATCH",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to decrease item");

  const data = await res.json();
  return data.data;
}

export async function removeCustomerCartItem(
  item: CustomerCartItemIdentifier
): Promise<CustomerCartResponse> {
  const res = await fetch(buildCartItemUrl(item), {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to remove item");

  const data = await res.json();
  return data.data;
}




export async function syncCustomerCart(
  body: SyncCustomerCartBody
): Promise<CustomerCartResponse> {
  const res = await fetch(`${BASE_URL}/cart/sync`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("SYNC ERROR:", err);
    throw new Error("Failed to sync cart");
  }

  const data = await res.json();
  console.log(data,"sd");
  console.log(data.data,"d");
  
  
  return data.data;
}

// ================= CHECKOUT =================

export async function getCheckoutPoints(): Promise<CheckoutPointsResponse> {
  const res = await fetch(`${BASE_URL}/checkout/points`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch points");

  const data = await res.json();
  return data.data;
}

export async function getCheckoutData(): Promise<CheckoutDataResponse> {
  const [cart, addresses, checkoutPoints] = await Promise.all([
    getCustomerCart(),
    getCustomerAddresses(),
    getCheckoutPoints(),
  ]);

  const safeCart = cart ?? { items: [], totalQuantity: 0 };
  const safeAddresses = addresses ?? { items: [] };

  const subtotal = safeCart.items.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );

  return {
    cart: safeCart,
    addresses: safeAddresses,
    subtotal,
    points: checkoutPoints.points ?? 0,
  };
}

// ================= PROMO =================

export async function applyCustomerPromo(body: {
  code: string;
  orderValue: number;
}): Promise<AppliedPromo> {
  const res = await fetch(`${BASE_URL}/promos/apply`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to apply promo");

  const data = await res.json();
  return data.data;
}

// ================= PAYMENT =================

export async function createCheckoutSession(body: {
  addressId: string;
  promoCode?: string;
}): Promise<{
  url: string;
  order: {
    _id: string;
    totalItems: number;
    discountAmount: number;
    totalAmount: number;
  };
}> {
  const res = await fetch(`${BASE_URL}/checkout/create-session`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to create session");

  const data = await res.json();
  return data.data;
}

export async function payWithPointsCheckout(body: {
  addressId: string;
  promoCode?: string;
}): Promise<CheckoutPayWithPointsResponse> {
  const res = await fetch(`${BASE_URL}/checkout/pay-with-points`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to pay with points");

  const data = await res.json();
  return data.data;
}

export async function confirmCheckout(
  body: CheckoutConfirmBody
): Promise<CheckoutConfirmResponse> {
  const res = await fetch(`${BASE_URL}/checkout/confirm`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to confirm checkout");

  const data = await res.json();
  return data.data;
}





















