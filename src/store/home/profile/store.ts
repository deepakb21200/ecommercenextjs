import { create } from "zustand";
import type { CustomerAddress, CustomerAddressFormValues } from "./types";
import toast from "react-hot-toast";
import { createCustomerAddresses, deleteCustomerAddress, getCustomerAddresses, updateCustomerAddresses } from "./api";

type CustomerProfileStore = {
  isOpen: boolean;
  items: CustomerAddress[];
  loading: boolean;
  openProfile: () => Promise<void>;
  closeProfile: () => void;
  loadAddresses: () => Promise<void>;
  addAddress: (form: CustomerAddressFormValues) => Promise<void>;
  editAddress: (id: string, form: CustomerAddressFormValues) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  clear: () => void;
};

export const useCustomerProfileStore = create<CustomerProfileStore>((set, get) => ({
  isOpen: false,
  loading: false,
  items: [],

  openProfile: async () => {
    set({ isOpen: true });
    await get().loadAddresses();
  },

  closeProfile: () => set({ isOpen: false }),

  loadAddresses: async () => {
    try {
      set({ loading: true });
      const response = await getCustomerAddresses();
      set({ items: response?.items ?? [] });
    } catch {
      set({ items: [] });
    } finally {
      set({ loading: false });
    }
  },

  addAddress: async (form) => {
    try {
      const response = await createCustomerAddresses(form);
      set({ items: response?.items ?? [] });
      toast.success("Address added");
    } catch {
      toast.error("Failed to add address");
    }
  },

  editAddress: async (id, form) => {
    try {
      const response = await updateCustomerAddresses(id, form);
      set({ items: response?.items ?? [] });
      toast.success("Address updated");
    } catch {
      toast.error("Failed to update address");
    }
  },

  removeAddress: async (id) => {
    try {
      const response = await deleteCustomerAddress(id);
      set({ items: response?.items ?? [] });
      toast.success("Address deleted");
    } catch {
      toast.error("Failed to delete address");
    }
  },

  clear: () => set({ isOpen: false, items: [], loading: false }),
}));