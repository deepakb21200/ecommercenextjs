




// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
 
// import {
//   RiMapPinLine,
//   RiCoupon3Line,
//   RiCloseLine,
//   RiCheckLine,
//   RiStarLine,
//   RiLockLine,
// } from "react-icons/ri";
// import { useAuthStore } from "@/components/user/store/api";
// import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
// import CustomerCartItems from "./CustomerCartItems";
// import { formatPrice } from "@/config/constants";

// function SummaryRow({ label, value }: { label: string; value: string | number }) {
//   return (
//     <div className="flex items-center justify-between text-sm">
//       <span className="text-gray-400">{label}</span>
//       <span className="font-medium text-gray-800">{value}</span>
//     </div>
//   );
// }

// function CustomerCartAndCheckoutDrawer() {
//   const router = useRouter();

//   const { user, isBootstrapped } = useAuthStore();
//   const isSignedIn = !!user;

//   const {
//     isOpen,
//     setOpen,
//     loadCart,
//     selectedAddressId,
//     addresses,
//     promoInput,
//     appliedPromo,
//     points,
//     promoLoading,
//     checkoutLoading,
//     pointsCheckoutLoading,
//     setPromoInput,
//     clearPromo,
//     applyPromo,
//     startStripeCheckout,
//     startPointsCheckout,
//     loading,
//     cart,
//   } = useCustomerCartAndCheckoutStore((state) => state);

//   useEffect(() => {
//     if (!isOpen || !isBootstrapped) return;
//     void loadCart(isSignedIn);
//   }, [isBootstrapped, isOpen, isSignedIn, loadCart]);

//   useEffect(() => {
//     console.log(cart.items.length);
//     console.log(selectedAddressId);
//   }, [cart]);

//   const selectedAddress =
//     addresses.find((item) => item._id === selectedAddressId) || null;

//   const subTotal = cart.items.reduce(
//     (sum, item) => sum + item.finalPrice * item.quantity,
//     0
//   );
//   const discountAmount = appliedPromo
//     ? Math.round((subTotal * appliedPromo.percentage) / 100)
//     : 0;
//   const totalAmount = Math.max(subTotal - discountAmount, 0);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
//         onClick={() => setOpen(false)}
//       />

//       {/* Drawer */}
//       <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-5xl shadow-2xl transition-transform duration-300">
//         <div className="grid h-full w-full lg:grid-cols-[1.7fr_1fr] bg-white overflow-hidden">

//           {/* ── Left: Cart Items ── */}
//           <div className="min-h-0 border-r border-gray-100 overflow-hidden">
//             <CustomerCartItems />
//           </div>

//           {/* ── Right: Checkout Panel ── */}
//           <div className="flex min-h-0 flex-col bg-gray-50 overflow-hidden">

//             {/* Panel Header */}
//             <div className="flex items-center justify-between shrink-0 border-b border-gray-100 bg-white px-5 py-4">
//               <div className="flex items-center gap-2">
//                 <RiLockLine className="text-gray-500 text-base" />
//                 <h2 className="text-sm font-semibold text-gray-900">Checkout</h2>
//               </div>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
//               >
//                 <RiCloseLine className="text-lg" />
//               </button>
//             </div>

//             {isSignedIn ? (
//               <>
//                 {/* Scrollable Content */}
//                 <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

//                   {/* Address */}
//                   <section className="space-y-2">
//                     <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
//                       <RiMapPinLine className="text-sm" />
//                       Delivery Address
//                     </p>
//                     {selectedAddress ? (
//                       <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-0.5">
//                         <p className="text-sm font-medium text-gray-900">{selectedAddress.fullName}</p>
//                         <p className="text-xs text-gray-400">
//                           {selectedAddress.address}, {selectedAddress.state}
//                         </p>
//                         <p className="text-xs text-gray-400">{selectedAddress.postalCode}</p>
//                       </div>
//                     ) : (
//                       <div className="rounded-xl border border-dashed border-gray-200 bg-white p-4 text-center">
//                         <p className="text-xs text-gray-400">
//                           No default address. Add one from your profile.
//                         </p>
//                       </div>
//                     )}
//                   </section>

//                   {/* Promo */}
//                   <section className="space-y-2">
//                     <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
//                       <RiCoupon3Line className="text-sm" />
//                       Promo Code
//                     </p>

