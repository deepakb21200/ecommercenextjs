export const BRANDS = [
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
] as const;

export const SIZE_OPTIONS = ["S", "M", "L", "XL"] as const;



export function formatPrice(val: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}
