"use client";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CustomerProductDetailsGallery from "@/components/Home/products/details/Customerproductdetailsgallery";
import CustomerProductDetailsSummary from "@/components/Home/products/details/Customerproductdetailssummary";
import { useAuthStore } from "@/components/user/store/api";
import { useCustomerProductDetailsStore } from "@/store/home/products/store";
import { useCustomerWishlistStore } from "@/store/home/wishlist/store";
import Products from "@/components/Home/ProductCarfs";
import { HomeLoader } from "../../HomeLoader";

function CollectionDetails() {
  const params = useParams();
  const id = (params?.id as string) || "";

  const user = useAuthStore((s) => s.user)

  // const isSignedIn = Boolean(user)
  console.log("s");

  const { loadProduct, clear, data, toggleWishlist, addToCart } = useCustomerProductDetailsStore((state) => state)


  const wishlistItems = useCustomerWishlistStore((state) => state.items);
  const product = data?.product ?? null;
  const relatedProducts = data?.relatedProducts ?? [];
  const isWishlistActive = product ? wishlistItems.some((item) => item.productId === product._id) : false;

  useEffect(() => {


    loadProduct(id);





    return () => { clear(); };
  }, [clear, id, loadProduct]);



  useEffect(() => {
    // console.log("product", product);
    //   console.log("redalted", relatedProducts);

    console.log(data);
  }, [relatedProducts, product, data])


  useEffect(() => {
    // console.log(data,"ddata");
    // console.log(wishlistItems,"po");


  }, [data, wishlistItems])

  if (!product) return <HomeLoader />

  return (
    <div className="min-h-screen" style={{ background: "hsl(40,33%,98%)" }}>

      {/* Top bar */}
      <div
        className="sticky top-0 z-20 backdrop-blur-md px-4 py-3 sm:px-6"
        style={{
          background: "hsl(40,33%,98%,0.92)",
          borderBottom: "1px solid hsl(40,20%,88%)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all"
            style={{ color: "hsl(220,10%,55%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(174,62%,38%)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(220,10%,55%)")}
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Collections
          </Link>
        </div>
      </div>

      {/* Brand + Title strip */}
      <div className="px-4 py-8 sm:px-6" style={{ background: "white", borderBottom: "1px solid hsl(40,20%,88%)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: "hsl(174,62%,38%,0.08)",
                color: "hsl(174,62%,38%)",
                border: "1px solid hsl(174,62%,38%,0.2)",
              }}
            >
              {product.brand}
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium"
              style={{
                background: "hsl(40,20%,92%)",
                color: "hsl(220,10%,45%)",
              }}
            >
              {product.category?.name}
            </span>
          </div>
          <h1
            className="text-2xl font-bold max-w-3xl leading-snug sm:text-3xl"
            style={{ color: "hsl(220,20%,15%)" }}
          >
            {product.title}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <CustomerProductDetailsGallery product={product} />
          <CustomerProductDetailsSummary
            product={product}
            toggleWishlist={() => toggleWishlist(isWishlistActive)}
            isWishlistActive={isWishlistActive}
            onAddToCart={() => addToCart()}
          />
        </div>

        {/* Related products */}
        {relatedProducts.length ? (
          <section
            className="mt-16 pt-10"
            style={{ borderTop: "1px solid hsl(40,20%,88%)" }}
          >
            <div className="mb-6">
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-1"
                style={{ color: "hsl(174,62%,38%)" }}
              >
                You may also like
              </p>
              <h2
                className="text-xl font-bold"
                style={{ color: "hsl(220,20%,15%)" }}
              >
                Related Products
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((item) => (

                <Products key={item._id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default CollectionDetails;




















































// "use client";
// import { FiArrowLeft } from "react-icons/fi";
// import { useEffect } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import CustomerProductDetailsGallery from "@/components/Home/products/details/Customerproductdetailsgallery";
// import CustomerProductDetailsSummary from "@/components/Home/products/details/Customerproductdetailssummary";
// import CustomerProductRelatedCard from "@/components/Home/products/details/CustomerProductRelatedCard ";
// import { Commonloader } from "@/components/admin/Loader";
// import { useAuthStore } from "@/components/user/store/api";
// import { useCustomerProductDetailsStore } from "@/store/home/products/store";
// import { useCustomerWishlistStore } from "@/store/home/wishlist/store";

// function CollectionDetails() {
//   const params = useParams();
//   const id = (params?.id as string) || "";

//   const user = useAuthStore((s) => s.user);
//   const isSignedIn = !!user;

//   const {loadProduct, clear, data, selectedImage, setSelectedImage,
//     selectedColor, setSelectedColor, selectedSize, setSelectedSize,
//     toggleWishlist, addToCart,
//   } = useCustomerProductDetailsStore((state) => state);

//   const wishlistItems = useCustomerWishlistStore((state) => state.items);
//   const product = data?.product ?? null;
//   const relatedProducts = data?.relatedProducts ?? [];
//   const isWishlistActive = !!product
//     ? wishlistItems.some((item) => item.productId === product._id)
//     : false;

//   useEffect(() => {
//     void loadProduct(id);
//     return () => { clear(); };
//   }, [clear, id, loadProduct]);

//   if (!product) return <Commonloader />;

//   return (
//     <div className="min-h-screen" style={{ background: "hsl(40,33%,98%)" }}>

//       {/* Top bar */}
//       <div
//         className="sticky top-0 z-20 backdrop-blur-md px-4 py-3 sm:px-6"
//         style={{
//           background: "hsl(40,33%,98%,0.92)",
//           borderBottom: "1px solid hsl(40,20%,88%)",
//         }}
//       >
//         <div className="mx-auto max-w-7xl">
//           <Link
//             href="/collections"
//             className="inline-flex items-center gap-2 text-sm font-medium transition-all"
//             style={{ color: "hsl(220,10%,55%)" }}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(174,62%,38%)")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(220,10%,55%)")}
//           >
//             <FiArrowLeft className="h-4 w-4" />
//             Back to Collections
//           </Link>
//         </div>
//       </div>

//       {/* Brand + Title strip */}
//       <div
//         className="px-4 py-8 sm:px-6"
//         style={{
//           background: "white",
//           borderBottom: "1px solid hsl(40,20%,88%)",
//         }}
//       >
//         <div className="mx-auto max-w-7xl">
//           <div className="flex items-center gap-2 mb-2">
//             <span
//               className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
//               style={{
//                 background: "hsl(174,62%,38%,0.08)",
//                 color: "hsl(174,62%,38%)",
//                 border: "1px solid hsl(174,62%,38%,0.2)",
//               }}
//             >
//               {product.brand}
//             </span>
//             <span
//               className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium"
//               style={{
//                 background: "hsl(40,20%,92%)",
//                 color: "hsl(220,10%,45%)",
//               }}
//             >
//               {product.category?.name}
//             </span>
//           </div>
//           <h1
//             className="text-2xl font-bold max-w-3xl leading-snug sm:text-3xl"
//             style={{ color: "hsl(220,20%,15%)" }}
//           >
//             {product.title}
//           </h1>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//         <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
//           <CustomerProductDetailsGallery
//             product={product}
//             selectedImage={selectedImage}
//             setSelectedImage={setSelectedImage}
//           />
//           <CustomerProductDetailsSummary
//             product={product}
//             selectedColor={selectedColor}
//             selectedSize={selectedSize}
//             setSelectedColor={setSelectedColor}
//             setSelectedSize={setSelectedSize}
//             toggleWishlist={() => toggleWishlist(true, true, isSignedIn, isWishlistActive)}
//             isWishlistActive={isWishlistActive}
//             onAddToCart={() => addToCart(true, true, isSignedIn)}
//           />
//         </div>

//         {/* Related products */}
//         {relatedProducts.length ? (
//           <section
//             className="mt-16 pt-10"
//             style={{ borderTop: "1px solid hsl(40,20%,88%)" }}
//           >
//             <div className="mb-6">
//               <p
//                 className="text-[11px] font-bold uppercase tracking-widest mb-1"
//                 style={{ color: "hsl(174,62%,38%)" }}
//               >
//                 You may also like
//               </p>
//               <h2
//                 className="text-xl font-bold"
//                 style={{ color: "hsl(220,20%,15%)" }}
//               >
//                 Related Products
//               </h2>
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//               {relatedProducts.map((item) => (
//                 <CustomerProductRelatedCard key={item._id} product={item} />
//               ))}
//             </div>
//           </section>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// export default CollectionDetails;