// import { create } from "zustand";
// import { extractAdminOrders, updateAdminOrderStatus } from "./api";
// import { AdminOrder, AdminOrderStatus } from "@/components/admin/orders/types";


// type AdminOrdersStore = {
//   orders: AdminOrder[];
//   loading: boolean;
//   updatingOrderId: string;

//   fetchOrders: () => Promise<void>;
//   changeStatus: (
//     orderId: string,
//     orderStatus: AdminOrderStatus
//   ) => Promise<void>;
// };

// export const useAdminOrdersStore = create<AdminOrdersStore>((set) => ({
//   orders: [],
//   loading: true,
//   updatingOrderId: "",

//   fetchOrders: async () => {
//     try {
//       set({ loading: true });

//       const data = await extractAdminOrders();

//       set({
//         orders: data?.items ?? [],
//         loading: false,
//       });
//     } catch (err) {
//       console.log("Fetch orders failed", err);
//       set({ orders: [], loading: false });
//     }
//   },

//   changeStatus: async (orderId, orderStatus) => {
//     try {
//       set({ updatingOrderId: orderId });

//       const res = await updateAdminOrderStatus(orderId, orderStatus);

//       set((state) => ({
//         orders: state.orders.map((order) =>
//           order._id === orderId
//             ? {
//                 ...order,
//                 orderStatus: res.orderStatus,
//                 deliveredAt: res.deliveredAt || order.deliveredAt,
//                 returnedAt: res.returnedAt || order.returnedAt,
//               }
//             : order
//         ),
//         updatingOrderId: "",
//       }));
//     } catch (err) {
//       console.log("Update failed", err);
//       set({ updatingOrderId: "" });
//     }
//   },
// }));












// store/admin/orders/store.ts

import { create } from "zustand";
import { extractAdminOrders, updateAdminOrderStatus } from "./api";
import type { AdminOrder, AdminOrderStatus } from "@/components/admin/orders/types";

type AdminOrdersStore = {
  orders: AdminOrder[];
  loading: boolean;
  updatingOrderId: string;
  fetchOrders: () => Promise<void>;
  changeStatus: (orderId: string, orderStatus: AdminOrderStatus) => Promise<void>;
};

export const useAdminOrdersStore = create<AdminOrdersStore>((set) => ({
  orders: [],
  loading: true,
  updatingOrderId: "",

  fetchOrders: async () => {
    try {
      set({ loading: true });
      const data = await extractAdminOrders();
      set({ orders: data?.items ?? [], loading: false });
    } catch {
      set({ orders: [], loading: false });
    }
  },

  changeStatus: async (orderId, orderStatus) => {
    try {
      set({ updatingOrderId: orderId });
      const res = await updateAdminOrderStatus(orderId, orderStatus);
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: res.orderStatus,
                deliveredAt: res.deliveredAt ?? order.deliveredAt,
              }
            : order
        ),
        updatingOrderId: "",
      }));
    } catch {
      set({ updatingOrderId: "" });
    }
  },
}));