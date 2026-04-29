// components/AuthProvider.tsx
"use client";

import { useAuthStore } from "@/components/user/store/api";

import { useEffect } from "react";
 

// export default function AuthProvider({ children }: { children: React.ReactNode }) {
//   const hydrate = useAuthStore((state) => state.hydrate);

//   useEffect(() => {
//     useAuthStore.persist.rehydrate(); // localStorage se restore
//     void hydrate();                   // server se fresh user fetch
//   }, [hydrate]);

//   return <>{children}</>;
// }


export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useAuthStore.persist.rehydrate(); // 👈 manually hydrate on mount
  }, []);

  return <>{children}</>;
}