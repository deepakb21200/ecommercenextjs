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
  const [deletingProductId, setDeletingProductId] = useState("");
  const [categoryDialogOpen, setCategoryDialogOpen,] = useState(false);


  const skipNextSearch = useRef(false);

  const {
    products,
    categories,
    loading,
    refreshAll,
    error,
    hasLoaded

  } = useAdminProductsStore();



  // cleanup — sirf ek useEffect
  useEffect(() => {
    return () => {
      useAdminProductsStore.setState({
        products: [],
        categories: [],
        loading: false,
        error: "",
        hasLoaded: false,
      });
    };
  }, []);



  // search effect
  useEffect(() => {
    if (skipNextSearch.current) { skipNextSearch.current = false; return; }
    const timer = setTimeout(() => { void refreshAll(search.trim()); }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      setDeletingProductId(productId);
      await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      await refreshAll(search);
    } finally {
      setDeletingProductId("");
    }
  };



  useEffect(() => {

    console.log("pro-+", products);

  }, [products])

  return (
    <div className="">

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
          error={error}
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


          item={Number(products.length)}



          refreshAll={async () => {
            skipNextSearch.current = true;
            setSearch("");
            await refreshAll("");


          }}


        />

        {/* TABLE */}

        <ProductsTable
          loading={loading}
          products={products}

          hasLoaded={hasLoaded}
          deletingProductId={deletingProductId}
          onDelete={handleDelete}
          error={error}
        />
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







 