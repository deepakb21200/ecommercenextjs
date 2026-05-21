// // ========================= ADMIN PRODUCTS PAGE =========================

// "use client";

// import AdminToolbar from "@/components/admin/products/AdminToolbar";
// import { CategoryDialog } from "@/components/admin/products/categorydialog/CategoryDialog";
// import { ProductsTable } from "@/components/admin/products/productstable/ProductsTable";
// import {
//   Category,
//   Product,
// } from "@/components/admin/products/productstable/types";

// import { ProductToolbar } from "@/components/admin/products/ProductsToolbar";
// import { AdminHero } from "@/utils/AdminHero";
// import { useRouter } from "next/navigation";

// import { useEffect, useState } from "react";

// import {
//   HiOutlineCube,
//   HiOutlineSparkles,
// } from "react-icons/hi2";

// import {

//   HiOutlineTag,

// } from "react-icons/hi2";


// function AdminProducts() {
//   const router = useRouter();

//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

//   const loadProducts = async (searchValue = "") => {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         searchValue
//           ? `/api/admin/products?search=${encodeURIComponent(searchValue)}`
//           : `/api/admin/products`
//       );

//       const data = await res.json();

//       setProducts(data || []);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadCategories = async () => {
//     const res = await fetch("/api/admin/categories");

//     const data = await res.json();

//     setCategories(data || []);
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       loadProducts(search);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [search]);

//   const refreshAll = async () => {
//     await Promise.all([
//       loadCategories(),
//       loadProducts(search),
//     ]);
//   };
//   // refrehall category dialog me jayega
//   return (
//     <div className="min-h-screen  ">

//       <div className="mx-auto w-full space-y-8  ">

//         {/* Hero */}
//         {/* <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#111827] p-6 sm:p-8 lg:p-10">

//           <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

//           <div className="absolute bottom-[-100px] right-[-40px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

//           <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

//             <div>
//               <div className="mb-4 flex items-center gap-3">
//                 <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-xl shadow-violet-500/20">
//                   <HiOutlineCube className="text-3xl text-white" />
//                 </div>

//                 <div>
//                   <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
//                     Velvet Inventory
//                   </p>

//                   <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">
//                     Products Management
//                   </h1>
//                 </div>
//               </div>

//               <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
//                 Manage store inventory, categories, product
//                 visibility and stock in one premium dashboard.
//               </p>
//             </div>

//             <div className="flex w-fit items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-3 backdrop-blur-xl">
//               <HiOutlineSparkles className="text-lg text-violet-300" />

//               <p className="text-sm font-medium text-violet-200">
//                 Smart Inventory Panel
//               </p>
//             </div>
//           </div>
//         </div> */}
//         <AdminHero
//           badgeText="Velvet Inventory"
//           title="Products Management"
//           description="Manage store inventory, categories, product visibility and stock in one premium dashboard."
//           rightText="Smart Inventory Panel"
//           icon={<HiOutlineCube className="text-3xl text-white" />}
//           rightIcon={
//             <HiOutlineSparkles className="text-lg text-violet-300" />
//           }
//         />
//         {/* Toolbar Card */}
//         {/* <div className="rounded-[30px] border-4  border border-white/10 bg-[#111827]/70  p-5 shadow-2xl backdrop-blur-xl lg:p-6">

//           <div className="mb-6 flex items-center justify-between">
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
//                 Inventory Controls
//               </p>

//               <h2 className="mt-2 text-2xl font-bold text-white">
//                 Product Controls
//               </h2>
//             </div>

//             <div className="hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 md:block">
//               {products.length} Products
//             </div>
//           </div>

//           <ProductToolbar
//             search={search}
//             onSearchChange={setSearch}
//             onManageCategories={() => setCategoryDialogOpen(true)} />

//         </div> */}
//         <AdminToolbar
//           search={search}
//           onSearchChange={setSearch}
//           placeholder="Search products..."
//           primaryButtonLabel="Add Product"
//           primaryButtonHref="/admin/products/create-new"
//           extraAction={{
//             label: "Categeries",
//             icon: HiOutlineTag,
//             onClick: () => setCategoryDialogOpen(true),

