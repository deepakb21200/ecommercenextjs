
// <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">


"use client";

import { HiOutlineTicket } from "react-icons/hi2";
import AdminItemCard from "@/utils/AdminItemCard";
import { Promo } from "./types";

type Props = {
  promos: Promo[];
  loading: boolean;
deletingPromoId: string | null;
  onEdit: (promo: Promo) => void;
  onDelete: (promoId: string) => void;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PromoCards({
  promos,
  loading,
  deletingPromoId,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-zinc-400">
        Loading promos...
      </div>
    );
  }

  if (!promos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
        <HiOutlineTicket className="text-4xl text-zinc-500" />
        <p className="mt-2 text-sm">No Promos Found</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {promos.map((promo) => (
        <AdminItemCard
          key={promo._id}
          title={promo.code}
          subtitle="Promo Coupon"
          icon={
            <HiOutlineTicket className="text-2xl text-cyan-400" />
          }
          badge={
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              {promo.percentage}% OFF
            </span>

             
          }
          details={[
            {
              label: "Usage",
              value: promo.count,
            },
            {
              label: "Min Order",
              value: `₹${promo.minimumOrderValue}`,
            },
            {
              label: "Valid From",
              value: formatDate(promo.startsAt),
            },
            {
              label: "Valid Till",
              value: formatDate(promo.endsAt),
            },
          ]}
          onEdit={() => onEdit(promo)}
          onDelete={() => onDelete(promo._id)}
          isDeleting={deletingPromoId === promo._id}
        />
      ))}
    </div>
  );
}