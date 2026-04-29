const BASE_URL = "/api/customer";

// ================= GET WISHLIST =================
export async function getCustomerWishlist() {
  const res = await fetch(`${BASE_URL}/wishlist`, {
    method: "GET",
    credentials: "include", // 👈 important for auth
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  const data = await res.json();
  return data.data;
}

// ================= ADD ITEM =================
export async function addCustomerWishlist(body: { productId: string }) {

  console.log("Add customer wishe");
  
  const res = await fetch(`${BASE_URL}/wishlist/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  console.log(res);
  
  if (!res.ok) {
    throw new Error("Failed to add wishlist item");
  }


  const data = await res.json();
  console.log("sdddddddddfdsf", data);
  console.log("123231", data.data);
  return data.data;
}

// ================= REMOVE ITEM =================
export async function removeCustomerWishlistItem(productId: string) {
  const res = await fetch(`${BASE_URL}/wishlist/items/${productId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to remove wishlist item");
  }

  const data = await res.json();
  return data.data;
}