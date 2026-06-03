

"use client";
import { Category, Product } from "@/components/admin/products/productstable/types";
import { create } from "zustand";

type AdminProductsStore = {
  products: Product[];
  categories: Category[];
  loading: boolean;
  hasLoaded: boolean
  error: string,
  fetchProducts: (search?: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  refreshAll: (search?: string) => Promise<void>;

};

// ✅ AbortController — race condition handle karne ke liye
let abortController: AbortController | null = null;

export const useAdminProductsStore = create<AdminProductsStore>((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  error: "",
  hasLoaded: false,



  fetchProducts: async (search = "") => {
    set({
      loading: true,
      error: "",
      products:[]// ye products ko maine likha h
    });


    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();

    try {




      const url = search.trim()
        ? `/api/admin/products?search=${encodeURIComponent(search.trim())}`
        : `/api/admin/products`;

      const res = await fetch(url, {
        credentials: "include",
        signal: abortController.signal,
      });

      console.log(res)




      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      console.log(data)

      set({
        products: Array.isArray(data) ? data : [],
        hasLoaded: true,
      });
    }

    catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;

      set({
        error: "Failed to fetch products",
        products: [],
        hasLoaded: true,
      });;
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const res = await fetch("/api/admin/categories", {
        credentials: "include",
      });



      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      console.log("ss", data);

      set({ categories: Array.isArray(data) ? data : [] });
    } catch {
      set({ categories: [] });
    }
  },

  refreshAll: async (search = "") => {
   

    await Promise.all([
      get().fetchProducts(search),
      get().fetchCategories(),
    ]);
 
  },
}));








// //  await new Promise((resolve) =>
// //     setTimeout(resolve, 3000)
// //   );

// //   // manually error throw
// //   throw new Error("Failed to fetch");


 