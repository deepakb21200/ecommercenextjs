// "use client";

// import { useState } from "react";
// import { Category } from "../productstable/types";
 

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   categories: Category[];
//   onSaved: () => Promise<void>;
// };

// export function CategoryDialog({
//   open,
//   onOpenChange,
//   categories,
//   onSaved,
// }: Props) {
//   const [name, setName] = useState("");

//   if (!open) return null;

//   const handleAdd = async () => {
//     if (!name.trim()) return;

//     await fetch("/api/admin/categories", {
//       method: "POST",
//       body: JSON.stringify({ name }),
//     });

//     setName("");
//     await onSaved();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
        
//         <h2 className="text-lg font-semibold">Categories</h2>

//         <div className="flex gap-2">
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Category name"
//             className="border p-2 flex-1 rounded"
//           />
//           <button onClick={handleAdd} className="bg-blue-600 text-white px-3 rounded">
//             Add
//           </button>
//         </div>

//         <div className="space-y-2">
//           {categories.map((c) => (
//             <div key={c._id} className="border p-2 rounded">
//               {c.name}
//             </div>
//           ))}
//         </div>

//         <button onClick={() => onOpenChange(false)} className="text-sm">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }







// "use client";

// import { useState } from "react";
// import { FiX, FiPlus, FiTag } from "react-icons/fi";
// import { Category } from "../productstable/types";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   categories: Category[];
//   onSaved: () => Promise<void>;
// };

// export function CategoryDialog({ open, onOpenChange, categories, onSaved }: Props) {
//   const [name, setName] = useState("");
//   const [saving, setSaving] = useState(false);

//   if (!open) return null;

//   const handleAdd = async () => {
//     if (!name.trim()) return;
//     setSaving(true);
//     await fetch("/api/admin/categories", {
//       method: "POST",
//       body: JSON.stringify({ name }),
//     });
//     setName("");
//     await onSaved();
//     setSaving(false);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
//       <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">

//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
//           <div className="flex items-center gap-2">
//             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
//               <FiTag className="h-4 w-4" />
//             </div>
//             <h2 className="text-base font-semibold text-zinc-100">Manage Categories</h2>
//           </div>
//           <button
//             onClick={() => onOpenChange(false)}
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-300"
//           >
//             <FiX className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="space-y-4 p-6">

//           {/* Add input */}
//           <div className="flex gap-2">
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleAdd()}
//               placeholder="Category name..."
//               className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
//             />
//             <button
//               onClick={handleAdd}
//               disabled={saving}
//               className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:opacity-50"
//             >
//               <FiPlus className="h-4 w-4" />
//               Add
//             </button>
//           </div>

//           {/* Category list */}
//           <div className="max-h-64 space-y-1.5 overflow-y-auto">
//             {categories.length === 0 ? (
//               <p className="py-4 text-center text-sm text-zinc-600">No categories yet</p>
//             ) : (
//               categories.map((c) => (
//                 <div
//                   key={c._id}
//                   className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-800/50 px-3 py-2.5"
//                 >
//                   <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
//                   <span className="text-sm text-zinc-300">{c.name}</span>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="border-t border-zinc-800 px-6 py-4">
//           <button
//             onClick={() => onOpenChange(false)}
//             className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-zinc-100"
//           >
//             Done
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { FiX, FiPlus, FiTag } from "react-icons/fi";
import { Category } from "../productstable/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  onSaved: () => Promise<void>;
};

export function CategoryDialog({ open, onOpenChange, categories, onSaved }: Props) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleAdd = async () => {
    if (!name.trim()) return;
    setSaving(true);
    await fetch("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    setName("");
    await onSaved();
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <FiTag className="h-3.5 w-3.5 text-white" />
            </div>
            <h2 className="text-base font-semibold text-slate-800">Manage Categories</h2>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">

          {/* Add input */}
          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Category name..."
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
            <button
              onClick={handleAdd}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              <FiPlus className="h-4 w-4" />
              Add
            </button>
          </div>

          {/* Category list */}
          <div className="max-h-64 space-y-1.5 overflow-y-auto">
            {categories.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-400">No categories yet</p>
            ) : (
              categories.map((c) => (
                <div
                  key={c._id}
                  className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span className="text-sm text-slate-700">{c.name}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-4">
          <button
            onClick={() => onOpenChange(false)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}