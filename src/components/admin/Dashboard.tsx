// "use client";

// import { useEffect } from "react";
 
 
 

// // ✅ react-icons
// import { FaBox, FaLayerGroup, FaRupeeSign, FaShoppingCart, FaUndo } from "react-icons/fa";
// import { formatPrice } from "@/config/constants";
// import { Commonloader } from "./Loader";
// import { useAdminDashboardLiteStore } from "@/app/admin/store";



 


// const statsItems = [
//   { key: "totalProducts", label: "Products", icon: FaBox },
//   { key: "totalCategories", label: "Categories", icon: FaLayerGroup },
//   { key: "totalSales", label: "Revenue", icon: FaRupeeSign },
//   { key: "totalOrders", label: "Orders", icon: FaShoppingCart },
//   { key: "totalReturnedOrders", label: "Returns", icon: FaUndo },
// ] as const;

// export default function AdminDashboard() {
//   const { stats, loading, fetchDashboard, hasLoaded } =
//     useAdminDashboardLiteStore();

//   useEffect(() => {
//     if (!hasLoaded) {
//       fetchDashboard();
//     }
//   }, [hasLoaded, fetchDashboard]);

//   if (loading) {
//     return <Commonloader />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      
//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">Dashboard</h1>
//         <p className="text-gray-500 text-sm">
//           Track your store performance
//         </p>
//       </div>

//       {/* GRID */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {statsItems.map((item) => {
//           const Icon = item.icon;
//           const value = stats[item.key];

//           return (
//             <div
//               key={item.key}
//               className="rounded-2xl bg-white p-6 shadow-sm border hover:shadow-lg transition"
//             >
//               <div className="flex items-center justify-between">
                
//                 <div className="p-3 rounded-xl bg-gray-100">
//                   <Icon className="text-gray-700 text-lg" />
//                 </div>

//                 <span className="text-xs text-gray-400 uppercase">
//                   {item.label}
//                 </span>
//               </div>

//               <div className="mt-5">
//                 <p className="text-3xl font-semibold">
//                   {item.key === "totalSales"
//                     ? formatPrice(value): value}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }







"use client";

import { useEffect } from "react";
import { FaBox, FaLayerGroup, FaRupeeSign, FaShoppingCart, FaUndo } from "react-icons/fa";
import { formatPrice } from "@/config/constants";
import { Commonloader } from "./Loader";
import { useAdminDashboardLiteStore } from "@/app/admin/store";

const statsItems = [
  {
    key: "totalProducts",
    label: "Products",
    icon: FaBox,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    key: "totalCategories",
    label: "Categories",
    icon: FaLayerGroup,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    key: "totalSales",
    label: "Revenue",
    icon: FaRupeeSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    key: "totalOrders",
    label: "Orders",
    icon: FaShoppingCart,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    key: "totalReturnedOrders",
    label: "Returns",
    icon: FaUndo,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
] as const;

export default function AdminDashboard() {
  const { stats, loading, fetchDashboard, hasLoaded } = useAdminDashboardLiteStore();

  useEffect(() => {
    if (!hasLoaded) fetchDashboard();
  }, [hasLoaded, fetchDashboard]);

  if (loading) return <Commonloader />;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Overview
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-800">Dashboard</h1>
          <p className="mt-0.5 text-sm text-slate-400">Track your store performance</p>
        </div>

        {/* Stats grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {statsItems.map((item) => {
            const Icon = item.icon;
            const value = stats[item.key];

            return (
              <div
                key={item.key}
                className={`rounded-2xl border ${item.border} bg-white p-5 transition-shadow hover:shadow-md`}
              >
                {/* Icon + label */}
                <div className="flex items-center justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.bg}`}>
                    <Icon className={`text-base ${item.color}`} />
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400">
                    {item.label}
                  </p>
                </div>

                {/* Value */}
                <div className="mt-4">
                  <p className={`text-2xl font-semibold ${item.color}`}>
                    {item.key === "totalSales" ? formatPrice(value) : value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}