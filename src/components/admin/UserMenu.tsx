


// // ========================= USER MENU =========================

// "use client";

// import { useEffect, useRef, useState } from "react";

// import {
//   HiOutlineUserCircle,
//   HiOutlineArrowRightOnRectangle,
//   HiOutlineUser,
// } from "react-icons/hi2";
// import { useAuthStore } from "../user/store/api";
// import { useRouter } from "next/navigation";

// export function UserMenu() {
//   const [open, setOpen] = useState(false);

//   const menuRef = useRef<HTMLDivElement>(null);

//  const router = useRouter();
//     const logout = useAuthStore((s) => s.logout);

//   // const handleLogout = () => {
//   //   localStorage.removeItem("token");
//   //   window.location.href = "/sign-in";
//   // };


//     const handleLogout = async () => {
//     await logout();
//     router.push("/login");
//   };
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div ref={menuRef} className="relative">

//       {/* Button */}
//       <button
//         onClick={() => setOpen((prev) => !prev)}
//         className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
//       >
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
//           <HiOutlineUserCircle className="text-xl text-white" />
//         </div>

//         <div className="hidden text-left sm:block">
//           <p className="text-sm font-medium text-white">
//             Admin
//           </p>

//           <p className="text-xs text-zinc-400">
//             Super Admin
//           </p>
//         </div>
//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/95 shadow-2xl backdrop-blur-2xl">

//           <div className="border-b border-white/10 p-4">
//             <p className="text-sm font-semibold text-white">
//               Welcome Back 👋
//             </p>

//             <p className="mt-1 text-xs text-zinc-400">
//               Manage your store easily
//             </p>
//           </div>

//           <div className="p-2">

//             <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-zinc-300 transition-all hover:bg-white/5 hover:text-white">
//               <HiOutlineUser className="text-lg" />
//               Profile
//             </button>

//             <button
//               onClick={handleLogout}
//               className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-red-400 transition-all hover:bg-red-500/10"
//             >
//               <HiOutlineArrowRightOnRectangle className="text-lg" />
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineUserCircle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineUser,
} from "react-icons/hi2";
import { useAuthStore } from "@/components/user/store/api";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  // ✅ Store ka logout — cookie clear + localStorage clear
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
          <HiOutlineUserCircle className="text-xl text-white" />
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-white">Admin</p>
          <p className="text-xs text-zinc-400">Super Admin</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/95 shadow-2xl backdrop-blur-2xl">
          <div className="border-b border-white/10 p-4">
            <p className="text-sm font-semibold text-white">Welcome Back 👋</p>
            <p className="mt-1 text-xs text-zinc-400">Manage your store easily</p>
          </div>
          <div className="p-2">
            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-zinc-300 transition-all hover:bg-white/5 hover:text-white">
              <HiOutlineUser className="text-lg" />
              Profile
            </button>
            <button
              onClick={() => void handleLogout()}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-red-400 transition-all hover:bg-red-500/10"
            >
              <HiOutlineArrowRightOnRectangle className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}