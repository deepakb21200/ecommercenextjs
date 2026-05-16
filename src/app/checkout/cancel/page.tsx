"use client";

import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-8 text-center shadow-md">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <FaTimesCircle className="h-8 w-8" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            Payment Cancelled
          </h1>
          <p className="text-sm text-gray-500">
            Your order was not placed. You can try again.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            href="/collections"
            className="px-5 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="px-5 py-2 border text-sm text-gray-700 rounded-md hover:bg-gray-100 transition"
          >
            Go to Home
          </Link>

        </div>

      </div>
    </div>
  );
}