// // "use client";

// // import Link from "next/link";
// // import { CheckCircle2 } from "lucide-react";

// // import { Button } from "@/components/ui/button";

// // const pageWrapClass =
// //   "flex min-h-screen items-center justify-center bg-background px-4";
// // const cardClass =
// //   "w-full max-w-xl space-y-5 border border-border bg-card p-8 text-center";
// // const iconWrapClass =
// //   "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary";
// // const titleClass = "text-2xl font-semibold text-foreground";
// // const textClass = "text-sm text-muted-foreground";
// // const buttonRowClass = "flex flex-col gap-3 sm:flex-row sm:justify-center";
// // const buttonClass = "rounded-none";

// // export default function CustomerOrderSuccessPage() {
// //   return (
// //     <div className={pageWrapClass}>
// //       <div className={cardClass}>
// //         <div className={iconWrapClass}>
// //           <CheckCircle2 className="h-8 w-8" />
// //         </div>

// //         <div className="space-y-2">
// //           <h1 className={titleClass}>Order placed successfully</h1>
// //           <p className={textClass}>
// //             Your payment is complete and your order is confirmed.
// //           </p>
// //         </div>

// //         <div className={buttonRowClass}>
// //           <Button asChild className={buttonClass}>
// //             <Link href="/collection">Continue shopping</Link>
// //           </Button>

// //           <Button asChild variant="outline" className={buttonClass}>
// //             <Link href="/">Go to home</Link>
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }











// // yeuse tab karna hai jab verify seesion backernd route ho


// // "use client";

// // import Link from "next/link";
// // import { CheckCircle2, XCircle } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { useEffect, useState } from "react";
// // import { useSearchParams } from "next/navigation";
// // import { useCustomerCartAndCheckoutStore } from "@/types/customer/cartandcheckout/store";
// // import axios from "axios";

// // export default function CheckoutSuccessPage() {
// //   const searchParams = useSearchParams();
// //   const sessionId = searchParams.get("sessionId");
// //   const clear = useCustomerCartAndCheckoutStore((s) => s.clear);
// //   const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

// //   useEffect(() => {
// //     if (!sessionId) {
// //       setStatus("error");
// //       return;
// //     }

// //     async function verify() {
// //       try {
// //         await axios.post("/api/customer/checkout/verify-session", { sessionId });
// //         clear();
// //         setStatus("success");
// //       } catch {
// //         setStatus("error");
// //       }
// //     }

// //     void verify();
// //   }, [sessionId, clear]);

// //   if (status === "loading") {
// //     return (
// //       <div className="flex min-h-screen items-center justify-center">
// //         <p className="text-muted-foreground">Verifying payment...</p>
// //       </div>
// //     );
// //   }

// //   if (status === "error") {
// //     return (
// //       <div className="flex min-h-screen items-center justify-center bg-background px-4">
// //         <div className="w-full max-w-xl space-y-5 border border-border bg-card p-8 text-center">
// //           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
// //             <XCircle className="h-8 w-8" />
// //           </div>
// //           <h1 className="text-2xl font-semibold text-foreground">Payment verification failed</h1>
// //           <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
// //             <Button asChild className="rounded-none">
// //               <Link href="/collections">Continue Shopping</Link>
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-background px-4">
// //       <div className="w-full max-w-xl space-y-5 border border-border bg-card p-8 text-center">
// //         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
// //           <CheckCircle2 className="h-8 w-8" />
// //         </div>
// //         <div className="space-y-2">
// //           <h1 className="text-2xl font-semibold text-foreground">Order placed successfully</h1>
// //           <p className="text-sm text-muted-foreground">Your payment is complete and your order is confirmed.</p>
// //         </div>
// //         <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
// //           <Button asChild className="rounded-none">
// //             <Link href="/collections">Continue Shopping</Link>
// //           </Button>
// //           <Button asChild variant="outline" className="rounded-none">
// //             <Link href="/">Go to Home</Link>
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }










// "use client";

// import Link from "next/link";
// import { CheckCircle2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useEffect } from "react";
//   import { useCustomerCartAndCheckoutStore } from "@/types/customer/cartandcheckout/store";

