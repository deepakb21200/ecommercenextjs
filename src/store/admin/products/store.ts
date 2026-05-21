 
// "use client";

// import { Category, Product } from "@/components/admin/products/productstable/types";
// import { create } from "zustand";



// type AdminProductsStore = {
//     products: Product[];
//     categories: Category[];

//     loading: boolean;

//     hasLoaded: boolean;

//     fetchProducts: (
//         search?: string
//     ) => Promise<void>;

//     fetchCategories: () => Promise<void>;

//     refreshAll: (
//         search?: string
//     ) => Promise<void>;
// };

// export const useAdminProductsStore =
//     create<AdminProductsStore>(
//         (set, get) => ({
//             products: [],

//             categories: [],

//             loading: false,

//             hasLoaded: false,

//             fetchProducts: async (search = "") => {
//                 try {
//                     set({ loading: true })

//                     console.log(search, "yt", typeof search);


//                     const res = await fetch(
//                         search ? `/api/admin/products?search=${encodeURIComponent(search)}` : `/api/admin/products`);

//                     const data =
//                         await res.json();





//                     set({
//                         products: data || [],
//                     });


//                 } catch (error) {
//                     console.log(error);
//                 } finally {
//                     set({ loading: false });
//                 }
//             },

//             fetchCategories: async () => {
//                 try {
//                     const res = await fetch(
//                         "/api/admin/categories"
//                     );

//                     const data =
//                         await res.json();

//                     set({
//                         categories: data || [],
//                     });
//                 } catch (error) {
//                     console.log(error);
//                 }
//             },

//             refreshAll: async (search = "") => {



//                 console.log("hooo", search);
//                 // prevent duplicate calls
//                 if (get().loading) return;
//                 await Promise.all([
//                     get().fetchProducts(search),
//                     get().fetchCategories(),


//                 ]);

//                 set({
//                     hasLoaded: true,
//                 });
//             },
//         })
//     );






"use client";

import { Category, Product } from "@/components/admin/products/productstable/types";
import { create } from "zustand";

type AdminProductsStore = {
  products: Product[];
  categories: Category[];
  loading: boolean;
  hasLoaded: boolean;
  fetchProducts: (search?: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  refreshAll: (search?: string) => Promise<void>;
  dummyProducts:Product[]
};

// ✅ AbortController — race condition handle karne ke liye
let abortController: AbortController | null = null;

export const useAdminProductsStore = create<AdminProductsStore>((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  hasLoaded: false,
  dummyProducts:[],

  fetchProducts: async (search = "") => {
    // ✅ Pehle wali pending request cancel karo
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();

    try {
      set({ loading: true });

      const url = search.trim()
        ? `/api/admin/products?search=${encodeURIComponent(search.trim())}`
        : `/api/admin/products`;

      const res = await fetch(url, {
        credentials: "include",
        signal: abortController.signal,
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      set({ products: Array.isArray(data) ? data : [] });
    } catch (err: unknown) {
      // AbortError ignore karo — yeh intentional cancel hai
      if (err instanceof Error && err.name === "AbortError") return;
      set({ products: [] });
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
    set({ hasLoaded: true });
  },
}));


