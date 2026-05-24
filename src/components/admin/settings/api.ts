import { AdminBannersResponse } from "./types";

const BASE_URL = "/api/admin/settings";


 

// ================= GET =================
export async function getAdminBanners(): Promise<AdminBannersResponse> {
  const res = await fetch(`${BASE_URL}/banners`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch banners");
  }

  return res.json();
}

// ================= UPLOAD =================
export async function uploadAdminBanners(
  formData: FormData
): Promise<AdminBannersResponse> {
  const res = await fetch(`${BASE_URL}/banners`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) throw new Error("Upload failed");

  return res.json();
}





export async function deleteAdminBanner(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("Backend Error:", data);  
    throw new Error(data?.message || "Failed to delete banner");
  }

  return data;
}