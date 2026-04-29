 
import { formatPrice } from "@/config/constants";
import Link from "next/link";
import { extractSalePrice, getCoverImage } from "../productListShared";
import { CustomerProduct } from "../types";

type CustomerProductRelatedCardProps = {
  product: CustomerProduct;
};

function CustomerProductRelatedCard({ product }: CustomerProductRelatedCardProps) {
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <Link
      href={`/collection/${product._id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {coverImage ? (
          <img
            src={coverImage}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400 dark:text-neutral-600">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
          {product.brand}
        </p>
        <h3 className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {formatPrice(salePrice)}
          </span>
          {hasSale && (
            <span className="text-xs text-neutral-400 dark:text-neutral-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CustomerProductRelatedCard;