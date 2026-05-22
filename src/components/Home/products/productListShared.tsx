import { CustomerProduct } from "./types";

 

export const BRAND_OPTIONS = [
  "Nike",
  "Adidas",
  "Puma",
  "Zara",
  "H&M",
  "Levi's",
  "Uniqlo",
  "Mango",
  "Calvin Klein",
  "Tommy Hilfiger",
];

export const SIZE_OPTIONS = ["S", "M", "L", "XL"] as const;



export type FacetKey = "category" | "brand" | "color" | "size";

export type CustomerProductFilters = {
  category: string;
  brand: string;
  color: string;
  size: string;
};


export function getCoverImage(product: CustomerProduct) {
  return (
    product.images.find((item) => item.isCover)?.url ||product.images[0].url || ""
  );
}

export function extractSalePrice(product: CustomerProduct) {
  if (!product.salePercentage) return product.price;

  return Math.round(
    product.price - (product.price * product.salePercentage) / 100,
  );
}

