

// import { RiDeleteBin6Line } from "react-icons/ri";

// type AdminBanner = {
//   _id: string;
//   imageUrl: string;
//   imagePublicId: string;
//   createdAt: string;
// };

// type Props = {
//   items: AdminBanner[];
//   deletingId: string;
//   onDelete: (id: string) => Promise<void>;
// };

// export default function AdminSettingsBannersTable({ items, deletingId, onDelete }: Props) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="border-b border-slate-100">
//             {["Preview", "Public ID", "Created At", ""].map((h, i) => (
//               <th
//                 key={i}
//                 className={`pb-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400 ${i === 3 ? "text-right pr-0" : "text-left"}`}
//               >
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-slate-100">
//           {items.map((item) => (
//             <tr key={item._id} className="group transition-colors hover:bg-slate-50">

//               {/* Preview */}
//               <td className="py-3.5 pr-4">
//                 <div className="h-14 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
//                   <img src={item.imageUrl} className="h-full w-full object-cover" alt="banner" />
//                 </div>
//               </td>

//               {/* Public ID */}
//               <td className="py-3.5 pr-4">
//                 <span className="inline-block  truncate rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-500">
//                   {item.imagePublicId}
//                 </span>
//               </td>

//               {/* Date */}
//               <td className="py-3.5 pr-4">
//                 <span className="text-xs text-slate-500">
//                   {new Date(item.createdAt).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </span>
//               </td>

//               {/* Delete */}
//               <td className="py-3.5 text-right">
//                 <button
//                   onClick={() => onDelete(item._id)}
//                   disabled={deletingId === item._id}
//                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition hover:bg-rose-100 disabled:opacity-40"
//                 >
//                   {deletingId === item._id ? (
//                     <div className="h-3 w-3 animate-spin rounded-full border border-rose-300 border-t-rose-600" />
//                   ) : (
//                     <RiDeleteBin6Line className="h-3.5 w-3.5" />
//                   )}
//                   Delete
//                 </button>
//               </td>

//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// "use client";

// import { RiDeleteBin6Line } from "react-icons/ri";

// type AdminBanner = {
//   _id: string;
//   imageUrl: string;
//   imagePublicId: string;
//   createdAt: string;
// };

// type Props = {
//   items: AdminBanner[];
//   deletingId: string;
//   onDelete: (id: string) => Promise<void>;
// };

// export default function AdminSettingsBannersTable({
//   items,
//   deletingId,
//   onDelete,
// }: Props) {
//   return (
//     <div className="overflow-x-auto rounded-[24px] border border-white/10">

//       <table className="min-w-full">

//         <thead className="bg-[#0B1120]">
//           <tr className="border-b border-white/10">

//             {[
//               "Preview",
//               "Public ID",
//               "Created At",
//               "Action",
//             ].map((h, i) => (
//               <th
//                 key={h}
//                 className={`px-6 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 ${
//                   i === 3
//                     ? "text-right"
//                     : "text-left"
//                 }`}
//               >
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-white/5 bg-[#111827]/60">

//           {items.map((item) => (
//             <tr
//               key={item._id}
//               className="group transition-all duration-300 hover:bg-white/[0.03]"
//             >

//               {/* Preview */}
//               <td className="px-6 py-5">

//                 <div className="h-20 w-36 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]">

//                   <img
//                     src={item.imageUrl}
//                     alt="banner"
//                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                 </div>
//               </td>

//               {/* Public ID */}
//               <td className="px-6 py-5">

//                 <span className="inline-flex max-w-[320px] truncate rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 font-mono text-xs text-fuchsia-300">

//                   {item.imagePublicId}
//                 </span>
//               </td>

//               {/* Date */}
//               <td className="px-6 py-5">

//                 <span className="text-sm text-zinc-400">
//                   {new Date(
//                     item.createdAt
//                   ).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </span>
//               </td>

//               {/* Action */}
//               <td className="px-6 py-5 text-right">

//                 <button
//                   onClick={() =>
//                     onDelete(item._id)
//                   }
//                   disabled={
//                     deletingId === item._id
//                   }
//                   className="inline-flex items-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-300 transition-all hover:bg-rose-500/20 disabled:opacity-40"
//                 >

//                   {deletingId === item._id ? (
//                     <div className="h-4 w-4 animate-spin rounded-full border border-rose-300 border-t-transparent" />
//                   ) : (
//                     <RiDeleteBin6Line className="text-base" />
//                   )}

//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



 "use client";

import { RiDeleteBin6Line } from "react-icons/ri";

type AdminBanner = {
  _id: string;
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
};

type Props = {
  items: AdminBanner[];
  deletingId: string;
  onDelete: (id: string) => Promise<void>;
};

export default function AdminSettingsBannersTable({
  items,
  deletingId,
  onDelete,
}: Props) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-[24px] border border-white/10 lg:block">
        <table className="min-w-full">
          <thead className="bg-[#0B1120]">
            <tr className="border-b border-white/10">
              {["Preview", "Public ID", "Created At", "Action"].map(
                (heading, index) => (
                  <th
                    key={heading}
                    className={`px-6 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 ${
                      index === 3 ? "text-right" : "text-left"
                    }`}
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 bg-[#111827]/60">
            {items.map((item) => (
              <tr
                key={item._id}
                className="group transition-all duration-300 hover:bg-white/[0.03]"
              >
                {/* Preview */}
                <td className="px-6 py-5">
                  <div className="h-20 w-36 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]">
                    <img
                      src={item.imageUrl}
                      alt="banner"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </td>

                {/* Public ID */}
                <td className="px-6 py-5">
                  <span className="inline-flex max-w-[320px] truncate rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 font-mono text-xs text-fuchsia-300">
                    {item.imagePublicId}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-5">
                  <span className="text-sm text-zinc-400">
                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => onDelete(item._id)}
                    disabled={deletingId === item._id}
                    className="inline-flex items-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-300 transition-all hover:bg-rose-500/20 disabled:opacity-40"
                  >
                    {deletingId === item._id ? (
                      <div className="h-4 w-4 animate-spin rounded-full border border-rose-300 border-t-transparent" />
                    ) : (
                      <RiDeleteBin6Line className="text-base" />
                    )}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {items.map((item) => (
          <div
            key={item._id}
            className="rounded-3xl border border-white/10 bg-[#111827]/60 p-4"
          >
            {/* Image */}
            <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]">
              <img
                src={item.imageUrl}
                alt="banner"
                className="h-48 w-full object-cover"
              />
            </div>

            {/* Public ID */}
            <div className="mb-3">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Public ID
              </p>
              <p className="break-all rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-2 font-mono text-xs text-fuchsia-300">
                {item.imagePublicId}
              </p>
            </div>

            {/* Date */}
            <div className="mb-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Created At
              </p>
              <p className="text-sm text-zinc-400">
                {new Date(item.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(item._id)}
              disabled={deletingId === item._id}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300 transition-all hover:bg-rose-500/20 disabled:opacity-40"
            >
              {deletingId === item._id ? (
                <div className="h-4 w-4 animate-spin rounded-full border border-rose-300 border-t-transparent" />
              ) : (
                <RiDeleteBin6Line className="text-base" />
              )}
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}