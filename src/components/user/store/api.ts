

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
};

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      logout: async () => {
        await fetch("/api/users/logout", {
          method: "POST",
          credentials: "include",
        });
        set({ user: null });
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: "auth-storage",
      skipHydration: true,
    }
  )
);