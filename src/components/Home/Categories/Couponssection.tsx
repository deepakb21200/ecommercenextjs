// "use client";

// import { useState } from "react";
// import { LuTicketPercent } from "react-icons/lu";
// import { FiCopy, FiCheck,} from "react-icons/fi";

// type CouponItem = {
//   _id: string;
//   code: string;
//   percentage: number;
// };

// type Props = {
//   coupons: CouponItem[];
// };

// function CouponCard({ coupon }: { coupon: CouponItem }) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(coupon.code).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   return (
//     <div
//       className="group flex flex-col gap-4 rounded-[14px] p-5 transition-all duration-200 hover:-translate-y-0.5"
//       style={{ background: "#fff", border: "1.5px solid hsl(40,20%,88%)" }}
//       onMouseEnter={(e) => {
//         (e.currentTarget as HTMLElement).style.border = "1.5px solid hsl(174,62%,78%)";
//         (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px hsla(174,62%,38%,0.1)";
//       }}
//       onMouseLeave={(e) => {
//         (e.currentTarget as HTMLElement).style.border = "1.5px solid hsl(40,20%,88%)";
//         (e.currentTarget as HTMLElement).style.boxShadow = "none";
//       }}
//     >
//       {/* Icon */}
//       <div
//         className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px]"
//         style={{
//           background: "hsl(174,62%,96%)",
//           border: "1.5px solid hsl(174,62%,78%)",
//         }}
//       >
//         <LuTicketPercent
//           className="h-[18px] w-[18px]"
//           style={{ color: "hsl(174,62%,38%)" }}
//         />
//       </div>

//       {/* Code + percentage */}
//       <div className="flex flex-col gap-1">
//         <div className="flex items-center justify-between">
//           <p
//             className="text-[10px] font-semibold uppercase tracking-[0.1em]"
//             style={{ color: "hsl(220,10%,45%)" }}
//           >
//             Coupon code
//           </p>
//           <span
//             className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
//             style={{
//               background: "hsl(174,62%,96%)",
//               border: "1.5px solid hsl(174,62%,78%)",
//               color: "hsl(174,62%,35%)",
//             }}
//           >
//             {coupon.percentage}% off
//           </span>
//         </div>
//         <p
//           className="font-mono text-lg font-semibold tracking-wide"
//           style={{ color: "hsl(220,20%,15%)" }}
//         >
//           {coupon.code}
//         </p>
//       </div>

//       {/* Copy — same style as category "View collection" */}
//       <button
//         onClick={handleCopy}
//         className="inline-flex items-center gap-1 text-xs transition-all duration-150 group-hover:gap-1.5"
//         style={{
//           color: copied ? "hsl(174,62%,38%)" : "hsl(220,10%,45%)",
//           background: "none",
//           border: "none",
//           cursor: "pointer",
//           padding: 0,
//         }}
//       >
//         {copied ? (
//           <>
//             <FiCheck className="h-3 w-3" style={{ color: "hsl(174,62%,38%)" }} />
//             Copied!
//           </>
//         ) : (
//           <>
//             Copy code
//             <FiCopy
//               className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5"
//               style={{ color: "hsl(174,62%,38%)" }}
//             />
//           </>
//         )}
//       </button>
//     </div>
//   );
// }

// export function CouponsSection({ coupons }: Props) {
//   if (!coupons.length) return null;

//   return (
//     <section>
//       <div className="mb-6">
//         <p
//           className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
//           style={{ color: "hsl(174,62%,38%)" }}
//         >
//           Offers
//         </p>
//         <h2
//           className="text-[clamp(1.35rem,3vw,1.75rem)] font-medium leading-tight"
//           style={{ color: "hsl(220,20%,15%)", letterSpacing: "-0.02em" }}
//         >
//           Live coupon cards
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//         {coupons.slice(0, 4).map((coupon) => (
//           <CouponCard key={coupon._id} coupon={coupon} />
//         ))}
//       </div>
//     </section>
//   );
// }










"use client";
import { useState } from "react";
import { LuTicketPercent } from "react-icons/lu";
import { FiCopy, FiCheck } from "react-icons/fi";
type CouponItem = {
  _id: string;
  code: string;
  percentage: number;
};
type Props = {
  coupons: CouponItem[];
};
function CouponCard({ coupon }: { coupon: CouponItem }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div
      className="group flex flex-col gap-4 rounded-[14px] border-[1.5px] border-[hsl(40,20%,88%)] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[hsl(174,62%,78%)] hover:shadow-[0_4px_16px_hsla(174,62%,38%,0.1)]"
    >
      {/* Icon */}
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px] border-[1.5px] border-[hsl(174,62%,78%)] bg-[hsl(174,62%,96%)]">
        <LuTicketPercent className="h-[18px] w-[18px] text-[hsl(174,62%,38%)]" />
      </div>
      {/* Code + percentage */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[hsl(220,10%,45%)]">
            Coupon code
          </p>
          <span className="rounded-full border-[1.5px] border-[hsl(174,62%,78%)] bg-[hsl(174,62%,96%)] px-2.5 py-0.5 text-[11px] font-semibold text-[hsl(174,62%,35%)]">
            {coupon.percentage}% off
          </span>
        </div>
        <p className="font-mono text-lg font-semibold tracking-wide text-[hsl(220,20%,15%)]">
          {coupon.code}
        </p>
      </div>
      {/* Copy */}
      <button
        onClick={handleCopy}
        className={`inline-flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-xs transition-all duration-150 group-hover:gap-1.5 ${
          copied ? "text-[hsl(174,62%,38%)]" : "text-[hsl(220,10%,45%)]"
        }`}
      >
        {copied ? (
          <>
            <FiCheck className="h-3 w-3 text-[hsl(174,62%,38%)]" />
            Copied!
          </>
        ) : (
          <>
            Copy code
            <FiCopy className="h-3 w-3 text-[hsl(174,62%,38%)] transition-transform duration-150 group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </div>
  );
}
export function CouponsSection({ coupons }: Props) {
  if (!coupons.length) return null;
  return (
    <section>
      <div className="mb-6">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[hsl(174,62%,38%)]">
          Offers
        </p>
        <h2 className="text-[clamp(1.35rem,3vw,1.75rem)] font-medium leading-tight tracking-[-0.02em] text-[hsl(220,20%,15%)]">
          Live coupon cards
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {coupons.slice(0, 4).map((coupon) => (
          <CouponCard key={coupon._id} coupon={coupon} />
        ))}
      </div>
    </section>
  );
}

