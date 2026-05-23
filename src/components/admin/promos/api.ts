import { AdminPromosResponse, PromoFormValues } from "./types";

const BASE_URL = "/api/admin/promos";

// ================= GET =================
export async function getAdminPromos() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    credentials: "include",
  });




//  await new Promise((resolve) =>
//         setTimeout(resolve, 3000)
//       );

//       // manually error throw
//       throw new Error("Failed to fetch");






  if (!res.ok) {
    throw new Error("Failed to fetch promos");
  }
// let a = await res.json()
//   console.log(res.ok, a);
 

  

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