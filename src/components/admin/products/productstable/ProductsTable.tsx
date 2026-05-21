








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
};

export function ProductsTable({
  products,
  loading,
  deletingProductId,
  onDelete,
}: Props) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-zinc-400">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
        <HiOutlineCube className="text-4xl text-zinc-500" />
        <p className="mt-2 text-sm">No Products Found</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {products.map((product) => {
        const isDeleting =
          deletingProductId === product._id;

        const coverImage =
          product.images?.find(
            (image) => image.isCover
          ) ?? product.images?.[0];

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
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  product.status === "active"
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
  );
}