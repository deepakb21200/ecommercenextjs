// "use client";

// import { create } from "zustand";
// import {
//   extractAdminOrders,
//   updateAdminOrderStatus,
// } from "./api";

// import type {
//   AdminOrder,
//   AdminOrderStatus,
// } from "@/components/admin/orders/types";

// type AdminOrdersStore = {
//   orders: AdminOrder[];
//   error: string;
//   loading: boolean;
//   hasLoaded: boolean;
//   updatingOrderId: string;

//   fetchOrders: (search?: string) => Promise<void>;

//   changeStatus: (
//     orderId: string,
//     orderStatus: AdminOrderStatus
//   ) => Promise<void>;
// };

// // race condition handle
// let abortController: AbortController | null = null;

// export const useAdminOrdersStore =
//   create<AdminOrdersStore>((set) => ({
//     orders: [],
//     loading: false,
//     hasLoaded: false,
//     updatingOrderId: "",
//     error: "",

//     fetchOrders: async (search = "") => {
//       // previous request cancel
//       if (abortController) {
//         abortController.abort();
//       }

//       abortController = new AbortController();

//       try {
//         set({
//           loading: true,
//           error: "",
//            orders: []// ye maine kiya h

//         });

//         const data = await extractAdminOrders(
//           search,
//           abortController.signal
//         );


//         set({
//           orders: data?.items ?? [],
//           hasLoaded: true,
//         });
//       } catch (err: unknown) {
//         // abort ignore
//         if (
//           err instanceof Error &&
//           err.name === "AbortError"
//         ) {
//           return;
//         }

//         set({
//           error: "Failed to fetch orders",
//           orders: [],
//           hasLoaded: true,
//         });
//       } finally {
//         set({
//           loading: false,
//         });
//       }
//     },

//     changeStatus: async (
//       orderId,
//       orderStatus
//     ) => {
//       try {
//         set({
//           updatingOrderId: orderId,
//         });

//         const res = await updateAdminOrderStatus(
//           orderId,
//           orderStatus
//         );

//         set((state) => ({
//           orders: state.orders.map((order) =>
//             order._id === orderId
//               ? {
//                   ...order,
//                   orderStatus: res.orderStatus,
//                   deliveredAt:
//                     res.deliveredAt ??
//                     order.deliveredAt,
//                 }
//               : order
//           ),
//         }));
//       } catch (error) {
//         console.error(
//           "Update Order Error:",
//           error
//         );
//       } finally {
//         set({
//           updatingOrderId: "",
//         });
//       }
//     },
//   }));



















"use client";

import { create } from "zustand";
import {
  extractAdminOrders,
  updateAdminOrderStatus,
} from "./api";

import type {
  AdminOrder,
  AdminOrderStatus,
} from "@/components/admin/orders/types";

type AdminOrdersStore = {
  orders: AdminOrder[];
  error: string;
  loading: boolean;
  updatingOrderId: string;
  fetchOrders: (search?: string) => Promise<void>;
  changeStatus: (orderId: string, orderStatus: AdminOrderStatus) => Promise<void>;
};

// race condition handle
let abortController: AbortController | null = null;

export const useAdminOrdersStore =
  create<AdminOrdersStore>((set) => ({
    orders: [],
    loading: false,

    updatingOrderId: "",
    error: "",

    fetchOrders: async (search = "") => {
      // previous request cancel
      if (abortController) {
        abortController.abort();
      }

      abortController = new AbortController();

      try {
        set({
          loading: true,
          error: "",
          orders: []// ye maine kiya h

        });

        const data = await extractAdminOrders(
          search,
          abortController.signal
        );


        set({  orders: data?.items ?? []});
      } catch (err: unknown) {
        // abort ignore
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        set({
          error: "Failed to fetch orders",
          orders: [],

        });
      } finally {
        set({ loading: false, });
      }
    },

    changeStatus: async (orderId, orderStatus) => {
      try {
        set({   updatingOrderId: orderId});

        const res = await updateAdminOrderStatus(
          orderId,
          orderStatus
        );

        set((state) => ({
          orders: state.orders.map((order) =>
            order._id === orderId
              ? {
                ...order,
                orderStatus: res.orderStatus,
                deliveredAt:
                  res.deliveredAt ??
                  order.deliveredAt,
              }
              : order
          ),
        }));
      } catch (error) {
        console.error(
          "Update Order Error:",
          error
        );
      } finally {
        set({
          updatingOrderId: "",
        });
      }
    },
  }));