// "use client";

// import { Promo } from "./types";
// import {
//   HiOutlineTicket,
//   HiOutlinePencilSquare,
//   HiOutlineTrash,
// } from "react-icons/hi2";

// type Props = {
//   promos: Promo[];
//   loading: boolean;
//   deletingPromoId: string;
//   onEdit: (promo: Promo) => void;
//   onDelete: (promoId: string) => void;
// };

// function formatDate(value: string) {
//   return new Date(value).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// export default function PromoCards({
//   promos,
//   loading,
//   deletingPromoId,
//   onEdit,
//   onDelete,
// }: Props) {
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-20 text-zinc-400">
//         Loading promos...
//       </div>
//     );
//   }

//   if (!promos.length) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
//         <HiOutlineTicket className="text-4xl text-zinc-500" />
//         <p className="mt-2 text-sm">No Promos Found</p>
//       </div>
//     );
//   }

//   return (
    
//       <div className="grid   sm:grid-cols-2 lg:grid-cols-3 gap-3">
//       {promos.map((promo) => {
//         const isDeleting = deletingPromoId === promo._id;

//         return (
//           <div
//             key={promo._id}
//             className="rounded-[20px] border border-white/10 bg-[#111827]/60 p-4 backdrop-blur-xl"
//           >
//             {/* TOP */}
//             <div className="flex items-center justify-between gap-3 ">
//               <div className="flex gap-3 items-center">
//                 {/* ICON */}
//                 <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B1120]">
//                   <HiOutlineTicket className="text-2xl text-cyan-400" />
//                 </div>

//                 {/* INFO */}
//                 <div>
//                   <p className="font-mono text-sm font-bold tracking-[0.2em] text-white">
//                     {promo.code}
//                   </p>

//                   <p className="mt-1 text-xs text-zinc-500">
//                     Promo Coupon
//                   </p>
//                 </div>
//               </div>

//               {/* DISCOUNT BADGE */}
//               <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
//                 {promo.percentage}% OFF
//               </span>
//             </div>

//             {/* DETAILS */}
//             <div className="mt-4 space-y-2 text-xs text-zinc-400">
//               <div className="flex justify-between">
//                 <span>Usage</span>
//                 <span className="text-white">{promo.count}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Min Order</span>
//                 <span className="text-white">₹{promo.minimumOrderValue}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Valid From</span>
//                 <span className="text-white">{formatDate(promo.startsAt)}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Valid Till</span>
//                 <span className="text-white">{formatDate(promo.endsAt)}</span>
//               </div>
//             </div>

//             {/* ACTIONS */}
//             <div className="mt-4 flex items-center sm:justify-end  justify-start gap-2">
//               {/* EDIT */}
//               <button
//                 onClick={() => onEdit(promo)}
//                 className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 hover:bg-violet-500/10 hover:text-violet-300"
//               >
//                 <HiOutlinePencilSquare className="text-sm" />
//                 Edit
//               </button>

//               {/* DELETE */}
//               <button
//                 onClick={() => onDelete(promo._id)}
//                 disabled={isDeleting}
//                 className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
//               >
//                 {isDeleting ? (
//                   <div className="h-3 w-3 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
//                 ) : (
//                   <HiOutlineTrash className="text-sm" />
//                 )}
//                 Delete
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }



// <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">


"use client";

import { HiOutlineTicket } from "react-icons/hi2";
import AdminItemCard from "@/utils/AdminItemCard";
import { Promo } from "./types";

type Props = {
  promos: Promo[];
  loading: boolean;
  deletingPromoId: string;
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