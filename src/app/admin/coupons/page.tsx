


// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { RiCoupon3Line } from "react-icons/ri";
// import { createAdminPromo, deleteAdminPromo, getAdminPromos, updateAdminPromo } from "@/components/admin/promos/api";
// import PromoToolbar from "@/components/admin/promos/PromoToolbar";
// import PromoTable from "@/components/admin/promos/PromoTable";
// import PromoDialog from "@/components/admin/promos/PromoDialog";
// import { Promo, PromoFormValues } from "@/components/admin/promos/types";

// export default function AdminPromos() {
//   // ================= STATE =================
//   const [search, setSearch] = useState("");
//   const [promos, setPromos] = useState<Promo[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [promoDialogOpen, setPromoDialogOpen] = useState(false);
//   const [editingPromo, setEditingPromo] = useState<Promo | null>(null);

//   const [deletingPromoId, setDeletingPromoId] = useState("");
//   const [saving, setSaving] = useState(false);

//   // ================= FETCH =================
//   async function refreshAll() {
//     try {
//       setLoading(true);
//       const response = await getAdminPromos();
//       setPromos((response ?? { items: [] }).items);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     refreshAll();
//   }, []);

//   // ================= FILTER =================
//   const filteredPromos = useMemo(() => {
//     const query = search.trim().toLowerCase();
//     if (!query) return promos;
//     return promos.filter((promo) => promo.code.toLowerCase().includes(query));
//   }, [promos, search]);

//   // ================= DIALOG =================
//   function openCreateDialog() {
//     setEditingPromo(null);
//     setPromoDialogOpen(true);
//   }

//   function closePromoDialog() {
//     setEditingPromo(null);
//     setPromoDialogOpen(false);
//   }

//   function openEditDialog(promo: Promo) {
//     setEditingPromo(promo);
//     setPromoDialogOpen(true);
//   }

//   // ================= SAVE =================
//   async function savePromo(values: PromoFormValues) {
//     try {
//       setSaving(true);
//       const response = editingPromo
//         ? await updateAdminPromo(editingPromo._id, values)
//         : await createAdminPromo(values);
//       setPromos((response ?? { items: [] })?.items);
//       closePromoDialog();
//     } finally {
//       setSaving(false);
//     }
//   }

//   // ================= DELETE =================
//   async function removePromo(promoId: string) {
//     const confirmed = window.confirm("Are you sure you want to delete this promo?");
//     if (!confirmed) return;
//     try {
//       setDeletingPromoId(promoId);
//       const response = await deleteAdminPromo(promoId);
//       setPromos((response ?? { items: [] }).items);
//     } finally {
//       setDeletingPromoId("");
//     }
//   }

//   // ================= UI =================
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* Page Header */}
//         <div className="flex items-center gap-3">
//           <div className="h-9 w-9 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
//             <RiCoupon3Line className="text-white text-lg" />
//           </div>
//           <div>
//             <h1 className="text-xl font-semibold text-gray-900">Promos</h1>
//             <p className="text-sm text-gray-500">Manage discount coupons</p>
//           </div>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

//           {/* Card Header */}
//           <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
//             <div>
//               <h2 className="text-sm font-semibold text-gray-800">All Coupons</h2>
//               <p className="text-xs text-gray-400 mt-0.5">{promos.length} total</p>
//             </div>
//           </div>

//           <div className="p-5 space-y-4">
//             <PromoToolbar
//               search={search}
//               onSearchChange={setSearch}
//               onAddPromo={openCreateDialog}
//             />

//             <PromoTable
//               promos={filteredPromos}
//               loading={loading}
//               deletingPromoId={deletingPromoId}
//               onEdit={openEditDialog}
//               onDelete={removePromo}
//             />
//           </div>
//         </div>
//       </div>

//       <PromoDialog
//         open={promoDialogOpen}
//         onOpenChange={(open) => {
//           if (!open) { closePromoDialog(); return; }
//           setPromoDialogOpen(true);
//         }}
//         promo={editingPromo}
//         saving={saving}
//         onSaved={savePromo}
//       />
//     </div>
//   );
// }






// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { RiCoupon3Line } from "react-icons/ri";
// import { createAdminPromo, deleteAdminPromo, getAdminPromos, updateAdminPromo } from "@/components/admin/promos/api";
// import PromoToolbar from "@/components/admin/promos/PromoToolbar";
// import PromoTable from "@/components/admin/promos/PromoTable";
// import PromoDialog from "@/components/admin/promos/PromoDialog";
// import { Promo, PromoFormValues } from "@/components/admin/promos/types";

// export default function AdminPromos() {
//   const [search, setSearch] = useState("");
//   const [promos, setPromos] = useState<Promo[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [promoDialogOpen, setPromoDialogOpen] = useState(false);
//   const [editingPromo, setEditingPromo] = useState<Promo | null>(null);
//   const [deletingPromoId, setDeletingPromoId] = useState("");
//   const [saving, setSaving] = useState(false);

//   async function refreshAll() {
//     try {
//       setLoading(true);
//       const response = await getAdminPromos();
//       setPromos((response ?? { items: [] }).items);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => { refreshAll(); }, []);

//   const filteredPromos = useMemo(() => {
//     const query = search.trim().toLowerCase();
//     if (!query) return promos;
//     return promos.filter((promo) => promo.code.toLowerCase().includes(query));
//   }, [promos, search]);

