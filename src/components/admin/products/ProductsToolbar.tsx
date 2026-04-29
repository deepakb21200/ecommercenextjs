// "use client";

// type Props = {
//   search: string;
//   onSearchChange: (val: string) => void;
//   onManageCategories: () => void;
//   onAddProduct: () => void;
// };

// export function ProductToolbar({
//   search,
//   onSearchChange,
//   onManageCategories,
//   onAddProduct,
// }: Props) {
//   return (
//     <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      
//       {/* Search */}
//       <input
//         value={search}
//         onChange={(e) => onSearchChange(e.target.value)}
//         placeholder="Search products..."
//         className="border rounded-lg px-3 py-2 w-full md:w-72"
//       />

//       {/* Actions */}
//       <div className="flex gap-2">
//         <button
//           onClick={onManageCategories}
//           className="px-3 py-2 border rounded-lg hover:bg-gray-100"
//         >
//           Categories
//         </button>

//         <button
//           onClick={onAddProduct}
//           className="px-3 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           + Add Product
//         </button>
//       </div>
//     </div>
//   );
// }






// "use client";

// import { FiSearch, FiTag, FiPlus } from "react-icons/fi";

// type Props = {
//   search: string;
//   onSearchChange: (val: string) => void;
//   onManageCategories: () => void;
//   onAddProduct: () => void;
// };

// export function ProductToolbar({ search, onSearchChange, onManageCategories, onAddProduct }: Props) {
//   return (
//     <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//       {/* Search */}
//       <div className="relative w-full sm:w-80">
//         <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
//         <input
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           placeholder="Search products..."
//           className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
//         />
//       </div>

//       {/* Actions */}
//       <div className="flex gap-2">
//         <button
//           onClick={onManageCategories}
//           className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-700 hover:text-zinc-100"
//         >
//           <FiTag className="h-4 w-4" />
//           Categories
//         </button>

//         <button
//           onClick={onAddProduct}
//           className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 active:bg-violet-700"
//         >
//           <FiPlus className="h-4 w-4" />
//           Add Product
//         </button>
//       </div>
//     </div>
//   );
// }




"use client";

import { FiSearch, FiTag, FiPlus } from "react-icons/fi";

type Props = {
  search: string;
  onSearchChange: (val: string) => void;
  onManageCategories: () => void;
  onAddProduct: () => void;
};

export function ProductToolbar({ search, onSearchChange, onManageCategories, onAddProduct }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onManageCategories}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
        >
          <FiTag className="h-4 w-4" />
          Categories
        </button>

        <button
          onClick={onAddProduct}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:bg-indigo-800"
        >
          <FiPlus className="h-4 w-4" />
          Add Product
        </button>
      </div>
    </div>
  );
}