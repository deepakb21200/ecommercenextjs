// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaTachometerAlt,
//   FaBoxOpen,
//   FaTags,
//   FaShoppingCart,
//   FaCog,
//   FaStore,
// } from "react-icons/fa";

// type AdminNavItem = {
//   label: string;
//   href: string;
//   icon: any;
// };

// const items: AdminNavItem[] = [
//   { label: "Dashboard", href: "/admin", icon: FaTachometerAlt },
//   { label: "Products", href: "/admin/products", icon: FaBoxOpen },
//   { label: "Coupons", href: "/admin/coupons", icon: FaTags },
//   { label: "Orders", href: "/admin/orders", icon: FaShoppingCart },
//   { label: "Settings", href: "/admin/settings", icon: FaCog },
// ];

// function SidebarNav() {
//   const pathname = usePathname();

//   return (
//     <nav className="mt-4 flex flex-col gap-1 px-3">
//       {items.map((item) => {
//         const Icon = item.icon;

//         const isActive =
//           item.href === "/admin"
//             ? pathname === "/admin"
//             : pathname.startsWith(item.href);

//         return (
//           <Link
//             key={item.label}
//             href={item.href}
//             className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all
//               ${
//                 isActive
//                   ? "bg-blue-600 text-white shadow"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//           >
//             <Icon className="text-lg" />
//             {item.label}
//           </Link>
//         );
//       })}
//     </nav>
//   );
// }

// export function AdminSidebar() {
//   return (
//     <aside className="hidden w-64 bg-white border-r shadow-sm lg:flex flex-col">
//       {/* Brand */}
//       <div className="flex items-center gap-3 px-5 py-4 border-b">
//         <FaStore className="text-2xl text-blue-600" />
//         <span className="text-xl font-bold text-gray-800">
//           E-Shopify
//         </span>
//       </div>

//       {/* Nav */}
//       <div className="flex-1 overflow-y-auto">
//         <SidebarNav />
//       </div>
//     </aside>
//   );
// }







"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaCog,
  FaStore,
} from "react-icons/fa";

type AdminNavItem = {
  label: string;
  href: string;
  icon: any;
};

const items: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: FaTachometerAlt },
  { label: "Products", href: "/admin/products", icon: FaBoxOpen },
  { label: "Coupons", href: "/admin/coupons", icon: FaTags },
  { label: "Orders", href: "/admin/orders", icon: FaShoppingCart },
  { label: "Settings", href: "/admin/settings", icon: FaCog },
];

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-2 flex flex-col gap-0.5 px-3">
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
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <span className={`text-base ${isActive ? "text-indigo-500" : "text-slate-400"}`}>
              <Icon />
            </span>
            {item.label}
            {isActive && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  return (
    <aside className="hidden w-60 flex-col border-r border-slate-100 bg-white lg:flex">

      {/* Brand */}
      <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <FaStore className="text-sm text-white" />
        </div>
        <span className="text-base font-semibold text-slate-800">E-Shopify</span>
      </div>

      {/* Section label */}
      <div className="px-5 pt-5 pb-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
          Main Menu
        </p>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto">
        <SidebarNav />
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-5 py-4">
        <p className="text-[11px] text-slate-400">v1.0.0 · Admin Panel</p>
      </div>
    </aside>
  );
}