//                     {!appliedPromo ? (
//                       <div className="flex gap-2">
//                         <input
//                           value={promoInput}
//                           onChange={(e) => setPromoInput(e.target.value)}
//                           placeholder="Enter promo code"
//                           className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => void applyPromo()}
//                           disabled={promoLoading || !promoInput.trim()}
//                           className="h-9 px-4 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                         >
//                           {promoLoading ? "Applying..." : "Apply"}
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2">
//                         <div className="flex items-center gap-2">
//                           <RiCheckLine className="text-green-600 text-sm" />
//                           <span className="text-sm font-medium text-green-700">
//                             {appliedPromo.code}
//                           </span>
//                           <span className="text-xs text-green-600">
//                             ({appliedPromo.percentage}% off)
//                           </span>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={clearPromo}
//                           className="text-xs text-red-500 hover:text-red-700 transition-colors"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     )}
//                   </section>

//                   {/* Summary */}
//                   <section className="rounded-xl border border-gray-200 bg-white p-4 space-y-2.5">
//                     <SummaryRow label="Items" value={cart.totalQuantity} />
//                     <SummaryRow label="Subtotal" value={formatPrice(subTotal)} />
//                     <SummaryRow label="Discount" value={`- ${formatPrice(discountAmount)}`} />
//                     <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
//                       <span className="flex items-center gap-1">
//                         <RiStarLine className="text-yellow-400" />
//                         Points balance
//                       </span>
//                       <span className="font-medium text-gray-600">{points}</span>
//                     </div>
//                     <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-base font-semibold text-gray-900">
//                       <span>Total</span>
//                       <span>{formatPrice(totalAmount)}</span>
//                     </div>
//                   </section>
//                 </div>

