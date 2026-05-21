"use client";

import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineTicket,
} from "react-icons/hi2";

import { Promo } from "./types";

type PromoTableProps = {
  promos: Promo[];
  loading: boolean;
  deletingPromoId: string;
  onEdit: (promo: Promo) => void;
  onDelete: (promoId: string) => Promise<void>;
};

function formatDateTime(value: string) {
  return new Date(value).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default function PromoTable({
  promos,
  loading,
  onDelete,
  onEdit,
  deletingPromoId,
}: PromoTableProps) {
  return (
    <div className="overflow-x-auto rounded-[24px] border border-white/10">
    {/* ${
                  i === 6
                    ? "text-right"
                    : "text-left"
                } */}
      <table className="min-w-full">

        {/* TABLE HEAD */}
        <thead className="bg-[#0B1120]">
          <tr className="border-b border-white/10">

            {[
              "Promo Code",
              "Discount",
              "Usage",
              "Min Order",
              "Valid From",
              "Valid Till",
              "Actions",
            ].map((h, i) => (
              <th
                key={i}
                className={`px-6  py-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 
 
                 ${
                  i === 6
                    ? "text-center"
                    : "text-left"
                } 
                `}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody className="divide-y divide-white/5 bg-[#111827]/60"
        style={{textAlign:"center"}}>

          {/* LOADING */}
          {loading ? (
            <tr>
              <td
                colSpan={7}
                className="py-24 text-center"
              >
                <div className="flex flex-col items-center gap-4">

                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />

                  <p className="text-sm text-zinc-500">
                    Loading promos...
                  </p>
                </div>
              </td>
            </tr>
          ) : promos.length === 0 ? (

            /* EMPTY */
            <tr>
              <td
                colSpan={7}
                className="py-24 text-center"
              >
                <div className="flex flex-col items-center gap-4">

                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5">
                    <HiOutlineTicket className="text-4xl text-zinc-500" />
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-white">
                      No Promos Found
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      Create discount coupons for your store
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          ) : (

            /* DATA */
            promos.map((promo) => (
              <tr
                key={promo._id}
                className="group transition-all duration-300 hover:bg-white/[0.03]"
              >

                {/* CODE */}
                {/* <td className="px-6 py-5"> */}
                       <td className=" px-4 py-5 ">

                  <div className="flex items-center gap-4 ">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0B1120]">
                      <HiOutlineTicket className="text-2xl text-cyan-400" />
                    </div>

                    <div>
                      <p className="font-mono text-sm font-bold tracking-[0.2em] text-white">
                        {promo.code}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Promo Coupon
                      </p>
                    </div>
                  </div>
                </td>

                {/* DISCOUNT */}
                <td className=" py-5">

                  <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300">
                    {promo.percentage}% OFF
                  </span>
                </td>

                {/* COUNT */}
                <td className=" py-5">

                  <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-300">
                    {promo.count} Uses
                  </span>
                </td>

                {/* MIN ORDER */}
                <td className=" py-5 text-sm font-bold text-white">
                  ₹{promo.minimumOrderValue}
                </td>

                {/* START */}
                <td className=" py-5 text-sm text-zinc-300">
                  {formatDateTime(
                    promo.startsAt
                  )}
                </td>

                {/* END */}
                <td className=" py-5 text-sm text-zinc-300">
                  {formatDateTime(
                    promo.endsAt
                  )}
                </td>

                {/* ACTIONS */}
                <td className=" py-5">

                  {/* <div className="flex items-center justify-end gap-3"> */}
                  <div className="flex items-center justify-center gap-3">

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        onEdit(promo)
                      }
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-violet-500/10 hover:text-violet-300"
                    >
                      <HiOutlinePencilSquare className="text-lg" />

                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      disabled={
                        deletingPromoId ===
                        promo._id
                      }
                      onClick={() =>
                        onDelete(promo._id)
                      }
                      className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-all hover:bg-red-500/20 disabled:opacity-50"
                    >
                      {deletingPromoId ===
                      promo._id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-300/30 border-t-red-300" />
                      ) : (
                        <HiOutlineTrash className="text-lg" />
                      )}

                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}





// "use client";

// import { FiEdit2, FiTag, FiTrash2 } from "react-icons/fi";
// import { Promo } from "./types";

// type PromoTableProps = {
//   promos: Promo[];
//   loading: boolean;
//   deletingPromoId: string;
//   onEdit: (promo: Promo) => void;
//   onDelete: (promoId: string) => Promise<void>;
// };

// function formatDateTime(value: string) {
//   return new Date(value).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// export default function PromoTable({
//   promos,
//   loading,
//   onDelete,
//   onEdit,
//   deletingPromoId,
// }: PromoTableProps) {
//   if (loading) {
//     return (
//       <div className="flex h-[350px] flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-slate-50">
//         <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-indigo-600" />

//         <p className="text-sm font-medium text-slate-500">
//           Loading promos...
//         </p>
//       </div>
//     );
//   }

//   if (promos.length === 0) {
//     return (
//       <div className="flex h-[350px] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-slate-50">
//         <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
//           <FiTag className="h-7 w-7 text-slate-400" />
//         </div>

//         <div className="text-center">
//           <h3 className="text-base font-semibold text-slate-700">
//             No promos found
//           </h3>

//           <p className="mt-1 text-sm text-slate-400">
//             Create your first promo coupon
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//       {promos.map((promo) => (
//         <div
//           key={promo._id}
//           className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40"
//         >
//           {/* Top */}
//           <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5">
//             <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-indigo-500/10 blur-3xl" />

//             <div className="relative flex items-start justify-between gap-3">
//               <div>
//                 <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
//                   Promo Code
//                 </p>

//                 <h3 className="mt-2 font-mono text-2xl font-bold tracking-wider text-slate-800">
//                   {promo.code}
//                 </h3>
//               </div>

//               <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-right ring-1 ring-emerald-200">
//                 <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500">
//                   Discount
//                 </p>

//                 <h4 className="text-lg font-bold text-emerald-700">
//                   {promo.percentage}%
//                 </h4>
//               </div>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="space-y-4 p-5">
//             <div className="grid grid-cols-2 gap-3">
//               <div className="rounded-2xl bg-slate-50 p-3">
//                 <p className="text-xs font-medium text-slate-400">Usage</p>

//                 <h4 className="mt-1 text-lg font-bold text-slate-800">
//                   {promo.count}
//                 </h4>
//               </div>

//               <div className="rounded-2xl bg-slate-50 p-3">
//                 <p className="text-xs font-medium text-slate-400">
//                   Min Order
//                 </p>

//                 <h4 className="mt-1 text-lg font-bold text-slate-800">
//                   ₹{promo.minimumOrderValue}
//                 </h4>
//               </div>
//             </div>

//             <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
//               <div className="flex items-center justify-between">
//                 <p className="text-xs font-medium text-slate-400">
//                   Valid From
//                 </p>

//                 <p className="text-sm font-semibold text-slate-700">
//                   {formatDateTime(promo.startsAt)}
//                 </p>
//               </div>

//               <div className="h-px bg-slate-200" />

//               <div className="flex items-center justify-between">
//                 <p className="text-xs font-medium text-slate-400">
//                   Valid Till
//                 </p>

//                 <p className="text-sm font-semibold text-slate-700">
//                   {formatDateTime(promo.endsAt)}
//                 </p>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-3 pt-1">
//               <button
//                 onClick={() => onEdit(promo)}
//                 className="flex-1 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <FiEdit2 className="h-4 w-4" />
//                   Edit
//                 </div>
//               </button>

//               <button
//                 disabled={deletingPromoId === promo._id}
//                 onClick={() => onDelete(promo._id)}
//                 className="flex-1 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   {deletingPromoId === promo._id ? (
//                     <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-300 border-t-rose-600" />
//                   ) : (
//                     <FiTrash2 className="h-4 w-4" />
//                   )}

//                   Delete
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }










// "use client"; ye chatgpt ka h

// import { Promo } from "./types";

// import {
//   HiOutlinePencilSquare,
//   HiOutlineTrash,
//   HiOutlineTicket,
// } from "react-icons/hi2";

// type PromoTableProps = {
//   promos: Promo[];
//   loading: boolean;
//   deletingPromoId: string;
//   onEdit: (promo: Promo) => void;
//   onDelete: (promoId: string) => Promise<void>;
// };

// function formatDateTime(value: string) {
//   return new Date(value).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// export default function PromoTable({
//   promos,
//   loading,
//   onDelete,
//   onEdit,
//   deletingPromoId,
// }: PromoTableProps) {
//   return (
//     <div className="overflow-x-auto rounded-[24px] border border-white/10">

//       <table className="min-w-full">

//         {/* Table Head */}
//         <thead className="bg-[#0B1120]">
//           <tr className="border-b border-white/10">

//             {[
//               "Promo",
//               "Discount",
//               "Usage",
//               "Min Order",
//               "Starts",
//               "Ends",
//               "Actions",
//             ].map((h, i) => (
//               <th
//                 key={i}
//                 className={`px-6 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 ${
//                   i === 6 ? "text-right" : "text-left"
//                 }`}
//               >
//                 {h}
//               </th>
//             ))}

//           </tr>
//         </thead>

//         {/* Table Body */}
//         <tbody className="divide-y divide-white/5 bg-[#111827]/60">

//           {/* Loading */}
//           {loading ? (
//             <tr>
//               <td
//                 colSpan={7}
//                 className="py-24 text-center"
//               >
//                 <div className="flex flex-col items-center gap-4">

//                   <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />

//                   <p className="text-sm text-zinc-500">
//                     Loading promos...
//                   </p>

//                 </div>
//               </td>
//             </tr>
//           ) : promos.length === 0 ? (

//             /* Empty State */
//             <tr>
//               <td
//                 colSpan={7}
//                 className="py-24 text-center"
//               >
//                 <div className="flex flex-col items-center gap-4">

//                   <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5">
//                     <HiOutlineTicket className="text-4xl text-zinc-500" />
//                   </div>

//                   <div>
//                     <p className="text-lg font-semibold text-white">
//                       No Promos Found
//                     </p>

//                     <p className="mt-1 text-sm text-zinc-500">
//                       Create discount coupons for customers
//                     </p>
//                   </div>

//                 </div>
//               </td>
//             </tr>

//           ) : (

//             promos.map((promo) => (
//               <tr
//                 key={promo._id}
//                 className="group transition-all duration-300 hover:bg-white/[0.03]"
//               >

//                 {/* Promo Code */}
//                 <td className="px-6 py-5">

//                   <div className="flex items-center gap-4">

//                     <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
//                       <HiOutlineTicket className="text-3xl text-violet-300" />
//                     </div>

//                     <div>

//                       <p className="font-mono text-lg font-bold tracking-[0.15em] text-white">
//                         {promo.code}
//                       </p>

//                       <p className="mt-1 text-xs text-zinc-500">
//                         Promo Coupon
//                       </p>

//                     </div>

//                   </div>

//                 </td>

//                 {/* Discount */}
//                 <td className="px-6 py-5">

//                   <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300">
//                     {promo.percentage}% OFF
//                   </span>

//                 </td>

//                 {/* Usage */}
//                 <td className="px-6 py-5">

//                   <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-300">
//                     {promo.count} Uses
//                   </span>

//                 </td>

//                 {/* Min Order */}
//                 <td className="px-6 py-5 text-sm font-bold text-white">
//                   ₹{promo.minimumOrderValue}
//                 </td>

//                 {/* Starts */}
//                 <td className="px-6 py-5 text-sm text-zinc-400">
//                   {formatDateTime(promo.startsAt)}
//                 </td>

//                 {/* Ends */}
//                 <td className="px-6 py-5 text-sm text-zinc-400">
//                   {formatDateTime(promo.endsAt)}
//                 </td>

//                 {/* Actions */}
//                 <td className="px-6 py-5">

//                   <div className="flex items-center justify-end gap-3">

//                     {/* Edit */}
//                     <button
//                       onClick={() => onEdit(promo)}
//                       className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-violet-500/10 hover:text-violet-300"
//                     >
//                       <HiOutlinePencilSquare className="text-lg" />
//                       Edit
//                     </button>

//                     {/* Delete */}
//                     <button
//                       disabled={deletingPromoId === promo._id}
//                       onClick={() => onDelete(promo._id)}
//                       className="inline-flex items-center gap-2 rounded-2xl border border-red-500/10 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-all hover:bg-red-500/20 disabled:opacity-50"
//                     >

//                       {deletingPromoId === promo._id ? (
//                         <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-300/40 border-t-red-300" />
//                       ) : (
//                         <HiOutlineTrash className="text-lg" />
//                       )}

//                       Delete

//                     </button>

//                   </div>

//                 </td>

//               </tr>
//             ))

//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }