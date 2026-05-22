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
  const [search, setSearch] =useState("");

  const [categoryDialogOpen, setCategoryDialogOpen,] = useState(false);


const skipNextSearch = useRef(false);
 
  const {
    products,
    categories,
    loading,
    refreshAll

  } = useAdminProductsStore();




useEffect(() => {
  if (skipNextSearch.current) {
    skipNextSearch.current = false;
    return;
  }

  const timer = setTimeout(() => {
    refreshAll(search.trim())
  }, 300);

  return () => clearTimeout(timer);
}, [search]);



 



useEffect(() => {
  return () => {
    useAdminProductsStore.setState({
      products: [],
      categories: [],
      loading: false,
      hasLoaded: false,
   
    });
  };
}, []);



 




useEffect(() => {
  return () => {
    // AbortController?.abort();

    useAdminProductsStore.setState({
      products: [],
      categories: [],
      loading: false,
      hasLoaded: false,
    });
  };
}, []);

  return (
    <div className="min-h-screen">

      <div className="mx-auto w-full space-y-8">

        {/* HERO */}
        <AdminHero
          badgeText="Velvet Inventory"
          title="Products Management"
          description="Manage store inventory, categories, product visibility and stock in one premium dashboard."
          rightText="Smart Inventory Panel"
          icon={
            <HiOutlineCube className="text-3xl text-white" />
          }
          rightIcon={
            <HiOutlineSparkles className="text-lg text-violet-300" />
          }
        />

        {/* TOOLBAR */}
        <AdminToolbar
          search={search}
          onSearchChange={setSearch}


          placeholder="Search products..."
          primaryButtonLabel="Add Product"
          primaryButtonHref="/admin/products/create-new"
          extraAction={{
            label: "Categories",

            icon: HiOutlineTag,

            onClick: () =>
              setCategoryDialogOpen(
                true
              ),
          }}
          sectionLabel="Inventory Controls"
          heading="Product Controls"


              item={products.length}


    

          refreshAll={async () => {
  if (search !== "") {
    skipNextSearch.current = true;
    setSearch("");
  }

  await refreshAll("");
}}

          
        />

        {/* TABLE */}
        <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-4 shadow-2xl backdrop-blur-xl lg:p-6">



          <ProductsTable
            loading={loading}
            products={products}

          />

        </div>
      </div>

      {/* CATEGORY DIALOG */}
      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={
          setCategoryDialogOpen
        }
        categories={categories}
        onSaved={() =>
          refreshAll(search)
        }
      />
    </div>
  );
}

export default AdminProducts;


































































































































































// "use client";

// import { useEffect, useRef, useState } from "react";
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


// function AdminProducts() {
//   const [search, setSearch] = useState("");
//   const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

//   const { products, categories, loading } = useAdminProductsStore();

//   // ✅ isRefreshing flag — refreshAll ke dauran search effect ko block karo
//   const isRefreshing = useRef(false);
//   const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const isMounted = useRef(false);

//   // ✅ Initial load — getState() se hasLoaded check karo
//   // Re-mount pe bhi store ka hasLoaded true rehta hai — API call nahi hogi

//   useEffect(() => {
//     const { hasLoaded, refreshAll } = useAdminProductsStore.getState();
 
//     if (!hasLoaded) {

//       console.log("rocks")

//       void refreshAll()
    
//     }
//     isMounted.current = true;
//   }, []); // ← sirf mount pe, re-mount pe hasLoaded store mein true hai

//   // ✅ Search debounce
//   useEffect(() => {
//     // Mount pe skip karo
//     if (!isMounted.current) return;
//     // refreshAll chal raha ho tab skip karo (double call prevent)
//     if (isRefreshing.current) return;

//     if (searchTimer.current) clearTimeout(searchTimer.current);

//     searchTimer.current = setTimeout(() => {
//       const { fetchProducts } = useAdminProductsStore.getState();
//       void fetchProducts(search);
//     }, 300);

//     return () => {
//       if (searchTimer.current) clearTimeout(searchTimer.current);
//     };
//   }, [search]);

//   // ✅ Refresh All — isRefreshing flag set karo taaki search effect na chale
//   const handleRefreshAll = async () => {
//     isRefreshing.current = true;  // search effect block karo
//     setSearch("");                 // input clear karo (search effect trigger hoga par block rahega)

//     const { refreshAll } = useAdminProductsStore.getState();
//     await refreshAll("");

//     isRefreshing.current = false; // unblock karo
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="mx-auto w-full space-y-8">

//         <AdminHero
//           badgeText="Velvet Inventory"
//           title="Products Management"
//           description="Manage store inventory, categories, product visibility and stock in one premium dashboard."
//           rightText="Smart Inventory Panel"
//           icon={<HiOutlineCube className="text-3xl text-white" />}
//           rightIcon={<HiOutlineSparkles className="text-lg text-violet-300" />}
//         />

//         <AdminToolbar
//           search={search}
//           onSearchChange={setSearch}
//           placeholder="Search products..."
//           primaryButtonLabel="Add Product"
//           primaryButtonHref="/admin/products/create-new"
//           extraAction={{
//             label: "Categories",
//             icon: HiOutlineTag,
//             onClick: () => setCategoryDialogOpen(true),
//           }}
//           sectionLabel="Inventory Controls"
//           heading="Product Controls"
//           item={products.length}
//           refreshAll={handleRefreshAll}
//         />

//         <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-4 shadow-2xl backdrop-blur-xl lg:p-6">
//           <ProductsTable loading={loading} products={products} />
//         </div>

//       </div>

//       <CategoryDialog
//         open={categoryDialogOpen}
//         onOpenChange={setCategoryDialogOpen}
//         categories={categories}
//         onSaved={() => {
//           const { refreshAll } = useAdminProductsStore.getState();
//           void refreshAll(search);
//         }}
//       />
//     </div>
//   );
// }

// export default AdminProducts;