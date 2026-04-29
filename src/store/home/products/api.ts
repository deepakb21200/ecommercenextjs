import { CustomerProduct, CustomerProductDetailsResponse, GetCustomerProductsParams, ProductCategory } from "@/components/Home/products/types";


const BASE_URL = "/api/customer";

// ================= CATEGORIES =================
export async function getCustomerCategories(): Promise<ProductCategory[]> {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

// ================= PRODUCTS =================
export async function getCustomerProducts(
  params?: GetCustomerProductsParams
): Promise<CustomerProduct[]> {
  const searchParams = new URLSearchParams();

  if (params?.category) searchParams.set("category", params.category);
  if (params?.brand) searchParams.set("brand", params.brand);
  if (params?.color) searchParams.set("color", params.color);
  if (params?.size) searchParams.set("size", params.size);
  if (params?.sort) searchParams.set("sort", params.sort);

  const queryString = searchParams.toString();

  const url = queryString
    ? `${BASE_URL}/products?${queryString}`
    : `${BASE_URL}/products`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

// ================= PRODUCT DETAILS =================
export async function getCustomerProductDetails(
  productId: string
): Promise<CustomerProductDetailsResponse> {
  console.log("prossss",productId);
  
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "GET",
    credentials: "include",
  });

  console.log(res,"sdfffffffff");
  

  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }

  return res.json();
}