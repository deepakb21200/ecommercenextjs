

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
//   const [saving, setSaving] = useState(false);



//   const [editingPromo, setEditingPromo] = useState<Promo | null>(null);
//   const [deletingPromoId, setDeletingPromoId] = useState("");


//   async function refreshAll() {
//     try {
//       setLoading(true);
//       const response = await getAdminPromos();
//       console.log("RESPONE", response);

//       // setPromos((response ?? { items: [] }).items);
//       setPromos(response?.items || []);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     refreshAll();
//   }, []);

//   const filteredPromos = useMemo(() => {
//     const query = search.trim().toLowerCase();
//     // console.log("E");
//     if (!query) return promos;

//     return promos.filter((promo) => promo.code.toLowerCase().includes(query));


//   }, [promos, search]);

//   function openCreateDialog() {
//     setEditingPromo(null);
//     setPromoDialogOpen(true);
//   }


//   function closePromoDialog() {
//     setEditingPromo(null)
//     setPromoDialogOpen(false)

//   }


//   function openEditDialog(promo: Promo) {
//     setEditingPromo(promo)
//     setPromoDialogOpen(true);
//   }



//   async function savePromo(values: PromoFormValues) {
//     try {
//       setSaving(true);
//       const response = editingPromo
//         ? await updateAdminPromo(editingPromo._id, values)
//         : await createAdminPromo(values);
//       // setPromos((response ?? { items: [] })?.items);
//       setPromos(response?.items || []);
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
//       // setPromos((response ?? { items: [] }).items);
//       setPromos(response?.items || []);
//     } finally {
//       setDeletingPromoId("");
//     }
//   }



//   useEffect(()=>{
// console.log("editingPromo",editingPromo);

//   },[promoDialogOpen])
//   return (
//     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">

//         {/* Page Header */}
//         <div>
//           <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400"> Management </p>
//           <div className="mt-1 flex items-center gap-2.5">
//             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
//               <RiCoupon3Line className="text-sm text-white" />
//             </div>
//             <h1 className="text-2xl font-semibold text-slate-800">Promos</h1>
//           </div>
//           <p className="mt-0.5 text-sm text-slate-400">Manage discount coupons</p>
//         </div>

//         {/* Main Card */}
//         <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
//           <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
//             <div>
//               <p className="text-sm font-semibold text-slate-700">All Coupons</p>
//               <p className="text-xs text-slate-400">{promos.length} total</p>
//             </div>
//           </div>
//           <div className="space-y-5 p-6">
//             <PromoToolbar search={search} onSearchChange={setSearch} onAddPromo={openCreateDialog} />


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




// ========================= ADMIN PROMOS PAGE =========================

// "use client";

// import { useEffect, useMemo, useState } from "react";

// import {
//   HiOutlineSparkles,
//   HiOutlineTicket,
// } from "react-icons/hi2";

// import {
//   createAdminPromo,
//   deleteAdminPromo,
//   getAdminPromos,
//   updateAdminPromo,
// } from "@/components/admin/promos/api";

// import PromoToolbar from "@/components/admin/promos/PromoToolbar";
// import PromoTable from "@/components/admin/promos/PromoTable";
// import PromoDialog from "@/components/admin/promos/PromoDialog";

// import {
//   Promo,
//   PromoFormValues,
// } from "@/components/admin/promos/types";
// import PromoCards from "@/components/admin/promos/PromoCards";
// import { dummyPromos } from "../api";
// import AdminToolbar from "@/components/admin/products/AdminToolbar";
// import { AdminHero } from "@/utils/AdminHero";

// export default function AdminPromos() {
//   const [search, setSearch] = useState("");

//   const [promos, setPromos] = useState<Promo[]>([]);

//   const [loading, setLoading] =useState(true);

//   const [promoDialogOpen, setPromoDialogOpen] =useState(false);

//   const [saving, setSaving] = useState(false);

//   const [editingPromo, setEditingPromo] = useState<Promo | null>(null);

//   const [deletingPromoId, setDeletingPromoId] = useState("");

//   async function refreshAll() {
//     try {
//       setLoading(true);

//       const response =
//         await getAdminPromos();

//       setPromos(response?.items || []);
//       console.log("hello");
      
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     refreshAll();
//   }, []);

//   const filteredPromos = useMemo(() => {
//     const query =
//       search.trim().toLowerCase();

//     if (!query) return promos;