//                 {/* Footer Buttons */}
//                 <div className="shrink-0 space-y-2 border-t border-gray-100 bg-white px-5 py-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setOpen(false);
//                       void startStripeCheckout({
//                         isSignedIn,
//                         name: user?.username || "Customer",
//                         email: user?.email || "",
//                         onSuccess: () => router.push("/order-success"),
//                       });
//                     }}
//                     disabled={
//                       loading ||
//                       !cart.items.length ||
//                       !selectedAddressId ||
//                       checkoutLoading ||
//                       pointsCheckoutLoading
//                     }
//                     className="w-full h-11 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                   >
//                     {checkoutLoading ? "Processing..." : "Pay with Stripe"}
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       void startPointsCheckout({
//                         isSignedIn,
//                         onSuccess: () => router.push("/order-success"),
//                       });
//                     }}
//                     disabled={
//                       !(
//                         isSignedIn &&
//                         Boolean(selectedAddressId) &&
//                         Boolean(cart.items.length) &&
//                         points >= totalAmount &&
//                         !checkoutLoading &&
//                         !pointsCheckoutLoading
//                       )
//                     }
//                     className="w-full h-11 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//                   >
//                     <RiStarLine className="text-yellow-400 text-base" />
//                     {pointsCheckoutLoading ? "Processing..." : "Pay with Points"}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="flex flex-1 items-center justify-center p-6">
//                 <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center space-y-2">
//                   <RiLockLine className="text-3xl text-gray-300 mx-auto" />
//                   <p className="text-sm text-gray-400">Sign in to continue to checkout</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CustomerCartAndCheckoutDrawer;







// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   RiMapPinLine,
//   RiCoupon3Line,
//   RiCloseLine,
//   RiCheckLine,
//   RiStarLine,
//   RiLockLine,
// } from "react-icons/ri";
// import { useAuthStore } from "@/components/user/store/api";
// import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
// import CustomerCartItems from "./CustomerCartItems";
// import { formatPrice } from "@/config/constants";

// function SummaryRow({ label, value }: { label: string; value: string | number }) {
//   return (
//     <div className="flex items-center justify-between text-sm">
//       <span className="text-gray-400">{label}</span>
//       <span className="font-medium text-gray-800">{value}</span>
//     </div>
//   );
// }

// function CustomerCartAndCheckoutDrawer() {
//   const router = useRouter();

//   const { user, isBootstrapped } = useAuthStore();
//   const isSignedIn = !!user;

//   const {
//     isOpen,
//     setOpen,
//     loadCart,
//     selectedAddressId,
//     addresses,
//     promoInput,
//     appliedPromo,
//     points,
//     promoLoading,
//     checkoutLoading,
//     pointsCheckoutLoading,
//     setPromoInput,
//     clearPromo,
//     applyPromo,
//     startStripeCheckout,
//     startPointsCheckout,
//     loading,
//     cart,
//   } = useCustomerCartAndCheckoutStore((state) => state);

//   useEffect(() => {
//     if (!isOpen || !isBootstrapped) return;
//     void loadCart(isSignedIn);
//   }, [isBootstrapped, isOpen, isSignedIn, loadCart]);

//   const selectedAddress =
//     addresses.find((item) => item._id === selectedAddressId) || null;

//   const subTotal = cart.items.reduce(
//     (sum, item) => sum + item.finalPrice * item.quantity,
//     0
//   );
//   const discountAmount = appliedPromo
//     ? Math.round((subTotal * appliedPromo.percentage) / 100)
//     : 0;
//   const totalAmount = Math.max(subTotal - discountAmount, 0);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
//         onClick={() => setOpen(false)}
//       />

//       {/* Drawer */}
//       <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-5xl shadow-2xl transition-transform duration-300">
//         <div className="grid h-full w-full lg:grid-cols-[1.7fr_1fr] bg-white overflow-hidden">

//           {/* ── Left: Cart Items ── */}
//           <div className="min-h-0 border-r border-gray-100 overflow-hidden">
//             <CustomerCartItems />
//           </div>

//           {/* ── Right: Checkout Panel ── */}
//           <div className="flex min-h-0 flex-col bg-gray-50 overflow-hidden">

//             {/* Panel Header */}
//             <div className="flex items-center justify-between shrink-0 border-b border-gray-100 bg-white px-5 py-4">
//               <div className="flex items-center gap-2">
//                 <RiLockLine className="text-gray-500 text-base" />
//                 <h2 className="text-sm font-semibold text-gray-900">Checkout</h2>
//               </div>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
//               >
//                 <RiCloseLine className="text-lg" />
//               </button>
//             </div>

//             {/* Scrollable Content — always visible */}
//             <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

//               {/* Address — only if signed in */}
//               {isSignedIn && (
//                 <section className="space-y-2">
//                   <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
//                     <RiMapPinLine className="text-sm" />
//                     Delivery Address
//                   </p>
//                   {selectedAddress ? (
//                     <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-0.5">
//                       <p className="text-sm font-medium text-gray-900">{selectedAddress.fullName}</p>
//                       <p className="text-xs text-gray-400">
//                         {selectedAddress.address}, {selectedAddress.state}
//                       </p>
//                       <p className="text-xs text-gray-400">{selectedAddress.postalCode}</p>
//                     </div>
//                   ) : (
//                     <div className="rounded-xl border border-dashed border-gray-200 bg-white p-4 text-center">
//                       <p className="text-xs text-gray-400">
//                         No default address. Add one from your profile.
//                       </p>
//                     </div>
//                   )}
//                 </section>
//               )}

//               {/* Promo — only if signed in */}
//               {isSignedIn && (
//                 <section className="space-y-2">
//                   <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
//                     <RiCoupon3Line className="text-sm" />
//                     Promo Code
//                   </p>
//                   {!appliedPromo ? (
//                     <div className="flex gap-2">
//                       <input
//                         value={promoInput}
//                         onChange={(e) => setPromoInput(e.target.value)}
//                         placeholder="Enter promo code"
//                         className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => void applyPromo()}
//                         disabled={promoLoading || !promoInput.trim()}
//                         className="h-9 px-4 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                       >
//                         {promoLoading ? "Applying..." : "Apply"}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2">
//                       <div className="flex items-center gap-2">
//                         <RiCheckLine className="text-green-600 text-sm" />
//                         <span className="text-sm font-medium text-green-700">{appliedPromo.code}</span>
//                         <span className="text-xs text-green-600">({appliedPromo.percentage}% off)</span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={clearPromo}
//                         className="text-xs text-red-500 hover:text-red-700 transition-colors"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </section>
//               )}

//               {/* Summary — always visible */}
//               <section className="rounded-xl border border-gray-200 bg-white p-4 space-y-2.5">
//                 <SummaryRow label="Items" value={cart.totalQuantity} />
//                 <SummaryRow label="Subtotal" value={formatPrice(subTotal)} />
//                 <SummaryRow label="Discount" value={`- ${formatPrice(discountAmount)}`} />
//                 {isSignedIn && (
//                   <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
//                     <span className="flex items-center gap-1">
//                       <RiStarLine className="text-yellow-400" />
//                       Points balance
//                     </span>
//                     <span className="font-medium text-gray-600">{points}</span>
//                   </div>
//                 )}
//                 <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-base font-semibold text-gray-900">
//                   <span>Total</span>
//                   <span>{formatPrice(totalAmount)}</span>
//                 </div>
//               </section>

//               {/* Login prompt — only if not signed in */}
//               {!isSignedIn && (
//                 <div className="rounded-xl border border-dashed border-gray-200 bg-white p-5 text-center space-y-2">
//                   <RiLockLine className="text-2xl text-gray-300 mx-auto" />
//                   <p className="text-sm font-medium text-gray-600">Sign in to checkout</p>
//                   <p className="text-xs text-gray-400">
//                     Login to apply promo codes, add address and place your order.
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Footer Buttons — only if signed in */}
//             {isSignedIn && (
//               <div className="shrink-0 space-y-2 border-t border-gray-100 bg-white px-5 py-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setOpen(false);
//                     void startStripeCheckout({
//                       isSignedIn,
//                       name: user?.username || "Customer",
//                       email: user?.email || "",
//                       onSuccess: () => router.push("/order-success"),
//                     });
//                   }}
//                   disabled={
//                     loading ||
//                     !cart.items.length ||
//                     !selectedAddressId ||
//                     checkoutLoading ||
//                     pointsCheckoutLoading
//                   }
//                   className="w-full h-11 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   {checkoutLoading ? "Processing..." : "Pay with Stripe"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     void startPointsCheckout({
//                       isSignedIn,
//                       onSuccess: () => router.push("/order-success"),
//                     });
//                   }}
//                   disabled={
//                     !(
//                       isSignedIn &&
//                       Boolean(selectedAddressId) &&
//                       Boolean(cart.items.length) &&
//                       points >= totalAmount &&
//                       !checkoutLoading &&
//                       !pointsCheckoutLoading
//                     )
//                   }
//                   className="w-full h-11 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//                 >
//                   <RiStarLine className="text-yellow-400 text-base" />
//                   {pointsCheckoutLoading ? "Processing..." : "Pay with Points"}
//                 </button>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CustomerCartAndCheckoutDrawer;







"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  RiMapPinLine,
  RiCoupon3Line,
  RiCloseLine,
  RiCheckLine,
  RiStarLine,
  RiLockLine,
} from "react-icons/ri";
import { useAuthStore } from "@/components/user/store/api";
import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
import CustomerCartItems from "./CustomerCartItems";
import { formatPrice } from "@/config/constants";

function SummaryRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

function CustomerCartAndCheckoutDrawer() {
  const router = useRouter();

  const { user, isBootstrapped } = useAuthStore();
  const isSignedIn = !!user;

  const {
    isOpen,
    setOpen,
    loadCart,
    selectedAddressId,
    addresses,
    promoInput,
    appliedPromo,
    points,
    promoLoading,
    checkoutLoading,
    pointsCheckoutLoading,
    setPromoInput,
    clearPromo,
    applyPromo,
    startStripeCheckout,
    startPointsCheckout,
    loading,
    cart,
  } = useCustomerCartAndCheckoutStore((state) => state);

  useEffect(() => {
    if (!isOpen || !isBootstrapped) return;
    void loadCart(isSignedIn);
  }, [isBootstrapped, isOpen, isSignedIn, loadCart]);

  const selectedAddress =
    addresses.find((item) => item._id === selectedAddressId) || null;

  const subTotal = cart.items.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );
  const discountAmount = appliedPromo
    ? Math.round((subTotal * appliedPromo.percentage) / 100)
    : 0;
  const totalAmount = Math.max(subTotal - discountAmount, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      {/* <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setOpen(false)}
      /> */}


      {/* <div
  className={`fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm transition-opacity duration-300
  ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
  onClick={() => setOpen(false)}
/> */}


      {/* Drawer */}
      {/* <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-5xl shadow-2xl transition-transform duration-300"> */}
      <div
  className={`fixed inset-y-0 right-0  z-[999] flex w-full max-w-5xl shadow-2xl transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
>
        <div className="grid h-full w-full lg:grid-cols-[1.7fr_1fr] bg-white overflow-hidden">

          {/* ── Left: Cart Items ── */}
          <div className="min-h-0 border-r border-gray-100 overflow-hidden">
            <CustomerCartItems />
          </div>

          {/* ── Right: Checkout Panel ── */}
          <div className="flex min-h-0 flex-col bg-gray-50 overflow-hidden">

            {/* Panel Header */}
            <div className="flex items-center justify-between shrink-0 border-b border-gray-100 bg-white px-5 py-4">
              <div className="flex items-center gap-2">
                <RiLockLine className="text-gray-500 text-base" />
                <h2 className="text-sm font-semibold text-gray-900">Checkout</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <RiCloseLine className="text-lg" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

              {/* Address — only signed in */}
              {isSignedIn && (
                <section className="space-y-2">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    <RiMapPinLine className="text-sm" />
                    Delivery Address
                  </p>
                  {selectedAddress ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-0.5">
                      <p className="text-sm font-medium text-gray-900">{selectedAddress.fullName}</p>
                      <p className="text-xs text-gray-400">
                        {selectedAddress.address}, {selectedAddress.state}
                      </p>
                      <p className="text-xs text-gray-400">{selectedAddress.postalCode}</p>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-white p-4 text-center">
                      <p className="text-xs text-gray-400">
                        No default address. Add one from your profile.
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* Promo — always visible */}
              <section className="space-y-2">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <RiCoupon3Line className="text-sm" />
                  Promo Code
                </p>
                {!appliedPromo ? (
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => void applyPromo()}
                      disabled={promoLoading || !promoInput.trim()}
                      className="h-9 px-4 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      {promoLoading ? "Applying..." : "Apply"}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <RiCheckLine className="text-green-600 text-sm" />
                      <span className="text-sm font-medium text-green-700">{appliedPromo.code}</span>
                      <span className="text-xs text-green-600">({appliedPromo.percentage}% off)</span>
                    </div>
                    <button
                      type="button"
                      onClick={clearPromo}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </section>

              {/* Summary — always visible */}
              <section className="rounded-xl border border-gray-200 bg-white p-4 space-y-2.5">
                <SummaryRow label="Items" value={cart.totalQuantity} />
                <SummaryRow label="Subtotal" value={formatPrice(subTotal)} />
                <SummaryRow label="Discount" value={`- ${formatPrice(discountAmount)}`} />
                {isSignedIn && (
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                    <span className="flex items-center gap-1">
                      <RiStarLine className="text-yellow-400" />
                      Points balance
                    </span>
                    <span className="font-medium text-gray-600">{points}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </section>

              {/* Login prompt — only if not signed in */}
              {!isSignedIn && (
                <div className="rounded-xl border border-dashed border-gray-200 bg-white p-5 text-center space-y-2">
                  <RiLockLine className="text-2xl text-gray-300 mx-auto" />
                  <p className="text-sm font-medium text-gray-600">Sign in to checkout</p>
                  <p className="text-xs text-gray-400">
                    {/* Login to add address and place your order. */}
                      Login to  place your order.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Buttons — only signed in */}
            {isSignedIn && (
              <div className="shrink-0 space-y-2 border-t border-gray-100 bg-white px-5 py-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    void startStripeCheckout({
                      isSignedIn,
                      name: user?.username || "Customer",
                      email: user?.email || "",
                      onSuccess: () => router.push("/order-success"),
                    });
                  }}
                  disabled={
                    loading ||
                    !cart.items.length ||
                    !selectedAddressId ||
                    checkoutLoading ||
                    pointsCheckoutLoading
                  }
                  className="w-full h-11 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {checkoutLoading ? "Processing..." : "Pay with Stripe"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    void startPointsCheckout({
                      isSignedIn,
                      onSuccess: () => router.push("/order-success"),
                    });
                  }}
                  disabled={
                    !(
                      isSignedIn &&
                      Boolean(selectedAddressId) &&
                      Boolean(cart.items.length) &&
                      points >= totalAmount &&
                      !checkoutLoading &&
                      !pointsCheckoutLoading
                    )
                  }
                  className="w-full h-11 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <RiStarLine className="text-yellow-400 text-base" />
                  {pointsCheckoutLoading ? "Processing..." : "Pay with Points"}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerCartAndCheckoutDrawer;