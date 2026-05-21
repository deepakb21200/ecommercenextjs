
"use client";

import {
  FiGrid,
  FiTag,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Commonloader } from "../admin/Loader";
import { formatPrice } from "@/config/constants";
import { useCustomerHomeStore } from "./store";
import { LuTicketPercent } from "react-icons/lu";

import { Footer } from "./Footer";
import { CategoriesSection } from "./Categories/Categoriessection";
import { CouponsSection } from "./Categories/Couponssection";
import { FaqSection } from "./Categories/FaqSection";

export function StoreHome() {
  const { data, loading, loadHome } = useCustomerHomeStore((state) => state);
    const banners = data?.banners || [];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    void loadHome();
  }, [loadHome]);



  console.log("ba",banners);
  

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
    <>

      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 antialiased">
        <div className="mx-auto  px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col gap-16">

            {/* ── Banners (FULL SCREEN) ── */}
            <section className="min-h-[90vh]">
              <div className="relative overflow-hidden   border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 h-screen">

                {banners.length ? (
                  banners.map((item, index) => (
                    <img
                      key={item._id}
                      src={item.imageUrl}
                      alt="Banner"
                      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
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


                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-black/80 px-4 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700">
                    New Arrivals
                  </span>
                </div>
              </div>
            </section>


            



            <div className="px-3 max-w-7xl mx-auto ">
              {/* ── Categories ── */}
              {/* {!!data.categories.length && (
                <section>
                  <div className="mb-6">
                    <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mb-1">
                      Collections
                    </p>
                    <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                      Browse by category
                    </h2>
                  </div>

                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.categories.slice(0, 4).map((categoryItem) => (
                      <Link
                        key={categoryItem._id}
                        href={`/collections?category=${categoryItem._id}`}
                        className="group flex flex-col gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                          <FiTag className="h-[18px] w-[18px] text-neutral-500 dark:text-neutral-400" />
                        </div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 ">
                          {categoryItem.name}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                          View collection
                          <FiArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )} */}

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

              {/* <CategoriesSection categories={data.categories} />
<CouponsSection coupons={data.coupons} /> */}

              {/* ── Recent Products ── */}
              {!!data.recentProducts.length && (
                // <section>
                //   <div className="mb-6">
                //     <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mb-1">
                //       Latest
                //     </p>
                //     <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                //       Recent products
                //     </h2>
                //   </div>

                //   <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                //     {data.recentProducts.slice(0, 4).map((product) => (
                //       <Link
                //         href={`/collection/${product._id}`}
                //         key={product._id}
                //         className="group flex flex-col overflow-hidden rounded-xl   bg-white dark:bg-neutral-900 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
                //       >
                //         <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                //           <img
                //             src={product.image}
                //             alt={product.title}
                //             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                //           />
                //         </div>

                //         <div className="flex flex-1 flex-col gap-2 p-4">
                //           <p className="text-[11px]  text-lg uppercase tracking-[0.1em]  
                //           font-bold text-gray-800">
                //             {product.brand}
                //           </p>
                //           <p className="  leading-snug   dark:text-neutral-100 line-clamp-2
                //           text-lg font-bold text-gray-900 ">
                //             {product.title}
                //           </p>
                //           <div className="mt-auto flex items-end justify-between pt-2">
                //             <div>
                //               <p className="text-md font-medium text-neutral-900 dark:text-neutral-100">
                //                 {formatPrice(product.finalPrice)}
                //               </p>
                //               {product.salePercentage > 0 && (
                //                 <p className="text-md text-neutral-400 dark:text-neutral-500 line-through">
                //                   {formatPrice(product.price)}
                //                 </p>
                //               )}
                //             </div>
                //             {product.salePercentage > 0 && (
                //               <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                //                 {product.salePercentage}% off
                //               </span>
                //             )}
                //           </div>
                //         </div>
                //       </Link>
                //     ))}
                //   </div>
                // </section>

                <section className="bg-[#f6f1ea] px-5 py-24">
                  <div className="mx-auto max-w-7xl">

                    {/* Heading */}
                    <div className="mb-14">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#24998a]">
                        Latest
                      </p>

                      <h2 className="text-5xl font-light text-[#222831]">
                        Recent <em className="text-[#24998a] not-italic">Products</em>
                      </h2>
                    </div>

                    {/* Products */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {data.recentProducts.slice(0, 4).map((product) => (
                        <Link
                          href={`/collection/${product._id}`}
                          key={product._id}
                          className="group overflow-hidden rounded-2xl border border-[#e7e0d7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        >
                          {/* Image */}
                          <div className="aspect-[3/4] overflow-hidden bg-[#f3eee6]">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex flex-col p-5">
                            {/* Brand */}
                            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6b7280]">
                              {product.brand}
                            </p>

                            {/* Title */}
                            <h3 className="mt-1 line-clamp-2 text-[15px] font-medium leading-6 text-[#222831]">
                              {product.title}
                            </h3>

                            {/* Price Row */}
                            <div className="mt-4 flex items-end justify-between">
                              <div>
                                <p className="text-[15px] font-semibold text-[#222831]">
                                  {formatPrice(product.finalPrice)}
                                </p>

                                {product.salePercentage > 0 && (
                                  <p className="text-xs text-[#6b7280] line-through">
                                    {formatPrice(product.price)}
                                  </p>
                                )}
                              </div>

                              {/* Discount / Rating */}
                              {product.salePercentage > 0 ? (
                                <span className="rounded-full border border-[#d8d2c8] bg-[#f3eee6] px-2.5 py-1 text-[11px] font-medium text-[#6b7280]">
                                  {product.salePercentage}% OFF
                                </span>
                              ) : (
                                <span className="text-xs text-[#6b7280]">
                                  ★ 4.8
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              <FaqSection />

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

