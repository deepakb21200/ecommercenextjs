// "use client";

// import { Product } from "./types";



// type Props = {
//   products: Product[];
//   loading: boolean;
//   onEdit: (product: Product) => void;
// };

// export function ProductsTable({ products, loading, onEdit }: Props) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm border">

//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 text-left">Image</th>
//             <th className="p-2 text-left">Title</th>
//             <th className="p-2 text-left">Brand</th>
//             <th className="p-2 text-left">Category</th>
//             <th className="p-2 text-left">Price</th>
//             <th className="p-2 text-left">Status</th>
//             <th className="p-2 text-left">Stock</th>
//             <th className="p-2 text-right">Edit</th>
//           </tr>
//         </thead>

//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan={8} className="text-center p-4">
//                 Loading...
//               </td>
//             </tr>
//           ) : products.length === 0 ? (
//             <tr>
//               <td colSpan={8} className="text-center p-4">
//                 No products found
//               </td>
//             </tr>
//           ) : (
//             products.map((p) => {
//               const cover = p.images?.find((img) => img.isCover);

//               return (
//                 <tr key={p._id} className="border-t">

//                   <td className="p-2">
//                     {cover && (
//                       <img
//                         src={cover.url}
//                         className="h-12 w-12 object-cover rounded"
//                       />
//                     )}
//                   </td>

//                   <td className="p-2">{p.title}</td>
//                   <td className="p-2">{p.brand}</td>
//                   <td className="p-2">{p.category?.name}</td>
//                   <td className="p-2">₹{p.price}</td>

//                   <td className="p-2">
//                     <span
//                       className={`text-xs px-2 py-1 rounded
//                         ${
//                           p.status === "active"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-gray-200"
//                         }`}
//                     >
//                       {p.status}
//                     </span>
//                   </td>

//                   <td className="p-2">{p.stock}</td>

//                   <td className="p-2 text-right">
//                     <button
//                       onClick={() => onEdit(p)}
//                       className="px-2 py-1 border rounded"
//                     >
//                       Edit
//                     </button>
//                   </td>

//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }




// "use client";

// import { FiEdit2, FiPackage } from "react-icons/fi";
// import { Product } from "./types";

// type Props = {
//   products: Product[];
//   loading: boolean;
//   onEdit: (product: Product) => void;
// };

// export function ProductsTable({ products, loading, onEdit }: Props) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">

//         <thead>
//           <tr className="border-b border-zinc-800">
//             {["Image", "Title", "Brand", "Category", "Price", "Status", "Stock", ""].map((h) => (
//               <th
//                 key={h}
//                 className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500 last:text-right"
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
//                   <p className="text-sm text-zinc-500">Loading products...</p>
//                 </div>
//               </td>
//             </tr>
//           ) : products.length === 0 ? (
//             <tr>
//               <td colSpan={8} className="py-16 text-center">
//                 <div className="flex flex-col items-center gap-3">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-800/50">
//                     <FiPackage className="h-5 w-5 text-zinc-600" />
//                   </div>
//                   <p className="text-sm text-zinc-500">No products found</p>
//                 </div>
//               </td>
//             </tr>
//           ) : (
//             products.map((p) => {
//               const cover = p.images?.find((img) => img.isCover) ?? p.images?.[0];
//               return (
//                 <tr key={p._id} className="group transition-colors hover:bg-zinc-800/40">

//                   {/* Image */}
//                   <td className="px-4 py-3">
//                     <div className="h-12 w-12 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800">
//                       {cover ? (
//                         <img src={cover.url} alt={p.title} className="h-full w-full object-cover" />
//                       ) : (
//                         <div className="flex h-full w-full items-center justify-center">
//                           <FiPackage className="h-4 w-4 text-zinc-600" />
//                         </div>
//                       )}
//                     </div>
//                   </td>

//                   {/* Title */}
//                   <td className="px-4 py-3">
//                     <p className="max-w-[180px] truncate font-medium text-zinc-200">{p.title}</p>
//                   </td>