//   function openCreateDialog() { setEditingPromo(null); setPromoDialogOpen(true); }
//   function closePromoDialog() { setEditingPromo(null); setPromoDialogOpen(false); }
//   function openEditDialog(promo: Promo) { setEditingPromo(promo); setPromoDialogOpen(true); }

//   async function savePromo(values: PromoFormValues) {
//     try {
//       setSaving(true);
//       const response = editingPromo
//         ? await updateAdminPromo(editingPromo._id, values)
//         : await createAdminPromo(values);
//       setPromos((response ?? { items: [] })?.items);
//       closePromoDialog();
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function removePromo(promoId: string) {
//     const confirmed = window.confirm("Are you sure you want to delete this promo?");
//     if (!confirmed) return;
//     try {
//       setDeletingPromoId(promoId);
//       const response = await deleteAdminPromo(promoId);
//       setPromos((response ?? { items: [] }).items);
//     } finally {
//       setDeletingPromoId("");
//     }
//   }

//   return (
//     <div className="min-h-screen bg-zinc-950 p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">

//         {/* Page Header */}
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20">
//             <RiCoupon3Line className="text-xl" />
//           </div>
//           <div>
//             <h1 className="text-xl font-semibold text-zinc-100">Promos</h1>
//             <p className="text-xs text-zinc-500">Manage discount coupons</p>
//           </div>
//         </div>

//         {/* Main Card */}
//         <div className="rounded-2xl border border-zinc-800 bg-zinc-900">

//           {/* Card Header */}
//           <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 px-6 py-4">
//             <div>
//               <div className="mb-0.5 flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
//                 <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">All Coupons</p>
//               </div>
//               <p className="text-xs text-zinc-600">{promos.length} total</p>
//             </div>
//           </div>

//           <div className="space-y-5 p-6">
//             <PromoToolbar
//               search={search}
//               onSearchChange={setSearch}
//               onAddPromo={openCreateDialog}
//             />
//             <PromoTable
//               promos={filteredPromos}
//               loading={loading}
//               deletingPromoId={deletingPromoId}
//               onEdit={openEditDialog}
//               onDelete={removePromo}
//             />
//           </div>
//         </div>

//       </div>

//       <PromoDialog
//         open={promoDialogOpen}
//         onOpenChange={(open) => { if (!open) { closePromoDialog(); return; } setPromoDialogOpen(true); }}
//         promo={editingPromo}
//         saving={saving}
//         onSaved={savePromo}
//       />
//     </div>
//   );
// }




"use client";

import { useEffect, useMemo, useState } from "react";
import { RiCoupon3Line } from "react-icons/ri";
import { createAdminPromo, deleteAdminPromo, getAdminPromos, updateAdminPromo } from "@/components/admin/promos/api";
import PromoToolbar from "@/components/admin/promos/PromoToolbar";
import PromoTable from "@/components/admin/promos/PromoTable";
import PromoDialog from "@/components/admin/promos/PromoDialog";
import { Promo, PromoFormValues } from "@/components/admin/promos/types";

export default function AdminPromos() {
  const [search, setSearch] = useState("");
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);
  const [deletingPromoId, setDeletingPromoId] = useState("");
  const [saving, setSaving] = useState(false);

  async function refreshAll() {
    try {
      setLoading(true);
      const response = await getAdminPromos();
      setPromos((response ?? { items: [] }).items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refreshAll(); }, []);

  const filteredPromos = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return promos;
    return promos.filter((promo) => promo.code.toLowerCase().includes(query));
  }, [promos, search]);

  function openCreateDialog() { setEditingPromo(null); setPromoDialogOpen(true); }
  function closePromoDialog() { setEditingPromo(null); setPromoDialogOpen(false); }
  function openEditDialog(promo: Promo) { setEditingPromo(promo); setPromoDialogOpen(true); }

  async function savePromo(values: PromoFormValues) {
    try {
      setSaving(true);
      const response = editingPromo
        ? await updateAdminPromo(editingPromo._id, values)
        : await createAdminPromo(values);
      setPromos((response ?? { items: [] })?.items);
      closePromoDialog();
    } finally {
      setSaving(false);
    }
  }

  async function removePromo(promoId: string) {
    const confirmed = window.confirm("Are you sure you want to delete this promo?");
    if (!confirmed) return;
    try {
      setDeletingPromoId(promoId);
      const response = await deleteAdminPromo(promoId);
      setPromos((response ?? { items: [] }).items);
    } finally {
      setDeletingPromoId("");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page Header */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">Management</p>
          <div className="mt-1 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <RiCoupon3Line className="text-sm text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-800">Promos</h1>
          </div>
          <p className="mt-0.5 text-sm text-slate-400">Manage discount coupons</p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-700">All Coupons</p>
              <p className="text-xs text-slate-400">{promos.length} total</p>
            </div>
          </div>
          <div className="space-y-5 p-6">
            <PromoToolbar search={search} onSearchChange={setSearch} onAddPromo={openCreateDialog} />
            <PromoTable
              promos={filteredPromos}
              loading={loading}
              deletingPromoId={deletingPromoId}
              onEdit={openEditDialog}
              onDelete={removePromo}
            />
          </div>
        </div>

      </div>

      <PromoDialog
        open={promoDialogOpen}
        onOpenChange={(open) => { if (!open) { closePromoDialog(); return; } setPromoDialogOpen(true); }}
        promo={editingPromo}
        saving={saving}
        onSaved={savePromo}
      />
    </div>
  );
}