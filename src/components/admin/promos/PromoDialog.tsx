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
//   return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
// }

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

//   function updateField(key: keyof PromoFormValues, value: string) {
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

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl space-y-5">

//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-800">
//             {isEditMode ? "Edit Promo" : "Create Promo"}
//           </h2>
//           <button
//             onClick={() => onOpenChange(false)}
//             className="text-gray-400 hover:text-gray-600 transition"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Row 1 */}
//         <div className="grid gap-4 md:grid-cols-2">
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Promo Code</label>
//             <input
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               placeholder="e.g. SAVE20"
//               value={form.code}
//               onChange={(e) => updateField("code", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Discount %</label>
//             <input
//               type="number"
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               placeholder="e.g. 20"
//               value={form.percentage}
//               onChange={(e) => updateField("percentage", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="grid gap-4 md:grid-cols-2">
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Usage Count</label>
//             <input
//               type="number"
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               placeholder="e.g. 100"
//               value={form.count}
//               onChange={(e) => updateField("count", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Min Order Value (₹)</label>
//             <input
//               type="number"
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               placeholder="e.g. 500"
//               value={form.minimumOrderValue}
//               onChange={(e) => updateField("minimumOrderValue", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Row 3 */}
//         <div className="grid gap-4 md:grid-cols-2">
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Starts At</label>
//             <input
//               type="datetime-local"
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               value={form.startsAt}
//               onChange={(e) => updateField("startsAt", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Ends At</label>
//             <input
//               type="datetime-local"
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               value={form.endsAt}
//               onChange={(e) => updateField("endsAt", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 pt-2">
//           <button
//             onClick={() => onOpenChange(false)}
//             className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={submit}
//             disabled={saving}
//             className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 transition"
//           >
//             {saving ? "Saving..." : isEditMode ? "Update" : "Create"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }


































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
//   return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
// }

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
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl space-y-5">

//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-800">
//             {isEditMode ? "Edit Promo" : "Create Promo"}
//           </h2>
//           <button
//             onClick={() => onOpenChange(false)}
//             className="text-gray-400 hover:text-gray-600 transition"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Row 1 */}
//         <div className="grid gap-4 md:grid-cols-2">
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Promo Code</label>
//             <input
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               placeholder="e.g. SAVE20"
//               value={form.code}
//               onChange={(e) => updateField("code", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Discount %</label>
//             <input
//               type="number"
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               placeholder="e.g. 20"
//               value={form.percentage}
//               onChange={(e) => updateField("percentage", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="grid gap-4 md:grid-cols-2">
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Usage Count</label>
//             <input
//               type="number"
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               placeholder="e.g. 100"
//               value={form.count}
//               onChange={(e) => updateField("count", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Min Order Value (₹)</label>
//             <input
//               type="number"
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               placeholder="e.g. 500"
//               value={form.minimumOrderValue}
//               onChange={(e) => updateField("minimumOrderValue", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Row 3 */}
//         <div className="grid gap-4 md:grid-cols-2">
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Starts At</label>
//             <input
//               type="datetime-local"
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               value={form.startsAt}
//               onChange={(e) => updateField("startsAt", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="mb-1 block text-xs font-medium text-gray-600">Ends At</label>
//             <input
//               type="datetime-local"
//               className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
//               value={form.endsAt}
//               onChange={(e) => updateField("endsAt", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 pt-2">
//           <button
//             onClick={() => onOpenChange(false)}
//             className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={submit}
//             disabled={saving}
//             className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 transition"
//           >
//             {saving ? "Saving..." : isEditMode ? "Update" : "Create"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }






































































































//ye hai oringal code 

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

// const inputClass ="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100";

// const labelClass ="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400";

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
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
//       <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-xl">

//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
//           <div className="flex items-center gap-3">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
//               <RiCoupon3Line className="text-base text-white" />
//             </div>
//             <div>
//               <h2 className="text-base font-semibold text-slate-800">
//                 {isEditMode ? "Edit Promo" : "Create Promo"}
//               </h2>
//               <p className="text-xs text-slate-400">
//                 {isEditMode ? "Update coupon details" : "Fill in coupon details"}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => onOpenChange(false)}
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
//           >
//             <FiX className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="space-y-5 p-6">

//           {/* Row 1 */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <div>
//               <label className={labelClass}>Promo Code</label>
//               <input className={inputClass} placeholder="e.g. SAVE20" value={form.code} onChange={(e) => updateField("code", e.target.value)} />
//             </div>
//             <div>
//               <label className={labelClass}>Discount %</label>
//               <input type="number" className={inputClass} placeholder="e.g. 20" value={form.percentage} onChange={(e) => updateField("percentage", e.target.value)} />
//             </div>
//           </div>

//           {/* Row 2 */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <div>
//               <label className={labelClass}>Usage Count</label>
//               <input type="number" className={inputClass} placeholder="e.g. 100" value={form.count} onChange={(e) => updateField("count", e.target.value)} />
//             </div>
//             <div>
//               <label className={labelClass}>Min Order Value (₹)</label>
//               <input type="number" className={inputClass} placeholder="e.g. 500" value={form.minimumOrderValue} onChange={(e) => updateField("minimumOrderValue", e.target.value)} />
//             </div>
//           </div>

//           {/* Row 3 */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <div>
//               <label className={labelClass}>Starts At</label>
//               <input type="datetime-local" className={inputClass} value={form.startsAt} onChange={(e) => updateField("startsAt", e.target.value)} />
//             </div>
//             <div>
//               <label className={labelClass}>Ends At</label>
//               <input type="datetime-local" className={inputClass} value={form.endsAt} onChange={(e) => updateField("endsAt", e.target.value)} />
//             </div>
//           </div>

//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
//           <button
//             onClick={() => onOpenChange(false)}
//             className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={submit}
//             disabled={saving}
//             className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
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

export default function PromoDialog({ open, onOpenChange, promo, saving, onSaved }: PromoDialogProps) {
  const [form, setForm] = useState<PromoFormValues>(defaultForm);
  // const isEditMode = !!promo;
  const isEditMode = promo !== null;
  // console.log("po", promo);
  

  useEffect(() => {
    if (!open) {
      setForm(defaultForm); return
    }
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

  // function updateField<K extends keyof PromoFormValues>(key: K, value: PromoFormValues[K]) {
  //   setForm((prev) => ({ ...prev, [key]: value }));
  // }

  function updateField(key: keyof PromoFormValues, value: string) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditMode ? "Edit Promo" : "Create Promo"}
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Row 1 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Promo Code</label>
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
              placeholder="e.g. SAVE20"
              value={form.code}
              onChange={(e) => updateField("code", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Discount %</label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
              placeholder="e.g. 20"
              value={form.percentage}
              onChange={(e) => updateField("percentage", e.target.value)}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Usage Count</label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
              placeholder="e.g. 100"
              value={form.count}
              onChange={(e) => updateField("count", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Min Order Value (₹)</label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
              placeholder="e.g. 500"
              value={form.minimumOrderValue}
              onChange={(e) => updateField("minimumOrderValue", e.target.value)}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Starts At</label>
            <input
              type="datetime-local"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
              value={form.startsAt}
              onChange={(e) => updateField("startsAt", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Ends At</label>
            <input
              type="datetime-local"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition"
              value={form.endsAt}
              onChange={(e) => updateField("endsAt", e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 transition"
          >
            {saving ? "Saving..." : isEditMode ? "Update" : "Create"}
          </button>
        </div>

      </div>
    </div>
  );
}