// "use client";

 
// import { FiGrid, FiTag, FiArrowRight } from "react-icons/fi";
// import { useEffect } from "react";
// import Link from "next/link";
 
// import { Commonloader } from "../admin/Loader";
// import { formatPrice } from "@/config/constants";
// import { useCustomerHomeStore } from "./store";
// import { LuTicketPercent } from "react-icons/lu";
 

// export function StoreHome() {
//   const { data, loading, loadHome } = useCustomerHomeStore((state) => state);

//   console.log("hi", data);
  

//   useEffect(() => {
//     void loadHome();
//   }, [loadHome]);

//   if (loading) {
//     return <Commonloader />;
//   }

//   const mainBanner = data.banners[0] || null;
//   const sideBanners = data.banners.slice(1, 3);

//   return (
//     <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 antialiased">
//       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//         <div className="flex flex-col gap-16">

//           {/* ── Banners ── */}
//           <section>
//             <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
//               {/* Main banner */}
//               <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
//                 {mainBanner ? (
//                   <img
//                     src={mainBanner.imageUrl}
//                     alt="Featured banner"
//                     className="h-[480px] w-full object-cover"
//                   />
//                 ) : (
//                   <div className="h-[480px] w-full flex items-center justify-center text-neutral-300 dark:text-neutral-700">
                
//                     <FiGrid className="h-12 w-12"/>
//                   </div>
//                 )}
//                 <div className="absolute bottom-4 left-4">
//                   <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-black/80 px-4 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700">
//                     New Arrivals
//                   </span>
//                 </div>
//               </div>

//               {/* Side banners */}
//               <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
//                 {sideBanners.map((item) => (
//                   <div
//                     key={item._id}
//                     className="flex-1 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
//                   >
//                     <img
//                       src={item.imageUrl}
//                       alt="Banner"
//                       className="h-[232px] w-full object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* ── Categories ── */}
//           {!!data.categories.length && (
//             <section>
//               <div className="mb-6">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mb-1">
//                   Collections
//                 </p>
//                 <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
//                   Browse by category
//                 </h2>
//               </div>

//               <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
//                 {data.categories.slice(0, 4).map((categoryItem) => (
//                   <Link
//                     key={categoryItem._id}
//                     href={`/collections?category=${categoryItem._id}`}
//                     className="group flex flex-col gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
//                   >
//                     <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
        
//                       <FiTag className="h-[18px] w-[18px] text-neutral-500 dark:text-neutral-400"/>
//                     </div>
//                     <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
//                       {categoryItem.name}
//                     </p>
//                     <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
//                       View collection
                 
//                       <FiArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5"  />
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* ── Coupons ── */}
//           {!!data.coupons.length && (
//             <section>
//               <div className="mb-6">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mb-1">
//                   Offers
//                 </p>
//                 <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
//                   Live coupon cards
//                 </h2>
//               </div>

//               <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
//                 {data.coupons.slice(0, 4).map((coupon) => (
//                   <div
//                     key={coupon._id}
//                     className="flex flex-col gap-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
//                         <LuTicketPercent className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
//                       </div>
//                       <span className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
//                         {coupon.percentage}% off
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400 dark:text-neutral-500 mb-1">
//                         Coupon code
//                       </p>
//                       <p className="text-lg font-medium tracking-wide text-neutral-900 dark:text-neutral-100">
//                         {coupon.code}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* ── Recent Products ── */}
//           {!!data.recentProducts.length && (
//             <section>
//               <div className="mb-6">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mb-1">
//                   Latest
//                 </p>
//                 <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
//                   Recent products
//                 </h2>
//               </div>

//               <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
//                 {data.recentProducts.slice(0, 4).map((product) => (
//                   <Link
//                     href={`/collection/${product._id}`}
//                     key={product._id}
//                     className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
//                   >
//                     {/* Image */}
//                     <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
//                       <img
//                         src={product.image}
//                         alt={product.title}
//                         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       />
//                     </div>

//                     {/* Info */}
//                     <div className="flex flex-1 flex-col gap-2 p-4">
//                       <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-400 dark:text-neutral-500">
//                         {product.brand}
//                       </p>
//                       <p className="text-sm font-medium leading-snug text-neutral-900 dark:text-neutral-100 line-clamp-2">
//                         {product.title}
//                       </p>
//                       <div className="mt-auto flex items-end justify-between pt-2">
//                         <div>
//                           <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
//                             {formatPrice(product.finalPrice)}
//                           </p>
//                           {product.salePercentage > 0 && (
//                             <p className="text-xs text-neutral-400 dark:text-neutral-500 line-through">
//                               {formatPrice(product.price)}
//                             </p>
//                           )}
//                         </div>
//                         {product.salePercentage > 0 && (
//                           <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-300">
//                             {product.salePercentage}% off
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </section>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { FiGrid, FiTag, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Commonloader } from "../admin/Loader";
import { formatPrice } from "@/config/constants";
import { useCustomerHomeStore } from "./store";
import { LuTicketPercent } from "react-icons/lu";

