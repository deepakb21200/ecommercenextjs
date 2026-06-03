"use client";

import type { Product } from "./types";
import { useRouter } from "next/navigation";
import { HiOutlineCube } from "react-icons/hi2";
import AdminItemCard from "@/utils/AdminItemCard";

type Props = {
  products: Product[];
  loading: boolean;
  deletingProductId: string;
  onDelete: (productId: string) => void;
  hasLoaded: boolean
  error?: string
};

export function ProductsTable({
  products,
  loading,
  deletingProductId,
  onDelete,
  hasLoaded,
  error
}: Props) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="h-10  w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-fuchsia-500" />
        <p className="text-sm mt-2 text-zinc-500">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full flex items-center justify-center rounded-[24px] border border-red-500/20 bg-red-500/5 py-14">
        <p className="text-sm font-medium tracking-wide text-red-400">
          Failed to fetch products
        </p>
      </div>
    );
  }


 

  // 3. EMPTY STATE (ONLY AFTER LOADING IS FALSE)
 if (!loading && hasLoaded && products.length === 0){
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400 col-span-full">
        <HiOutlineCube className="text-4xl text-zinc-500" />
        <p className="mt-2 text-sm">No Products Found</p>
      </div>
    );
  }


 
  return (
    <>

      {/* <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 shadow-2xl backdrop-blur-xl   p-4 lg:p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">


          {products.length > 0 && products.map((product) => {
                  
          
            
            const isDeleting =
              deletingProductId === product._id;

            const coverImage = product.images?.find((image) => image.isCover) ?? product.images?.[0];

            return (
              <AdminItemCard
                key={product._id}
                title={product.title}
                subtitle="Product Item"
                icon={
                  coverImage ? (
                    <img
                      src={coverImage.url}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <HiOutlineCube className="text-2xl text-cyan-400" />
                  )
                }
                badge={
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${product.status === "active"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                      : "border-zinc-500/20 bg-zinc-500/10 text-red-400"
                      }`}
                  >
                    {product.status}
                  </span>
                }
                details={[
                  {
                    label: "Brand",
                    value: product.brand,
                  },
                  {
                    label: "Category",
                    value:
                      product.category?.name || "-",
                  },
                  {
                    label: "Price",
                    value: `₹${product.price}`,
                  },
                  {
                    label: "Stock",
                    value: product.stock,
                  },
                ]}
                onEdit={() =>
                  router.push(
                    `/admin/products/edit-product/${product._id}`
                  )
                }
                onDelete={() =>
                  onDelete(product._id)
                }
                isDeleting={isDeleting}
              />
            );
          })}
        </div>

      </div> */}

    {!loading && products.length > 0 && (
           <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 shadow-2xl backdrop-blur-xl   p-4 lg:p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">


          {products.length > 0 && products.map((product) => {
            
            const isDeleting =
              deletingProductId === product._id;

            const coverImage = product.images?.find((image) => image.isCover) ?? product.images?.[0];

            return (
              <AdminItemCard
                key={product._id}
                title={product.title}
                subtitle="Product Item"
                icon={
                  coverImage ? (
                    <img
                      src={coverImage.url}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <HiOutlineCube className="text-2xl text-cyan-400" />
                  )
                }
                badge={
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${product.status === "active"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                      : "border-zinc-500/20 bg-zinc-500/10 text-red-400"
                      }`}
                  >
                    {product.status}
                  </span>
                }
                details={[
                  {
                    label: "Brand",
                    value: product.brand,
                  },
                  {
                    label: "Category",
                    value:
                      product.category?.name || "-",
                  },
                  {
                    label: "Price",
                    value: `₹${product.price}`,
                  },
                  {
                    label: "Stock",
                    value: product.stock,
                  },
                ]}
                onEdit={() =>
                  router.push(
                    `/admin/products/edit-product/${product._id}`
                  )
                }
                onDelete={() =>
                  onDelete(product._id)
                }
                isDeleting={isDeleting}
              />
            );
          })}
        </div>

      </div>
        )
      }



    </>



  );
}











 