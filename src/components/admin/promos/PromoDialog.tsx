"use client"
import { useEffect, useState } from "react";
import {
  FiX,
  FiPercent,
  FiHash,
  FiCalendar,
  FiTag,
  FiShoppingBag,
} from "react-icons/fi";

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

  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}`;
}

export default function PromoDialog({
  open,
  onOpenChange,
  promo,
  saving,
  onSaved,
}: PromoDialogProps) {
  const [form, setForm] = useState<PromoFormValues>(defaultForm);

  const isEditMode = promo !== null;

  useEffect(() => {
    if (!open) {
      setForm(defaultForm);
      return;
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

  function updateField(key: keyof PromoFormValues, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function submit() {
    if (
      !form.code.trim() ||
      !form.percentage ||
      !form.count ||
      !form.minimumOrderValue ||
      !form.startsAt ||
      !form.endsAt
    ) {
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

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
  <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-[#111827] shadow-2xl">

    {/* Glow Effects */}
    <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
    <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

    {/* Header */}
    <div className="relative flex items-start justify-between border-b border-white/10 px-6 py-5 sm:px-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-xl shadow-violet-500/20">
          <FiTag className="h-5 w-5 text-white" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Promo Management
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            {isEditMode ? "Edit Promo Coupon" : "Create New Promo"}
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Manage discount offers and campaign validity
          </p>
        </div>
      </div>

      <button
        onClick={() => onOpenChange(false)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
      >
        <FiX className="h-5 w-5" />
      </button>
    </div>

    {/* Body */}
    <div className="relative space-y-7 px-6 py-6 sm:px-8">

      {/* Promo Preview */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-500 to-cyan-500 p-[1px]">
        <div className="rounded-3xl bg-[#0B1120]/95 p-5 backdrop-blur">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
                Promo Preview
              </p>

              <h3 className="mt-2 font-mono text-3xl font-black tracking-[0.2em] text-white">
                {form.code || "SAVE20"}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {form.percentage || "20"}% OFF
                </span>

                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  {form.count || "100"} Uses
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-4">
              <p className="text-xs font-medium text-zinc-400">
                Minimum Order
              </p>

              <h4 className="mt-1 text-2xl font-bold text-violet-300">
                ₹{form.minimumOrderValue || "500"}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-5 md:grid-cols-2">

        {/* Promo Code */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Promo Code
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 py-3 transition focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">
            <FiTag className="h-4 w-4 text-cyan-400" />

            <input
              value={form.code}
              onChange={(e) =>
                updateField("code", e.target.value.toUpperCase())
              }
              placeholder="SAVE20"
              className="w-full bg-transparent text-sm font-semibold tracking-wider text-white outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Discount Percentage
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 py-3 transition focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">
            <FiPercent className="h-4 w-4 text-cyan-400" />

            <input
              type="number"
              value={form.percentage}
              onChange={(e) =>
                updateField("percentage", e.target.value)
              }
              placeholder="20"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Usage Count */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Usage Count
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 py-3 transition focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">
            <FiHash className="h-4 w-4 text-cyan-400" />

            <input
              type="number"
              value={form.count}
              onChange={(e) => updateField("count", e.target.value)}
              placeholder="100"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Minimum Order Value */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Minimum Order Value
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 py-3 transition focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">
            <FiShoppingBag className="h-4 w-4 text-cyan-400" />

            <input
              type="number"
              value={form.minimumOrderValue}
              onChange={(e) =>
                updateField("minimumOrderValue", e.target.value)
              }
              placeholder="500"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid gap-5 md:grid-cols-2">

        {/* Starts At */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Starts At
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 py-3 transition focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">
            <FiCalendar className="h-4 w-4 text-cyan-400" />

            <input
              type="datetime-local"
              value={form.startsAt}
              onChange={(e) =>
                updateField("startsAt", e.target.value)
              }
              className="w-full bg-transparent text-sm text-white outline-none"
            />
          </div>
        </div>

        {/* Ends At */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Ends At
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 py-3 transition focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">
            <FiCalendar className="h-4 w-4 text-cyan-400" />

            <input
              type="datetime-local"
              value={form.endsAt}
              onChange={(e) =>
                updateField("endsAt", e.target.value)
              }
              className="w-full bg-transparent text-sm text-white outline-none"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="relative flex flex-col-reverse gap-3 border-t border-white/10 bg-[#0B1120]/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-8">
      <button
        onClick={() => onOpenChange(false)}
        className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
      >
        Cancel
      </button>

      <button
        onClick={submit}
        disabled={saving}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        )}

        {saving
          ? "Saving..."
          : isEditMode
          ? "Update Promo"
          : "Create Promo"}
      </button>
    </div>
  </div>
</div>
  );
}













// "use client";

// import { useEffect, useState } from "react";

// import {
//   HiOutlineXMark,
//   HiOutlinePercentBadge,
//   HiOutlineHashtag,
//   HiOutlineCalendarDays,
//   HiOutlineTicket,
//   HiOutlineShoppingBag,
//   HiOutlineSparkles,
// } from "react-icons/hi2";

// import { Promo, PromoFormValues } from "./types";

// type PromoDialogProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   promo: Promo | null;
//   saving: boolean;
//   onSaved: (
//     values: PromoFormValues
//   ) => Promise<void>;
// };

// const defaultForm: PromoFormValues = {
//   code: "",
//   percentage: "",
//   count: "",
//   minimumOrderValue: "",
//   startsAt: "",
//   endsAt: "",
// };

// function toDateTimeLocal(
//   value?: string
// ) {
//   if (!value) return "";

//   const date = new Date(value);

//   const pad = (n: number) =>
//     String(n).padStart(2, "0");

//   return `${date.getFullYear()}-${pad(
//     date.getMonth() + 1
//   )}-${pad(date.getDate())}T${pad(
//     date.getHours()
//   )}:${pad(date.getMinutes())}`;
// }

// export default function PromoDialog({
//   open,
//   onOpenChange,
//   promo,
//   saving,
//   onSaved,
// }: PromoDialogProps) {
//   const [form, setForm] =
//     useState<PromoFormValues>(
//       defaultForm
//     );

//   const isEditMode = promo !== null;

//   useEffect(() => {
//     if (!open) {
//       setForm(defaultForm);
//       return;
//     }

//     if (promo) {
//       setForm({
//         code: promo.code,
//         percentage: String(
//           promo.percentage
//         ),
//         count: String(promo.count),
//         minimumOrderValue: String(
//           promo.minimumOrderValue
//         ),
//         startsAt: toDateTimeLocal(
//           promo.startsAt
//         ),
//         endsAt: toDateTimeLocal(
//           promo.endsAt
//         ),
//       });
//     } else {
//       setForm(defaultForm);
//     }
//   }, [open, promo]);

//   function updateField(
//     key: keyof PromoFormValues,
//     value: string
//   ) {
//     setForm((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
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
//       code: form.code
//         .trim()
//         .toUpperCase(),
//       percentage: form.percentage,
//       count: form.count,
//       minimumOrderValue:
//         form.minimumOrderValue,
//       startsAt: new Date(
//         form.startsAt
//       ).toISOString(),
//       endsAt: new Date(
//         form.endsAt
//       ).toISOString(),
//     });
//   }

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">

//       <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#111827] shadow-2xl">

//         {/* Glow Effects */}
//         <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

//         <div className="absolute bottom-[-100px] right-[-40px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

//         {/* HEADER */}
//         <div className="relative z-10 flex items-start justify-between border-b border-white/10 px-6 py-6 sm:px-8">

//           <div className="flex items-center gap-4">

//             <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-2xl shadow-violet-500/20">
//               <HiOutlineTicket className="text-2xl text-white" />
//             </div>

//             <div>

//               <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
//                 Velvet Promotions
//               </p>

//               <h2 className="mt-2 text-2xl font-black text-white">
//                 {isEditMode
//                   ? "Edit Promo Coupon"
//                   : "Create Promo Coupon"}
//               </h2>

//               <p className="mt-2 text-sm text-zinc-400">
//                 Manage premium discount
//                 campaigns and customer
//                 offers.
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() =>
//               onOpenChange(false)
//             }
//             className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
//           >
//             <HiOutlineXMark className="text-xl" />
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="relative z-10 space-y-8 p-6 sm:p-8">

//           {/* PREVIEW CARD */}
//           <div className="overflow-hidden rounded-[28px] border border-violet-500/20 bg-violet-500/10 backdrop-blur-xl">

//             <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">

//               <div>

//                 <div className="flex items-center gap-2">

//                   <HiOutlineSparkles className="text-lg text-violet-300" />

//                   <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
//                     Promo Preview
//                   </p>
//                 </div>

//                 <h3 className="mt-4 font-mono text-4xl font-black tracking-[0.25em] text-white">
//                   {form.code ||
//                     "SAVE20"}
//                 </h3>

//                 <div className="mt-4 flex flex-wrap items-center gap-3">

//                   <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300">
//                     {form.percentage ||
//                       "20"}
//                     % OFF
//                   </span>

//                   <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-300">
//                     {form.count ||
//                       "100"}{" "}
//                     Uses
//                   </span>
//                 </div>
//               </div>

//               <div className="rounded-3xl border border-white/10 bg-[#0B1120] px-6 py-5">

//                 <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
//                   Minimum Order
//                 </p>

//                 <h4 className="mt-2 text-3xl font-black text-white">
//                   ₹
//                   {form.minimumOrderValue ||
//                     "500"}
//                 </h4>
//               </div>
//             </div>
//           </div>

//           {/* FORM */}
//           <div className="grid gap-5 md:grid-cols-2">

//             {/* CODE */}
//             <div>
//               <label className="mb-2 block text-sm font-medium text-zinc-300">
//                 Promo Code
//               </label>

//               <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 transition-all focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">

//                 <HiOutlineTicket className="text-lg text-cyan-400" />

//                 <input
//                   value={form.code}
//                   onChange={(e) =>
//                     updateField(
//                       "code",
//                       e.target.value.toUpperCase()
//                     )
//                   }
//                   placeholder="SAVE20"
//                   className="w-full bg-transparent text-sm font-semibold tracking-[0.2em] text-white outline-none placeholder:text-zinc-500"
//                 />
//               </div>
//             </div>

//             {/* DISCOUNT */}
//             <div>
//               <label className="mb-2 block text-sm font-medium text-zinc-300">
//                 Discount Percentage
//               </label>

//               <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 transition-all focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">

//                 <HiOutlinePercentBadge className="text-lg text-cyan-400" />

//                 <input
//                   type="number"
//                   value={form.percentage}
//                   onChange={(e) =>
//                     updateField(
//                       "percentage",
//                       e.target.value
//                     )
//                   }
//                   placeholder="20"
//                   className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
//                 />
//               </div>
//             </div>

//             {/* COUNT */}
//             <div>
//               <label className="mb-2 block text-sm font-medium text-zinc-300">
//                 Usage Count
//               </label>

//               <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 transition-all focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">

//                 <HiOutlineHashtag className="text-lg text-cyan-400" />

//                 <input
//                   type="number"
//                   value={form.count}
//                   onChange={(e) =>
//                     updateField(
//                       "count",
//                       e.target.value
//                     )
//                   }
//                   placeholder="100"
//                   className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
//                 />
//               </div>
//             </div>

//             {/* MIN ORDER */}
//             <div>
//               <label className="mb-2 block text-sm font-medium text-zinc-300">
//                 Minimum Order Value
//               </label>

//               <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 transition-all focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">

//                 <HiOutlineShoppingBag className="text-lg text-cyan-400" />

//                 <input
//                   type="number"
//                   value={
//                     form.minimumOrderValue
//                   }
//                   onChange={(e) =>
//                     updateField(
//                       "minimumOrderValue",
//                       e.target.value
//                     )
//                   }
//                   placeholder="500"
//                   className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
//                 />
//               </div>
//             </div>

//           </div>

//           {/* DATES */}
//           <div className="grid gap-5 md:grid-cols-2">

//             {/* START */}
//             <div>
//               <label className="mb-2 block text-sm font-medium text-zinc-300">
//                 Starts At
//               </label>

//               <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 transition-all focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">

//                 <HiOutlineCalendarDays className="text-lg text-cyan-400" />

//                 <input
//                   type="datetime-local"
//                   value={form.startsAt}
//                   onChange={(e) =>
//                     updateField(
//                       "startsAt",
//                       e.target.value
//                     )
//                   }
//                   className="w-full bg-transparent text-sm text-white outline-none"
//                 />
//               </div>
//             </div>

//             {/* END */}
//             <div>
//               <label className="mb-2 block text-sm font-medium text-zinc-300">
//                 Ends At
//               </label>

//               <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 transition-all focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">

//                 <HiOutlineCalendarDays className="text-lg text-cyan-400" />

//                 <input
//                   type="datetime-local"
//                   value={form.endsAt}
//                   onChange={(e) =>
//                     updateField(
//                       "endsAt",
//                       e.target.value
//                     )
//                   }
//                   className="w-full bg-transparent text-sm text-white outline-none"
//                 />
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="relative z-10 flex flex-col-reverse gap-3 border-t border-white/10 bg-[#0B1120]/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-8">

//           <button
//             onClick={() =>
//               onOpenChange(false)
//             }
//             className="h-14 rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={submit}
//             disabled={saving}
//             className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 text-sm font-semibold text-white shadow-2xl shadow-violet-500/20 transition-all hover:scale-[1.01] disabled:opacity-50"
//           >
//             {saving && (
//               <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
//             )}

//             {saving
//               ? "Saving..."
//               : isEditMode
//               ? "Update Promo"
//               : "Create Promo"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }