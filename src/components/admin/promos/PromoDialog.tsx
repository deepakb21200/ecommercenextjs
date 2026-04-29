// "use client";


// import { useEffect, useState } from "react";
// import { Promo, PromoFormValues } from "./types";

// type PromoDialogProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   promo: Promo | null;
//   saving: boolean;
//   onSaved: (values: PromoFormValues) => Promise<void>;
// };

// const defaultForm: PromoFormValues = {
//   code: "",
//   percentage: "",
//   count: "",
//   minimumOrderValue: "",
//   startsAt: "",
//   endsAt: "",
// };

// function toDateTimeLocal(value?: string) {
//   if (!value) return "";
//   const date = new Date(value);

//   const pad = (n: number) => String(n).padStart(2, "0");

//   return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
//     date.getDate()
//   )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
// }

// export default function PromoDialog({
//   open,
//   onOpenChange,
//   promo,
//   saving,
//   onSaved,
// }: PromoDialogProps) {
//   const [form, setForm] = useState<PromoFormValues>(defaultForm);
//   const isEditMode = !!promo;

//   useEffect(() => {
//     if (!open) {
//       setForm(defaultForm);
//       return;
//     }

//     if (promo) {
//       setForm({
//         code: promo.code,
//         percentage: String(promo.percentage),
//         count: String(promo.count),
//         minimumOrderValue: String(promo.minimumOrderValue),
//         startsAt: toDateTimeLocal(promo.startsAt),
//         endsAt: toDateTimeLocal(promo.endsAt),
//       });
//     } else {
//       setForm(defaultForm);
//     }
//   }, [open, promo]);

//   function updateField<K extends keyof PromoFormValues>(
//     key: K,
//     value: PromoFormValues[K]
//   ) {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   }

//   async function submit() {
//     if (
//       !form.code.trim() ||
//       !form.percentage ||
//       !form.count ||
//       !form.minimumOrderValue ||
//       !form.startsAt ||
//       !form.endsAt
//     ) {
//       alert("All fields required");
//       return;
//     }

//     await onSaved({
//       code: form.code.trim().toUpperCase(),
//       percentage: form.percentage,
//       count: form.count,
//       minimumOrderValue: form.minimumOrderValue,
//       startsAt: new Date(form.startsAt).toISOString(),
//       endsAt: new Date(form.endsAt).toISOString(),
//     });
//   }

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       {/* Modal */}
//       <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        
//         {/* Header */}
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-xl font-semibold">
//             {isEditMode ? "Edit Promo" : "Create Promo"}
//           </h2>
//           <button
//             onClick={() => onOpenChange(false)}
//             className="text-gray-500 hover:text-black"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Form */}
//         <div className="space-y-5">

//           {/* Row 1 */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <input
//               className="input"
//               placeholder="Promo Code"
//               value={form.code}
//               onChange={(e) => updateField("code", e.target.value)}
//             />

//             <input
//               type="number"
//               className="input"
//               placeholder="Discount %"
//               value={form.percentage}
//               onChange={(e) => updateField("percentage", e.target.value)}
//             />
//           </div>

//           {/* Row 2 */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <input
//               type="number"
//               className="input"
//               placeholder="Count"
//               value={form.count}
//               onChange={(e) => updateField("count", e.target.value)}
//             />

//             <input
//               type="number"
//               className="input"
//               placeholder="Min Order Value"
//               value={form.minimumOrderValue}
//               onChange={(e) =>
//                 updateField("minimumOrderValue", e.target.value)
//               }
//             />
//           </div>

//           {/* Row 3 */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <input
//               type="datetime-local"
//               className="input"
//               value={form.startsAt}
//               onChange={(e) => updateField("startsAt", e.target.value)}
//             />

//             <input
//               type="datetime-local"
//               className="input"
//               value={form.endsAt}
//               onChange={(e) => updateField("endsAt", e.target.value)}
//             />
//           </div>

