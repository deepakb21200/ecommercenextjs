
// <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">


"use client";

import { HiOutlineCube, HiOutlineTicket } from "react-icons/hi2";
import AdminItemCard from "@/utils/AdminItemCard";
import { Promo } from "./types";



type Props = {
  promos: Promo[];
  loading: boolean;
  deletingPromoId: string | null;
  onEdit: (promo: Promo) => void;
  onDelete: (promoId: string) => void;
  error: string
  hasLoaded: boolean
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
  error,
  hasLoaded
}: Props) {


  if (loading || !hasLoaded) {
    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="h-10  w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-fuchsia-500" />
        <p className="text-sm text-zinc-500 mt-2">Loading Promos...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="col-span-full flex items-center justify-center rounded-[24px] border border-red-500/20 bg-red-500/5 py-14">
        <p className="text-sm font-medium tracking-wide text-red-400">
          Failed to fetch promos
        </p>
      </div>
    );
  }




if (!loading && hasLoaded && promos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400  ">
        <HiOutlineTicket className="text-4xl text-zinc-500" />
        <p className="mt-2 text-sm">No Promos Found</p>
      </div>
    );
  }

  return (

    <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-4 shadow-2xl backdrop-blur-xl lg:p-6">
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
    </div>
  );
}