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
  const [error, setError] = useState("")

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
    setError("");
    setPromos([]);

    const response = await getAdminPromos();

    const data = Array.isArray(response)
      ? response
      : response?.items || [];

    setPromos(data);
  } catch {
    setError("Failed to fetch promos");
    setPromos([]);
  } finally {
    setLoading(false);
    setHasLoaded(true);
  }
}, []);


  useEffect(() => {
    console.log("error", error);
    console.log(promos);


  }, [error, promos])


  // Initial load
  useEffect(() => {
    if (!hasLoaded) {
      void refreshAll();
    }
  }, [hasLoaded, refreshAll]);

  // ================= FILTERED PROMOS =================
  const filteredPromos = useMemo(() => {
    const query = search.trim().toLowerCase();

    console.log("hasloaded", hasLoaded);


    if (!query) return promos;

    return promos.filter((promo) =>
      promo.code.toLowerCase().includes(query)//
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

          error={error}
        />

        {/* CARDS */}



        <PromoCards
          promos={filteredPromos}
          loading={loading}
          deletingPromoId={deletingPromoId}
          error={error}
          onEdit={openEditDialog}
          onDelete={handleRemovePromo}
          hasLoaded={hasLoaded}
        />

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

