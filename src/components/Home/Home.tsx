"use client";

import { useEffect} from "react";
import { Commonloader } from "../admin/Loader";
import { useCustomerHomeStore } from "./store";
import { CategoriesSection } from "./Categories/Categoriessection";
import { CouponsSection } from "./Categories/Couponssection";
import { FaqSection } from "./Categories/FaqSection";
import Products from "./ProductCarfs";
import BannerSlider from "./BannerSlider";
import { HomeLoader } from "@/app/(Home)/HomeLoader";

export function StoreHome() {
  const { data, loading, loadHome } = useCustomerHomeStore((state) => state);
  const banners = data?.banners || [];

 

  useEffect(() => {
    void loadHome();
  }, [loadHome]);



  


 
    // Full screen — header/footer ke upar
  // if (loading) return <HomeLoader />
    if (loading) return <Commonloader/>

  return (
    <>

      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 antialiased">
        <div className="mx-auto  px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col gap-16">

            {/* ── Banners (FULL SCREEN) ── */}
            <BannerSlider banners={banners} />

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