//           {/* Footer */}
//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               onClick={() => onOpenChange(false)}
//               className="rounded-lg border px-4 py-2 hover:bg-gray-100"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={submit}
//               disabled={saving}
//               className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
//             >
//               {saving
//                 ? "Saving..."
//                 : isEditMode
//                 ? "Update"
//                 : "Create"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Input style */}
//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 10px;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           outline: none;
//         }

//         .input:focus {
//           border-color: black;
//         }
//       `}</style>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { FiX, FiSave } from "react-icons/fi";
// import { RiCoupon3Line } from "react-icons/ri";
// import { Promo, PromoFormValues } from "./types";

// type PromoDialogProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   promo: Promo | null;
//   saving: boolean;
//   onSaved: (values: PromoFormValues) => Promise<void>;
// };

// const defaultForm: PromoFormValues = {
//   code: "",
//   percentage: "",
//   count: "",
//   minimumOrderValue: "",
//   startsAt: "",
//   endsAt: "",
// };

// function toDateTimeLocal(value?: string) {
//   if (!value) return "";
//   const date = new Date(value);
//   const pad = (n: number) => String(n).padStart(2, "0");
//   return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
// }

// const inputClass =
//   "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30";

// const labelClass =
//   "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-500";

// export default function PromoDialog({ open, onOpenChange, promo, saving, onSaved }: PromoDialogProps) {
//   const [form, setForm] = useState<PromoFormValues>(defaultForm);
//   const isEditMode = !!promo;

//   useEffect(() => {
//     if (!open) { setForm(defaultForm); return; }
//     if (promo) {
//       setForm({
//         code: promo.code,
//         percentage: String(promo.percentage),
//         count: String(promo.count),
//         minimumOrderValue: String(promo.minimumOrderValue),
//         startsAt: toDateTimeLocal(promo.startsAt),
//         endsAt: toDateTimeLocal(promo.endsAt),
//       });
//     } else {
//       setForm(defaultForm);
//     }
//   }, [open, promo]);

//   function updateField<K extends keyof PromoFormValues>(key: K, value: PromoFormValues[K]) {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   }

//   async function submit() {
//     if (!form.code.trim() || !form.percentage || !form.count || !form.minimumOrderValue || !form.startsAt || !form.endsAt) {
//       alert("All fields required");
//       return;
//     }
//     await onSaved({
//       code: form.code.trim().toUpperCase(),
//       percentage: form.percentage,
//       count: form.count,
//       minimumOrderValue: form.minimumOrderValue,
//       startsAt: new Date(form.startsAt).toISOString(),
//       endsAt: new Date(form.endsAt).toISOString(),
//     });
//   }

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
//       <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">

//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
//           <div className="flex items-center gap-3">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
//               <RiCoupon3Line className="text-lg" />
//             </div>
//             <div>
//               <h2 className="text-base font-semibold text-zinc-100">
//                 {isEditMode ? "Edit Promo" : "Create Promo"}
//               </h2>
//               <p className="text-xs text-zinc-500">
//                 {isEditMode ? "Update coupon details" : "Fill in coupon details"}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => onOpenChange(false)}
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-300"
//           >
//             <FiX className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="space-y-5 p-6">

//           {/* Row 1 — Code + Discount */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <div>
//               <label className={labelClass}>Promo Code</label>
//               <input
//                 className={inputClass}
//                 placeholder="e.g. SAVE20"
//                 value={form.code}
//                 onChange={(e) => updateField("code", e.target.value)}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Discount %</label>
//               <input
//                 type="number"
//                 className={inputClass}
//                 placeholder="e.g. 20"
//                 value={form.percentage}
//                 onChange={(e) => updateField("percentage", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Row 2 — Count + Min Order */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <div>
//               <label className={labelClass}>Usage Count</label>
//               <input
//                 type="number"
//                 className={inputClass}
//                 placeholder="e.g. 100"
//                 value={form.count}
//                 onChange={(e) => updateField("count", e.target.value)}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Min Order Value (₹)</label>
//               <input
//                 type="number"
//                 className={inputClass}
//                 placeholder="e.g. 500"
//                 value={form.minimumOrderValue}
//                 onChange={(e) => updateField("minimumOrderValue", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Row 3 — Dates */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <div>
//               <label className={labelClass}>Starts At</label>
//               <input
//                 type="datetime-local"
//                 className={inputClass}
//                 value={form.startsAt}
//                 onChange={(e) => updateField("startsAt", e.target.value)}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Ends At</label>
//               <input
//                 type="datetime-local"
//                 className={inputClass}
//                 value={form.endsAt}
//                 onChange={(e) => updateField("endsAt", e.target.value)}
//               />
//             </div>
//           </div>

