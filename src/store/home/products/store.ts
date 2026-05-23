// store.ts — isBootstrapped hata diya, unnecessary params hata diye

import { create } from "zustand";
import toast from "react-hot-toast";
import { CustomerProductDetailsResponse } from "@/components/Home/products/types";
import { ProductSize } from "@/models/Product";
import { getCustomerProductDetails } from "./api";
import { getCoverImage } from "@/components/Home/products/productListShared";
import { addCustomerWishlist, removeCustomerWishlistItem } from "../wishlist/api";
import { useCustomerWishlistStore } from "../wishlist/store";
import { useCustomerCartAndCheckoutStore } from "../cartAndCheckout/store";

type CustomerProductDetailsStore = {
  loading: boolean;
  data: CustomerProductDetailsResponse | null;
  selectedImage: string;
  selectedColor: string;
  selectedSize: ProductSize | "";
  setSelectedImage: (value: string) => void;
  setSelectedColor: (value: string) => void;
  setSelectedSize: (value: ProductSize | "") => void;
  loadProduct: (productId: string) => Promise<void>;
  clear: () => void;
  addToCart: (isSignedIn: boolean) => Promise<void>;
  toggleWishlist: (isSignedIn: boolean, isWishlistActive: boolean) => Promise<void>;

};

const defaultState = {
  loading: true,
  data: null,
  selectedImage: "",
  selectedColor: "",
  selectedSize: "" as ProductSize | "",
};

export const useCustomerProductDetailsStore = create<CustomerProductDetailsStore>((set, get) => ({
  ...defaultState,

  loadProduct: async (productId) => {
    if (!productId) {
      set({ loading: false, data: null, selectedImage: "", selectedColor: "", selectedSize: "" });
      return;
    }

    set({ loading: true, data: null, selectedImage: "", selectedColor: "", selectedSize: "" });

    try {
      const response = await getCustomerProductDetails(productId);
      const product = response?.product ?? null;

      console.log(response, "dk bi");


      set({
        loading: false,
        data: response ?? null,
        selectedImage: product ? getCoverImage(product) : "",

        selectedColor: product?.colors?.[0]?.name || "",
        selectedSize: product?.sizes?.[0] || "",
      });
    } catch {
      set({ loading: false, data: null, selectedImage: "", selectedColor: "", selectedSize: "" });
    }
  },

  clear: () => set(defaultState),
  setSelectedImage: (value) => set({ selectedImage: value }),

  setSelectedColor: (value: string) => set({ selectedColor: value }),
  setSelectedSize: (value) => set({ selectedSize: value }),

  toggleWishlist: async (isSignedIn, isWishlistActive) => {
    const product = get().data?.product ?? null;
    if (!product) return;

    if (!isSignedIn) {
      toast.error("Sign in to save");
      return;
    }

    try {
      if (isWishlistActive) {
        const response = await removeCustomerWishlistItem(product._id);
        // console.log("rmpss", response?.items);

        useCustomerWishlistStore.getState().setItems(response?.items ?? []);
        toast.success("Removed");
        return;
      }

      const response = await addCustomerWishlist({ productId: product._id });

      // console.log("rocks",response.items);

      useCustomerWishlistStore.getState().setItems(response?.items ?? []);
      toast.success("Saved");
    } catch {
      toast.error("Failed to update wishlist");
    }
  },



  addToCart: async (isSignedIn) => {
    const { data, selectedColor, selectedSize } = get();
    const product = data?.product ?? null;

    if (!product || product.stock < 1) return;

    // Guest user validation only

    console.log("rrrr", isSignedIn);


    // await useCustomerCartAndCheckoutStore.getState().addItem(
    //   {
    //     productId: product._id,
    //     quantity: 1,
    //     color: selectedColor || undefined,
    //     size: selectedSize || undefined,
    //     title: product.title,
    //     brand: product.brand,
    //     image: getCoverImage(product),
    //     finalPrice: product.salePercentage
    //       ? product.price - (product.price * product.salePercentage) / 100
    //       : product.price,
    //   },
    //   isSignedIn,
    // );



    await useCustomerCartAndCheckoutStore.getState().addItem(
      {
        productId: product._id,
        quantity: 1,
        // color: selectedColor || undefined,
        // size: selectedSize || undefined,
        color: selectedColor || "",
        size: selectedSize || ("" as ProductSize),
        title: product.title,
        brand: product.brand,
        image: getCoverImage(product),
        finalPrice: product.salePercentage
          ? product.price - (product.price * product.salePercentage) / 100
          : product.price,
      },

    );

  },












}));

