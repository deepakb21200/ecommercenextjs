
"use client";

import { Commonloader } from "@/components/admin/Loader";
import { formatPrice } from "@/config/constants";
import { payCustomerOrder } from "@/store/home/orders/api";
import { useCustomerOrdersStore } from "@/store/home/orders/store";
import { CustomerOrder, CustomerOrderStatus, CustomerPaymentStatus } from "@/store/home/orders/types";
import toast from "react-hot-toast";
import {
  RiShoppingBag3Line,
  RiRefreshLine,
  RiInboxLine,
 
  RiCloseLine,
} from "react-icons/ri";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isOrderExpired(order: CustomerOrder): boolean {
  if (!order.expiresAt) return false;
  const t = Date.parse(order.expiresAt);
  return t > 0 && t < Date.now();
}

function canPayOrder(order: CustomerOrder): boolean {
  return (
    order.paymentStatus === "pending" &&
    order.orderStatus === "placed" &&
    !isOrderExpired(order)
  );
}

function formatDate(value?: string | null): string {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Badges ──────────────────────────────────────────────────────────────────

function PaymentBadge({ status }: { status: CustomerPaymentStatus }) {
  const styleMap: Record<CustomerPaymentStatus, string> = {
    paid:    "bg-green-50 text-green-700 border-green-200",
    failed:  "bg-red-50 text-red-600 border-red-200",
    pending: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styleMap[status]}`}>
      {status}
    </span>
  );
}

function OrderBadge({ status }: { status: CustomerOrderStatus }) {
  // ✅ "cancelled" added with red style
  const styleMap: Record<CustomerOrderStatus, string> = {
    delivered:  "bg-green-50 text-green-700 border-green-200",
    shipped:    "bg-blue-50 text-blue-600 border-blue-200",
    placed:     "bg-gray-100 text-gray-600 border-gray-200",
    cancelled:  "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styleMap[status]}`}>
      {status}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function CustomerOrdersDialog() {
  const { isOpen, closeOrders, loading, items, loadOrders } =
    useCustomerOrdersStore((state) => state);

  const handlePayNow = async (orderId: string) => {
    try {
      const response = await payCustomerOrder(orderId);
      if (!response?.url) throw new Error("No payment URL");
      window.location.href = response.url;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Unable to start payment";
      toast.error(msg);
    }
  };

  if (!isOpen) return null;

  const hasPayableOrders = items.some(canPayOrder);


if (loading) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-5xl h-[43vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <Commonloader />
      </div>
    </div>
  );
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
     
          <div className="w-full max-w-5xl h-[43vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden  ">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <RiShoppingBag3Line className="text-gray-700 text-lg" />
            <h2 className="text-base font-semibold text-gray-900">My Orders</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => void loadOrders()}
              className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <RiRefreshLine className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={closeOrders}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <RiCloseLine className="text-lg" />
            </button>
          </div>
        </div>

        {/* Body */}
 

                <div className="flex-1 overflow-hidden px-6 py-5">

          

          {!loading && !items.length && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
              <RiInboxLine className="text-5xl opacity-25" />
              <p className="text-sm">No orders found</p>
            </div>
          )}

          {!loading && items.length > 0 && (
     
              <div className="h-full overflow-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Order ID", "Items", "Amount", "Payment", "Status", "Date"].map((col) => (
                      <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-400">
                        {col}
                      </th>
                    ))}
                    {hasPayableOrders && (
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-400">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {items.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-400">
                        {order._id}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {order.totalItems}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="px-4 py-3">
                        <PaymentBadge status={order.paymentStatus} />
                      </td>
                      <td className="px-4 py-3">
                        <OrderBadge status={order.orderStatus} />
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {formatDate(order.paidAt || order.createdAt)}
                      </td>

                      {hasPayableOrders && (
                        <td className="px-4 py-3  ">
                          {canPayOrder(order) ? (
                            <button
                              onClick={() => void handlePayNow(order._id)}
                              className="h-7 px-3 text-xs bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              Pay Now
                            </button>
                          ) : (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerOrdersDialog;







 