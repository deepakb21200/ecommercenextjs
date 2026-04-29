import { CreateProductBody, UpdateProductBody } from "./productstable/types";



const BASE_URL = "/api/admin";

// ================= CATEGORY =================

export async function getAdminCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function createAdminCategory(body: { name: string }) {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function updateAdminCategory(categoryId: string, body: { name: string }) {
  const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

// ================= PRODUCTS =================

export async function getAdminProducts(search?: string) {
  const query = search?.trim()
    ? `?search=${encodeURIComponent(search.trim())}`
    : "";

  const res = await fetch(`${BASE_URL}/products${query}`);
  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export async function getAdminProductById(productId: string) {
  const res = await fetch(`${BASE_URL}/products/${productId}`);
  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

// ================= FORM DATA =================

function buildProductFormData(
  body: CreateProductBody | UpdateProductBody,
  files: File[],
) {
  const formData = new FormData();

  formData.append("title", body.title);
  formData.append("description", body.description);
  formData.append("category", body.category);
  formData.append("brand", body.brand);
  formData.append("price", String(body.price));
  formData.append("salePercentage", String(body.salePercentage));
  formData.append("stock", String(body.stock));
  formData.append("status", body.status);

  // 👇 ADD THIS
  // formData.append("createdBy", body.createdBy);

  body.colors.forEach((color) => formData.append("colors", color));
  body.sizes.forEach((size) => formData.append("sizes", size));

  if ("existingImages" in body && body.existingImages) {
    formData.append("existingImages", JSON.stringify(body.existingImages));
  }

  if ("coverImagePublicId" in body && body.coverImagePublicId) {
    formData.append("coverImagePublicId", body.coverImagePublicId);
  }

  files.forEach((file) => formData.append("images", file));

  return formData;
}

// ================= CREATE =================

export async function createAdminProduct(body: any, files: File[]) {
  const formData = buildProductFormData(body, files);

  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: formData,
  });

  // if (!res.ok) throw new Error("Failed to create product3");
  // return res.json();


    // if (!res.ok) throw new Error("Failed to increase item");
    if (!res.ok) {
          const err = await res.json();
 
    
    // backend ka exact message throw karo
    throw new Error(err.message || "Failed to add item");
    }

  const data = await res.json();
  console.log(data);
  console.log(data.data,"?data.data");
  
  
  return data
}

// ================= UPDATE =================

export async function updateAdminProduct(
  productId: string,
  body: UpdateProductBody,
  files: File[]
) {
  const formData = buildProductFormData(body, files);
  console.log(productId);
  

  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PUT",
    body: formData,
      credentials: "include",   // 👈 yahi daalna hai
  });

  console.log(res,"u");
  
// console.log(res.message);

  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}