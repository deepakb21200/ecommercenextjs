// "use client";

// import { Promo } from "./types";



// type PromoTableProps = {
//   promos: Promo[];
//   loading: boolean;
//   deletingPromoId: string;
//   onEdit: (promo: Promo) => void;
//   onDelete: (promoId: string) => Promise<void>;
// };

// function formatDateTime(value: string) {
//   return new Date(value).toLocaleDateString();
// }

// export default function PromoTable({
//   promos,
//   loading,
//   onDelete,
//   onEdit,
//   deletingPromoId,
// }: PromoTableProps) {
//   return (
//     <div className="overflow-x-auto border rounded-xl bg-white">
      
//       <table className="w-full text-sm">
        
//         {/* HEADER */}
//         <thead className="bg-gray-50 border-b">
//           <tr className="text-left text-gray-600">
//             <th className="p-3">Code</th>
//             <th className="p-3">Discount</th>
//             <th className="p-3">Count</th>
//             <th className="p-3">Min Order</th>
//             <th className="p-3">Valid From</th>
//             <th className="p-3">Valid Till</th>
//             <th className="p-3 text-right">Edit</th>
//             <th className="p-3 text-right">Delete</th>
//           </tr>
//         </thead>

//         {/* BODY */}
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan={8} className="text-center py-10 text-gray-500">
//                 Loading Promos...
//               </td>
//             </tr>
//           ) : promos.length === 0 ? (
//             <tr>
//               <td colSpan={8} className="text-center py-10 text-gray-500">
//                 No Promos found
//               </td>
//             </tr>
//           ) : (
//             promos.map((promo) => (
//               <tr
//                 key={promo._id}
//                 className="border-b hover:bg-gray-50 transition"
//               >
//                 {/* CODE */}
//                 <td className="p-3 font-medium text-gray-900">
//                   {promo.code}
//                 </td>

//                 {/* DISCOUNT */}
//                 <td className="p-3 text-blue-600 font-semibold">
//                   {promo.percentage}%
//                 </td>

//                 {/* COUNT */}
//                 <td className="p-3">{promo.count}</td>

//                 {/* MIN ORDER */}
//                 <td className="p-3">₹{promo.minimumOrderValue}</td>

//                 {/* DATES */}
//                 <td className="p-3 text-gray-500">
//                   {formatDateTime(promo.startsAt)}
//                 </td>

//                 <td className="p-3 text-gray-500">
//                   {formatDateTime(promo.endsAt)}
//                 </td>

//                 {/* EDIT */}
//                 <td className="p-3 text-right">
//                   <button
//                     onClick={() => onEdit(promo)}
//                     className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 transition"
//                   >
//                     ✏️
//                   </button>
//                 </td>

//                 {/* DELETE */}
//                 <td className="p-3 text-right">
//                   <button
//                     disabled={deletingPromoId === promo._id}
//                     onClick={() => onDelete(promo._id)}
//                     className="px-3 py-1 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
//                   >
//                     {deletingPromoId === promo._id ? "..." : "🗑"}
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }





// "use client";

// import { FiEdit2, FiTrash2, FiTag } from "react-icons/fi";
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

// export default function PromoTable({ promos, loading, onDelete, onEdit, deletingPromoId }: PromoTableProps) {
//   return (
//     <div className="overflow-x-auto rounded-xl border border-zinc-800">
//       <table className="w-full text-sm">

//         <thead>
//           <tr className="border-b border-zinc-800">
//             {["Code", "Discount", "Count", "Min Order", "Valid From", "Valid Till", "", ""].map((h, i) => (
//               <th
//                 key={i}
//                 className={`px-4 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500 ${i >= 6 ? "text-right" : "text-left"}`}
//               >
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-zinc-800/60">
//           {loading ? (
//             <tr>
//               <td colSpan={8} className="py-16 text-center">
//                 <div className="flex flex-col items-center gap-3">
//                   <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />
//                   <p className="text-sm text-zinc-500">Loading promos...</p>
//                 </div>
//               </td>
//             </tr>
//           ) : promos.length === 0 ? (
//             <tr>
//               <td colSpan={8} className="py-16 text-center">
//                 <div className="flex flex-col items-center gap-3">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-800/50">
//                     <FiTag className="h-5 w-5 text-zinc-600" />
//                   </div>
//                   <p className="text-sm text-zinc-500">No promos found</p>
//                 </div>
//               </td>
//             </tr>
//           ) : (
//             promos.map((promo) => (
//               <tr key={promo._id} className="group transition-colors hover:bg-zinc-800/30">

//                 {/* Code */}
//                 <td className="px-4 py-4">
//                   <span className="font-mono text-sm font-semibold tracking-wider text-violet-400">
//                     {promo.code}
//                   </span>
//                 </td>

