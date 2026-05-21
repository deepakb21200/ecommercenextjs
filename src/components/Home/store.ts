import { create } from "zustand";
import { getCustomerHomeDateOverview } from "./api";
import { CustomerHomeResponse } from "./types";



type CustomerHomeStore = {
  data: CustomerHomeResponse | null;
  loading: boolean;
  loadHome: () => Promise<void>;
  clear: () => void;
};

export const useCustomerHomeStore = create<CustomerHomeStore>((set) => ({
  loading: true,
  data: null,

  loadHome: async () => {
    try {
      set({ loading: true });

      const response = await getCustomerHomeDateOverview();

      console.log(response);
      

      set({
        data: response,
        loading: false,
      });
    } catch {
      set({
        loading: false,
        data: null,
      });
    }
  },

  clear: () => {
    set({
      data: null,
      loading: true,
    });
  },
}));