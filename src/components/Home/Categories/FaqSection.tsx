"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

// ─── Types ────────────────────────────────────────────────────────────────────

type FaqItem = {
  cat: string;
  q: string;
  a: string;
};

type Category = {
  label: string;
  value: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

// const CATEGORIES: Category[] = [
//   { label: "All",      value: "all"      },
//   { label: "Orders",   value: "orders"   },
//   { label: "Shipping", value: "shipping" },
//   { label: "Returns",  value: "returns"  },
//   { label: "Payment",  value: "payment"  },
//   { label: "Account",  value: "account"  },
// ];




const CATEGORIES: Category[] = [
  { label: "All", value: "all" },
  { label: "Orders", value: "orders" },
  { label: "Shipping", value: "shipping" },
 
  { label: "Payment", value: "payment" },
];

// const FAQS: FaqItem[] = [
//   {
//     cat: "orders",
//     q: "How do I track my order?",
//     a: "Once your order is shipped, you will receive an email with a tracking link. You can also view order status from the My Orders section in your profile.",
//   },
//   {
//     cat: "orders",
//     q: "Can I cancel or modify my order?",
//     a: "Orders can be cancelled within 1 hour of placement if payment is still pending. Once shipped, cancellations are not possible — but you may return the item after delivery.",
//   },
//   {
//     cat: "orders",
//     q: "What happens if my item is out of stock after I order?",
//     a: "In rare cases where stock changes after checkout, we will notify you via email and issue a full refund to your original payment method within 3–5 business days.",
//   },
//   {
//     cat: "shipping",
//     q: "How long does delivery take?",
//     a: "Standard delivery takes 3–6 business days depending on your location. We offer express delivery (1–2 days) in select cities at an additional charge.",
//   },
//   {
//     cat: "shipping",
//     q: "Is there free shipping?",
//     a: "Yes! We offer free standard shipping on all orders above ₹999. Orders below this amount have a flat shipping fee of ₹79.",
//   },
//   {
//     cat: "shipping",
//     q: "Do you ship internationally?",
//     a: "Currently we ship only within India. We are working on international shipping and will announce it soon — sign up for our newsletter to stay updated.",
//   },
//   {
//     cat: "returns",
//     q: "What is your return policy?",
//     a: "We offer a 7-day return window from the date of delivery for all delivered orders. Items must be unused, unwashed, and in original packaging with tags intact.",
//   },
//   {
//     cat: "returns",
//     q: "How do I initiate a return?",
//     a: "Go to My Orders in your profile, select the delivered order, and click Return. Our team will arrange a pickup within 2 business days. Refunds are processed in 5–7 working days.",
//   },
//   {
//     cat: "returns",
//     q: "Are there items that cannot be returned?",
//     a: "Innerwear, swimwear, and items marked as Final Sale are non-returnable for hygiene and safety reasons. This is clearly indicated on the product page.",
//   },
//   {
//     cat: "payment",
//     q: "What payment methods do you accept?",
//     a: "We accept all major credit and debit cards, UPI, net banking, and popular wallets. All payments are securely processed via Stripe.",
//   },
//   {
//     cat: "payment",
//     q: "Is my payment information safe?",
//     a: "Yes. We never store your card details. All transactions are encrypted and handled by Stripe, which is PCI-DSS Level 1 certified — the highest level of payment security.",
//   },
//   {
//     cat: "payment",
//     q: "Can I use a promo code?",
//     a: "Absolutely! Enter your promo code in the cart before checkout. Codes are case-insensitive and can only be applied once per order. Some codes may have a minimum order value.",
//   },
//   {
//     cat: "account",
//     q: "Do I need an account to shop?",
//     a: "You can browse and add items to cart as a guest. However, an account is required to checkout, track orders, save addresses, and earn reward points.",
//   },
//   {
//     cat: "account",
//     q: "How do reward points work?",
//     a: "You earn points equal to the order value (in ₹) when you return an item. Points can be used to offset future purchases — 1 point = ₹1 discount.",
//   },
//   {
//     cat: "account",
//     q: "How do I reset my password?",
//     a: "Click Forgot Password on the login page and enter your registered email. You will receive a reset link valid for 30 minutes.",
//   },
// ];











// ─── Single FAQ Item ──────────────────────────────────────────────────────────

const FAQS: FaqItem[] = [
  {
    cat: "orders",
    q: "How do I track my order?",
    a: "Once your order is shipped, you will receive an email with a tracking link. You can also view order status from the My Orders section in your profile.",
  },

  {
    cat: "orders",
    q: "What happens if my item is out of stock after I order?",
    a: "In rare cases where stock changes after checkout, we will notify you via email and issue a full refund to your original payment method within 3–5 business days.",
  },

  {
    cat: "shipping",
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–6 business days depending on your location. We offer express delivery (1–2 days) in select cities at an additional charge.",
  },

  {
    cat: "shipping",
    q: "Is there free shipping?",
    a: "Yes! We offer free standard shipping on all orders above ₹999. Orders below this amount have a flat shipping fee of ₹79.",
  },

  {
    cat: "shipping",
    q: "Do you ship internationally?",
    a: "Currently we ship only within India. We are working on international shipping and will announce it soon.",
  },

 

  {
    cat: "payment",
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards, UPI, net banking, and popular wallets. All payments are securely processed through trusted payment providers.",
  },

  {
    cat: "payment",
    q: "Is my payment information safe?",
    a: "Yes. We never store your card details. All transactions are encrypted and processed through secure PCI-compliant payment gateways.",
  },
];




function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="overflow-hidden rounded-xl transition-all duration-200"
      style={{
        border: open
          ? "1.5px solid hsl(174,62%,72%)"
          : "1.5px solid hsl(40,20%,88%)",
        boxShadow: open
          ? "0 4px 16px hsla(174,62%,38%,0.08)"
          : "none",
      }}
    >
      {/* Question button */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left transition-colors duration-150"
        style={{ background: "#fff" }}
      >
        <span
          className="text-[15px] font-medium leading-snug"
          style={{ color: "hsl(220,20%,15%)" }}
        >
          {item.q}
        </span>

        {/* Plus / minus icon */}
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: open ? "hsl(174,62%,38%)" : "hsl(40,20%,92%)",
          }}
        >
          {open ? (
            <FiMinus className="h-3.5 w-3.5" style={{ color: "#fff" }} />
          ) : (
            <FiPlus className="h-3.5 w-3.5" style={{ color: "hsl(220,10%,45%)" }} />
          )}
        </span>
      </button>

      {/* Answer */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "400px" : "0px" }}
      >
        <div
          className="px-5 pb-5 pt-0 text-sm leading-7"
          style={{
            color: "hsl(220,10%,45%)",
            borderTop: "1px solid hsl(40,20%,90%)",
            paddingTop: "14px",
            background: "#fff",
          }}
        >
          {item.a}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FaqSection() {
  const [activeCat, setActiveCat] = useState("all");

  const visible =
    activeCat === "all" ? FAQS : FAQS.filter((f) => f.cat === activeCat);

  return (
    <section
      className="px-4 py-16 sm:px-6 lg:px-8 "
      style={{ background: "hsl(40,33%,98%)" }}
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: "hsl(174,62%,38%)" }}
          >
            Help Center
          </p>
          <h2
            className="text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-tight"
            style={{ color: "hsl(220,20%,15%)", letterSpacing: "-0.02em" }}
          >
            Frequently asked{" "}
            <em className="font-light italic" style={{ color: "hsl(174,62%,38%)" }}>
              questions
            </em>
          </h2>
          <p
            className="mt-3 text-[15px] leading-relaxed"
            style={{ color: "hsl(220,10%,45%)" }}
          >
            Everything you need to know about shopping with Velvet.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCat(cat.value)}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-150"
              style={{
                background:
                  activeCat === cat.value ? "hsl(174,62%,38%)" : "#fff",
                border:
                  activeCat === cat.value
                    ? "1.5px solid hsl(174,62%,38%)"
                    : "1.5px solid hsl(40,20%,82%)",
                color:
                  activeCat === cat.value ? "#fff" : "hsl(220,10%,45%)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-2.5">
          {visible.map((item, i) => (
            <FaqRow key={`${activeCat}-${i}`} item={item} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl px-7 py-6"
          style={{
            background: "linear-gradient(135deg, hsl(174,62%,38%), hsl(190,60%,45%))",
          }}
        >
          <div>
            <h3
              className="text-[18px] font-medium"
              style={{ color: "#fff" }}
            >
              Still have questions?
            </h3>
            <p
              className="mt-1 text-[13px]"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Our support team is available Mon–Sat, 9am to 6pm.
            </p>
          </div>
          <a
            href="mailto:support@velvet.com"
            className="inline-flex items-center rounded-full px-6 py-2.5 text-[13px] font-semibold transition-opacity duration-150 hover:opacity-90"
            style={{
              background: "#fff",
              color: "hsl(174,62%,35%)",
              textDecoration: "none",
            }}
          >
            Contact support
          </a>
        </div>

      </div>
    </section>
  );
}