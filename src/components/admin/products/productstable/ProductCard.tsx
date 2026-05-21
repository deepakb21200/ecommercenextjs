
 




"use client";

import { useRouter } from "next/navigation";
import {
  HiOutlineCube,

} from "react-icons/hi2";
import type { Product } from "./types";
import AdminItemCard from "@/utils/AdminItemCard";
 

type Props = {
  product: Product;
  deletingProductId?: string;
  onDelete: (productId: string) => void;
};

export default function ProductCard({
  product,
  deletingProductId,
  onDelete,
}: Props) {
  const router = useRouter();

  const isDeleting =
    deletingProductId === product._id;

  const coverImage =
    product.images?.find(
      (image) => image.isCover
    ) ?? product.images?.[0];

  return (
    <AdminItemCard
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
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            product.status === "active"
              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
              : "border border-zinc-500/20 bg-zinc-500/10 text-red-400"
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
          value: product.category?.name || "-",
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
      onDelete={() => onDelete(product._id)}
      isDeleting={isDeleting}
    />
  );
}