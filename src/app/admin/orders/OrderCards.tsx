// "use client";

// import { AdminOrder, AdminOrderStatus, AdminPaymentStatus } from "@/components/admin/orders/types";
// import {
//   HiOutlineCube,
//   HiOutlineShoppingBag,
// } from "react-icons/hi2";

// type Props = {

//     orders: AdminOrder[];

//   canUpdate: (order:AdminOrder) => boolean;
//   changeStatus: (
//     id: string,
//     status: AdminOrderStatus
//   ) => Promise<void>;
//   updatingOrderId: string;
//   orderOptions: string[];
//   formatPrice: (v: number) => string;
//   formatDate: (v: string) => string;
//   PaymentBadge: ({
//     status,
//   }: {
//     status: AdminPaymentStatus;
//   }) => React.ReactNode;
// };

// export default function OrderCards({
//   orders,
//   canUpdate,
//   changeStatus,
//   updatingOrderId,
//   orderOptions,
//   formatPrice,
//   formatDate,
// }: Props) {
//   if (!orders.length) {
//     return (
//       <div className="flex flex-col items-center gap-4 py-24">
//         <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5">
//           <HiOutlineCube className="text-4xl text-zinc-500" />
//         </div>
//         <div className="text-center">
//           <p className="text-lg font-semibold text-white">No Orders Found</p>
//           <p className="mt-1 text-sm text-zinc-500">
//             Customer orders will appear here
//           </p>
//         </div>
//       </div>
//     );
//   }


//   console.log(orders);


//   return (
//     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//       {orders.map((order) => {
//         const editable = canUpdate(order);
//         const isUpdating = updatingOrderId === order._id;

//         return (
//           <div
//             key={order._id}
//             className="rounded-[20px] border border-white/10 bg-[#111827]/60 p-4 backdrop-blur-xl"
//           >

//             <div className="flex items-start justify-between gap-3">
//               <div className="flex gap-3">

//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#0B1120]">
//                   <HiOutlineShoppingBag className="text-xl text-violet-400" />
//                 </div>


//                 <div>
//                   <p className="text-sm font-bold text-white">
//                     #{order._id.slice(-6).toUpperCase()}
//                   </p>
//                   <p className="text-xs text-zinc-500">
//                     {order.customerName}
//                   </p>
//                 </div>
//               </div>




//               <div className="mt-4">
//                 {editable ? (
//                   <select
//                     value={order.orderStatus}

//                     onChange={(e) =>
//                       changeStatus(
//                         order._id,
//                         e.target.value as AdminOrderStatus
//                       )
//                     }


//                     disabled={isUpdating}
//                     className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-3 py-2 text-sm text-white outline-none transition-all focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
//                   >
//                     {orderOptions.map((status) => (
//                       <option key={status} value={status}
//                         disabled={
//                           // current status se pehle wale options disable
//                           orderOptions.indexOf(status) <
//                           orderOptions.indexOf(order.orderStatus)
//                         }>
//                         {status}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <div className="text-xs text-zinc-500">
//                     {order.paymentStatus !== "paid"
//                       ? "Payment Pending"
//                       : order.orderStatus === "delivered"
//                         ? "Completed"
//                         : "Processing"}
//                   </div>
//                 )}
//               </div>
//             </div>


//             <div className="mt-4 space-y-2 text-xs text-zinc-400">
//               <div className="flex justify-between">
//                 <span>Amount</span>
//                 <span className="text-white">
//                   {formatPrice(order.totalAmount)}
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Date</span>
//                 <span className="text-white">
//                   {formatDate(order.paidAt || order.createdAt)}
//                 </span>
//               </div>


//               <div className="flex justify-between">
//                 <span> Payment</span>
//                 <span className="text-white">
//                   {order.paymentStatus}
//                 </span>
//               </div>

//             </div>



//           </div>
//         );
//       })}
//     </div>



//   );
// }













"use client";

import type { AdminOrder, AdminOrderStatus, AdminPaymentStatus } from "@/components/admin/orders/types";
import { HiOutlineCube, HiOutlineShoppingBag } from "react-icons/hi2";

// ─── Status display helper — exact table se ──────────────────────────────────
function getStatusLabel(order: AdminOrder): { label: string; color: string } {
  const { paymentStatus, orderStatus } = order;

  if (paymentStatus === "failed" && orderStatus === "cancelled") {
    return { label: "Cancelled", color: "text-rose-400" };
  }
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
  orders: AdminOrder[];
  canUpdate: (order: AdminOrder) => boolean;
  changeStatus: (id: string, status: AdminOrderStatus) => Promise<void>;
  updatingOrderId: string;
  orderOptions: AdminOrderStatus[];
  formatPrice: (v: number) => string;
  // formatDate: (v?: string | null) => string;
    formatDate: (v: string) => string;
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OrderCards({
  orders,
  canUpdate,
  changeStatus,
  updatingOrderId,
  orderOptions,
  formatPrice,
  formatDate,
}: Props) {
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center gap-4 py-24">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5">
          <HiOutlineCube className="text-4xl text-zinc-500" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-white">No Orders Found</p>
          <p className="mt-1 text-sm text-zinc-500">Customer orders will appear here</p>
        </div>
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
                      void changeStatus(order._id, e.target.value as AdminOrderStatus)
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


