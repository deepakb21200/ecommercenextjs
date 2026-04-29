
"use client";

import { useCustomerWishlistStore } from "@/store/home/wishlist/store";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  FiHeart,
  FiLogIn,
  FiLogOut,
  FiShoppingCart,
  FiUser,
  FiShoppingBag,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAuthStore } from "../user/store/api";
import { useCustomerProfileStore } from "@/store/home/profile/store";
import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
import { useCustomerOrdersStore } from "@/store/home/orders/store";
import CustomerCartAndCheckoutDrawer from "./customerCart/CustomerCartAndCheckoutDrawer";
import CustomerWishlistDialog from "./wishlist/CustomerWishList";
import CustomerProfileDialog from "./profile/CustomerProfileDialog";
import CustomerOrdersDialog from "./orders/CustomerOrdersDiaolog";


export function CustomerNavbar() {
  const { user, logout } = useAuthStore();
   const isSignedIn = !!user;

 

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    items: wishlistItems,
    loadWishlist,
    clear: clearWishlist,
    setOpen: setWishlistOpen,
  } = useCustomerWishlistStore((state) => state);

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
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-black/60 backdrop-blur-lg border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-[70px] items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <FiShoppingBag className="text-xl" />
          E-Shopify
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4">

          <Link href="/collections" className="flex items-center gap-2 hover:opacity-80">
            <FiShoppingBag />
            Collections
          </Link>

          {isSignedIn && (
            <button onClick={() => setWishlistOpen(true)} className="relative">
              <FiHeart className="text-xl" />
              <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1">
                {wishlistItems.length}
              </span>
            </button>
          )}

          {isSignedIn ? (
            <div className="flex items-center gap-3">

              <button onClick={openProfile} className="flex items-center gap-1">
                <FiUser />
                Account
              </button>

              <button onClick={openOrders} className="flex items-center gap-1">
                Orders
              </button>

              <button onClick={logout} className="flex items-center gap-1">
                <FiLogOut />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-1">
              <FiLogIn />
              Login
            </Link>
          )}

          {/* Cart */}
          <button onClick={() => setOpen(true)} className="relative">
            <FiShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1">
              {cart?.items?.length || 0}
            </span>
          </button>

        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-4 bg-white dark:bg-black border-t">

          <Link href="/collections" onClick={() => setMenuOpen(false)}>
            Collections
          </Link>

          {isSignedIn && (
            <button onClick={() => setWishlistOpen(true)}>
              Wishlist ({wishlistItems.length})
            </button>
          )}

          {isSignedIn ? (
            <>
              <button onClick={openProfile}>My Account</button>
              <button onClick={openOrders}>Orderssssss</button>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}

          <button onClick={() => setOpen(true)}>
            Cart ({cart?.items?.length || 0})
          </button>
        </div>
      )}

      {/* Dialogs */}
      {isSignedIn && <CustomerWishlistDialog />}
      {isSignedIn && <CustomerProfileDialog/>}
      {isSignedIn && <CustomerOrdersDialog />}
  

    
    </header>
    <CustomerCartAndCheckoutDrawer /> 
   </>
  );
}
 