//     return promos.filter((promo) =>
//       promo.code
//         .toLowerCase()
//         .includes(query)
//     );
//   }, [promos, search]);

//   function openCreateDialog() {
//     setEditingPromo(null);
//     setPromoDialogOpen(true);
//   }

//   function closePromoDialog() {
//     setEditingPromo(null);
//     setPromoDialogOpen(false);
//   }

//   function openEditDialog( promo: Promo) {
//     setEditingPromo(promo);
//     setPromoDialogOpen(true);
//   }

//   async function savePromo( values: PromoFormValues) {
//     try {
//       setSaving(true);

//       const response = editingPromo
//         ? await updateAdminPromo( editingPromo._id,  values)
//         : await createAdminPromo(values);

//       setPromos(response?.items || []);

//       closePromoDialog();
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function removePromo( promoId: string ) {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this promo?"
//     );

//     if (!confirmed) return;

//     try {
//       setDeletingPromoId(promoId);

//       const response =
//         await deleteAdminPromo(promoId);

//       setPromos(response?.items || []);
//     } finally {
//       setDeletingPromoId("");
//     }
//   }

//   return (
//     <div className=" ">

//       <div className="mx-auto  space-y-8">

//         {/* HERO */}
//         {/* <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#111827] p-6 sm:p-8 lg:p-10">

//           <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

//           <div className="absolute bottom-[-100px] right-[-40px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

//           <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

//             <div>
//               <div className="mb-4 flex items-center gap-3">

//                 <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-xl shadow-violet-500/20">
//                   <HiOutlineTicket className="text-3xl text-white" />
//                 </div>

//                 <div>
//                   <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
//                     Velvet Promotions
//                   </p>

//                   <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">
//                     Promo Management
//                   </h1>
//                 </div>
//               </div>

//               <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
//                 Create and manage discount
//                 coupons, offer validity,
//                 customer savings and promo
//                 usage from one premium
//                 dashboard.
//               </p>
//             </div>

//             <div className="flex w-fit items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-3 backdrop-blur-xl">

//               <HiOutlineSparkles className="text-lg text-violet-300" />

//               <p className="text-sm font-medium text-violet-200">
//                 Smart Promo Controls
//               </p>
//             </div>
//           </div>
//         </div> */}




// <AdminHero
//   badgeText="Velvet Promotions"
//   title="Promo Management"
//   description="Create and manage discount coupons, offer validity, customer savings and promo usage from one premium dashboard."
//   rightText="Smart Promotions Panel"
//   icon={<HiOutlineTicket className="text-3xl text-white" />}
//   rightIcon={
//     <HiOutlineSparkles className="text-lg text-violet-300" />
//   }
// />

//         {/* TOOLBAR */}
//         {/* <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-5 shadow-2xl backdrop-blur-xl lg:p-6">

//           <div className="mb-6 flex items-center justify-between">

//             <div>
//               <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
//                 Promotions Control
//               </p>

//               <h2 className="mt-2 text-2xl font-bold text-white">
//                 Promo Controls
//               </h2>
//             </div>

//             <div className="hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 md:block">
//               {promos.length} Promos
//             </div>
//           </div>

//           <PromoToolbar
//             search={search}
//             onSearchChange={setSearch}
//             onAddPromo={openCreateDialog}
//           />

//         </div> */}
//            <AdminToolbar
//   search={search}
//   onSearchChange={setSearch}
//   placeholder="Search promos..."
//   primaryButtonLabel="Add Promo"
//   onPrimaryButtonClick={openCreateDialog}
//         item={Number(promos.length)}
//           sectionLabel="Promotions Control"
//   heading="Promo Controls"
// />


//         {/* TABLE */}
//         <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-4 shadow-2xl backdrop-blur-xl lg:p-6">

//           {/* <PromoTable
//             promos={filteredPromos}
//             loading={loading}
//             deletingPromoId={
//               deletingPromoId
//             }
//             onEdit={openEditDialog}
//             onDelete={removePromo}
//           /> */}
//           <PromoCards
//             promos={filteredPromos}
//             loading={loading}
//             deletingPromoId={
//               deletingPromoId
//             }
//             onEdit={openEditDialog} 
//             onDelete={removePromo}
//           />

//           {/* <PromoCards
//             promos={dummyPromos}
//             loading={false}
//             deletingPromoId=""
//             onEdit={(promo) => console.log("edit", promo)}
//             onDelete={(id) => console.log("delete", id)}
//           /> */}
//         </div>
//       </div>

//       <PromoDialog
//         open={promoDialogOpen}
//         onOpenChange={(open) => {
//           if (!open) {
//             closePromoDialog();
//             return;
//           }

//           setPromoDialogOpen(true);
//         }}
//         promo={editingPromo}
//         saving={saving}
//         onSaved={savePromo}
//       />
//     </div>
//   );
// }


//           <AdminToolbar
//   search={search}
//   onSearchChange={setSearch}
//   placeholder="Search promos..."
//   primaryButtonLabel="Add Promo"
//   onPrimaryButtonClick={openCreateDialog}
// />













// page.tsx

// "use client";

// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   HiOutlineSparkles,
//   HiOutlineTicket,
// } from "react-icons/hi2";

// import PromoDialog from "@/components/admin/promos/PromoDialog";

// import {
//   Promo,
//   PromoFormValues,
// } from "@/components/admin/promos/types";

// import PromoCards from "@/components/admin/promos/PromoCards";

// import AdminToolbar from "@/components/admin/products/AdminToolbar";

// import { AdminHero } from "@/utils/AdminHero";

// import { useAdminPromosStore } from "@/store/admin/promos/store";

// export default function AdminPromos() {
//   const [search, setSearch] =
//     useState("");

//   const [
//     promoDialogOpen,
//     setPromoDialogOpen,
//   ] = useState(false);

//   const [
//     editingPromo,
//     setEditingPromo,
//   ] = useState<Promo | null>(
//     null
//   );

//   const {
//     promos,loading,saving, deletingPromoId, hasLoaded,
//     refreshAll, savePromo,  removePromo} = useAdminPromosStore();

//   useEffect(() => {
//     if (!hasLoaded) {
//       refreshAll();
//     }
//   }, [hasLoaded, refreshAll]);

//   const filteredPromos =
//     useMemo(() => {
//       const query =
//         search.trim() .toLowerCase();

//       if (!query)
//         return promos;

//       return promos.filter(
//         (promo) =>
//           promo.code
//             .toLowerCase()
//             .includes(query)
//       );
//     }, [promos, search]);

//   function openCreateDialog() {
//     setEditingPromo(null);

//     setPromoDialogOpen(true);
//   }

//   function closePromoDialog() {
//     setEditingPromo(null);

//     setPromoDialogOpen(false);
//   }

//   function openEditDialog(
//     promo: Promo
//   ) {
//     setEditingPromo(promo);

//     setPromoDialogOpen(true);
//   }

//   async function handleSavePromo(
//     values: PromoFormValues
//   ) {
//     await savePromo(
//       values,
//       editingPromo
//     );

//     closePromoDialog();
//   }

//   async function handleRemovePromo(
//     promoId: string
//   ) {
//     const confirmed =
//       window.confirm(
//         "Are you sure you want to delete this promo?"
//       );

//     if (!confirmed) return;

//     await removePromo(
//       promoId
//     );
//   }

//   return (
//     <div className=" ">
//       <div className="mx-auto  space-y-8">

//         {/* HERO */}
//         <AdminHero
//           badgeText="Velvet Promotions"
//           title="Promo Management"
//           description="Create and manage discount coupons, offer validity, customer savings and promo usage from one premium dashboard."
//           rightText="Smart Promotions Panel"
//           icon={
//             <HiOutlineTicket className="text-3xl text-white" />
//           }
//           rightIcon={
//             <HiOutlineSparkles className="text-lg text-violet-300" />
//           }
//         />

//         {/* TOOLBAR */}

//         <AdminToolbar
//           search={search}
//           onSearchChange={
//             setSearch
//           }
//           placeholder="Search promos..."
//           primaryButtonLabel="Add Promo"
//           onPrimaryButtonClick={
//             openCreateDialog
//           }
//           item={Number(
//             promos.length
//           )}
//           sectionLabel="Promotions Control"
//           heading="Promo Controls"
//           refreshAll={refreshAll}
//         />

//         {/* TABLE */}
//         <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-4 shadow-2xl backdrop-blur-xl lg:p-6">

//           <PromoCards
//             promos={ filteredPromos}
//             loading={loading}
//             deletingPromoId={ deletingPromoId }
//             onEdit={ openEditDialog}
//             onDelete={ handleRemovePromo } />

//         </div>
//       </div>

//       <PromoDialog
//         open={  promoDialogOpen }
//         onOpenChange={( open ) => {
//           if (!open) {
//             closePromoDialog();

//             return;
//           }

//           setPromoDialogOpen(true)}}
//         promo={editingPromo}
//         saving={saving}
//         onSaved={
//           handleSavePromo
//         }
//       />
//     </div>
//   );
// }



















"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  HiOutlineSparkles,
  HiOutlineTicket,
} from "react-icons/hi2";

