// "use client";

// import { CategoryDialog } from "@/components/admin/products/categorydialog/CategoryDialog";
// import { ProductDialog } from "@/components/admin/products/ProductsDialog";
// import { ProductsTable } from "@/components/admin/products/productstable/ProductsTable";
// import { Category, Product } from "@/components/admin/products/productstable/types";
// import { ProductToolbar } from "@/components/admin/products/ProductsToolbar";
// import { useEffect, useState } from "react";

 

// function AdminProducts() {
//   // ================= STATE =================
//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
//   const [productDialogOpen, setProductDialogOpen] = useState(false);

//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

//   // ================= FETCH =================
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

//   // ================= EFFECT =================
//   useEffect(() => {
//     loadCategories();
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       loadProducts(search);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [search]);

//   // ================= HANDLERS =================
//   const openCreateDialog = () => {
//     setEditingProduct(null);
//     setProductDialogOpen(true);
//   };

//   const openEditDialog = (product: Product) => {
//     setEditingProduct(product);
//     setProductDialogOpen(true);
//   };

//   const closeProductDialog = () => {
//     setProductDialogOpen(false);
//     setEditingProduct(null);
//   };

//   const refreshAll = async () => {
//     await Promise.all([loadCategories(), loadProducts(search)]);
//   };

//   // ================= UI =================
//   return (
//     <div className="p-6 space-y-6">
      
//       {/* HEADER */}
//       <div className="bg-white shadow rounded-xl p-4 space-y-4">
//         <h2 className="text-xl font-semibold">Products</h2>

//         <ProductToolbar
//           search={search}
//           onSearchChange={setSearch}
//           onManageCategories={() => setCategoryDialogOpen(true)}
//           onAddProduct={openCreateDialog}
//         />
//       </div>

//       {/* TABLE */}
//       <div className="bg-white shadow rounded-xl p-4">
//         <ProductsTable
//           loading={loading}
//           products={products}
//           onEdit={openEditDialog}
//         />
//       </div>

//       {/* CATEGORY DIALOG */}
//       <CategoryDialog
//         open={categoryDialogOpen}
//         onOpenChange={setCategoryDialogOpen}
//         categories={categories}
//         onSaved={refreshAll}
//       />

//       {/* PRODUCT DIALOG */}
//       <ProductDialog
//         open={productDialogOpen}
//         onOpenChange={(open) => {
//           if (!open) {
//             closeProductDialog();
//           } else {
//             setProductDialogOpen(true);
//           }
//         }}
//         categories={categories}
//         product={editingProduct}
//         onSaved={refreshAll}
//       />
//     </div>
//   );
// }

// export default AdminProducts;









// "use client";

// import { CategoryDialog } from "@/components/admin/products/categorydialog/CategoryDialog";
// import { ProductDialog } from "@/components/admin/products/ProductsDialog";
// import { ProductsTable } from "@/components/admin/products/productstable/ProductsTable";
// import { Category, Product } from "@/components/admin/products/productstable/types";
// import { ProductToolbar } from "@/components/admin/products/ProductsToolbar";
// import { useEffect, useState } from "react";

// function AdminProducts() {
//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
//   const [productDialogOpen, setProductDialogOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

//   useEffect(() => { loadCategories(); }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => { loadProducts(search); }, 300);
//     return () => clearTimeout(timer);
//   }, [search]);

//   const openCreateDialog = () => { setEditingProduct(null); setProductDialogOpen(true); };
//   const openEditDialog = (product: Product) => { setEditingProduct(product); setProductDialogOpen(true); };
//   const closeProductDialog = () => { setProductDialogOpen(false); setEditingProduct(null); };
//   const refreshAll = async () => { await Promise.all([loadCategories(), loadProducts(search)]); };

//   return (
//     <div className="min-h-screen bg-[#020817] p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">

//         {/* ── Header card ── */}
//         <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
//           <div className="mb-1 flex items-center gap-2">
//             <span className="h-2 w-2 rounded-full bg-violet-500" />
//             <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
//               Inventory
//             </p>
//           </div>
//           <h1 className="mb-6 text-2xl font-semibold text-zinc-100">Products</h1>

//           <ProductToolbar
//             search={search}
//             onSearchChange={setSearch}
//             onManageCategories={() => setCategoryDialogOpen(true)}
//             onAddProduct={openCreateDialog}
//           />
//         </div>

//         {/* ── Table card ── */}
//         <div className="rounded-2xl border border-zinc-800   p-6">
//           <ProductsTable loading={loading} products={products} onEdit={openEditDialog} />
//         </div>

//       </div>

//       <CategoryDialog
//         open={categoryDialogOpen}
//         onOpenChange={setCategoryDialogOpen}
//         categories={categories}
//         onSaved={refreshAll}
//       />

//       <ProductDialog
//         open={productDialogOpen}
//         onOpenChange={(open) => { if (!open) closeProductDialog(); else setProductDialogOpen(true); }}
//         categories={categories}
//         product={editingProduct}
//         onSaved={refreshAll}
//       />
//     </div>
//   );
// }

// export default AdminProducts;






"use client";

import { CategoryDialog } from "@/components/admin/products/categorydialog/CategoryDialog";
import { ProductDialog } from "@/components/admin/products/ProductsDialog";
import { ProductsTable } from "@/components/admin/products/productstable/ProductsTable";
import { Category, Product } from "@/components/admin/products/productstable/types";
import { ProductToolbar } from "@/components/admin/products/ProductsToolbar";
import { useEffect, useState } from "react";

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);



  useEffect(()=>{
console.log("editingProduct",editingProduct);

  },[editingProduct])
  const loadProducts = async (searchValue = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        searchValue
          ? `/api/admin/products?search=${encodeURIComponent(searchValue)}`
          : `/api/admin/products`
      );
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data || []);
  };

  useEffect(() => { loadCategories(); }, []);

  useEffect(() => {
    const timer = setTimeout(() => { loadProducts(search); }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const openCreateDialog = () => { setEditingProduct(null); setProductDialogOpen(true); };
  const openEditDialog = (product: Product) => { setEditingProduct(product); setProductDialogOpen(true); };
  const closeProductDialog = () => { setProductDialogOpen(false); setEditingProduct(null); };
  const refreshAll = async () => { await Promise.all([loadCategories(), loadProducts(search)]); };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">Inventory</p>
          <h1 className="mb-6 mt-1 text-2xl font-semibold text-slate-800">Products</h1>
          <ProductToolbar
            search={search}
            onSearchChange={setSearch}
            onManageCategories={() => setCategoryDialogOpen(true)}
            onAddProduct={openCreateDialog}
          />
        </div>

        {/* Table card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ProductsTable loading={loading} products={products} onEdit={openEditDialog} />
        </div>

      </div>






      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        categories={categories}
        onSaved={refreshAll}
      />

      <ProductDialog
        open={productDialogOpen}
        onOpenChange={(open) => { if (!open) closeProductDialog(); else setProductDialogOpen(true); }}
 
        categories={categories}
        product={editingProduct}
        onSaved={refreshAll}
      />
    </div>
  );
}

export default AdminProducts;