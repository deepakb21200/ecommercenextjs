// type AdminBanner = {
//   _id: string;
//   imageUrl: string;
//   imagePublicId: string;
//   createdAt: string;
// };

// export default function AdminSettingsBannersTable({
//   items,
// }: {
//   items: AdminBanner[];
// }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">Preview</th>
//             <th className="p-2 border">Public ID</th>
//             <th className="p-2 border">Created At</th>
//           </tr>
//         </thead>

//         <tbody>
//           {items.map((item) => (
//             <tr key={item._id}>
//               <td className="p-2 border">
//                 <img
//                   src={item.imageUrl}
//                   className="h-16 w-28 object-cover"
//                 />
//               </td>

//               <td className="p-2 border truncate max-w-[200px]">
//                 {item.imagePublicId}
//               </td>

//               <td className="p-2 border">
//                 {new Date(item.createdAt).toLocaleDateString()}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// ye hai desktop claude ka


// import { RiDeleteBin6Line } from "react-icons/ri";

// type AdminBanner = {
//   _id: string;
//   imageUrl: string;
//   imagePublicId: string;
//   createdAt: string;
// };

// export default function AdminSettingsBannersTable({
//   items,
// }: {
//   items: AdminBanner[];
// }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
//             <th className="pb-3 pr-4">Preview</th>
//             <th className="pb-3 pr-4">Public ID</th>
//             <th className="pb-3">Created At</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-50">
//           {items.map((item) => (
//             <tr key={item._id} className="hover:bg-gray-50 transition-colors group">
//               <td className="py-3 pr-4">
//                 <div className="h-14 w-24 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
//                   <img
//                     src={item.imageUrl}
//                     className="h-full w-full object-cover"
//                     alt="banner"
//                   />
//                 </div>
//               </td>
//               <td className="py-3 pr-4">
//                 <span className="inline-block max-w-[200px] truncate text-xs text-gray-500 font-mono bg-gray-50 border border-gray-100 px-2 py-1 rounded">
//                   {item.imagePublicId}
//                 </span>
//               </td>
//               <td className="py-3">
//                 <span className="text-xs text-gray-500">
//                   {new Date(item.createdAt).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }






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

export default function AdminSettingsBannersTable({ items, deletingId, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {["Preview", "Public ID", "Created At", ""].map((h, i) => (
              <th
                key={i}
                className={`pb-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400 ${i === 3 ? "text-right pr-0" : "text-left"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item._id} className="group transition-colors hover:bg-slate-50">

              {/* Preview */}
              <td className="py-3.5 pr-4">
                <div className="h-14 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <img src={item.imageUrl} className="h-full w-full object-cover" alt="banner" />
                </div>
              </td>

              {/* Public ID */}
              <td className="py-3.5 pr-4">
                <span className="inline-block  truncate rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-500">
                  {item.imagePublicId}
                </span>
              </td>

              {/* Date */}
              <td className="py-3.5 pr-4">
                <span className="text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </td>

              {/* Delete */}
              <td className="py-3.5 text-right">
                <button
                  onClick={() => onDelete(item._id)}
                  disabled={deletingId === item._id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 opacity-0 transition group-hover:opacity-100 hover:bg-rose-100 disabled:opacity-40"
                >
                  {deletingId === item._id ? (
                    <div className="h-3 w-3 animate-spin rounded-full border border-rose-300 border-t-rose-600" />
                  ) : (
                    <RiDeleteBin6Line className="h-3.5 w-3.5" />
                  )}
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}