"use client";

import { useEffect, useState } from "react";

import {
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
} from "react-icons/fi";

type Banner = {
  _id: string;
  imageUrl: string;
};

type BannerSliderProps = {
  banners: Banner[];
};

export default function BannerSlider({
  banners,
}: BannerSliderProps) {
  const [currentSlide, setCurrentSlide] =
    useState(0);

  // auto slide
  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % banners.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="min-h-[90vh]">
      <div className="relative overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 h-screen">

        {banners.length ? (
          banners.map((item, index) => (
            <img
              key={item._id}
              src={item.imageUrl}
              alt="Banner"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          ))
        ) : (
          <div className="h-full w-full flex items-center justify-center text-neutral-300 dark:text-neutral-700">
            <FiGrid className="h-12 w-12" />
          </div>
        )}

        {/* Left Button */}
        {banners.length > 1 && (
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) =>
                  (prev - 1 + banners.length) %
                  banners.length
              )
            }
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 dark:bg-black/60 p-2"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Button */}
        {banners.length > 1 && (
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) =>
                  (prev + 1) % banners.length
              )
            }
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 dark:bg-black/60 p-2"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Badge */}
        <div className="absolute bottom-6 left-6">
          <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-black/80 px-4 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700">
            New Arrivals
          </span>
        </div>
      </div>
    </section>
  );
}