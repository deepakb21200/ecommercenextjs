"use client";

import { CategoryDialog } from "@/components/admin/products/categorydialog/CategoryDialog";
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

  const loadProducts = async (searchValue = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        searchValue
          ? `/api/admin/products?search=${encodeURIComponent(searchValue)}`
          : `/api/admin/products`
      );
      const data = await res.json();
      console.log(data);
      
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

  useEffect(() => { 
    loadCategories(); 
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { 
      loadProducts(search);
     }, 300);
    return () => clearTimeout(timer);
  }, [search]);
 
 


  const refreshAll = async () => { 
    await Promise.all([loadCategories(), loadProducts(search)]);
  
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">Inventory</p>
          <h1 className="mb-6 mt-1 text-2xl font-semibold text-slate-800">Products</h1>
          <ProductToolbar search={search} onSearchChange={setSearch}  onManageCategories={() => setCategoryDialogOpen(true)}  />
        </div>

        {/* Table card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ProductsTable loading={loading} products={products} />
        </div>
      </div>

      <CategoryDialog  open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen} categories={categories}  onSaved={refreshAll}/>

    </div>
  );
}

export default AdminProducts;