//  export default function CheckoutSuccessPage() {
//   const clear = useCustomerCartAndCheckoutStore((s) => s.clear);

//   useEffect(() => {
//     clear();
//   }, [clear]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background px-4">
//       <div className="w-full max-w-xl space-y-5 border border-border bg-card p-8 text-center">
//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
//           <CheckCircle2 className="h-8 w-8" />
//         </div>
//         <div className="space-y-2">
//           <h1 className="text-2xl font-semibold text-foreground">
//             Order placed successfully
//           </h1>
//           <p className="text-sm text-muted-foreground">
//             Your payment is complete and your order is confirmed.
//           </p>
//         </div>
//         <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
//           <Button asChild className="rounded-none">
//             <Link href="/collections">Continue Shopping</Link>
//           </Button>
//           <Button asChild variant="outline" className="rounded-none">
//             <Link href="/">Go to Home</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }



// app/checkout/success/page.tsx
// import Link from "next/link";
// import { CheckCircle2, XCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { connectDB } from "@/lib/connectDB";
// import { OrderModel } from "@/models/Order";

// async function getOrderStatus(sessionId: string) {
//   await connectDB();
//   const order = await OrderModel.findOne({
//     stripePaymentIntentId: sessionId,
//   }).select("paymentStatus").lean();
//   return (order as any)?.paymentStatus ?? null;
// }

// export default async function CheckoutSuccessPage({
//   searchParams,
// }: {
//   searchParams: { sessionId?: string };
// }) {
//   const sessionId = searchParams.sessionId;
//   const paymentStatus = sessionId ? await getOrderStatus(sessionId) : null;

//   // failed
//   if (!paymentStatus || paymentStatus === "failed") {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-background px-4">
//         <div className="w-full max-w-xl space-y-5 border border-border bg-card p-8 text-center">
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
//             <XCircle className="h-8 w-8" />
//           </div>
//           <div className="space-y-2">
//             <h1 className="text-2xl font-semibold text-foreground">Payment Failed</h1>
//             <p className="text-sm text-muted-foreground">
//               Stock available nahi tha — refund process ho raha hai.
//             </p>
//           </div>
//           <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
//             <Button asChild className="rounded-none">
//               <Link href="/collections">Continue Shopping</Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // success
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background px-4">
//       <div className="w-full max-w-xl space-y-5 border border-border bg-card p-8 text-center">
//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
//           <CheckCircle2 className="h-8 w-8" />
//         </div>
//         <div className="space-y-2">
//           <h1 className="text-2xl font-semibold text-foreground">
//             Order placed successfully
//           </h1>
//           <p className="text-sm text-muted-foreground">
//             Your payment is complete and your order is confirmed.
//           </p>
//         </div>
//         <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
//           <Button asChild className="rounded-none">
//             <Link href="/collections">Continue Shopping</Link>
//           </Button>
//           <Button asChild variant="outline" className="rounded-none">
//             <Link href="/">Go to Home</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }








// ye sirf vefrify session an cli me  me use hoga 


// "use client";

// import Link from "next/link";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";

// export function CheckoutSuccessPage() {
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("sessionId");

//   const clear = useCustomerCartAndCheckoutStore((s) => s.clear);

//   const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

//   useEffect(() => {
//     if (!sessionId) {
//       setStatus("error");
//       return;
//     }

//     async function verify() {
//       try {
//         await axios.post("/api/customer/checkout/verify-session", { sessionId });
//         clear();
//         setStatus("success");
//       } catch {
//         setStatus("error");
//       }
//     }

//     void verify();
//   }, [sessionId, clear]);

//   // 🔄 LOADING
//   if (status === "loading") {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50">
//         <p className="text-gray-500 animate-pulse">Verifying payment...</p>
//       </div>
//     );
//   }

//   // ❌ ERROR
//   if (status === "error") {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//         <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-8 text-center shadow-md">

//           {/* Icon */}
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
//             <FaTimesCircle className="h-8 w-8" />
//           </div>

