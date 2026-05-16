// "use client";

// import { useEffect } from "react";
// import { FaBox, FaLayerGroup, FaRupeeSign, FaShoppingCart, FaUndo } from "react-icons/fa";
// import { formatPrice } from "@/config/constants";
// import { Commonloader } from "./Loader";
// import { useAdminDashboardLiteStore } from "@/app/admin/store";

// const statsItems = [
//   {
//     key: "totalProducts",
//     label: "Products",
//     icon: FaBox,
//     color: "text-violet-600",
//     bg: "bg-violet-50",
//     border: "border-violet-100",
//   },
//   {
//     key: "totalCategories",
//     label: "Categories",
//     icon: FaLayerGroup,
//     color: "text-sky-600",
//     bg: "bg-sky-50",
//     border: "border-sky-100",
//   },
//   {
//     key: "totalSales",
//     label: "Revenue",
//     icon: FaRupeeSign,
//     color: "text-emerald-600",
//     bg: "bg-emerald-50",
//     border: "border-emerald-100",
//   },
//   {
//     key: "totalOrders",
//     label: "Orders",
//     icon: FaShoppingCart,
//     color: "text-amber-600",
//     bg: "bg-amber-50",
//     border: "border-amber-100",
//   },
//   {
//     key: "totalReturnedOrders",
//     label: "Returns",
//     icon: FaUndo,
//     color: "text-rose-600",
//     bg: "bg-rose-50",
//     border: "border-rose-100",
//   },
// ] as const;

// export default function AdminDashboard() {
//   const { stats, loading, fetchDashboard, hasLoaded } = useAdminDashboardLiteStore();

//   useEffect(() => {
//     if (!hasLoaded) fetchDashboard();
//   }, [hasLoaded, fetchDashboard]);

//   if (loading) return <Commonloader />;

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-8">

//         {/* Header */}
//         <div>
//           <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
//             Overview
//           </p>
//           <h1 className="mt-1 text-2xl font-semibold text-slate-800">Dashboard</h1>
//           <p className="mt-0.5 text-sm text-slate-400">Track your store performance</p>
//         </div>

//         {/* Stats grid */}
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//           {statsItems.map((item) => {
//             const Icon = item.icon;
//             const value = stats[item.key];

//             return (
//               <div
//                 key={item.key}
//                 className={`rounded-2xl border ${item.border} bg-white p-5 transition-shadow hover:shadow-md`}
//               >
//                 {/* Icon + label */}
//                 <div className="flex items-center justify-between">
//                   <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.bg}`}>
//                     <Icon className={`text-base ${item.color}`} />
//                   </div>
//                   <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400">
//                     {item.label}
//                   </p>
//                 </div>

//                 {/* Value */}
//                 <div className="mt-4">
//                   <p className={`text-2xl font-semibold ${item.color}`}>
//                     {item.key === "totalSales" ? formatPrice(value) : value}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

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
    label: "Total Products",
    sublabel: "Listed in store",
    icon: FaBox,
    gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    lightBg: "hsl(258,90%,97%)",
    accent: "hsl(258,90%,60%)",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    key: "totalCategories",
    label: "Categories",
    sublabel: "Product groups",
    icon: FaLayerGroup,
    gradient: "linear-gradient(135deg, #0284C7, #38BDF8)",
    lightBg: "hsl(200,90%,97%)",
    accent: "hsl(200,90%,50%)",
    glow: "rgba(2,132,199,0.15)",
  },
  {
    key: "totalSales",
    label: "Total Revenue",
    sublabel: "All time earnings",
    icon: FaRupeeSign,
    gradient: "linear-gradient(135deg, #059669, #34D399)",
    lightBg: "hsl(152,60%,97%)",
    accent: "hsl(152,60%,40%)",
    glow: "rgba(5,150,105,0.15)",
  },
  {
    key: "totalOrders",
    label: "Orders Placed",
    sublabel: "Total orders received",
    icon: FaShoppingCart,
    gradient: "linear-gradient(135deg, #D97706, #FCD34D)",
    lightBg: "hsl(38,95%,97%)",
    accent: "hsl(38,95%,50%)",
    glow: "rgba(217,119,6,0.15)",
  },
  {
    key: "totalReturnedOrders",
    label: "Returns",
    sublabel: "Returned orders",
    icon: FaUndo,
    gradient: "linear-gradient(135deg, #DC2626, #F87171)",
    lightBg: "hsl(0,80%,97%)",
    accent: "hsl(0,80%,58%)",
    glow: "rgba(220,38,38,0.15)",
  },
] as const;

export default function AdminDashboard() {
  const { stats, loading, fetchDashboard, hasLoaded } = useAdminDashboardLiteStore();

  useEffect(() => {
    if (!hasLoaded) fetchDashboard();
  }, [hasLoaded, fetchDashboard]);

  if (loading) return <Commonloader />;

  return (
    <div className="min-h-screen p-6 lg:p-10" style={{ background: "hsl(220,20%,97%)" }}>
      <div className="mx-auto max-w-screen-2xl space-y-10">

        {/* ── Header ── */}
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-10 md:px-12"
          style={{
            background: "linear-gradient(135deg, hsl(220,20%,15%) 0%, hsl(230,25%,22%) 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-10"
            style={{ background: "linear-gradient(135deg, #7C3AED, #38BDF8)" }}
          />
          <div
            className="absolute -bottom-10 right-40 h-40 w-40 rounded-full opacity-10"
            style={{ background: "linear-gradient(135deg, #059669, #FCD34D)" }}
          />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Admin Panel
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                Store Dashboard
              </h1>
              <p className="mt-1.5 text-sm text-white/50">
                Real-time overview of your store performance
              </p>
            </div>

            {/* Live badge */}
            <div
              className="inline-flex w-fit items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-medium"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ background: "#34D399" }}
              />
              Live Data
            </div>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {statsItems.map((item) => {
            const Icon = item.icon;
            const value = stats[item.key];

            return (
              <div
                key={item.key}
                className="group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
                style={{
                  background: "#ffffff",
                  border: "1px solid hsl(220,20%,93%)",
                  boxShadow: `0 4px 24px ${item.glow}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${item.glow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${item.glow}`;
                }}
              >
                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: item.gradient }}
                />

                {/* Bg glow blob */}
                <div
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: item.lightBg }}
                />

                {/* Icon box */}
                <div
                  className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-md"
                  style={{ background: item.gradient }}
                >
                  <Icon className="text-xl text-white drop-shadow" />
                </div>

                {/* Label */}
                <p
                  className="relative text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "hsl(220,10%,55%)" }}
                >
                  {item.label}
                </p>

                {/* Value */}
                <p
                  className="relative mt-2.5 text-4xl font-extrabold tracking-tight"
                  style={{ color: "hsl(220,20%,12%)" }}
                >
                  {item.key === "totalSales" ? formatPrice(value) : value}
                </p>

                {/* Sublabel */}
                <p
                  className="relative mt-2 text-xs"
                  style={{ color: "hsl(220,10%,65%)" }}
                >
                  {item.sublabel}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-0 rounded-b-3xl transition-all duration-500 group-hover:w-full"
                  style={{ background: item.gradient }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}