




// "use client";

// import { Category, Product } from "@/components/admin/products/productstable/types";
// import { create } from "zustand";

// type AdminProductsStore = {
//   products: Product[];
//   categories: Category[];
//   loading: boolean;
//   hasLoaded: boolean;
//   fetchProducts: (search?: string) => Promise<void>;
//   fetchCategories: () => Promise<void>;
//   refreshAll: (search?: string) => Promise<void>;

// };

// // ✅ AbortController — race condition handle karne ke liye
// let abortController: AbortController | null = null;

// export const useAdminProductsStore = create<AdminProductsStore>((set, get) => ({
//   products: [],
//   categories: [],
//   loading: true,
//   hasLoaded: false,


//   fetchProducts: async (search = "") => {
//     // ✅ Pehle wali pending request cancel karo
//     if (abortController) {
//       abortController.abort();
//     }
//     abortController = new AbortController();

//     try {
//       set({ loading: true });

//       const url = search.trim()
//         ? `/api/admin/products?search=${encodeURIComponent(search.trim())}`
//         : `/api/admin/products`;

//       const res = await fetch(url, {
//         credentials: "include",
//         signal: abortController.signal,
//       });

//       if (!res.ok) throw new Error("Failed to fetch");

//       const data = await res.json();
//       set({ products: Array.isArray(data) ? data : [] });
//     } catch (err: unknown) {
//       // AbortError ignore karo — yeh intentional cancel hai
//       if (err instanceof Error && err.name === "AbortError") return;
//       set({ products: [] });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   fetchCategories: async () => {
//     try {
//       const res = await fetch("/api/admin/categories", {
//         credentials: "include",
//       });



//       if (!res.ok) throw new Error("Failed to fetch categories");
//       const data = await res.json();
//       console.log("ss", data);

//       set({ categories: Array.isArray(data) ? data : [] });
//     } catch {
//       set({ categories: [] });
//     }
//   },

//   refreshAll: async (search = "") => {
//     await Promise.all([
//       get().fetchProducts(search),
//       get().fetchCategories(),
//     ]);
//     set({ hasLoaded: true });
//   },
// }));


"use client";
import { Category, Product } from "@/components/admin/products/productstable/types";
import { create } from "zustand";

type AdminProductsStore = {
  products: Product[];
  categories: Category[];
  loading: boolean;
  hasLoaded: boolean;
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
  loading: true,
  error: "",
  hasLoaded: false,


  fetchProducts: async (search = "") => {
    // ✅ Pehle wali pending request cancel karo

    // products empty karo


    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();

    try {
      set({
        loading: true,
        error: "",
        
      });



      const url = search.trim()
        ? `/api/admin/products?search=${encodeURIComponent(search.trim())}`
        : `/api/admin/products`;

      const res = await fetch(url, {
        credentials: "include",
        signal: abortController.signal,
      });

      console.log(res);

      // await new Promise((resolve) =>
      //   setTimeout(resolve, 3000)
      // );

      // // manually error throw
      // throw new Error("Failed to fetch");




      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      //       await new Promise((resolve) =>
      //   setTimeout(resolve, 5000)
      // );

      console.log(data);


      set({ products: Array.isArray(data) ? data : [] });
    }

    catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;

      set({
        error: "Failed to fetch products",
        products: [],
      });
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
    set({ hasLoaded: false });
    await Promise.all([
      get().fetchProducts(search),
      get().fetchCategories(),
    ]);
    set({ hasLoaded: true });
  },
}));




































