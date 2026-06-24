// "use client";

// import Link from "next/link";
// import { FiArrowRight, FiTag } from "react-icons/fi";

// type CategoryItem = {
//   _id: string;
//   name: string;
// };

// type Props = {
//   categories: CategoryItem[];
// };

// export function CategoriesSection({ categories }: Props) {
//   if (!categories.length) return null;

//   return (
//     <section>
//       {/* Header */}
//       <div className="mb-6">
//         <p
//           className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
//           style={{ color: "hsl(174,62%,38%)" }}
//         >
//           Collections
//         </p>
//         <h2
//           className="text-[clamp(1.35rem,3vw,1.75rem)] font-medium leading-tight"
//           style={{ color: "hsl(220,20%,15%)", letterSpacing: "-0.02em" }}
//         >
//           Browse by category
//         </h2>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {categories.slice(0, 4).map((cat) => (
//           <Link
//             key={cat._id}
//             href={`/shop?category=${cat._id}`}
//             className="group flex flex-col gap-4 rounded-[14px] p-5 transition-all duration-200 hover:-translate-y-0.5"
//             style={{
//               background: "#fff",
//               border: "1.5px solid hsl(40,20%,88%)",
//             }}
//             onMouseEnter={(e) => {
//               (e.currentTarget as HTMLElement).style.border =
//                 "1.5px solid hsl(174,62%,78%)";
//               (e.currentTarget as HTMLElement).style.boxShadow =
//                 "0 4px 16px hsla(174,62%,38%,0.1)";
//             }}
//             onMouseLeave={(e) => {
//               (e.currentTarget as HTMLElement).style.border =
//                 "1.5px solid hsl(40,20%,88%)";
//               (e.currentTarget as HTMLElement).style.boxShadow = "none";
//             }}
//           >
//             {/* Icon */}
//             <div
//               className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px]"
//               style={{
//                 background: "hsl(174,62%,96%)",
//                 border: "1.5px solid hsl(174,62%,78%)",
//               }}
//             >
//               <FiTag
//                 className="h-[18px] w-[18px]"
//                 style={{ color: "hsl(174,62%,38%)" }}
//               />
//             </div>

//             {/* Name */}
//             <div className="flex flex-col gap-1.5">
//               <p
//                 className="text-sm font-medium"
//                 style={{ color: "hsl(220,20%,15%)" }}
//               >
//                 {cat.name}
//               </p>
//               <span
//                 className="inline-flex items-center gap-1 text-xs transition-all duration-150 group-hover:gap-1.5"
//                 style={{ color: "hsl(220,10%,45%)" }}
//               >
//                 View collection
//                 <FiArrowRight
//                   className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5"
//                   style={{ color: "hsl(174,62%,38%)" }}
//                 />
//               </span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }















"use client";
import Link from "next/link";
import { FiArrowRight, FiTag } from "react-icons/fi";
type CategoryItem = {
  _id: string;
  name: string;
};


type Props = {
  categories: CategoryItem[];
};
export function CategoriesSection({ categories }: Props) {
  if (!categories.length) return null;
  console.log("Rendering CategoriesSection with categories:", categories);
  return (
    <section>
      {/* Header */}
      <div className="mb-6">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[hsl(174,62%,38%)]">
          Collections
        </p>
        <h2 className="text-[clamp(1.35rem,3vw,1.75rem)] font-medium leading-tight tracking-[-0.02em] text-[hsl(220,20%,15%)]">
          Browse by category
        </h2>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.slice(0, 4).map((cat) => (
          <Link
            key={cat._id}
            // href={`/shop?category=${cat._id}`}
            href={`/shop?category=${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group flex flex-col gap-4 rounded-[14px] border-[1.5px] border-[hsl(40,20%,88%)] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[hsl(174,62%,78%)] hover:shadow-[0_4px_16px_hsla(174,62%,38%,0.1)]"
          >
            {/* Icon */}
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px] border-[1.5px] border-[hsl(174,62%,78%)] bg-[hsl(174,62%,96%)]">
              <FiTag className="h-[18px] w-[18px] text-[hsl(174,62%,38%)]" />
            </div>
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-[hsl(220,20%,15%)]">
                {cat.name}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-[hsl(220,10%,45%)] transition-all duration-150 group-hover:gap-1.5">
                View collection
                <FiArrowRight className="h-3 w-3 text-[hsl(174,62%,38%)] transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
