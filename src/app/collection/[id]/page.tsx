"use client";

import { FiArrowLeft } from "react-icons/fi";
import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CustomerProductDetailsGallery from "@/components/Home/products/details/Customerproductdetailsgallery";
import CustomerProductDetailsSummary from "@/components/Home/products/details/Customerproductdetailssummary";
import CustomerProductRelatedCard from "@/components/Home/products/details/CustomerProductRelatedCard ";
import { Commonloader } from "@/components/admin/Loader";
import { useAuthStore } from "@/components/user/store/api";
import { useCustomerProductDetailsStore } from "@/store/home/products/store";
import { useCustomerWishlistStore } from "@/store/home/wishlist/store";
 

function CollectionDetails() {
  const params = useParams();
  const id = (params?.id as string) || "";

  const user = useAuthStore((s) => s.user);
  const isSignedIn = !!user;

  const {
    loadProduct,
    clear,
    data,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    toggleWishlist,
    addToCart,
  } = useCustomerProductDetailsStore((state) => state);

  const wishlistItems = useCustomerWishlistStore((state) => state.items);

  const product = data?.product ?? null;
  const relatedProducts = data?.relatedProducts ?? [];
  const isWishlistActive = !!product
    ? wishlistItems.some((item) => item.productId === product._id)
    : false;

  useEffect(() => {
    void loadProduct(id);
    return () => { clear(); };
  }, [clear, id, loadProduct]);

  if (!product) return <Commonloader />;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

      {/* ── Top bar ── */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Collections
          </Link>
        </div>
      </div>

      {/* ── Brand + Title strip ── */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 mb-1">
            {product.brand}
          </p>
          <h1 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 max-w-3xl leading-snug">
            {product.title}
          </h1>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <CustomerProductDetailsGallery
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <CustomerProductDetailsSummary
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            setSelectedColor={setSelectedColor}
            setSelectedSize={setSelectedSize}
            toggleWishlist={() => toggleWishlist(true, true, isSignedIn, isWishlistActive)}
            isWishlistActive={isWishlistActive}
            onAddToCart={() => addToCart(true, true, isSignedIn)}
          />
        </div>

        {/* ── Related products ── */}
        {relatedProducts.length ? (
          <section className="mt-16 pt-10 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 mb-1">
              You may also like
            </p>
            <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-6">
              Related Products
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((item) => (
                <CustomerProductRelatedCard key={item._id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default CollectionDetails;