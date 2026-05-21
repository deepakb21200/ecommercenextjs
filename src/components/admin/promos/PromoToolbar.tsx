

// ========================= PROMO TOOLBAR =========================

"use client";

import {
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
} from "react-icons/hi2";

type PromoToolbarProps = {
  search: string;
  onSearchChange: (
    value: string
  ) => void;
  onAddPromo: () => void;
};

export default function PromoToolbar({
  search,
  onSearchChange,
  onAddPromo,
}: PromoToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}
      <div className="relative w-full lg:max-w-md">

        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-zinc-500" />

        <input
          value={search}
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
          placeholder="Search promos..."
          className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
        />
      </div>

      {/* Add Promo */}
      <button
        onClick={onAddPromo}
        className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02]"
      >
        <HiOutlinePlus className="text-lg" />
        Add Promo
      </button>
    </div>
  );
}



