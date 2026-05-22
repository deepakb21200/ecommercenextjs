
 "use client";

import type { AdminOrder, AdminOrderStatus } from "@/components/admin/orders/types";
import { formatPrice } from "@/config/constants";
import { useAdminOrdersStore } from "@/store/admin/orders/store";
import { useEffect, useState } from "react";
import { HiOutlineShoppingBag, HiOutlineCheckCircle } from "react-icons/hi2";
import OrderCards from "./OrderCards";
import AdminToolbar from "@/components/admin/products/AdminToolbar";
import { AdminHero } from "@/utils/AdminHero";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(value?: string | null): string {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ✅ canUpdate — exact table se:
// editable sirf tab jab paid hai aur delivered/cancelled nahi hua
function canUpdate(order: AdminOrder): boolean {
  if (order.paymentStatus !== "paid") return false;
  if (order.orderStatus === "delivered") return false;
  // if (order.orderStatus === "cancelled") return false;
  return true;
}

// Admin sirf yeh 3 options set kar sakta hai — cancelled webhook se hota hai
const ORDER_OPTIONS: AdminOrderStatus[] = ["placed", "shipped", "delivered"];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminOrders() {
  const { loading, orders, updatingOrderId, fetchOrders, changeStatus } =
    useAdminOrdersStore();

  const [search, setSearch] = useState("");

  useEffect(() => {
    void fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1120]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />
          <p className="text-sm text-zinc-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto  space-y-8">

        <AdminHero
          badgeText="Velvet Orders"
          title="Orders Management"
          description="Track customer orders, payment status, deliveries and manage order flow in one premium dashboard."
          rightText="Smart Orders Panel"
          icon={<HiOutlineShoppingBag className="text-3xl text-white" />}
          rightIcon={<HiOutlineCheckCircle className="text-lg text-violet-300" />}
        />

        <AdminToolbar
          search={search}
          onSearchChange={setSearch}
          placeholder="Search orders..."
          sectionLabel="Order Inventory"
          heading="Order Controls"
          item={orders.length}
        />

        <OrderCards
          orders={orders}
          updatingOrderId={updatingOrderId}
          changeStatus={changeStatus}
          canUpdate={canUpdate}
          orderOptions={ORDER_OPTIONS}
          formatPrice={formatPrice}
          formatDate={formatDate}
        />

      </div>
    </div>
  );
}