"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  RiSearchLine,
  RiShoppingCartLine,
  RiHeartLine,
  RiUserLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiArrowRightLine,
  RiStarLine,
  RiFileListLine,
} from "react-icons/ri";

import { useAuthStore } from "../user/store/api";
import { useCustomerWishlistStore } from "@/store/home/wishlist/store";
import { useCustomerProfileStore } from "@/store/home/profile/store";
import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
import { useCustomerOrdersStore } from "@/store/home/orders/store";
import CustomerCartAndCheckoutDrawer from "./customerCart/CustomerCartAndCheckoutDrawer";
import CustomerWishlistDialog from "./wishlist/CustomerWishList";
import CustomerProfileDialog from "./profile/CustomerProfileDialog";
import CustomerOrdersDialog from "./orders/CustomerOrdersDiaolog";

type NavItem = {
  label: string;
  href: string;
  isSale?: boolean;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Men", href: "/shop?gender=men",
    children: [
      { label: "T-Shirts", href: "/shop?gender=men&category=tshirts" },
      { label: "Shirts", href: "/shop?gender=men&category=shirts" },
      { label: "Jeans", href: "/shop?gender=men&category=jeans" },
      { label: "Jackets", href: "/shop?gender=men&category=jackets" },
      { label: "Footwear", href: "/shop?gender=men&category=footwear" },
      { label: "Accessories", href: "/shop?gender=men&category=accessories" },
    ],
  },
  {
    label: "Women", href: "/shop?gender=women",
    children: [
      { label: "Tops", href: "/shop?gender=women&category=tops" },
      { label: "Dresses", href: "/shop?gender=women&category=dresses" },
      { label: "Kurtas", href: "/shop?gender=women&category=kurtas" },
      { label: "Jeans", href: "/shop?gender=women&category=jeans" },
      { label: "Footwear", href: "/shop?gender=women&category=footwear" },
      { label: "Handbags", href: "/shop?gender=women&category=handbags" },
    ],
  },
  {
    label: "Kids", href: "/shop?gender=kids",
    children: [
      { label: "Boys", href: "/shop?gender=kids&category=boys" },
      { label: "Girls", href: "/shop?gender=kids&category=girls" },
      { label: "Infants", href: "/shop?gender=kids&category=infants" },
    ],
  },
  { label: "Sale", href: "/shop?onSale=true", isSale: true },
];

 function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const { user, logout } = useAuthStore();
  const isSignedIn = Boolean(user);

  const { items: wishlistItems, loadWishlist, clear: clearWishlist, setOpen: setWishlistOpen } =
    useCustomerWishlistStore((state) => state);
  const { openProfile, clear: clearProfile } = useCustomerProfileStore((state) => state);
  const { setOpen, cart, loadCart } = useCustomerCartAndCheckoutStore((state) => state);
  const { openOrders } = useCustomerOrdersStore((state) => state);

  useEffect(() => {
    void loadCart(isSignedIn);
    if (!isSignedIn) {
      clearWishlist();
      clearProfile();
      return;
    }
    void loadWishlist();
  }, [isSignedIn]);

  return (
    <>
      <style>{`
        :root {
          --purple: #6936F5;
          --dark: #36344D;
          --grey: #727586;
          --red: #AE202C;
          --gold: #F7B551;
        }

        .header-nav-link {
          position: relative;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--dark);
          padding: 0.25rem 0;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .header-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--purple);
          transition: width 0.25s ease;
        }
        .header-nav-link:hover { color: var(--purple); }
        .header-nav-link:hover::after { width: 100%; }
        .header-nav-link.sale { color: var(--red); }
        .header-nav-link.sale::after { background: var(--red); }

        .dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border: 1px solid #eee;
          border-top: 3px solid var(--purple);
          box-shadow: 0 20px 60px rgba(105,54,245,0.12);
          border-radius: 0 0 12px 12px;
          padding: 1.25rem;
          min-width: 200px;
          display: grid;
          gap: 0.125rem;
          z-index: 100;
          animation: dropDown 0.18s ease;
        }
        @keyframes dropDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .dropdown a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8125rem;
          color: var(--dark);
          font-weight: 500;
          transition: all 0.15s;
        }
        .dropdown a:hover {
          background: #f3eefe;
          color: var(--purple);
          padding-left: 1rem;
        }

        .icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          color: var(--dark);
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          background: none;
          flex-shrink: 0;
        }
        .icon-btn:hover { background: #f3eefe; color: var(--purple); }

        .cart-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          background: var(--red);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
        }

        /* Desktop nav — hidden on small */
        .desktop-nav {
          display: none;
        }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex; align-items: center; gap: 1.75rem; flex: 1; justify-content: center; }
          .mobile-toggle { display: none !important; }
        }

        /* Search overlay */
        .search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(54,52,77,0.7);
          backdrop-filter: blur(4px);
          z-index: 200;
          display: flex;
          align-items: flex-start;
          padding-top: 5rem;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .search-box {
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
          background: #fff;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 40px 80px rgba(0,0,0,0.2);
        }
        .search-input {
          width: 100%;
          border: none;
          border-bottom: 2px solid var(--purple);
          padding: 0.75rem 0.5rem;
          font-size: 1.25rem;
          color: var(--dark);
          outline: none;
          font-weight: 500;
        }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 300;
          background: #fff;
          overflow-y: auto;
          animation: slideIn 0.25s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }

        .promo-bar {
          background: linear-gradient(90deg, var(--purple), #8b5cf6);
          color: #fff;
          text-align: center;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.5rem;
          letter-spacing: 0.08em;
        }
      `}</style>

      {/* Promo Bar */}
      <div className="promo-bar">
        🎉 USE CODE <span style={{ color: "var(--gold)", margin: "0 4px" }}>STYLE20</span>
        FOR 20% OFF YOUR FIRST ORDER &nbsp;·&nbsp; FREE SHIPPING ABOVE ₹999
      </div>

      {/* Main Header */}
      <header style={{
        background: "#fff",
        borderBottom: "1px solid #efefef",
        position: "sticky",
        top: 0,
        zIndex: 90,
        boxShadow: "0 2px 20px rgba(105,54,245,0.06)"
      }}>
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          height: "4.5rem",
        }}>

          {/* Mobile Toggle — only on small screens */}
          <button
            className="icon-btn mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <RiMenuLine size={20} />
          </button>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: "var(--purple)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <RiStarLine color="#fff" size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "var(--dark)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  VELVET
                </div>
                <div style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: "var(--grey)", fontWeight: 600 }}>
                  FASHION STORE
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`header-nav-link ${item.isSale ? "sale" : ""}`}
                  style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
                >
                  {item.label}
                  {item.children && <RiArrowDownSLine size={13} style={{ opacity: 0.5 }} />}
                </Link>

                {item.children && activeDropdown === item.label && (
                  <div className="dropdown">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href}>
                        <RiArrowRightLine size={11} style={{ opacity: 0.4 }} />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.15rem", marginLeft: "auto", flexShrink: 0 }}>

            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <RiSearchLine size={19} />
            </button>

            {isSignedIn ? (
              <>
                <button className="icon-btn" onClick={openProfile} aria-label="Profile">
                  <RiUserLine size={19} />
                </button>
                <button className="icon-btn" onClick={openOrders} aria-label="Orders">
                  <RiFileListLine size={19} />
                </button>
                <button className="icon-btn" onClick={() => setWishlistOpen(true)} aria-label="Wishlist">
                  <RiHeartLine size={19} />
                  {wishlistItems.length > 0 && (
                    <span className="cart-badge">{wishlistItems.length}</span>
                  )}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--purple)",
                  padding: "0.3rem 0.75rem",
                  border: "1.5px solid var(--purple)",
                  borderRadius: 20,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                Sign In
              </Link>
            )}

            <button
              className="icon-btn"
              style={{ marginLeft: "0.15rem" }}
              onClick={() => setOpen(true)}
              aria-label="Cart"
            >
              <RiShoppingCartLine size={19} />
              {(cart?.items?.length || 0) > 0 && (
                <span className="cart-badge">{cart?.items?.length || 0}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--grey)", textTransform: "uppercase" }}>
                Search Products
              </span>
              <button onClick={() => setSearchOpen(false)} style={{ color: "var(--grey)" }}>
                <RiCloseLine size={20} />
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <RiSearchLine size={20} style={{ color: "var(--purple)", flexShrink: 0 }} />
              <input autoFocus className="search-input" placeholder="Search for clothes, brands..." />
            </div>
            <div style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Kurtas", "Jeans", "Dresses", "Sneakers", "Jackets"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.35rem 0.85rem",
                    border: "1px solid #e5e5f0",
                    borderRadius: 999,
                    fontSize: "0.78rem",
                    color: "var(--dark)",
                    cursor: "pointer",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {/* Header */}
          <div style={{
            padding: "1rem 1.25rem",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "var(--dark)" }}>VELVET</span>
            <button onClick={() => setMobileOpen(false)}>
              <RiCloseLine size={24} style={{ color: "var(--dark)" }} />
            </button>
          </div>

          {/* Nav links */}
          <nav style={{ padding: "0.5rem 1rem" }}>
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 0.5rem",
                    borderBottom: "1px solid #f5f5f5",
                    color: item.isSale ? "var(--red)" : "var(--dark)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                >
                  {item.label}
                  <RiArrowRightLine size={16} style={{ opacity: 0.4 }} />
                </Link>

                {/* Sub items */}
                {item.children && (
                  <div style={{ paddingLeft: "1rem", background: "#fafafa" }}>
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.6rem 0.5rem",
                          borderBottom: "1px solid #f0f0f0",
                          color: "var(--grey)",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                        }}
                      >
                        <RiArrowRightLine size={12} style={{ opacity: 0.4 }} />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Auth actions */}
          <div style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}>
            {isSignedIn ? (
              <>
                <button
                  onClick={() => { openProfile(); setMobileOpen(false); }}
                  style={{ textAlign: "left", fontWeight: 600, color: "var(--dark)", fontSize: "0.9rem" }}
                >
                  My Account
                </button>
                <button
                  onClick={() => { openOrders(); setMobileOpen(false); }}
                  style={{ textAlign: "left", fontWeight: 600, color: "var(--dark)", fontSize: "0.9rem" }}
                >
                  My Orders
                </button>
                <button
                  onClick={() => { setWishlistOpen(true); setMobileOpen(false); }}
                  style={{ textAlign: "left", fontWeight: 600, color: "var(--dark)", fontSize: "0.9rem" }}
                >
                  Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
                </button>
                <button
                  onClick={() => void logout()}
                  style={{ textAlign: "left", fontWeight: 600, color: "var(--red)", fontSize: "0.9rem" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                style={{ fontWeight: 700, color: "var(--purple)", fontSize: "0.95rem" }}
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => { setOpen(true); setMobileOpen(false); }}
              style={{ textAlign: "left", fontWeight: 600, color: "var(--dark)", fontSize: "0.9rem" }}
            >
              Cart {(cart?.items?.length || 0) > 0 && `(${cart.items.length})`}
            </button>
          </div>
        </div>
      )}

      {/* Dialogs */}
      {isSignedIn && <CustomerWishlistDialog />}
      {isSignedIn && <CustomerProfileDialog />}
      {isSignedIn && <CustomerOrdersDialog />}
      <CustomerCartAndCheckoutDrawer />
    </>
  );
}


export  default Header