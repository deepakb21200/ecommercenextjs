"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlineTicket,
  HiOutlineShoppingCart,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";


 

type AdminNavItem = {
  label: string;
  href: string;
  icon: any;
};

const items: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: HiOutlineSquares2X2 },
  { label: "Products", href: "/admin/products", icon: HiOutlineShoppingBag },
  { label: "Coupons", href: "/admin/coupons", icon: HiOutlineTicket },
  { label: "Orders", href: "/admin/orders", icon: HiOutlineShoppingCart },
  { label: "Settings", href: "/admin/settings", icon: HiOutlineCog6Tooth },
];

export function SidebarNav({ onClick }: { onClick?: () => void }) {
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
            key={item.label}
            href={item.href}
            onClick={onClick}
            className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-white border border-violet-500/30 shadow-lg shadow-violet-500/10"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {isActive && (
              <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b from-violet-500 to-cyan-400" />
            )}

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
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