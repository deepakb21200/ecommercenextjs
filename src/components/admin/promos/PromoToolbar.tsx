// "use client";

// type PromoToolbarProps = {
//   search: string;
//   onSearchChange: (value: string) => void;
//   onAddPromo: () => void;
// };

// export default function PromoToolbar({
//   search,
//   onSearchChange,
//   onAddPromo,
// }: PromoToolbarProps) {
//   return (
//     <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      
//       {/* 🔍 Search */}
//       <div className="relative w-full sm:max-w-sm">
        
//         {/* Icon */}
//         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//           🔍
//         </span>

//         <input
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           placeholder="Search promos..."
//           className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* ➕ Add Button */}
//       <button
//         onClick={onAddPromo}
//         className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//       >
//         <span className="text-lg">＋</span>
//         Add Promo
//       </button>
//     </div>
//   );
// }


// "use client";

// import { FiSearch, FiPlus } from "react-icons/fi";

// type PromoToolbarProps = {
//   search: string;
//   onSearchChange: (value: string) => void;
//   onAddPromo: () => void;
// };

// export default function PromoToolbar({ search, onSearchChange, onAddPromo }: PromoToolbarProps) {
//   return (
//     <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//       {/* Search */}
//       <div className="relative w-full sm:w-80">
//         <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
//         <input
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           placeholder="Search promos..."
//           className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
//         />
//       </div>

//       {/* Add */}
//       <button
//         onClick={onAddPromo}
//         className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 active:bg-violet-700"
//       >
//         <FiPlus className="h-4 w-4" />
//         Add Promo
//       </button>
//     </div>
//   );
// }





"use client";

import { FiSearch, FiPlus } from "react-icons/fi";

type PromoToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddPromo: () => void;
};

export default function PromoToolbar({ search, onSearchChange, onAddPromo }: PromoToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      {/* Search */}
      <div className="relative w-full sm:w-72">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search promos..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Add */}
      <button
        onClick={onAddPromo}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:bg-indigo-800"
      >
        <FiPlus className="h-4 w-4" />
        Add Promo
      </button>
    </div>
  );
}