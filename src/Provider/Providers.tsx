// components/AuthProvider.tsx
// "use client";

// import { useAuthStore } from "@/components/user/store/api";

// import { useEffect } from "react";
 

 

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     useAuthStore.persist.rehydrate(); // 👈 manually hydrate on mount
//   }, []);

//   return <>{children}</>;
// }




"use client";

import { useAuthStore } from "@/components/user/store/api";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}