//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-end gap-3 border-t border-zinc-800 px-6 py-4">
//           <button
//             onClick={() => onOpenChange(false)}
//             className="rounded-lg border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-zinc-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={submit}
//             disabled={saving}
//             className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:opacity-50"
//           >
//             {saving ? (
//               <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//             ) : (
//               <FiSave className="h-4 w-4" />
//             )}
//             {saving ? "Saving..." : isEditMode ? "Update" : "Create"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { FiX, FiSave } from "react-icons/fi";
import { RiCoupon3Line } from "react-icons/ri";
import { Promo, PromoFormValues } from "./types";

type PromoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promo: Promo | null;
  saving: boolean;
  onSaved: (values: PromoFormValues) => Promise<void>;
};

const defaultForm: PromoFormValues = {
  code: "",
  percentage: "",
  count: "",
  minimumOrderValue: "",
  startsAt: "",
  endsAt: "",
};

function toDateTimeLocal(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400";

export default function PromoDialog({ open, onOpenChange, promo, saving, onSaved }: PromoDialogProps) {
  const [form, setForm] = useState<PromoFormValues>(defaultForm);
  const isEditMode = !!promo;

  useEffect(() => {
    if (!open) { setForm(defaultForm); return; }
    if (promo) {
      setForm({
        code: promo.code,
        percentage: String(promo.percentage),
        count: String(promo.count),
        minimumOrderValue: String(promo.minimumOrderValue),
        startsAt: toDateTimeLocal(promo.startsAt),
        endsAt: toDateTimeLocal(promo.endsAt),
      });
    } else {
      setForm(defaultForm);
    }
  }, [open, promo]);

  function updateField<K extends keyof PromoFormValues>(key: K, value: PromoFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    if (!form.code.trim() || !form.percentage || !form.count || !form.minimumOrderValue || !form.startsAt || !form.endsAt) {
      alert("All fields required");
      return;
    }
    await onSaved({
      code: form.code.trim().toUpperCase(),
      percentage: form.percentage,
      count: form.count,
      minimumOrderValue: form.minimumOrderValue,
      startsAt: new Date(form.startsAt).toISOString(),
      endsAt: new Date(form.endsAt).toISOString(),
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
              <RiCoupon3Line className="text-base text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">
                {isEditMode ? "Edit Promo" : "Create Promo"}
              </h2>
              <p className="text-xs text-slate-400">
                {isEditMode ? "Update coupon details" : "Fill in coupon details"}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">

          {/* Row 1 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Promo Code</label>
              <input className={inputClass} placeholder="e.g. SAVE20" value={form.code} onChange={(e) => updateField("code", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Discount %</label>
              <input type="number" className={inputClass} placeholder="e.g. 20" value={form.percentage} onChange={(e) => updateField("percentage", e.target.value)} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Usage Count</label>
              <input type="number" className={inputClass} placeholder="e.g. 100" value={form.count} onChange={(e) => updateField("count", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Min Order Value (₹)</label>
              <input type="number" className={inputClass} placeholder="e.g. 500" value={form.minimumOrderValue} onChange={(e) => updateField("minimumOrderValue", e.target.value)} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Starts At</label>
              <input type="datetime-local" className={inputClass} value={form.startsAt} onChange={(e) => updateField("startsAt", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Ends At</label>
              <input type="datetime-local" className={inputClass} value={form.endsAt} onChange={(e) => updateField("endsAt", e.target.value)} />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <FiSave className="h-4 w-4" />
            )}
            {saving ? "Saving..." : isEditMode ? "Update" : "Create"}
          </button>
        </div>

      </div>
    </div>
  );
}