// "use client";

 
// import { formatPrice } from "@/config/constants";
// import { useCustomerOrdersStore } from "@/store/home/orders/store";
// import { FaBox } from "react-icons/fa";

// export default function CustomerOrdersDialog() {
//   const { isOpen, closeOrders, items, loading, returnOrder } =
//     useCustomerOrdersStore((s) => s);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
//       <div className="w-full max-w-3xl bg-white p-6 rounded-xl">

//         <div className="flex justify-between mb-4">
//           <h2 className="flex items-center gap-2 font-semibold">
//             <FaBox /> Orders
//           </h2>
//           <button onClick={closeOrders}>✕</button>
//         </div>

//         {loading && <p>Loading...</p>}

//         {!loading && !items.length && (
//           <p className="text-gray-500">No orders</p>
//         )}

//         <div className="space-y-4 max-h-[60vh] overflow-y-auto">
//           {items.map((order) => (
//             <div key={order._id} className="border p-4 rounded-lg space-y-2">
//               <p className="text-sm text-gray-500">
//                 Order ID: {order._id}
//               </p>

//               <p>Total: {formatPrice(order.totalAmount)}</p>
//               <p>Status: {order.orderStatus}</p>
//               <p>Payment: {order.paymentStatus}</p>

//               <div className="flex justify-end">
//                 {order.orderStatus === "delivered" && (
//                   <button
//                     onClick={() => returnOrder(order._id)}
//                     className="text-sm border px-3 py-1 rounded"
//                   >
//                     Return
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

 
import { formatPrice } from "@/config/constants";
import { useCustomerOrdersStore } from "@/store/home/orders/store";
import { CustomerOrder, CustomerOrderStatus, CustomerPaymentStatus } from "@/store/home/orders/types";
import {
  RiShoppingBag3Line,
  RiRefreshLine,
  RiInboxLine,
  RiLoaderLine,
  RiCloseLine,
} from "react-icons/ri";

function PaymentBadge({ status }: { status: CustomerPaymentStatus }) {
  const styles =
    status === "paid"
      ? "bg-green-50 text-green-700 border-green-200"
      : status === "failed"
      ? "bg-red-50 text-red-600 border-red-200"
      : "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function OrderBadge({ status }: { status: CustomerOrderStatus }) {
  const styles =
    status === "delivered"
      ? "bg-green-50 text-green-700 border-green-200"
      : status === "returned"
      ? "bg-red-50 text-red-600 border-red-200"
      : "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function formatDate(value?: string | null) {
  return value
    ? new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "-";
}

function canReturnOrder(order: CustomerOrder) {
  if (order.orderStatus !== "delivered" || !order.deliveredAt) return false;
  const diff = Date.now() - new Date(order.deliveredAt).getTime();
  return diff <= 7 * 24 * 60 * 60 * 1000;
}

function CustomerOrdersDialog() {
  const { isOpen, closeOrders, loading, items, returnOrder, loadOrders } =
    useCustomerOrdersStore  ((state) => state);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <RiShoppingBag3Line className="text-gray-700 text-lg" />
            <h2 className="text-base font-semibold text-gray-900">My Orders</h2>
            {items.length > 0 && (
              <span className="text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 rounded-full px-2 py-0.5">
                {items.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => void loadOrders()}
              className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <RiRefreshLine className={`text-sm ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={closeOrders}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <RiCloseLine className="text-lg" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center gap-2 py-16 text-gray-400">
              <RiLoaderLine className="text-2xl animate-spin" />
              <span className="text-sm">Loading orders...</span>
            </div>
          )}

          {/* Empty */}
          {!loading && !items.length && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
              <RiInboxLine className="text-5xl opacity-25" />
              <p className="text-sm">No orders found</p>
            </div>
          )}

          {/* Table */}
          {!loading && items.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Order ID", "Items", "Amount", "Payment", "Status", "Date", "Action"].map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-gray-400 truncate max-w-[90px] block">
                          {order._id}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{order.totalItems}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
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
                      <td className="px-4 py-3 text-right">
                        {canReturnOrder(order) ? (
                          <button
                            onClick={() => returnOrder(order._id)}
                            className="inline-flex items-center h-7 px-3 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Return
                          </button>
                        ) : (
                          <span className="text-xs text-gray-300">
                            {order.orderStatus === "returned" ? "Returned" : "—"}
                          </span>
                        )}
                      </td>
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