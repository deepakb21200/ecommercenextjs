// "use client";

// import { AdminOrder, AdminOrderStatus, AdminPaymentStatus } from "@/components/admin/orders/types";
// import { formatPrice } from "@/config/constants";
// import { useAdminOrdersStore } from "@/store/admin/orders/store";
// import { useEffect } from "react";



//  function formatDate(value?: string | null) {
//   return value ? new Date(value).toLocaleDateString() : "-";
// }


// function PaymentBadge({ status }: { status: AdminPaymentStatus }) {
//   const base = "px-2 py-1 text-xs rounded-full font-medium";

//   if (status === "paid")
//     return <span className={`${base} bg-green-100 text-green-700`}>Paid</span>;

//   if (status === "failed")
//     return <span className={`${base} bg-red-100 text-red-600`}>Failed</span>;

//   return <span className={`${base} bg-gray-100 text-gray-600`}>Pending</span>;
// }

// function canUpdate(order: AdminOrder) {
//   if (order.paymentStatus !== "paid") return false;
//   if (order.orderStatus === "delivered") return false;
//   if (order.orderStatus === "returned") return false;
//   return true;
// }

// const orderOptions: AdminOrderStatus[] = [
//   "placed",
//   "shipped",
//   "delivered",
// ];

// // ===== Component =====
// export default function AdminOrders() {
//   const { loading, orders, updatingOrderId, fetchOrders, changeStatus } =
//     useAdminOrdersStore();

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // ===== Loading =====
//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p className="text-gray-500">Loading Orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6">
        
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">Orders</h1>
//           <span className="text-sm text-gray-500">
//             {orders.length} Orders
//           </span>
//         </div>

//         {/* Empty State */}
//         {orders.length === 0 ? (
//           <div className="text-center py-10 text-gray-400">
//             No orders found
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm border rounded-lg overflow-hidden">
              
//               {/* Table Head */}
//               <thead className="bg-gray-100 text-gray-600">
//                 <tr>
//                   <th className="p-3 text-left">Order</th>
//                   <th className="p-3 text-left">Customer</th>
//                   <th className="p-3 text-left">Items</th>
//                   <th className="p-3 text-left">Amount</th>
//                   <th className="p-3 text-left">Payment</th>
//                   <th className="p-3 text-left">Date</th>
//                   <th className="p-3 text-right">Action</th>
//                 </tr>
//               </thead>

//               {/* Table Body */}
//               <tbody>
//                 {orders.map((order) => {
//                   const editable = canUpdate(order);

//                   return (
//                     <tr
//                       key={order._id}
//                       className="border-t hover:bg-gray-50 transition"
//                     >
//                       <td className="p-3 font-medium">
//                         #{order._id.slice(-6)}
//                       </td>

//                       <td className="p-3">{order.customerName}</td>

//                       <td className="p-3">{order.totalItems}</td>

//                       <td className="p-3 font-semibold">
//                         {formatPrice(order.totalAmount)}
//                       </td>

//                       <td className="p-3">
//                         <PaymentBadge status={order.paymentStatus} />
//                       </td>

//                       <td className="p-3">
//                         {formatDate(order.paidAt || order.createdAt)}
//                       </td>

//                       <td className="p-3 text-right">
//                         {editable ? (
//                           <select
//                             value={order.orderStatus}
//                             onChange={(e) =>
//                               changeStatus(
//                                 order._id,
//                                 e.target.value as AdminOrderStatus
//                               )
//                             }
//                             disabled={updatingOrderId === order._id}
//                             className="border px-2 py-1 rounded-md text-sm"
//                           >
//                             {orderOptions.map((status) => (
//                               <option
//                                 key={status}
//                                 value={status}
//                                 disabled={
//                                   status === "placed" ||
//                                   status === order.orderStatus
//                                 }
//                               >
//                                 {status}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           <span className="text-xs text-gray-400">
//                             {order.paymentStatus !== "paid"
//                               ? "Payment Pending"
//                               : order.orderStatus === "returned"
//                               ? "Returned"
//                               : "Completed"}
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>

//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







// "use client";

// import { AdminOrder, AdminOrderStatus, AdminPaymentStatus } from "@/components/admin/orders/types";
// import { formatPrice } from "@/config/constants";
// import { useAdminOrdersStore } from "@/store/admin/orders/store";
// import { useEffect } from "react";
// import { FiShoppingBag } from "react-icons/fi";

// function formatDate(value?: string | null) {
//   return value ? new Date(value).toLocaleDateString() : "-";
// }

// function PaymentBadge({ status }: { status: AdminPaymentStatus }) {
//   if (status === "paid")
//     return (
//       <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
//         <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
//         Paid
//       </span>
//     );

//   if (status === "failed")
//     return (
//       <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400 ring-1 ring-red-500/20">
//         <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
//         Failed
//       </span>
//     );

//   return (
//     <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 ring-1 ring-amber-500/20">
//       <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
//       Pending
//     </span>
//   );
// }

// function canUpdate(order: AdminOrder) {
//   if (order.paymentStatus !== "paid") return false;
//   if (order.orderStatus === "delivered") return false;
//   if (order.orderStatus === "returned") return false;
//   return true;
// }

// const orderOptions: AdminOrderStatus[] = ["placed", "shipped", "delivered"];

// export default function AdminOrders() {
//   const { loading, orders, updatingOrderId, fetchOrders, changeStatus } = useAdminOrdersStore();

//   useEffect(() => { fetchOrders(); }, []);

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-zinc-950">
//         <div className="flex flex-col items-center gap-3">
//           <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />
//           <p className="text-sm text-zinc-500">Loading orders...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-zinc-950 p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="rounded-2xl border border-zinc-800 bg-zinc-900">

