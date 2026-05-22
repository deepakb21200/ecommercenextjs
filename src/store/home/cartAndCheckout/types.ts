 
import { ProductSize } from "@/models/Product";
import type { CustomerAddress } from "../profile/types";

export type CustomerCartItemIdentifier = {
  productId: string;
  color?: string;
  size?: ProductSize;
};

export type CustomerCartItem = CustomerCartItemIdentifier & {
  title: string;
  brand: string;
  image: string;
  finalPrice: number;
  quantity: number;
};

export type CustomerCartResponse = {
  items: CustomerCartItem[];
  totalQuantity: number;
};

export type AddCustomerCartItemBody = CustomerCartItemIdentifier & {
  quantity?: number;
};

export type SyncCustomerCartBody = {
  items: Array<
    CustomerCartItemIdentifier & {
      quantity: number;
    }
  >;
};

export type GuestCartItem = CustomerCartItem;

export type AppliedPromo = {
  code: string;
  percentage: number;
  discount: number;
  finalTotal: number;
  minimumOrderValue: number;
  isLoggedIn: boolean;
};

// ✅ Razorpay hata ke Stripe
export type CheckoutSessionResponse = {
  stripe: {
    publishableKey: string;
    clientSecret: string;
  };
  order: {
    _id: string;
    totalItems: number;
    discountAmount: number;
    totalAmount: number;
  };
};

// ✅ Stripe confirm ke liye sirf paymentIntentId chahiye
export type CheckoutConfirmBody = {
  orderId: string;
  paymentIntentId: string;
};





export type CheckoutAddressOption = CustomerAddress;

export type CheckoutDataResponse = {
  cart: CustomerCartResponse;
  addresses: {
    items: CheckoutAddressOption[];
  };
  subtotal: number;
};



//no-2