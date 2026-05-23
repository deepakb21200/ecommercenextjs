

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {  useState } from "react";
import {
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlineTicket,
  HiOutlineShoppingCart,
  HiOutlineCog6Tooth,
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";
import { PiStorefrontBold } from "react-icons/pi";

type AdminNavItem = { label: string; href: string; icon: any };

const items: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: HiOutlineSquares2X2 },
  { label: "Products", href: "/admin/products", icon: HiOutlineShoppingBag },
  { label: "Coupons", href: "/admin/coupons", icon: HiOutlineTicket },
  { label: "Orders", href: "/admin/orders", icon: HiOutlineShoppingCart },
  { label: "Settings", href: "/admin/settings", icon: HiOutlineCog6Tooth },
];

// function SidebarNav() {
function SidebarNav({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="mt-5 flex flex-col gap-2 px-4">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
              onClick={onClose}
            className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-150 ${
              isActive
                ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-white border border-violet-500/30 shadow-lg shadow-violet-500/10"
                : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"
            }`}
          >
            {isActive && (
              <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b from-violet-500 to-cyan-400" />
            )}

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-150 ${
                isActive
                  ? "bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-md"
                  : "bg-white/5 text-zinc-400 group-hover:bg-white/10 group-hover:text-white"
              }`}
            >
              <Icon className="text-lg" />
            </div>

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col">

      {/* BRAND */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
        
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-xl shadow-violet-500/20">
            <PiStorefrontBold className="text-xl text-white" />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-wide text-white">
              Velvet
            </h2>
            <p className="text-xs text-zinc-400">
              Ecommerce Admin
            </p>
          </div>
        </div>

        {/* CROSS ICON (NOW ALWAYS VISIBLE) */}
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 hover:bg-white/10
           hover:text-white transition-colors xl:hidden"
        >
          <HiOutlineXMark className="text-xl" />
        </button>
      </div>

      {/* NAV */}
      <div className="flex-1 overflow-y-auto">
      
        <SidebarNav onClose={onClose} />
      </div>

      {/* FOOTER */}
      <div className="border-t border-white/10 px-6 py-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <p className="text-sm font-medium text-white">
            Velvet Store
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Premium Ecommerce Dashboard
          </p>
        </div>
      </div>

    </div>
  );
}
 






export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* BURGER BUTTON (ONLY MOBILE) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="xl:hidden fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A0F1C] border border-white/10 text-zinc-400 hover:text-white transition-colors"
      >
        <HiOutlineBars3 className="text-xl" />
      </button>

      {/* MOBILE SIDEBAR */}
      <div
        className={`xl:hidden fixed left-0 top-0 z-50 h-full w-[280px] bg-[#0A0F1C] transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </div>

      {/* DESKTOP SIDEBAR (ALWAYS VISIBLE) */}
      <div className="hidden xl:flex fixed left-0 top-0 h-full w-[280px] bg-[#0A0F1C] border-r border-white/10">
        <SidebarContent onClose={() => {}} />
      </div>
    </>
  );
}