//           }
//           }
//           sectionLabel="Inventory Controls"
//           heading="Product Controls"
//           item={Number(products.length)}
//         />

//         {/* Table */}
//         <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-4 shadow-2xl backdrop-blur-xl lg:p-6">
//           <ProductsTable
//             loading={loading}
//             products={products}
//           />
//         </div>
//       </div>

//       <CategoryDialog
//         open={categoryDialogOpen}
//         onOpenChange={setCategoryDialogOpen}
//         categories={categories}
//         onSaved={refreshAll}
//       />
//     </div>
//   );
// }

// export default AdminProducts;


// //  <AdminToolbar
// //             search={search}
// //             onSearchChange={setSearch}
// //             placeholder="Search products..."
// //             primaryButtonLabel="Add Product"
// //             primaryButtonHref="/admin/products/create-new"
// //             extraAction={{
// //               label: "Categories",
// //               icon: HiOutlineTag,
// //               onClick: () => setCategoryDialogOpen(true),
// //             }}
// //           />













// "use client";

// import { useEffect, useState } from "react";

// import {
//   HiOutlineCube,
//   HiOutlineSparkles,
//   HiOutlineTag,
// } from "react-icons/hi2";

// import AdminToolbar from "@/components/admin/products/AdminToolbar";

// import { ProductsTable } from "@/components/admin/products/productstable/ProductsTable";

// import { CategoryDialog } from "@/components/admin/products/categorydialog/CategoryDialog";

// import { AdminHero } from "@/utils/AdminHero";
// import { useAdminProductsStore } from "@/store/admin/products/store";
// import { Product } from "@/components/admin/products/productstable/types";

// function AdminProducts() {
//   const [search, setSearch] =
//     useState("");

//   const [categoryDialogOpen, setCategoryDialogOpen,] = useState(false);

//   const {
//     products,
//     categories,
//     loading,
//     hasLoaded,


//     refreshAll,
//   } = useAdminProductsStore();




//   const [displayProducts, setDisplayProducts] = useState<Product[]>([]);








//   useEffect(() => {
//     if (!search.trim()) {
//       console.log("deepak21");
//       setDisplayProducts(products);
//     }
//   }, [products, search]);



//   useEffect(() => {
//     const query = search.trim();

//     const timer = setTimeout(async () => {
//       if (query.length === 0) {
//         setDisplayProducts(products);
//         return;
//       }


//       console.log("qer", query);


//       const res = await fetch(
//         `/api/admin/products?search=${encodeURIComponent(query)}`
//       );
//       const data = await res.json();
//       console.log("deepak", data);


//       setDisplayProducts(data || []);


//     }, 300);

//     return () => clearTimeout(timer);
//   }, [search, products]);



//   useEffect(() => {


//     if (!hasLoaded) {
//       refreshAll();
//       console.log("useeffect 1");

//     }
//   }, [hasLoaded, refreshAll]);





//   return (
//     <div className="min-h-screen">

//       <div className="mx-auto w-full space-y-8">

//         {/* HERO */}
//         <AdminHero
//           badgeText="Velvet Inventory"
//           title="Products Management"
//           description="Manage store inventory, categories, product visibility and stock in one premium dashboard."
//           rightText="Smart Inventory Panel"
//           icon={
//             <HiOutlineCube className="text-3xl text-white" />
//           }
//           rightIcon={
//             <HiOutlineSparkles className="text-lg text-violet-300" />
//           }
//         />

//         {/* TOOLBAR */}
//         <AdminToolbar
//           search={search}
//           onSearchChange={setSearch}


//           placeholder="Search products..."
//           primaryButtonLabel="Add Product"
//           primaryButtonHref="/admin/products/create-new"
//           extraAction={{
//             label: "Categories",

//             icon: HiOutlineTag,

//             onClick: () =>
//               setCategoryDialogOpen(
//                 true
//               ),
//           }}
//           sectionLabel="Inventory Controls"
//           heading="Product Controls"


//               item={displayProducts.length}


//           refreshAll={async () => {
//             // 1. Search box ko clear karo
//             setSearch("");

