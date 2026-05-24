"use client";

import type { AdminOrder, AdminOrderStatus, AdminPaymentStatus } from "@/components/admin/orders/types";
import { HiOutlineCube, HiOutlineShoppingBag } from "react-icons/hi2";

// ─── Status display helper — exact table se ──────────────────────────────────
function getStatusLabel(order: AdminOrder): { label: string; color: string } {
  const { paymentStatus, orderStatus } = order;

  // if (paymentStatus === "failed" && orderStatus === "cancelled") {
  //   return { label: "Cancelled", color: "text-rose-400" };
  // }

  if (paymentStatus === "pending" && orderStatus === "placed") {
    return { label: "Payment Pending", color: "text-amber-400" };
  }
  if (paymentStatus === "paid" && orderStatus === "delivered") {
    return { label: "Completed", color: "text-emerald-400" };
  }
  if (paymentStatus === "paid") {
    return { label: "Processing", color: "text-violet-400" };
  }

  return { label: orderStatus, color: "text-zinc-400" };
}

// ─── Payment badge ────────────────────────────────────────────────────────────
function PaymentBadge({ status }: { status: AdminPaymentStatus }) {
  if (status === "paid")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Paid
      </span>
    );

  if (status === "failed")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
        Failed
      </span>
    );

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      Pending
    </span>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
type Props = {
  loading:boolean
  error:string
  hasLoaded:boolean
  orders: AdminOrder[];
  canUpdate: (order: AdminOrder) => boolean;
  changeStatus: (id: string, status: AdminOrderStatus) => Promise<void>;
  updatingOrderId: string;
  orderOptions: AdminOrderStatus[];
  formatPrice: (v: number) => string;
    formatDate: (v: string) => string;

};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OrderCards({
  loading,
  error,
  orders,
  canUpdate,
  changeStatus,
  updatingOrderId,
  orderOptions,
  formatPrice,
  formatDate,
  hasLoaded
}: Props) {




    if (loading || !hasLoaded) {
    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="h-10  w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-fuchsia-500" />
        <p className="text-sm mt-2 text-zinc-500">Loading products...</p>
      </div>
    );
  }

  if (error) {
  return (
    <div className="col-span-full flex items-center justify-center rounded-[24px] border border-red-500/20 bg-red-500/5 py-14">
      <p className="text-sm font-medium tracking-wide text-red-400">
        Failed to fetch orders
      </p>
    </div>
  );
}

  // ← tab empty check karo
  // if (!orders.length ) {
  if (!loading && hasLoaded && orders.length === 0){
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400 col-span-full">
        <HiOutlineCube className="text-4xl text-zinc-500" />
        <p className="mt-2 text-sm">No Orders Found</p>
      </div>
    );
  }


  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => {
        const editable = canUpdate(order);
        const isUpdating = updatingOrderId === order._id;
        const statusInfo = getStatusLabel(order);

        return (
          <div
            key={order._id}
            className="rounded-[20px] border border-white/10 bg-[#111827]/60 p-4 backdrop-blur-xl"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B1120]">
                  <HiOutlineShoppingBag className="text-xl text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-zinc-500">{order.customerName}</p>
                </div>
              </div>

              {/* Status selector or label */}
 
    
              <div className="shrink-0 flex flex-col items-end gap-2">

                {/* Always show status text */}
                <span className={`text-xs font-medium ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>

                {/* Show dropdown only when editable */}
                {editable && (
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                  changeStatus(order._id, e.target.value as AdminOrderStatus)
                    }
                    disabled={isUpdating}
                    className="rounded-xl border border-white/10 bg-[#0B1120] px-3 py-2 text-xs text-white outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 disabled:opacity-50"
                  >
                    {orderOptions.map((status) => (
                      <option
                        key={status}
                        value={status}
                        disabled={
                          orderOptions.indexOf(status) <
                          orderOptions.indexOf(order.orderStatus as AdminOrderStatus)
                        }
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                )}
              </div>

            </div>


            <div className="mt-4 space-y-2 text-xs text-zinc-400">
              <div className="flex items-center justify-between">
                <span>Amount</span>
                <span className="font-medium text-white">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Date</span>
                <span className="text-white">
                  {formatDate(order.paidAt ?? order.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment</span>
                <PaymentBadge status={order.paymentStatus} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


