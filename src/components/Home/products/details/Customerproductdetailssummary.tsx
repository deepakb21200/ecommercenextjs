import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { CustomerProduct,   } from "../types";
import { extractSalePrice } from "../productListShared";
import { formatPrice } from "@/config/constants";
import CustomerProductOptionsGroup from "./Customerproductoptionsgroup";
import { useCustomerProductDetailsStore } from "@/store/home/products/store";
 


type CustomerProductDetailsSummaryProps = {
  product: CustomerProduct;
  toggleWishlist: () => Promise<void>;
  isWishlistActive: boolean;
  onAddToCart: () => Promise<void>;
};

function CustomerProductDetailsSummary({
  product,
  toggleWishlist, 
  isWishlistActive,
  onAddToCart}: CustomerProductDetailsSummaryProps) {


    // console.log("pro", product);
    
    
  const { selectedColor,selectedSize, setSelectedColor, setSelectedSize} = useCustomerProductDetailsStore((state) => state);
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <section className="flex flex-col gap-6">

      {/* ── Badges ── */}
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
          {product?.category?.name}
        </span>

        {product.stock > 0 ? (
          <span className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-900 dark:bg-neutral-100 px-3 py-1 text-xs font-medium text-white dark:text-neutral-900">
            {product.stock <= 5 ? `Only ${product.stock} left` : "In stock"}
          </span>
        ) : (
          <span className="rounded-full border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400">
            Out of stock
          </span>
        )}

        {hasSale && (
          <span className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-900 dark:bg-neutral-100 px-3 py-1 text-xs font-medium text-white dark:text-neutral-900">
            {product.salePercentage}% OFF
          </span>
        )}
      </div>

      {/* ── Meta ── */}
      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="space-y-0.5">
          <span className="block text-neutral-400 dark:text-neutral-500">Brand</span>
          <span className="block font-medium text-neutral-900 dark:text-neutral-100">{product.brand}</span>
        </div>
        <div className="space-y-0.5">
          <span className="block text-neutral-400 dark:text-neutral-500">Category</span>
          <span className="block font-medium text-neutral-900 dark:text-neutral-100">{product.category.name}</span>
        </div>
      </div>

      {/* ── Price ── */}
      <div className="flex flex-wrap items-end gap-3">
        <span className="text-3xl font-medium text-neutral-900 dark:text-neutral-100">
          {formatPrice(salePrice)}
        </span>
        {hasSale && (
          <span className="text-lg text-neutral-400 dark:text-neutral-500 line-through mb-0.5">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      {/* ── Description ── */}
      {product.description && (
        <p className="text-sm leading-7 text-neutral-500 dark:text-neutral-400 whitespace-pre-line">
          {product.description}
        </p>
      )}

      {/* ── Color options ── */}
      {product.colors.length ? (
        <CustomerProductOptionsGroup
          values={product.colors}
          selectedValue={selectedColor}
          onSelect={setSelectedColor}
          variant="color"
        />
      ) : null}

      {/* ── Size options ── */}
      {product.sizes.length ? (
        <CustomerProductOptionsGroup
          values={product.sizes}
          selectedValue={selectedSize}
          onSelect={setSelectedSize}
          variant="size"
        />
      ) : null}

      {/* ── Divider ── */}
      <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

      {/* ── Action buttons ── */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button  type="button"   disabled={product.stock < 1} onClick={() => void onAddToCart()}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-900
           dark:bg-neutral-100 px-6 py-3 text-sm font-medium text-white dark:text-neutral-900 transition
            hover:bg-neutral-700 dark:hover:bg-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed">
          <FiShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>

  

        <button
          type="button"
          onClick={() => void toggleWishlist()}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <FiHeart
            className={`h-4 w-4 transition-all ${isWishlistActive ? "fill-current text-red-500" : ""}`}
          />
          {isWishlistActive ? "Remove from Wishlist" : "Save to Wishlist"}
        </button>
      </div>
    </section>
  );
}

export default CustomerProductDetailsSummary;






































// import { FiHeart, FiShoppingBag } from "react-icons/fi";
// import { CustomerProduct, ProductSize } from "../types";
// import { extractSalePrice } from "../productListShared";
// import { formatPrice } from "@/config/constants";
// import CustomerProductOptionsGroup from "./Customerproductoptionsgroup";


// type CustomerProductDetailsSummaryProps = {
//   product: CustomerProduct;
//   selectedColor: string;
//   selectedSize: string;
//   setSelectedColor: (value: string) => void;
//   setSelectedSize: (value: ProductSize) => void;
//   toggleWishlist: () => Promise<void>;
//   isWishlistActive: boolean;
//   onAddToCart: () => Promise<void>;
// };

// function CustomerProductDetailsSummary({
//   product,
//   selectedColor,
//   selectedSize,
//   setSelectedColor,
//   setSelectedSize,
//   toggleWishlist,
//   isWishlistActive,
//   onAddToCart,
// }: CustomerProductDetailsSummaryProps) {
//   const salePrice = extractSalePrice(product);
//   const hasSale = product.salePercentage > 0;

//   return (
//     <section className="flex flex-col gap-6">

//       {/* ── Badges ── */}
//       <div className="flex flex-wrap gap-2">
//         <span className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
//           {product?.category?.name}
//         </span>

//         {product.stock > 0 ? (
//           <span className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-900 dark:bg-neutral-100 px-3 py-1 text-xs font-medium text-white dark:text-neutral-900">
//             {product.stock <= 5 ? `Only ${product.stock} left` : "In stock"}
//           </span>
//         ) : (
//           <span className="rounded-full border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400">
//             Out of stock
//           </span>
//         )}

//         {hasSale && (
//           <span className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-900 dark:bg-neutral-100 px-3 py-1 text-xs font-medium text-white dark:text-neutral-900">
//             {product.salePercentage}% OFF
//           </span>
//         )}
//       </div>

//       {/* ── Meta ── */}
//       <div className="grid gap-3 text-sm sm:grid-cols-2">
//         <div className="space-y-0.5">
//           <span className="block text-neutral-400 dark:text-neutral-500">Brand</span>
//           <span className="block font-medium text-neutral-900 dark:text-neutral-100">{product.brand}</span>
//         </div>
//         <div className="space-y-0.5">
//           <span className="block text-neutral-400 dark:text-neutral-500">Category</span>
//           <span className="block font-medium text-neutral-900 dark:text-neutral-100">{product.category.name}</span>
//         </div>
//       </div>

//       {/* ── Price ── */}
//       <div className="flex flex-wrap items-end gap-3">
//         <span className="text-3xl font-medium text-neutral-900 dark:text-neutral-100">
//           {formatPrice(salePrice)}
//         </span>
//         {hasSale && (
//           <span className="text-lg text-neutral-400 dark:text-neutral-500 line-through mb-0.5">
//             {formatPrice(product.price)}
//           </span>
//         )}
//       </div>

//       {/* ── Description ── */}
//       {product.description && (
//         <p className="text-sm leading-7 text-neutral-500 dark:text-neutral-400 whitespace-pre-line">
//           {product.description}
//         </p>
//       )}

//       {/* ── Color options ── */}
//       {product.colors.length ? (
//         <CustomerProductOptionsGroup
//           values={product.colors}
//           selectedValue={selectedColor}
//           onSelect={setSelectedColor}
//           variant="color"
//         />
//       ) : null}

//       {/* ── Size options ── */}
//       {product.sizes.length ? (
//         <CustomerProductOptionsGroup
//           values={product.sizes}
//           selectedValue={selectedSize}
//           onSelect={setSelectedSize}
//           variant="size"
//         />
//       ) : null}

//       {/* ── Divider ── */}
//       <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

//       {/* ── Action buttons ── */}
//       <div className="flex flex-col gap-3 sm:flex-row">
//         <button
//           type="button"
//           disabled={product.stock < 1}
//           onClick={() => void onAddToCart()}
//           className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-6 py-3 text-sm font-medium text-white dark:text-neutral-900 transition hover:bg-neutral-700 dark:hover:bg-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed"
//         >
//           <FiShoppingBag className="h-4 w-4" />
//           Add to Cart
//         </button>

//         <button
//           type="button"
//           onClick={() => void toggleWishlist()}
//           className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800"
//         >
//           <FiHeart
//             className={`h-4 w-4 transition-all ${isWishlistActive ? "fill-current text-red-500" : ""}`}
//           />
//           {isWishlistActive ? "Remove from Wishlist" : "Save to Wishlist"}
//         </button>
//       </div>
//     </section>
//   );
// }

// export default CustomerProductDetailsSummary;