//           {/* Header */}
//           <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
//             <div>
//               <div className="mb-1 flex items-center gap-2">
//                 <span className="h-2 w-2 rounded-full bg-violet-500" />
//                 <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Management</p>
//               </div>
//               <h1 className="text-2xl font-semibold text-zinc-100">Orders</h1>
//             </div>
//             <span className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-400">
//               {orders.length} orders
//             </span>
//           </div>

//           {/* Empty */}
//           {orders.length === 0 ? (
//             <div className="flex flex-col items-center gap-3 py-20">
//               <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-800/50">
//                 <FiShoppingBag className="h-6 w-6 text-zinc-600" />
//               </div>
//               <p className="text-sm text-zinc-500">No orders found</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">

//                 <thead>
//                   <tr className="border-b border-zinc-800">
//                     {["Order", "Customer", "Items", "Amount", "Payment", "Date", "Action"].map((h, i) => (
//                       <th
//                         key={h}
//                         className={`px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500 ${i === 6 ? "text-right" : "text-left"}`}
//                       >
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-zinc-800/60">
//                   {orders.map((order) => {
//                     const editable = canUpdate(order);
//                     return (
//                       <tr key={order._id} className="group transition-colors hover:bg-zinc-800/30">

//                         <td className="px-5 py-4">
//                           <span className="font-mono text-xs font-semibold text-violet-400">
//                             #{order._id.slice(-6).toUpperCase()}
//                           </span>
//                         </td>

//                         <td className="px-5 py-4 font-medium text-zinc-200">{order.customerName}</td>

//                         <td className="px-5 py-4">
//                           <span className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
//                             {order.totalItems} items
//                           </span>
//                         </td>

//                         <td className="px-5 py-4 font-semibold text-zinc-100">
//                           {formatPrice(order.totalAmount)}
//                         </td>

//                         <td className="px-5 py-4">
//                           <PaymentBadge status={order.paymentStatus} />
//                         </td>

//                         <td className="px-5 py-4 text-zinc-400">
//                           {formatDate(order.paidAt || order.createdAt)}
//                         </td>

//                         <td className="px-5 py-4 text-right">
//                           {editable ? (
//                             <select
//                               value={order.orderStatus}
//                               onChange={(e) => changeStatus(order._id, e.target.value as AdminOrderStatus)}
//                               disabled={updatingOrderId === order._id}
//                               className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 disabled:opacity-50"
//                             >
//                               {orderOptions.map((status) => (
//                                 <option
//                                   key={status}
//                                   value={status}
//                                   disabled={status === "placed" || status === order.orderStatus}
//                                 >
//                                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                                 </option>
//                               ))}
//                             </select>
//                           ) : (
//                             <span className="text-xs text-zinc-600">
//                               {order.paymentStatus !== "paid"
//                                 ? "Payment Pending"
//                                 : order.orderStatus === "returned"
//                                 ? "Returned"
//                                 : "Completed"}
//                             </span>
//                           )}
//                         </td>

//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }








"use client";

import { AdminOrder, AdminOrderStatus, AdminPaymentStatus } from "@/components/admin/orders/types";
import { formatPrice } from "@/config/constants";
import { useAdminOrdersStore } from "@/store/admin/orders/store";
import { useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString() : "-";
}

function PaymentBadge({ status }: { status: AdminPaymentStatus }) {
  if (status === "paid")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Paid
      </span>
    );
  if (status === "failed")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600 ring-1 ring-rose-200">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
        Failed
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Pending
    </span>
  );
}

function canUpdate(order: AdminOrder) {
  if (order.paymentStatus !== "paid") return false;
  if (order.orderStatus === "delivered") return false;
  if (order.orderStatus === "returned") return false;
  return true;
}

const orderOptions: AdminOrderStatus[] = ["placed", "shipped", "delivered"];

export default function AdminOrders() {
  const { loading, orders, updatingOrderId, fetchOrders, changeStatus } = useAdminOrdersStore();

  useEffect(() => { fetchOrders(); }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-500" />
          <p className="text-sm text-slate-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">Management</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-800">Orders</h1>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-700">All Orders</p>
              <p className="text-xs text-slate-400">{orders.length} total</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <FiShoppingBag className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-sm text-slate-400">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Order", "Customer", "Items", "Amount", "Payment", "Date", "Action"].map((h, i) => (
                      <th key={h} className={`px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400 ${i === 6 ? "text-right" : "text-left"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => {
                    const editable = canUpdate(order);
                    return (
                      <tr key={order._id} className="group transition-colors hover:bg-slate-50">
                        <td className="px-5 py-4">
                          <span className="font-mono text-xs font-semibold text-indigo-600">
                            #{order._id.slice(-6).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-800">{order.customerName}</td>
                        <td className="px-5 py-4">
                          <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                            {order.totalItems} items
                          </span>
                        </td>
                        <td className="px-5 py-4 font-semibold text-slate-800">{formatPrice(order.totalAmount)}</td>
                        <td className="px-5 py-4"><PaymentBadge status={order.paymentStatus} /></td>
                        <td className="px-5 py-4 text-slate-500">{formatDate(order.paidAt || order.createdAt)}</td>
                        <td className="px-5 py-4 text-right">
                          {editable ? (
                            <select
                              value={order.orderStatus}
                              onChange={(e) => changeStatus(order._id, e.target.value as AdminOrderStatus)}
                              disabled={updatingOrderId === order._id}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:opacity-50"
                            >
                              {orderOptions.map((status) => (
                                <option key={status} value={status} disabled={status === "placed" || status === order.orderStatus}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-xs text-slate-400">
                              {order.paymentStatus !== "paid" ? "Payment Pending" : order.orderStatus === "returned" ? "Returned" : "Completed"}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}