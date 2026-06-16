"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaHeart, FaSearch, FaShoppingBag, FaUser,
  FaClipboardList, FaTimes, FaBars,
} from "react-icons/fa";
import { useAuthStore } from "../user/store/api";
import { useCustomerWishlistStore } from "@/store/home/wishlist/store";
import { useCustomerProfileStore } from "@/store/home/profile/store";
import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
import { useCustomerOrdersStore } from "@/store/home/orders/store";
import CustomerCartAndCheckoutDrawer from "./customerCart/CustomerCartAndCheckoutDrawer";
import CustomerWishlistDialog from "./wishlist/CustomerWishList";
import CustomerProfileDialog from "./profile/CustomerProfileDialog";
import CustomerOrdersDialog from "./orders/CustomerOrdersDiaolog";

// const NAV_ITEMS = ["Home", "Shop", "Men", "Women", "Kids"];
// const NAV_ITEMS = ["Home", "Shop"];
const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
    const [mounted, setMounted] = useState(false); // ← add karo

  const { user, logout } = useAuthStore();
  const isSignedIn = Boolean(user);

  const { items: wishlistItems, loadWishlist, clear: clearWishlist, setOpen: setWishlistOpen } =
    useCustomerWishlistStore((state) => state);
  const { openProfile, clear: clearProfile } = useCustomerProfileStore((state) => state);
  const { setOpen, cart, loadCart } = useCustomerCartAndCheckoutStore((state) => state);
  const { openOrders } = useCustomerOrdersStore((state) => state);

  useEffect(() => {
  void loadCart();
  if (!isSignedIn) { clearWishlist(); clearProfile(); return; }
  void loadWishlist();
}, [isSignedIn]);


 useEffect(() => {
    setMounted(true); // ← client pe mount hone ke baad
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-[68px] items-center justify-between border-b border-[#e7e0d7] bg-[rgba(255,252,248,0.92)] px-4 md:px-8 backdrop-blur-xl">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-[10px] text-white font-bold"
            style={{ background: "linear-gradient(135deg,hsl(174,62%,38%),hsl(190,60%,45%),hsl(200,55%,50%))" }}
          >
            V
          </div>
          <div className="hidden sm:block">
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#222831]">VELVET</h2>
            <p className="text-[8px] uppercase tracking-[0.25em] text-[#6b7280]">Fashion Store</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        {/* <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href="/shop"
              className="rounded-lg px-4 py-2 text-[13px] font-medium text-[#6b7280] transition hover:bg-[#f3eee6] hover:text-[#222831]"
            >
              {item}
            </Link>
          ))}
          <Link href="/" className="rounded-lg px-4 py-2 text-[13px] font-semibold text-[#f97316]">
            Sale 🔥
          </Link>
        </nav> */}

        <nav className="hidden items-center gap-1 lg:flex">
  {NAV_ITEMS.map((item) => (
    <Link
     key={`${item.name}-${item.href}`}
      href={item.href}
      className="rounded-lg px-4 py-2 text-[13px] font-medium text-[#6b7280] transition hover:bg-[#f3eee6] hover:text-[#222831]"
    >
      {item.name}
    </Link>
  ))}

 
</nav>

        {/* Actions */}
        <div className="flex items-center gap-1">

          {/* Search */}
          {/* <button
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3eee6]"
          >
            <FaSearch size={15} />
          </button> */}

          {/* Signed in — desktop only icons */}
      

             {mounted && isSignedIn && (
            <div className="hidden md:flex items-center gap-1">
              <button onClick={openProfile} className="flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3eee6]">
                <FaUser size={15} />
              </button>
              <button onClick={openOrders} className="flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3eee6]">
                <FaClipboardList size={15} />
              </button>
              <button onClick={() => setWishlistOpen(true)} className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3eee6]">
                <FaHeart size={15} />
                {wishlistItems.length > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#f97316] text-[9px] font-bold text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
            </div>
          )}


          {/* Sign in — desktop only */}
    
           {mounted && !isSignedIn && (
            <Link
              href="/login"
              className="hidden md:block rounded-full bg-[#24998a] px-5 py-2 text-[13px] font-medium text-white transition hover:bg-[#1f8276]"
            >
              Sign In
            </Link>
          )}

          {/* Cart — always visible */}
          <button
            onClick={() => setOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3eee6]"
          >
            <FaShoppingBag size={15} />
            {(cart?.items?.length || 0) > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#f97316] text-[9px] font-bold text-white">
                {cart?.items?.length || 0}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3eee6] lg:hidden"
          >
            <FaBars size={16} />
          </button>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm px-4">
          <div className="mx-auto mt-24 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6b7280]">
                Search Products
              </h3>
              <button onClick={() => setSearchOpen(false)} className="text-[#6b7280]">
                <FaTimes />
              </button>
            </div>
            <div className="flex items-center gap-3 border-b border-[#d6d3d1] pb-3">
              <FaSearch className="text-[#24998a] shrink-0" />
              <input
                autoFocus
                placeholder="Search for products..."
                className="w-full border-none bg-transparent text-[15px] outline-none"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Jackets", "Shoes", "T-Shirts", "Dresses", "Watches"].map((tag) => (
                <button
                  key={tag}
                  className="rounded-full border border-[#e7e0d7] px-4 py-2 text-[12px] text-[#6b7280] transition hover:bg-[#f3eee6]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[120] bg-white transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top */}
        <div className="flex items-center justify-between border-b border-[#ece7df] px-5 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-[10px] text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg,hsl(174,62%,38%),hsl(190,60%,45%))" }}
            >
              V
            </div>
            <h2 className="text-xl font-semibold text-[#222831]">VELVET</h2>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-[#6b7280]">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="h-[calc(100vh-68px)] overflow-y-auto">

          {/* Nav links */}
          <div className="flex flex-col px-4 py-2">
            {/* {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href="/"
                onClick={() => setMobileOpen(false)}
                className="border-b border-[#f1ece5] py-4 text-[15px] font-medium text-[#374151]"
              >
                {item}
              </Link>
            ))} */}


                    <nav className="hidden items-center gap-1 lg:flex">
  {NAV_ITEMS.map((item) => (
    <Link
     key={`${item.name}-${item.href}`}
      href={item.href}
      className="rounded-lg px-4 py-2 text-[13px] font-medium text-[#6b7280] transition hover:bg-[#f3eee6] hover:text-[#222831]"
    >
      {item.name}
    </Link>
  ))}

 
</nav>

            {/* <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="border-b border-[#f1ece5] py-4 text-[15px] font-semibold text-[#f97316]"
            >
              Sale 🔥
            </Link> */}
          </div>

          {/* User actions */}
          <div className="flex flex-col gap-3 px-4 py-4">
            {/* {isSignedIn ? ( */}
              {mounted && isSignedIn ? (
              <>
                <button
                  onClick={() => { openProfile(); setMobileOpen(false); }}
                  className="flex items-center gap-3 rounded-xl border border-[#ece7df] px-4 py-3 text-sm font-medium text-[#374151]"
                >
                  <FaUser className="text-[#24998a]" /> My Profile
                </button>

                <button
                  onClick={() => { openOrders(); setMobileOpen(false); }}
                  className="flex items-center gap-3 rounded-xl border border-[#ece7df] px-4 py-3 text-sm font-medium text-[#374151]"
                >
                  <FaClipboardList className="text-[#24998a]" /> My Orders
                </button>

                <button
                  onClick={() => { setWishlistOpen(true); setMobileOpen(false); }}
                  className="flex items-center justify-between rounded-xl border border-[#ece7df] px-4 py-3 text-sm font-medium text-[#374151]"
                >
                  <span className="flex items-center gap-3">
                    <FaHeart className="text-[#f97316]" /> Wishlist
                  </span>
                  {wishlistItems.length > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f97316] text-[10px] font-bold text-white">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => void logout()}
                  className="rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white"
                >
                  Logout
                </button>
              </>
            ) :  
             mounted && !isSignedIn ? (
                 <Link href="/login" onClick={() => setMobileOpen(false)}
                 className="rounded-xl bg-[#24998a] px-4 py-3 text-center text-sm font-medium text-white">Signin</Link>
             ):null

      
            
            
            }
          </div>
        </div>
      </div>

      {/* Dialogs */}
      {isSignedIn && <CustomerWishlistDialog />}
      {isSignedIn && <CustomerProfileDialog />}
      {isSignedIn && <CustomerOrdersDialog />}
      <CustomerCartAndCheckoutDrawer />
    </>
  );
}

export default Header;








    {/* {isSignedIn && (
            <div className="hidden md:flex items-center gap-1">
              <button onClick={openProfile} className="flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3eee6]">
                <FaUser size={15} />
              </button>
              <button onClick={openOrders} className="flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3eee6]">
                <FaClipboardList size={15} />
              </button>
              <button onClick={() => setWishlistOpen(true)} className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3eee6]">
                <FaHeart size={15} />
                {wishlistItems.length > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#f97316] text-[9px] font-bold text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
            </div>
          )} */}







      {/* {!isSignedIn && (
            <Link
              href="/login"
              className="hidden md:block rounded-full bg-[#24998a] px-5 py-2 text-[13px] font-medium text-white transition hover:bg-[#1f8276]"
            >
              Sign In
            </Link>
          )} */}
 // <Link
              //   href="/login"
              //   onClick={() => setMobileOpen(false)}
              //   className="rounded-xl bg-[#24998a] px-4 py-3 text-center text-sm font-medium text-white"
              // >
              //   Sign In
              // </Link>