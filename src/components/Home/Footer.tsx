
"use client";

import Link from "next/link";
import { useState } from "react";

import {
  RiSearchLine,
  RiShoppingCartLine,
  RiHeartLine,
  RiUserLine,
  RiMenuLine,
  RiCloseLine,
  RiPhoneLine,
  RiMailLine,
  RiMapPinLine,
  RiTruckLine,
  RiShieldCheckLine,
  RiRefundLine,
  RiArrowDownSLine,
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTwitterXLine,
  RiYoutubeLine,
  RiPinterestLine,
  RiArrowRightLine,
  RiGiftLine,
  RiStarLine,
} from "react-icons/ri";



const TRUST_BADGES = [
  { icon: RiTruckLine, label: "Free Delivery", sub: "On orders above ₹999" },
  { icon: RiRefundLine, label: "Easy Returns", sub: "7-day return policy" },
  { icon: RiShieldCheckLine, label: "Secure Payment", sub: "100% safe checkout" },
  { icon: RiGiftLine, label: "Gift Wrapping", sub: "Available on all orders" },
];


const FOOTER_LINKS = {
  "Quick Links": [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Store Locator", href: "/stores" },
    { label: "Careers", href: "/careers" },
    { label: "Press & Media", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  "Customer Service": [
    { label: "My Account", href: "/account" },
    { label: "Track My Order", href: "/track" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "FAQs", href: "/faq" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  "Policies": [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

// ─── FOOTER ──────────────────────────────────────────
export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <>
      <style>{`
        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: #a0a0b8;
          transition: color 0.2s;
          padding: 0.2rem 0;
        }
        .footer-link:hover { color: var(--gold); }

        .social-btn {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a0a0b8;
          transition: all 0.2s;
        }

        .social-btn:hover {
          background: var(--purple);
          border-color: var(--purple);
          color: #fff;
          transform: translateY(-2px);
        }

        .newsletter-input {
          flex: 1;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px 0 0 8px;
          padding: 0.7rem 1rem;
          color: #fff;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .newsletter-input::placeholder { color: rgba(255,255,255,0.35); }
        .newsletter-input:focus { border-color: var(--purple); }

        .newsletter-btn {
          background: var(--purple);
          color: #fff;
          border: none;
          border-radius: 0 8px 8px 0;
          padding: 0.7rem 1.25rem;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          letter-spacing: 0.05em;
        }

        .newsletter-btn:hover { background: #5520e0; }

        .trust-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          transition: all 0.2s;
        }

        .trust-card:hover {
          background: rgba(105,54,245,0.1);
          border-color: rgba(105,54,245,0.3);
        }

        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 2rem 0;
        }

        .payment-badge {
          padding: 0.3rem 0.7rem;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          font-size: 0.7rem;
          color: #a0a0b8;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
      `}</style>

      <footer style={{ background: "#1e1c2e", color: "#fff" }}>

        {/* Trust Badges */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "2rem 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="trust-card">
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(105,54,245,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <badge.icon size={22} style={{ color: "var(--purple)" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#fff" }}>{badge.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "#a0a0b8", marginTop: 2 }}>{badge.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "3rem" }}>

            {/* Brand Column */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--purple)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <RiStarLine color="#fff" size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: "1.2rem", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>VELVET</div>
                  <div style={{ fontSize: "0.55rem", letterSpacing: "0.25em", color: "#a0a0b8", fontWeight: 600 }}>FASHION STORE</div>
                </div>
              </div>

              <p style={{ fontSize: "0.82rem", color: "#a0a0b8", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: 260 }}>
                Redefining everyday fashion with premium quality clothing for men, women, and kids. Style that speaks for itself.
              </p>

              {/* Social */}
              <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.75rem" }}>
                {[RiInstagramLine, RiFacebookCircleLine, RiTwitterXLine, RiYoutubeLine, RiPinterestLine].map((Icon, i) => (
                  <button key={i} className="social-btn">
                    <Icon size={16} />
                  </button>
                ))}
              </div>

              {/* Newsletter */}
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Subscribe to Newsletter
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    className="newsletter-input"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="newsletter-btn">JOIN</button>
                </div>
                <p style={{ fontSize: "0.7rem", color: "#a0a0b8", marginTop: "0.5rem" }}>
                  Get exclusive offers, style tips & new arrivals.
                </p>
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.12em", color: "#fff", textTransform: "uppercase", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: 16, height: 2, background: "var(--purple)", borderRadius: 2 }} />
                  {heading}
                </div>
                <div style={{ display: "grid", gap: "0.1rem" }}>
                  {links.map((link) => (
                    <Link key={link.label} href={link.href} className="footer-link">
                      <RiArrowRightLine size={11} style={{ opacity: 0.4, flexShrink: 0 }} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="footer-divider" />

          {/* Contact Row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.5rem" }}>
            {[
              { icon: RiMapPinLine, text: "123 Fashion Street, Mumbai, MH 400001" },
              { icon: RiPhoneLine, text: "+91 98765 43210" },
              { icon: RiMailLine, text: "support@velvetstore.com" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#a0a0b8" }}>
                <item.icon size={15} style={{ color: "var(--purple)", flexShrink: 0 }} />
                {item.text}
              </div>
            ))}
          </div>

          <div className="footer-divider" />

          {/* Bottom Row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <p style={{ fontSize: "0.75rem", color: "#a0a0b8" }}>
              © {new Date().getFullYear()} Velvet Fashion Store. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.7rem", color: "#a0a0b8", marginRight: "0.25rem" }}>We Accept:</span>
              {["Visa", "Mastercard", "UPI", "PayTM", "RazorPay", "COD"].map((method) => (
                <span key={method} className="payment-badge">{method}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1.25rem" }}>
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} style={{ fontSize: "0.75rem", color: "#a0a0b8", transition: "color 0.2s" }}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}