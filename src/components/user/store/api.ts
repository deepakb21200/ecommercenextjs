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
  logout: () => void;
  hydrate: () => Promise<void>;
  isBootstrapped: boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isBootstrapped: false,

      setUser: (user) => set({ user }),

      // 🔴 axios → fetch
      logout: async () => {
        await fetch("/api/users/logout", {
          method: "POST",
          credentials: "include", // cookies bhejne ke liye important
        });

        set({ user: null });
       
        
        useAuthStore.persist.clearStorage();
      },

      // 🔴 axios → fetch
      hydrate: async () => {
        try {
          const res = await fetch("/api/users/me", {
            method: "GET",
            credentials: "include", // cookies ke liye zaroori
          });

          if (!res.ok) throw new Error("Not authenticated");

          const data = await res.json();

          set({ user: data, isBootstrapped: true });
           console.log("kkk",data );
        } catch {
          set({ user: null, isBootstrapped: true });
        }
      },
    }),
    {
      name: "auth-storage",
      skipHydration: true,
    }
  )
);