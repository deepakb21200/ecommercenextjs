"use client";

import Link from "next/link";
import { formatPrice } from "@/config/constants";

export type ProductColor = {
  hex: string;
  name?: string;
};

export type ProductCardProduct = {
  _id: string;
  title: string;
  brand: string;
  image: string;
  price: number;
  finalPrice: number;
  salePercentage?: number;
  stock: number;
  colors: ProductColor[];
};

type Props = {
  product: ProductCardProduct;
};

export default function Products({ product }: Props) {
  return (
    <Link
      href={`/collection/${product._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 bg-white border border-[hsl(40,20%,88%)] hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[4/5] overflow-hidden relative bg-[hsl(40,20%,95%)]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-[hsl(220,10%,65%)]">
            No Image
          </div>
        )}

        {product.salePercentage != null && product.salePercentage > 0 && (
          <span
            className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
            style={{
              background:
                "linear-gradient(135deg, hsl(15,85%,60%), hsl(25,85%,55%))",
              boxShadow: "0 2px 8px hsl(15,85%,60%,0.4)",
            }}
          >
            {product.salePercentage}% OFF
          </span>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-[hsl(220,20%,15%,0.5)]">
            <span className="rounded-xl px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm bg-[hsl(220,20%,15%,0.7)]">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[hsl(174,62%,38%)]">
          {product.brand}
        </p>

        <p className="line-clamp-2 text-sm font-semibold leading-snug text-[hsl(220,20%,15%)]">
          {product.title}
        </p>

        {product.colors.length > 0 && (
          <div className="flex gap-1.5 mt-0.5">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color.hex}
                title={color.name}
                className="h-3.5 w-3.5 rounded-full"
                style={{
                  background: color.hex,
                  border: "1.5px solid hsl(40,20%,82%)",
                }}
              />
            ))}

            {product.colors.length > 5 && (
              <span className="text-[10px] text-[hsl(220,10%,55%)]">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-base font-bold text-[hsl(220,20%,15%)]">
              {formatPrice(product.finalPrice)}
            </p>

          {product.salePercentage! > 0 &&  (
              <p className="text-xs line-through text-[hsl(220,10%,65%)]">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          {product.stock <= 5 && product.stock > 0 && (
            <span
              className="rounded-lg px-2 py-0.5 text-[10px] font-semibold"
              style={{
                background: "hsl(38,95%,50%,0.1)",
                color: "hsl(38,95%,40%)",
              }}
            >
              {product.stock} left
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}