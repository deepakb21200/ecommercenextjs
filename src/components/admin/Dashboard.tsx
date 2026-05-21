
"use client";

import { useEffect } from "react";

import {
  FaBox,
  FaLayerGroup,
  FaRupeeSign,
  FaShoppingCart,
  FaUndo,
} from "react-icons/fa";

import {
  HiOutlineSparkles,
  HiOutlineChartBar,
} from "react-icons/hi2";

import { formatPrice } from "@/config/constants";

import { Commonloader } from "./Loader";

import { useAdminDashboardLiteStore } from "@/app/admin/store";

const statsItems = [
  {
    key: "totalProducts",
    label: "Total Products",
    sublabel: "Listed in store",
    icon: FaBox,
    gradient: "from-fuchsia-500 to-violet-500",
    glow: "shadow-fuchsia-500/10",
    badge: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
  },

  {
    key: "totalCategories",
    label: "Categories",
    sublabel: "Store collections",
    icon: FaLayerGroup,
    gradient: "from-sky-500 to-cyan-500",
    glow: "shadow-cyan-500/10",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },

  {
    key: "totalSales",
    label: "Revenue",
    sublabel: "All time earnings",
    icon: FaRupeeSign,
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/10",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },

  {
    key: "totalOrders",
    label: "Orders",
    sublabel: "Orders received",
    icon: FaShoppingCart,
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-orange-500/10",
    badge: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  },

  {
    key: "totalReturnedOrders",
    label: "Returns",
    sublabel: "Returned orders",
    icon: FaUndo,
    gradient: "from-rose-500 to-pink-500",
    glow: "shadow-rose-500/10",
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  },
] as const;

export default function AdminDashboard() {
  const {
    stats,
    loading,
    fetchDashboard,
    hasLoaded,
  } = useAdminDashboardLiteStore();

  useEffect(() => {
    if (!hasLoaded) {
      fetchDashboard();
    }
  }, [hasLoaded, fetchDashboard]);

  if (loading) {
    return <Commonloader />;
  }

  return (
    <div className=" bg-[#060816]    ">

      <div className="mx-auto max-w-[1700px] space-y-8  ">

        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0B1120] to-[#111827] px-7 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">

          {/* Blur Effects */}
          <div className="absolute left-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="absolute bottom-[-120px] right-[-60px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

            {/* LEFT */}
            <div>

              <div className="mb-5 flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-500 shadow-2xl shadow-violet-500/20">

                  <HiOutlineChartBar className="text-3xl text-white" />

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
                    Velvet Analytics
                  </p>

                  <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl xl:text-5xl">
                    Store Dashboard
                  </h1>

                </div>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                Monitor products, categories, revenue,
                returns and customer activity through a
                modern premium analytics dashboard built
                for real-time store management.
              </p>

            </div>

            {/* RIGHT BADGE */}
            <div className="flex w-fit items-center gap-3 rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/10 px-6 py-4 backdrop-blur-xl">

              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-500">
                <HiOutlineSparkles className="text-lg text-white" />
              </div>

              <div>
                <p className="text-sm font-semibold text-fuchsia-200">
                  Smart Analytics
                </p>

                <p className="mt-0.5 text-xs text-fuchsia-300/70">
                  Live store insights
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* TOP INFO BAR */}
        <div className="flex flex-col gap-4 rounded-[30px] border border-white/10 bg-[#0F172A]/70 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Dashboard Overview
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Performance Statistics
            </h2>

          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3">

            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-sm font-medium text-emerald-300">
              Live Dashboard Data
            </span>

          </div>

        </div>

        {/* STATS GRID */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5 ">

          {statsItems.map((item) => {
            const Icon = item.icon;

            const value = stats[item.key];

            return (
              <div
                key={item.key}
                className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#111827]/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:${item.glow}`}
              >

                {/* Top Gradient Line */}
                <div
                  className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${item.gradient}`}
                />

                {/* Glow */}
                <div
                  className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${item.gradient} opacity-10 blur-3xl`}
                />

                {/* Header */}
                <div className="relative flex items-start justify-between">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-xl`}
                  >
                    <Icon className="text-xl text-white" />
                  </div>

                  <div
                    className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${item.badge}`}
                  >
                    Live
                  </div>

                </div>

                {/* Content */}
                <div className="relative mt-7">

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    {item.label}
                  </p>

                  <h3 className="mt-3 text-4xl font-black tracking-tight text-white">

                    {item.key === "totalSales"
                      ? formatPrice(value)
                      : value}

                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {item.sublabel}
                  </p>

                </div>

                {/* Bottom Hover Line */}
                <div
                  className={`absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}
                />

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}