//           {/* Text */}
//           <div className="space-y-2">
//             <h1 className="text-2xl font-semibold text-gray-800">
//               Payment Failed
//             </h1>
//             <p className="text-sm text-gray-500">
//               Kuch problem aayi — refund process ho raha hai.
//             </p>
//           </div>

//           {/* Button */}
//           <div className="flex justify-center">
//             <Link
//               href="/collections"
//               className="px-5 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
//             >
//               Continue Shopping
//             </Link>
//           </div>

//         </div>
//       </div>
//     );
//   }

//   // ✅ SUCCESS
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-8 text-center shadow-md">

//         {/* Icon */}
//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
//           <FaCheckCircle className="h-8 w-8" />
//         </div>

//         {/* Text */}
//         <div className="space-y-2">
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Order placed successfully
//           </h1>
//           <p className="text-sm text-gray-500">
//             Your payment is complete and your order is confirmed.
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">

//           <Link
//             href="/collections"
//             className="px-5 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
//           >
//             Continue Shopping
//           </Link>

//           <Link
//             href="/"
//             className="px-5 py-2 border text-sm text-gray-700 rounded-md hover:bg-gray-100 transition"
//           >
//             Go to Home
//           </Link>

//         </div>

//       </div>
//     </div>
//   );
// }


// ye sirf cli me use hoga 


"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";

export default function CheckoutSuccessPage() {
  const clear = useCustomerCartAndCheckoutStore((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl space-y-5 border bg-white p-8 text-center shadow-sm">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <FaCheckCircle className="h-8 w-8" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            Order placed successfully
          </h1>
          <p className="text-sm text-gray-500">
            Your payment is complete and your order is confirmed.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            href="/collections"
            className="px-5 py-2 bg-black text-white text-sm hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="px-5 py-2 border text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Go to Home
          </Link>

        </div>
      </div>
    </div>
  );
}










// ye bhi way ha i
// app/checkout/success/page.tsx

// import Link from "next/link";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { connectDB } from "@/lib/connectDB";
// import { OrderModel } from "@/models/Order";

// async function getOrderStatus(sessionId: string) {
//   await connectDB();
//   const order = await OrderModel.findOne({
//     stripePaymentIntentId: sessionId,
//   }).select("paymentStatus").lean();

//   return (order as any)?.paymentStatus ?? null;
// }

// export default async function CheckoutSuccessPage({
//   searchParams,
// }: {
//   searchParams: { sessionId?: string };
// }) {
//   const sessionId = searchParams.sessionId;
//   const paymentStatus = sessionId ? await getOrderStatus(sessionId) : null;

//   // ❌ FAILED
//   if (!paymentStatus || paymentStatus === "failed") {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//         <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-8 text-center shadow-md">

//           {/* Icon */}
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
//             <FaTimesCircle className="h-8 w-8" />
//           </div>

//           {/* Text */}
//           <div className="space-y-2">
//             <h1 className="text-2xl font-semibold text-gray-800">
//               Payment Failed
//             </h1>
//             <p className="text-sm text-gray-500">
//               Stock available nahi tha — refund process ho raha hai.
//             </p>
//           </div>

//           {/* Button */}
//           <div className="flex justify-center">
//             <Link
//               href="/collections"
//               className="px-5 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
//             >
//               Continue Shopping
//             </Link>
//           </div>

//         </div>
//       </div>
//     );
//   }

//   // ✅ SUCCESS
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-8 text-center shadow-md">

//         {/* Icon */}
//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
//           <FaCheckCircle className="h-8 w-8" />
//         </div>

//         {/* Text */}
//         <div className="space-y-2">
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Order placed successfully
//           </h1>
//           <p className="text-sm text-gray-500">
//             Your payment is complete and your order is confirmed.
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">

//           <Link
//             href="/collections"
//             className="px-5 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
//           >
//             Continue Shopping
//           </Link>

//           <Link
//             href="/"
//             className="px-5 py-2 border text-sm text-gray-700 rounded-md hover:bg-gray-100 transition"
//           >
//             Go to Home
//           </Link>

//         </div>

//       </div>
//     </div>
//   );
// }