//             // 2. Full products list dubara fetch karo
//             await refreshAll("");
//           }}
//         />

//         {/* TABLE */}
//         <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-4 shadow-2xl backdrop-blur-xl lg:p-6">



//           <ProductsTable
//             loading={loading}
//             products={displayProducts}

//           />

//         </div>
//       </div>

//       {/* CATEGORY DIALOG */}
//       <CategoryDialog
//         open={categoryDialogOpen}
//         onOpenChange={
//           setCategoryDialogOpen
//         }
//         categories={categories}
//         onSaved={() =>
//           refreshAll(search)
//         }
//       />
//     </div>
//   );
// }

// export default AdminProducts;







"use client";

import { useEffect, useRef, useState } from "react";
import {
  HiOutlineCube,
  HiOutlineSparkles,
  HiOutlineTag,
} from "react-icons/hi2";

import AdminToolbar from "@/components/admin/products/AdminToolbar";
import { ProductsTable } from "@/components/admin/products/productstable/ProductsTable";
import { CategoryDialog } from "@/components/admin/products/categorydialog/CategoryDialog";
import { AdminHero } from "@/utils/AdminHero";
import { useAdminProductsStore } from "@/store/admin/products/store";


function AdminProducts() {
  const [search, setSearch] = useState("");
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const { products, categories, loading } = useAdminProductsStore();

  // ✅ isRefreshing flag — refreshAll ke dauran search effect ko block karo
  const isRefreshing = useRef(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(false);

  // ✅ Initial load — getState() se hasLoaded check karo
  // Re-mount pe bhi store ka hasLoaded true rehta hai — API call nahi hogi

  useEffect(() => {
    const { hasLoaded, refreshAll } = useAdminProductsStore.getState();
 
    if (!hasLoaded) {

      console.log("rocks")

      void refreshAll()
    
    }
    isMounted.current = true;
  }, []); // ← sirf mount pe, re-mount pe hasLoaded store mein true hai

  // ✅ Search debounce
  useEffect(() => {
    // Mount pe skip karo
    if (!isMounted.current) return;
    // refreshAll chal raha ho tab skip karo (double call prevent)
    if (isRefreshing.current) return;

    if (searchTimer.current) clearTimeout(searchTimer.current);

    searchTimer.current = setTimeout(() => {
      const { fetchProducts } = useAdminProductsStore.getState();
      void fetchProducts(search);
    }, 300);

    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [search]);

  // ✅ Refresh All — isRefreshing flag set karo taaki search effect na chale
  const handleRefreshAll = async () => {
    isRefreshing.current = true;  // search effect block karo
    setSearch("");                 // input clear karo (search effect trigger hoga par block rahega)

    const { refreshAll } = useAdminProductsStore.getState();
    await refreshAll("");

    isRefreshing.current = false; // unblock karo
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full space-y-8">

        <AdminHero
          badgeText="Velvet Inventory"
          title="Products Management"
          description="Manage store inventory, categories, product visibility and stock in one premium dashboard."
          rightText="Smart Inventory Panel"
          icon={<HiOutlineCube className="text-3xl text-white" />}
          rightIcon={<HiOutlineSparkles className="text-lg text-violet-300" />}
        />

        <AdminToolbar
          search={search}
          onSearchChange={setSearch}
          placeholder="Search products..."
          primaryButtonLabel="Add Product"
          primaryButtonHref="/admin/products/create-new"
          extraAction={{
            label: "Categories",
            icon: HiOutlineTag,
            onClick: () => setCategoryDialogOpen(true),
          }}
          sectionLabel="Inventory Controls"
          heading="Product Controls"
          item={products.length}
          refreshAll={handleRefreshAll}
        />

        <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-4 shadow-2xl backdrop-blur-xl lg:p-6">
          <ProductsTable loading={loading} products={products} />
        </div>

      </div>

      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        categories={categories}
        onSaved={() => {
          const { refreshAll } = useAdminProductsStore.getState();
          void refreshAll(search);
        }}
      />
    </div>
  );
}

export default AdminProducts;