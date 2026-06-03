"use client";

import { useEffect } from "react";

import {
  FaBox,
  FaLayerGroup,
  FaRupeeSign,
  FaShoppingCart,

} from "react-icons/fa";

import {
  HiOutlineSparkles,
  HiOutlineChartBar,
} from "react-icons/hi2";

import { formatPrice } from "@/config/constants";


import {  useAdminDashboardLiteStore } from "@/app/admin/store";
import { AdminHero } from "@/utils/AdminHero";

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
  }
] as const;

export default function AdminDashboard() {
  const {
    stats,
    loading,
    fetchDashboard,
    error,
  } = useAdminDashboardLiteStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <div className=" bg-[#060816]    ">

      <div className="mx-auto space-y-8  ">

        {/* HERO SECTION */}

        <AdminHero
          badgeText=" Velvet Analytics"
          title="Store Dashboard"
          description=" Monitor products, categories, revenue, returns and customer activity through a  modern premium 
          analytics dashboard built for real-time store management."
          rightText="Live store insights"
          icon={<HiOutlineChartBar className="text-3xl text-white" />}
          rightIcon={<HiOutlineSparkles className="text-lg text-white" />}
        />






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


       


        {
          loading &&
          <div className="flex flex-col items-center justify-center  ">
            <div className="h-10  w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-fuchsia-500" />
            <p className="text-sm mt-2 text-zinc-500">Loading products...</p>
          </div>
        }

         {error &&
          <div className="col-span-full flex items-center justify-center rounded-[24px] border border-red-500/20 bg-red-500/5 py-14">
            <p className="text-sm font-medium tracking-wide text-red-400">
              Failed to fetch Data
            </p>
          </div>
        }

        {/* STATS GRID */}
        {!loading && !error && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 ">

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

        )
        }

      </div>
    </div>
  );
}