import PromoDialog from "@/components/admin/promos/PromoDialog";
import PromoCards from "@/components/admin/promos/PromoCards";
import AdminToolbar from "@/components/admin/products/AdminToolbar";

import {
  Promo,
  PromoFormValues,
} from "@/components/admin/promos/types";

import { AdminHero } from "@/utils/AdminHero";
import { createAdminPromo, deleteAdminPromo, getAdminPromos, updateAdminPromo } from "@/components/admin/promos/api";

// API functions


export default function AdminPromos() {
  // ================= SEARCH =================
  const [search, setSearch] = useState("");

  // ================= DIALOG =================
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);

  // ================= DATA STATES =================
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingPromoId, setDeletingPromoId] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // ================= LOAD PROMOS =================
  const refreshAll = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getAdminPromos();

      // Adjust if your API returns { data: [...] }
      const data = Array.isArray(response)
        ? response
        : response?.items|| [];

      setPromos(data);
      setHasLoaded(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (!hasLoaded) {
      void refreshAll();
    }
  }, [hasLoaded, refreshAll]);

  // ================= FILTERED PROMOS =================
  const filteredPromos = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return promos;

    return promos.filter((promo) =>
      promo.code.toLowerCase().includes(query)
    );
  }, [promos, search]);

  // ================= DIALOG HELPERS =================
  function openCreateDialog() {
    setEditingPromo(null);
    setPromoDialogOpen(true);
  }

  function closePromoDialog() {
    setEditingPromo(null);
    setPromoDialogOpen(false);
  }

  function openEditDialog(promo: Promo) {
    setEditingPromo(promo);
    setPromoDialogOpen(true);
  }

  // ================= SAVE PROMO =================
  async function handleSavePromo(values: PromoFormValues) {
    try {
      setSaving(true);

      if (editingPromo) {
        await updateAdminPromo(editingPromo._id, values);
      } else {
        await createAdminPromo(values);
      }

      await refreshAll();
      closePromoDialog();
    } finally {
      setSaving(false);
    }
  }

  // ================= DELETE PROMO =================
  async function handleRemovePromo(promoId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this promo?"
    );

    if (!confirmed) return;

    try {
      setDeletingPromoId(promoId);

      await deleteAdminPromo(promoId);

      // Remove instantly from UI
      setPromos((prev) =>
        prev.filter((promo) => promo._id !== promoId)
      );
    } finally {
      setDeletingPromoId(null);
    }
  }

  // ================= UI =================
  return (
    <div>
      <div className="mx-auto space-y-8">
        {/* HERO */}
        <AdminHero
          badgeText="Velvet Promotions"
          title="Promo Management"
          description="Create and manage discount coupons, offer validity, customer savings and promo usage from one premium dashboard."
          rightText="Smart Promotions Panel"
          icon={
            <HiOutlineTicket className="text-3xl text-white" />
          }
          rightIcon={
            <HiOutlineSparkles className="text-lg text-violet-300" />
          }
        />

        {/* TOOLBAR */}
        <AdminToolbar
          search={search}
          onSearchChange={setSearch}
          placeholder="Search promos..."
          primaryButtonLabel="Add Promo"
          onPrimaryButtonClick={openCreateDialog}
          item={Number(promos.length)}
          sectionLabel="Promotions Control"
          heading="Promo Controls"
          refreshAll={refreshAll}
        />

        {/* CARDS */}
        <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-4 shadow-2xl backdrop-blur-xl lg:p-6">
          <PromoCards
            promos={filteredPromos}
            loading={loading}
            deletingPromoId={deletingPromoId}
            onEdit={openEditDialog}
            onDelete={handleRemovePromo}
          />
        </div>
      </div>

      {/* DIALOG */}
      <PromoDialog
        open={promoDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            closePromoDialog();
            return;
          }

          setPromoDialogOpen(true);
        }}
        promo={editingPromo}
        saving={saving}
        onSaved={handleSavePromo}
      />
    </div>
  );
}

