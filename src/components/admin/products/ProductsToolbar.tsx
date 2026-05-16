
"use client";

import { FiSearch, FiTag, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
type Props = {
  search: string;
  onSearchChange: (val: string) => void;
  onManageCategories: () => void;

};

export function ProductToolbar({ search, onSearchChange, onManageCategories}: Props) {
  const router = useRouter();
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
          // onClick={onAddProduct}
          onClick={() => router.push("/admin/products/create-new")}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:bg-indigo-800"
        >
          <FiPlus className="h-4 w-4" />
          Add Product
        </button>
      </div>
    </div>
  );
}