export function StoreHome() {
  const { data, loading, loadHome } = useCustomerHomeStore((state) => state);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    void loadHome();
  }, [loadHome]);

  const banners = data?.banners || [];

  // auto slide
  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  if (loading) {
    return <Commonloader />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 antialiased border-red-500 border-4 w-full">
      <div className="mx-auto   px-4  ">
        <div className="flex flex-col gap-16">

          {/* ── Banners ── */}
          {/* <section>
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 h-[480px]">

          
              {banners.length ? (
                banners.map((item, index) => (
                  <img
                    key={item._id}
                    src={item.imageUrl}
                    alt="Banner"
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))
              ) : (
                <div className="h-full w-full flex items-center justify-center text-neutral-300 dark:text-neutral-700">
                  <FiGrid className="h-12 w-12" />
                </div>
              )}

           
              {banners.length > 1 && (
                <button
                  onClick={() =>
                    setCurrentSlide(
                      (prev) => (prev - 1 + banners.length) % banners.length
                    )
                  }
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 dark:bg-black/60 p-2 rounded-full"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
              )}

            
              {banners.length > 1 && (
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev + 1) % banners.length)
                  }
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 dark:bg-black/60 p-2 rounded-full"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              )}

            
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-black/80 px-4 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700">
                  New Arrivals
                </span>
              </div>
            </div>
          </section> */}

          {/* ── Categories ── */}
          {!!data.categories.length && (
            <section className=" ">
              <div className="mb-6 ">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mb-1">
                  Collections
                </p>
                <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                  Browse by category
                </h2>
              </div>

              {/* <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4  "> */}
          <   div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-4  "> 
                {data.categories.slice(0, 4).map((categoryItem) => (
                  <Link
                    key={categoryItem._id}
                    href={`/collections?category=${categoryItem._id}`}
                    className="group flex flex-col gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                      <FiTag className="h-[18px] w-[18px] text-neutral-500 dark:text-neutral-400"/>
                    </div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {categoryItem.name}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      View collection
                      <FiArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5"  />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Coupons ── */}
          {!!data.coupons.length && (
            <section>
              <div className="mb-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mb-1">
                  Offers
                </p>
                <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                  Live coupon cards
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {data.coupons.slice(0, 4).map((coupon) => (
                  <div
                    key={coupon._id}
                    className="flex flex-col gap-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                        <LuTicketPercent className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                      </div>
                      <span className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                        {coupon.percentage}% off
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400 dark:text-neutral-500 mb-1">
                        Coupon code
                      </p>
                      <p className="text-lg font-medium tracking-wide text-neutral-900 dark:text-neutral-100">
                        {coupon.code}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Recent Products ── */}
          {!!data.recentProducts.length && (
            <section>
              <div className="mb-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mb-1">
                  Latest
                </p>
                <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                  Recent products
                </h2>
              </div>

              {/* <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4 grid-cols-1 border-2 border-green-400  "> */}
                 <div className="flex ">
                {data.recentProducts.slice(0, 4).map((product) => (
                  // <Link
                  //   href={`/collection/${product._id}`}
                  //   key={product._id}
                  //   className="group md:w-[350px] lg:w-[450px] flex flex-col overflow-hidden rounded-xl border
                  //   border- border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
                  // >

                       <Link
                    href={`/collection/${product._id}`}
                    key={product._id}
                    // className="group md:w-[300px] lg:w-[450px]  flex flex-col overflow-hidden rounded-xl 
                    className="group  flex flex-col overflow-hidden rounded-xl 
                    border-4 border-purple-400 bg-white dark:bg-neutral-900 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
                  >
                    <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-400 dark:text-neutral-500">
                        {product.brand}
                      </p>
                      <p className="text-sm font-medium leading-snug text-neutral-900 dark:text-neutral-100 line-clamp-2">
                        {product.title}
                      </p>
                      <div className="mt-auto flex items-end justify-between pt-2">
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {formatPrice(product.finalPrice)}
                          </p>
                          {product.salePercentage > 0 && (
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 line-through">
                              {formatPrice(product.price)}
                            </p>
                          )}
                        </div>
                        {product.salePercentage > 0 && (
                          <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-300">
                            {product.salePercentage}% off
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
