// components/admin/products/api.ts

import type { Category } from "@/components/admin/products/productstable/types";

const BASE_URL = "/api/admin";

// ─── Types ────────────────────────────────────────────────────────────────────

type Color = { hex: string; name: string };

type ProductFormBody = {
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string | number;
  salePercentage: string | number;
  stock: string | number;
  status: string;
  colors: Color[];
  sizes: string[];
  existingImages?: unknown[];
  coverImagePublicId?: string;
};

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getAdminCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function createAdminCategory(body: { name: string }): Promise<Category> {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function updateAdminCategory(
  categoryId: string,
  body: { name: string }
): Promise<Category> {
  const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getAdminProducts(search?: string) {
  const query = search?.trim()
    ? `?search=${encodeURIComponent(search.trim())}`
    : "";
  const res = await fetch(`${BASE_URL}/products${query}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
  console.log("e");
  
}

export async function getAdminProductById(productId: string) {
 
  
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    credentials: "include",
  });

  
  
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// ─── FormData builder ─────────────────────────────────────────────────────────

function buildProductFormData(body: ProductFormBody, files: File[]): FormData {
  const formData = new FormData();

  formData.append("title",          body.title);
  formData.append("description",    body.description);
  formData.append("category",       body.category);
  formData.append("brand",          body.brand);
  formData.append("price",          String(body.price));
  formData.append("salePercentage", String(body.salePercentage));
  formData.append("stock",          String(body.stock));
  formData.append("status",         body.status);

  // Colors — { hex, name }[] → JSON string
  formData.append("colors", JSON.stringify(body.colors ?? []));

  // Sizes — multiple values
  body.sizes.forEach((size) => formData.append("sizes", size));

  if (body.existingImages) {
    formData.append("existingImages", JSON.stringify(body.existingImages));
  }

  if (body.coverImagePublicId) {
    formData.append("coverImagePublicId", body.coverImagePublicId);
  }

  files.forEach((file) => formData.append("images", file));

  return formData;
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createAdminProduct(
  body: ProductFormBody,
  files: File[]
) {
  const formData = buildProductFormData(body, files);

  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to create product");
  return data;
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateAdminProduct(
  productId: string,
  body: ProductFormBody,
  files: File[]
) {
  const formData = buildProductFormData(body, files);

  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to update product");
  return data;
}



































// const BASE_URL = "/api/admin";

// // ================= CATEGORY =================

// export async function getAdminCategories() {
//   const res = await fetch(`${BASE_URL}/categories`);
//   if (!res.ok) throw new Error("Failed to fetch categories");
//   return res.json();
// }

// export async function createAdminCategory(body: { name: string }) {
//   const res = await fetch(`${BASE_URL}/categories`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   if (!res.ok) throw new Error("Failed to create category");
//   return res.json();
// }

// export async function updateAdminCategory(categoryId: string, body: { name: string }) {
//   const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   if (!res.ok) throw new Error("Failed to update category");
//   return res.json();
// }

// // ================= PRODUCTS =================

// export async function getAdminProducts(search?: string) {
//   const query = search?.trim() ? `?search=${encodeURIComponent(search.trim())}` : "";
//   const res = await fetch(`${BASE_URL}/products${query}`);
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return res.json();
// }

// export async function getAdminProductById(productId: string) {
//   const res = await fetch(`${BASE_URL}/products/${productId}`);
//   if (!res.ok) throw new Error("Failed to fetch product");
//   return res.json();
// }

// // ================= FORM DATA =================

// function buildProductFormData(body: any, files: File[]) {
//   const formData = new FormData();

//   formData.append("title", body.title);
//   formData.append("description", body.description);
//   formData.append("category", body.category);
//   formData.append("brand", body.brand);
//   formData.append("price", String(body.price));
//   formData.append("salePercentage", String(body.salePercentage));
//   formData.append("stock", String(body.stock));
//   formData.append("status", body.status);

//   // Colors — array of objects → JSON string
//   formData.append("colors", JSON.stringify(body.colors || []));

//   // Sizes — array of strings
//   body.sizes.forEach((size: string) => formData.append("sizes", size));

//   if (body.existingImages) {
//     formData.append("existingImages", JSON.stringify(body.existingImages));
//   }

//   if (body.coverImagePublicId) {
//     formData.append("coverImagePublicId", body.coverImagePublicId);
//   }

//   files.forEach((file) => formData.append("images", file));

//   return formData;
// }

// // ================= CREATE =================

// export async function createAdminProduct(body: any, files: File[]) {
//   const formData = buildProductFormData(body, files);

//   const res = await fetch(`${BASE_URL}/products`, {
//     method: "POST",
//     body: formData,
//   });

//   const data = await res.json()

//   if (!res.ok) {
//     throw new Error(data?.message || "Failed to create product");
//   }

//   return data;
// }

// // ================= UPDATE =================

// export async function updateAdminProduct(productId: string, body: any, files: File[]) {
//   const formData = buildProductFormData(body, files);

//   const res = await fetch(`${BASE_URL}/products/${productId}`, {
//     method: "PUT",
//     body: formData,
//     credentials: "include",
//   });

//   const data = await res.json()

//   if (!res.ok) {
//     throw new Error(data?.message || "Failed to update product");
//   }

//   return data;
// }