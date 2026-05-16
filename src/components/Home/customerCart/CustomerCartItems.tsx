"use client"; 
import { useAuthStore } from "@/components/user/store/api";
import { formatPrice } from "@/config/constants";
import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
import Link from "next/link";

 
import {
  RiShoppingCart2Line,
  RiDeleteBin6Line,
  RiAddLine,
  RiSubtractLine,
  RiInboxLine,
} from "react-icons/ri";

function CustomerCartItems() {
  const { user } = useAuthStore();
 const isSignedIn = Boolean(user);

  const { cart, setOpen, increase, decrease, remove } =
    useCustomerCartAndCheckoutStore((state) => state);

  return (
    <div className="flex h-full min-h-0 flex-col">

      {/* Header */}
      <div className="shrink-0 border-b border-gray-100 px-5 py-4 bg-gray-50">
        <p className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <RiShoppingCart2Line className="text-base text-gray-500" />
          Your Cart
          {cart.items.length > 0 && (
            <span className="ml-1 inline-flex items-center rounded-full border border-gray-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-500">
              {cart.items.length}
            </span>
          )}
        </p>
      </div>

      {/* Scrollable List */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="space-y-3 p-5">

          {/* Empty */}
          {!cart.items.length ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 text-center">
              <RiInboxLine className="text-5xl text-gray-200" />
              <p className="text-sm font-medium text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            cart.items.map((item, index) => (
              <div
                key={`${item.productId}-${index + 1}`}
                className="group flex gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-md"
              >
                {/* Image */}
                <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                    {item.brand}
                  </p>

                  <Link
                    href={`/collection/${item.productId}`}
                    className="block line-clamp-2 text-sm font-medium text-gray-900 transition-colors hover:text-black"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>

                  <p className="text-xs text-gray-400">
                    {[item.color, item.size].filter(Boolean).join(" · ") || "Standard"}
                  </p>

                  <p className="text-sm font-semibold text-gray-900">
                    {formatPrice(item.finalPrice)}
                  </p>

                  {/* Footer Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">

                    {/* Qty Controls */}
                    <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                      <button
                        type="button"
                        onClick={() => void decrease(item, isSignedIn)}
                        className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <RiSubtractLine className="text-sm" />
                      </button>
                      <span className="flex h-8 min-w-[36px] items-center justify-center border-x border-gray-200 px-2 text-sm font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => void increase(item, isSignedIn)}
                        className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <RiAddLine className="text-sm" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => void remove(item, isSignedIn)}
                      className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <RiDeleteBin6Line className="text-sm" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerCartItems;




















// "use client"; 
// import { useAuthStore } from "@/components/user/store/api";
// import { formatPrice } from "@/config/constants";
// import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
// import Link from "next/link";
// import {
//   RiShoppingCart2Line,
//   RiDeleteBin6Line,
//   RiAddLine,
//   RiSubtractLine,
//   RiInboxLine,
// } from "react-icons/ri";

// function CustomerCartItems() {
//   const { user } = useAuthStore();
//   const isSignedIn = !!user;

//   const { cart, setOpen, increase, decrease, remove } =
//     useCustomerCartAndCheckoutStore((state) => state);

//   return (
//     <div className="flex h-full min-h-0 flex-col">

//       {/* Header */}
//       <div className="shrink-0 border-b border-[hsl(40,20%,88%)] px-5 py-4 bg-white">
//         <p className="flex items-center gap-2 text-sm font-semibold text-[hsl(220,20%,15%)]">
//           <RiShoppingCart2Line className="text-base text-[hsl(174,62%,38%)]" />
//           Your Cart
//           {cart.items.length > 0 && (
//             <span className="ml-1 inline-flex items-center rounded-full border border-[hsl(40,20%,88%)] bg-[hsl(40,33%,98%)] px-2 py-0.5 text-xs font-medium text-[hsl(174,62%,38%)]">
//               {cart.items.length}
//             </span>
//           )}
//         </p>
//       </div>

//       {/* Scrollable List */}
//       <div className="min-h-0 flex-1 overflow-y-auto bg-[hsl(40,33%,98%)]">
//         <div className="space-y-3 p-5">

//           {/* Empty */}
//           {!cart.items.length ? (
//             <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[hsl(40,20%,88%)] bg-white px-6 text-center">
//               <RiInboxLine className="text-5xl text-[hsl(174,62%,38%)]/20" />
//               <p className="text-sm font-medium text-[hsl(220,10%,45%)]">Your cart is empty</p>
//             </div>
//           ) : (
//             cart.items.map((item, index) => (
//               <div
//                 key={`${item.productId}-${index + 1}`}
//                 className="group flex gap-4 rounded-xl border border-[hsl(40,20%,88%)] bg-white p-3 shadow-sm transition-all duration-200 hover:border-[hsl(174,62%,38%)]/30 hover:shadow-md"
//               >
//                 {/* Image */}
//                 <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-[hsl(40,20%,88%)] bg-[hsl(40,33%,98%)]">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </div>

//                 {/* Info */}
//                 <div className="min-w-0 flex-1 space-y-1">
//                   <p className="text-[11px] font-semibold uppercase tracking-widest text-[hsl(220,10%,45%)]">
//                     {item.brand}
//                   </p>

//                   <Link
//                     href={`/collection/${item.productId}`}
//                     className="block line-clamp-2 text-sm font-medium text-[hsl(220,20%,15%)] transition-colors hover:text-[hsl(174,62%,38%)]"
//                     onClick={() => setOpen(false)}
//                   >
//                     {item.title}
//                   </Link>

//                   <p className="text-xs text-[hsl(220,10%,45%)]">
//                     {[item.color, item.size].filter(Boolean).join(" · ") || "Standard"}
//                   </p>

//                   <p className="text-sm font-semibold text-[hsl(174,62%,38%)]">
//                     {formatPrice(item.finalPrice)}
//                   </p>

//                   {/* Footer Row */}
//                   <div className="flex flex-wrap items-center justify-between gap-3 pt-1">

//                     {/* Qty Controls */}
//                     <div className="flex items-center overflow-hidden rounded-lg border border-[hsl(40,20%,88%)] bg-[hsl(40,33%,98%)]">
//                       <button
//                         type="button"
//                         onClick={() => void decrease(item, isSignedIn)}
//                         className="flex h-8 w-8 items-center justify-center text-[hsl(220,10%,45%)] hover:bg-[hsl(40,20%,92%)] hover:text-[hsl(174,62%,38%)] transition-colors"
//                       >
//                         <RiSubtractLine className="text-sm" />
//                       </button>
//                       <span className="flex h-8 min-w-[36px] items-center justify-center border-x border-[hsl(40,20%,88%)] px-2 text-sm font-medium text-[hsl(220,20%,15%)]">
//                         {item.quantity}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => void increase(item, isSignedIn)}
//                         className="flex h-8 w-8 items-center justify-center text-[hsl(220,10%,45%)] hover:bg-[hsl(40,20%,92%)] hover:text-[hsl(174,62%,38%)] transition-colors"
//                       >
//                         <RiAddLine className="text-sm" />
//                       </button>
//                     </div>

//                     {/* Remove */}
//                     <button
//                       type="button"
//                       onClick={() => void remove(item, isSignedIn)}
//                       className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium border border-[hsl(0,84%,60%)]/30 text-[hsl(0,84%,60%)] rounded-lg hover:bg-[hsl(0,84%,60%)]/5 transition-colors"
//                     >
//                       <RiDeleteBin6Line className="text-sm" />
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerCartItems;