"use client";

import {
  FiGrid,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { Commonloader } from "../admin/Loader";
import { useCustomerHomeStore } from "./store";
import { CategoriesSection } from "./Categories/Categoriessection";
import { CouponsSection } from "./Categories/Couponssection";
import { FaqSection } from "./Categories/FaqSection";
import Products from "./ProductCarfs";

export function StoreHome() {
  const { data, loading, loadHome } = useCustomerHomeStore((state) => state);
  const banners = data?.banners || [];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    void loadHome();
  }, [loadHome]);



  console.log("ba", banners);


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
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 dark:bg-black/60 p-2    "
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                )}


                {banners.length > 1 && (
                  <button
                    onClick={() =>
                      setCurrentSlide((prev) => (prev + 1) % banners.length)
                    }
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 dark:bg-black/60 p-2   "
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


              {data?.categories && (
                <CategoriesSection categories={data.categories} />
              )}

              {data?.coupons && (
                <CouponsSection coupons={data.coupons} />
              )}

              {/* ── Recent Products ── */}

              {data?.recentProducts.length && (
                <section className="bg-[#f6f1ea] px-5 py-24">
                  <div className="mx-auto max-w-7xl">
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
                      {data?.recentProducts.slice(0, 4).map((product) => (
                        <Products key={product._id} product={product} />
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

