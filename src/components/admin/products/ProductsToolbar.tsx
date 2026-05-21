
// "use client";

// import { FiSearch, FiTag, FiPlus } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// type Props = {
//   search: string;
//   onSearchChange: (val: string) => void;
//   onManageCategories: () => void;

// };

// export function ProductToolbar({ search, onSearchChange, onManageCategories}: Props) {
//   const router = useRouter();
//   return (
//     <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//       {/* Search */}
//       <div className="relative w-full sm:w-80">
//         <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//         <input
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           placeholder="Search products..."
//           className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
//         />
//       </div>

//       {/* Actions */}
//       <div className="flex gap-2">
//         <button
//           onClick={onManageCategories}
//           className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
//         >
//           <FiTag className="h-4 w-4" />
//           Categories
//         </button>

//         <button
//           // onClick={onAddProduct}
//           onClick={() => router.push("/admin/products/create-new")}
//           className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:bg-indigo-800"
//         >
//           <FiPlus className="h-4 w-4" />
//           Add Product
//         </button>
//       </div>
//     </div>
//   );
// }







// ========================= PRODUCT TOOLBAR =========================

"use client";

import { useRouter } from "next/navigation";

import {
  HiOutlineMagnifyingGlass,
  HiOutlineTag,
  HiOutlinePlus,
} from "react-icons/hi2";

type Props = {
  search: string;
  onSearchChange: (val: string) => void;
  onManageCategories: () => void;
};

export function ProductToolbar({
  search,
  onSearchChange,
  onManageCategories,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}
      <div className="relative w-full lg:max-w-md">

        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-zinc-500" />

        <input
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search products..."
          className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
        />
      </div>

      {/* Actions */}
      {/* <div className="flex flex-col gap-3 sm:flex-row">

        <button
          onClick={onManageCategories}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
        >
          <HiOutlineTag className="text-lg" />
          Categories
        </button>

        <button
          onClick={() =>
            router.push("/admin/products/create-new")
          }
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02]"
        >
          <HiOutlinePlus className="text-lg" />
          Add Product
        </button>
      </div> */}
    </div>
  );
}