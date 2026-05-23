"use client";

import { useEffect } from "react";
import {
  RiMapPinLine, RiCoupon3Line, RiCloseLine,
  RiCheckLine, RiLockLine,
} from "react-icons/ri";
import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
import CustomerCartItems from "./CustomerCartItems";
import { formatPrice } from "@/config/constants";

function SummaryRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[hsl(220,10%,45%)]">{label}</span>
      <span className="font-medium text-[hsl(220,20%,15%)]">{value}</span>
    </div>
  );
}

function CustomerCartAndCheckoutDrawer() {
  const {
    isOpen, setOpen, loadCart,
    selectedAddressId, addresses,
    promoInput, appliedPromo,
    promoLoading, checkoutLoading,
    setPromoInput, clearPromo, applyPromo,
    startStripeCheckout, loading, cart,
  } = useCustomerCartAndCheckoutStore((state) => state);

  useEffect(() => {
    if (!isOpen) return;
    void loadCart();
  }, [isOpen]);

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId) || null;

  const subTotal = cart.items.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subTotal * appliedPromo.percentage) / 100) : 0;
  const totalAmount = subTotal - discountAmount;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[998] bg-[hsl(220,20%,15%)]/60 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[999] flex w-full max-w-5xl shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="grid h-full w-full lg:grid-cols-[1.7fr_1fr] bg-white overflow-hidden">

          {/* Left: Cart Items */}
          <div className="min-h-0 border-r border-[hsl(40,20%,88%)] overflow-hidden">
            <CustomerCartItems />
          </div>

          {/* Right: Checkout */}
          <div className="flex min-h-0 flex-col bg-[hsl(40,33%,98%)] overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between shrink-0 border-b border-[hsl(40,20%,88%)] bg-white px-5 py-4">
              <div className="flex items-center gap-2">
                <RiLockLine className="text-[hsl(174,62%,38%)] text-base" />
                <h2 className="text-sm font-semibold text-[hsl(220,20%,15%)]">Checkout</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[hsl(40,20%,92%)] text-[hsl(220,10%,45%)] transition-colors"
              >
                <RiCloseLine className="text-lg" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

              {/* Address */}
              <section className="space-y-2">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[hsl(220,10%,45%)]">
                  <RiMapPinLine className="text-sm text-[hsl(174,62%,38%)]" />
                  Delivery Address
                </p>
                {selectedAddress ? (
                  <div className="rounded-xl border border-[hsl(40,20%,88%)] bg-white p-3 space-y-0.5">
                    <p className="text-sm font-medium text-[hsl(220,20%,15%)]">{selectedAddress.fullName}</p>
                    <p className="text-xs text-[hsl(220,10%,45%)]">
                      {selectedAddress.address}, {selectedAddress.state}
                    </p>
                    <p className="text-xs text-[hsl(220,10%,45%)]">{selectedAddress.postalCode}</p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-[hsl(40,20%,88%)] bg-white p-4 text-center">
                    <p className="text-xs text-[hsl(220,10%,45%)]">
                      No default address. Add one from your profile.
                    </p>
                  </div>
                )}
              </section>

              {/* Promo */}
              <section className="space-y-2">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[hsl(220,10%,45%)]">
                  <RiCoupon3Line className="text-sm text-[hsl(174,62%,38%)]" />
                  Promo Code
                </p>
                {!appliedPromo ? (
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 rounded-lg border border-[hsl(40,20%,88%)] bg-white px-3 py-2 text-sm outline-none focus:border-[hsl(174,62%,38%)] transition-colors text-[hsl(220,20%,15%)] placeholder:text-[hsl(220,10%,45%)]"
                    />
                    <button
                      type="button"
                      onClick={() => void applyPromo()}
                      disabled={promoLoading || !promoInput.trim()}
                      className="h-9 px-4 text-xs font-medium bg-[hsl(174,62%,38%)] text-white rounded-lg hover:bg-[hsl(174,62%,32%)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      {promoLoading ? "Applying..." : "Apply"}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-lg border border-[hsl(152,60%,45%)]/30 bg-[hsl(152,60%,45%)]/10 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <RiCheckLine className="text-[hsl(152,60%,45%)] text-sm" />
                      <span className="text-sm font-medium text-[hsl(152,60%,35%)]">{appliedPromo.code}</span>
                      <span className="text-xs text-[hsl(152,60%,40%)]">({appliedPromo.percentage}% off)</span>
                    </div>
                    <button
                      type="button"
                      onClick={clearPromo}
                      className="text-xs text-[hsl(0,84%,60%)] hover:text-[hsl(0,84%,50%)] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </section>

              {/* Summary */}
              <section className="rounded-xl border border-[hsl(40,20%,88%)] bg-white p-4 space-y-2.5">
                <SummaryRow label="Items" value={cart.totalQuantity} />
                <SummaryRow label="Subtotal" value={formatPrice(subTotal)} />
                <SummaryRow label="Discount" value={`- ${formatPrice(discountAmount)}`} />
                <div className="flex items-center justify-between border-t border-[hsl(40,20%,88%)] pt-3 text-base font-semibold text-[hsl(220,20%,15%)]">
                  <span>Total</span>
                  <span className="text-[hsl(174,62%,38%)]">{formatPrice(totalAmount)}</span>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="shrink-0 space-y-2 border-t border-[hsl(40,20%,88%)] bg-white px-5 py-4">
              <button
                type="button"
                onClick={() => { setOpen(false); void startStripeCheckout(); }}
                disabled={loading || !cart.items.length || !selectedAddressId || checkoutLoading}
                className="w-full h-11 rounded-xl bg-[hsl(174,62%,38%)] text-white text-sm font-medium hover:bg-[hsl(174,62%,32%)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {checkoutLoading ? "Processing..." : "Pay with Stripe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerCartAndCheckoutDrawer;