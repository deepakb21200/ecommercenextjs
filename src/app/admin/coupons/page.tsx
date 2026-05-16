

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
  const [saving, setSaving] = useState(false);



  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);
  const [deletingPromoId, setDeletingPromoId] = useState("");


  async function refreshAll() {
    try {
      setLoading(true);
      const response = await getAdminPromos();
      console.log("RESPONE", response);

      // setPromos((response ?? { items: [] }).items);
      setPromos(response?.items || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshAll();
  }, []);

  const filteredPromos = useMemo(() => {
    const query = search.trim().toLowerCase();
    // console.log("E");
    if (!query) return promos;

    return promos.filter((promo) => promo.code.toLowerCase().includes(query));


  }, [promos, search]);

  function openCreateDialog() {
    setEditingPromo(null);
    setPromoDialogOpen(true);
  }


  function closePromoDialog() {
    setEditingPromo(null)
    setPromoDialogOpen(false)

  }


  function openEditDialog(promo: Promo) {
    setEditingPromo(promo)
    setPromoDialogOpen(true);
  }



  async function savePromo(values: PromoFormValues) {
    try {
      setSaving(true);
      const response = editingPromo
        ? await updateAdminPromo(editingPromo._id, values)
        : await createAdminPromo(values);
      // setPromos((response ?? { items: [] })?.items);
      setPromos(response?.items || []);
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
      // setPromos((response ?? { items: [] }).items);
      setPromos(response?.items || []);
    } finally {
      setDeletingPromoId("");
    }
  }



  useEffect(()=>{
console.log("editingPromo",editingPromo);

  },[promoDialogOpen])
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page Header */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400"> Management </p>
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
  {/* function openCreateDialog() {
    setEditingPromo(null);
    setPromoDialogOpen(true);
  } */}

            <PromoTable
              promos={filteredPromos}
              loading={loading}
              deletingPromoId={deletingPromoId}
              onEdit={openEditDialog}//  function openEditDialog(promo: Promo) { setEditingPromo(promo)setPromoDialogOpen(true);}
              onDelete={removePromo}
            />
          </div>
        </div>

      </div>

      <PromoDialog
        open={promoDialogOpen}//   const [promoDialogOpen, setPromoDialogOpen] = useState(false);
        onOpenChange={(open) => { if (!open) { closePromoDialog(); return; } setPromoDialogOpen(true); }}
        //  onOpenChange={setPromoDialogOpen}
        promo={editingPromo}//  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);
        saving={saving}//  const [saving, setSaving] = useState(false);
        onSaved={savePromo}
      />
    </div>
  );
}

  // async function savePromo(values: PromoFormValues) {
  //   try {
  //     setSaving(true);
  //     const response = editingPromo
  //       ? await updateAdminPromo(editingPromo._id, values)
  //       : await createAdminPromo(values);
 
  //     setPromos(response?.items || []);
  //     closePromoDialog();
  //   } finally {
  //     setSaving(false);
  //   }
  // }