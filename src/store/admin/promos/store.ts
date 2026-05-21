// store/admin/promos/store.ts

"use client";

import { create } from "zustand";

import {
  createAdminPromo,
  deleteAdminPromo,
  getAdminPromos,
  updateAdminPromo,
} from "@/components/admin/promos/api";

import {
  Promo,
  PromoFormValues,
} from "@/components/admin/promos/types";

type AdminPromosStore = {
  promos: Promo[];

  loading: boolean;

  saving: boolean;

  deletingPromoId: string;

  hasLoaded: boolean;

  fetchPromos: () => Promise<void>;

  refreshAll: () => Promise<void>;

  savePromo: (
    values: PromoFormValues,
    editingPromo?: Promo | null
  ) => Promise<void>;

  removePromo: (
    promoId: string
  ) => Promise<void>;
};

export const useAdminPromosStore =
  create<AdminPromosStore>(
    (set) => ({
      promos: [],

      loading: false,

      saving: false,

      deletingPromoId: "",

      hasLoaded: false,

      fetchPromos: async () => {
        try {
          set({
            loading: true,
          });

          const response =
            await getAdminPromos();

          set({
            promos:
              response?.items || [],
          });
        } catch (error) {
          console.log(error);
        } finally {
          set({
            loading: false,
          });
        }
      },

      refreshAll: async () => {
        try {
          set({
            loading: true,
          });

          const response =
            await getAdminPromos();

          set({
            promos:
              response?.items || [],
            hasLoaded: true,
          });
        } catch (error) {
          console.log(error);
        } finally {
          set({
            loading: false,
          });
        }
      },

      savePromo: async (
        values,
        editingPromo
      ) => {
        try {
          set({
            saving: true,
          });

          const response =
            editingPromo
              ? await updateAdminPromo(
                  editingPromo._id,
                  values
                )
              : await createAdminPromo(
                  values
                );

          set({
            promos:
              response?.items || [],
          });
        } catch (error) {
          console.log(error);
        } finally {
          set({
            saving: false,
          });
        }
      },

      removePromo: async (
        promoId
      ) => {
        try {
          set({
            deletingPromoId:
              promoId,
          });

          const response =
            await deleteAdminPromo(
              promoId
            );

          set({
            promos:
              response?.items || [],
          });
        } catch (error) {
          console.log(error);
        } finally {
          set({
            deletingPromoId: "",
          });
        }
      },
    })
  );