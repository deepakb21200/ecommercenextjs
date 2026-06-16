 
"use client";

import { formatPrice } from "@/config/constants";
import { useCustomerWishlistStore } from "@/store/home/wishlist/store";
import Image from "next/image";
import Link from "next/link";
 
import { RiHeartLine, RiDeleteBin6Line, RiEyeLine, RiInboxLine, RiCloseLine } from "react-icons/ri";
 

type WishlistItem = {
  productId: string;
  title: string;
  brand: string;
  image?: string;
  finalPrice: number;
};

export default function CustomerWishlistDialog() {
  const { isOpen, setOpen, items, removeItem } = useCustomerWishlistStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl max-h-[43vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <RiHeartLine className="text-rose-500 text-lg" />
            <h2 className="text-base font-semibold text-gray-900">Wishlist</h2>
            {items.length > 0 && (
              <span className="text-xs font-medium bg-rose-50 text-rose-600 border border-rose-200 rounded-full px-2 py-0.5">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="h-8 w-8 flex cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <RiCloseLine className="text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4">
          {!items.length ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
              <RiInboxLine className="text-5xl opacity-25" />
              <p className="text-sm">Your wishlist is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item: WishlistItem) => (
                <div
                  key={item.productId}
                  className="flex items-start gap-3 border border-gray-100 rounded-xl p-3 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
                >
                  {/* Image */}
                  <div className="h-20 w-16 shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-xs uppercase tracking-widest text-gray-400">{item.brand}</p>
                    <Link
                      href={`/collection/${item.productId}`}
                      className="line-clamp-2 text-sm font-medium text-gray-900 hover:text-black transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatPrice(item.finalPrice)}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <Link
                        href={`/collection/${item.productId}`}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 h-7 px-3 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <RiEyeLine className="text-sm" />
                        View
                      </Link>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="inline-flex items-center gap-1.5 h-7 px-3 text-xs font-medium border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <RiDeleteBin6Line className="text-sm" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}