//                 {/* Discount */}
//                 <td className="px-4 py-4">
//                   <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
//                     {promo.percentage}% OFF
//                   </span>
//                 </td>

//                 {/* Count */}
//                 <td className="px-4 py-4">
//                   <span className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
//                     {promo.count} uses
//                   </span>
//                 </td>

//                 {/* Min Order */}
//                 <td className="px-4 py-4 font-medium text-zinc-200">
//                   ₹{promo.minimumOrderValue}
//                 </td>

//                 {/* Valid From */}
//                 <td className="px-4 py-4 text-zinc-400">
//                   {formatDateTime(promo.startsAt)}
//                 </td>

//                 {/* Valid Till */}
//                 <td className="px-4 py-4 text-zinc-400">
//                   {formatDateTime(promo.endsAt)}
//                 </td>

//                 {/* Edit */}
//                 <td className="px-4 py-4 text-right">
//                   <button
//                     onClick={() => onEdit(promo)}
//                     className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 opacity-0 transition group-hover:opacity-100 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-400"
//                   >
//                     <FiEdit2 className="h-3 w-3" />
//                     Edit
//                   </button>
//                 </td>

//                 {/* Delete */}
//                 <td className="px-4 py-4 text-right">
//                   <button
//                     disabled={deletingPromoId === promo._id}
//                     onClick={() => onDelete(promo._id)}
//                     className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/40 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/10 disabled:opacity-30"
//                   >
//                     {deletingPromoId === promo._id ? (
//                       <div className="h-3 w-3 animate-spin rounded-full border border-red-400/30 border-t-red-400" />
//                     ) : (
//                       <FiTrash2 className="h-3 w-3" />
//                     )}
//                     Delete
//                   </button>
//                 </td>

//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }







"use client";

import { FiEdit2, FiTrash2, FiTag } from "react-icons/fi";
import { Promo } from "./types";

type PromoTableProps = {
  promos: Promo[];
  loading: boolean;
  deletingPromoId: string;
  onEdit: (promo: Promo) => void;
  onDelete: (promoId: string) => Promise<void>;
};

function formatDateTime(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PromoTable({ promos, loading, onDelete, onEdit, deletingPromoId }: PromoTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm">

        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            {["Code", "Discount", "Count", "Min Order", "Valid From", "Valid Till", "", ""].map((h, i) => (
              <th
                key={i}
                className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400 ${i >= 6 ? "text-right" : "text-left"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {loading ? (
            <tr>
              <td colSpan={8} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-500" />
                  <p className="text-sm text-slate-400">Loading promos...</p>
                </div>
              </td>
            </tr>
          ) : promos.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                    <FiTag className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-400">No promos found</p>
                </div>
              </td>
            </tr>
          ) : (
            promos.map((promo) => (
              <tr key={promo._id} className="group bg-white transition-colors hover:bg-slate-50">

                {/* Code */}
                <td className="px-4 py-3.5">
                  <span className="font-mono text-sm font-semibold tracking-wider text-indigo-600">
                    {promo.code}
                  </span>
                </td>

                {/* Discount */}
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                    {promo.percentage}% OFF
                  </span>
                </td>

                {/* Count */}
                <td className="px-4 py-3.5">
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                    {promo.count} uses
                  </span>
                </td>

                {/* Min Order */}
                <td className="px-4 py-3.5 font-medium text-slate-700">
                  ₹{promo.minimumOrderValue}
                </td>

                {/* Valid From */}
                <td className="px-4 py-3.5 text-slate-500">
                  {formatDateTime(promo.startsAt)}
                </td>

                {/* Valid Till */}
                <td className="px-4 py-3.5 text-slate-500">
                  {formatDateTime(promo.endsAt)}
                </td>

                {/* Edit */}
                <td className="px-4 py-3.5 text-right">
                  <button
                    onClick={() => onEdit(promo)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 opacity-0 shadow-sm transition group-hover:opacity-100 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <FiEdit2 className="h-3 w-3" />
                    Edit
                  </button>
                </td>

                {/* Delete */}
                <td className="px-4 py-3.5 text-right">
                  <button
                    disabled={deletingPromoId === promo._id}
                    onClick={() => onDelete(promo._id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 opacity-0 transition group-hover:opacity-100 hover:bg-rose-100 disabled:opacity-40"
                  >
                    {deletingPromoId === promo._id ? (
                      <div className="h-3 w-3 animate-spin rounded-full border border-rose-300 border-t-rose-600" />
                    ) : (
                      <FiTrash2 className="h-3 w-3" />
                    )}
                    Delete
                  </button>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}