//                   {/* Brand */}
//                   <td className="px-4 py-3 text-zinc-400">{p.brand}</td>

//                   {/* Category */}
//                   <td className="px-4 py-3">
//                     <span className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
//                       {p.category?.name}
//                     </span>
//                   </td>

//                   {/* Price */}
//                   <td className="px-4 py-3 font-medium text-zinc-200">₹{p.price}</td>

//                   {/* Status */}
//                   <td className="px-4 py-3">
//                     <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
//                       p.status === "active"
//                         ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
//                         : "bg-zinc-700/50 text-zinc-400 ring-1 ring-zinc-600/30"
//                     }`}>
//                       <span className={`h-1.5 w-1.5 rounded-full ${p.status === "active" ? "bg-emerald-400" : "bg-zinc-500"}`} />
//                       {p.status}
//                     </span>
//                   </td>

//                   {/* Stock */}
//                   <td className="px-4 py-3">
//                     <span className={`text-sm font-medium ${p.stock <= 5 ? "text-amber-400" : "text-zinc-300"}`}>
//                       {p.stock}
//                     </span>
//                   </td>

//                   {/* Edit */}
//                   <td className="px-4 py-3 text-right">
//                     <button
//                       onClick={() => onEdit(p)}
//                       className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium  text-white transition    hover:bg-violet-500/10  "
//                     >
//                       <FiEdit2 className="h-3 w-3" />
//                       Edit
//                     </button>
//                   </td>

//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }





"use client";

import { FiEdit2, FiPackage } from "react-icons/fi";
import { Product } from "./types";
import { useRouter } from "next/navigation";
type Props = {
  products: Product[];
  loading: boolean;

};



export function ProductsTable({ products, loading, }: Props) {
  const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">

        <thead>
          <tr className="border-b border-slate-100">
            {["Image", "Title", "Brand", "Category", "Price", "Status", "Stock", ""].map((h, i) => (
              <th
                key={i}
                className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400 ${i === 7 ? "text-right" : "text-left"}`}
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
                  <p className="text-sm text-slate-400">Loading products...</p>
                </div>
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                    <FiPackage className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-400">No products found</p>
                </div>
              </td>
            </tr>
          ) : (
            products.map((p) => {
              const cover = p.images?.find((img) => img.isCover) ?? p.images?.[0];


              return (
                <tr key={p._id} className="group transition-colors hover:bg-slate-50">

                  {/* Image */}
                  <td className="px-4 py-3.5">
                    <div className="h-11 w-11 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      {cover ? (
                        <img src={cover.url} alt={p.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <FiPackage className="h-4 w-4 text-slate-400" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Title */}
                  <td className="px-4 py-3.5">
                    <p className="max-w-[180px] truncate font-medium text-slate-800">{p.title}</p>
                  </td>

                  {/* Brand */}
                  <td className="px-4 py-3.5 text-slate-500">{p.brand}</td>

                  {/* Category */}
                  <td className="px-4 py-3.5">
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                      {p.category?.name}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3.5 font-medium text-slate-800">₹{p.price}</td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${p.status === "active"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                        : "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
                      }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${p.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                      {p.status}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-medium ${p.stock <= 5 ? "text-amber-600" : "text-slate-700"}`}>
                      {p.stock}
                    </span>
                  </td>

                  {/* Edit */}
                  <td className="px-4 py-3.5 text-right">
                    {/* <button
                      // onClick={() => onEdit(p)}
                      onClick={() => router.push(`/admin/products/edit-product/${p._id}`)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 opacity-0 shadow-sm transition group-hover:opacity-100 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <FiEdit2 className="h-3 w-3" />
                      Edit
                    </button> */}
                    <button
                      onClick={() => router.push(`/admin/products/edit-product/${p._id}`)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <FiEdit2 className="h-3 w-3" />
                      Edit
                    </button>
                  </td>

                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}