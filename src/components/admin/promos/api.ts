import { AdminPromosResponse, PromoFormValues } from "./types";

const BASE_URL = "/api/admin/promos";

// ================= GET =================
export async function getAdminPromos() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch promos");
  }

  

  return res.json();
}

// ================= CREATE =================
export async function createAdminPromo(body:  PromoFormValues): Promise<AdminPromosResponse>  {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to create promo");
  }

  return res.json();
}

// ================= UPDATE =================
export async function updateAdminPromo(promoId: string,body: PromoFormValues): Promise<AdminPromosResponse> {
  const res = await fetch(`${BASE_URL}/${promoId}`, {
    method: "PATCH", // 👈 same as axios version
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to update promo");
  }

  return res.json();
}

// ================= DELETE =================
export async function deleteAdminPromo(promoId: string) {
  const res = await fetch(`${BASE_URL}/${promoId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete promo");
  }

  return res.json();
}