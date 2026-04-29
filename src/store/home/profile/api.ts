import { CustomerAddressFormValues, CustomerAddressResponse } from "./types";

 

const BASE_URL = "/api/customer";

// ================= HELPER =================
async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  const data = await res.json();
  return data.data;
}

// ================= GET =================
export async function getCustomerAddresses(): Promise<CustomerAddressResponse> {
  return fetcher(`${BASE_URL}/addresses`);
}

// ================= CREATE =================
export async function createCustomerAddresses(
  body: CustomerAddressFormValues
): Promise<CustomerAddressResponse> {
  return fetcher(`${BASE_URL}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

// ================= UPDATE =================
export async function updateCustomerAddresses(
  addressId: string,
  body: CustomerAddressFormValues
): Promise<CustomerAddressResponse> {
  return fetcher(`${BASE_URL}/addresses/${addressId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

// ================= DELETE =================
export async function deleteCustomerAddress(
  addressId: string
): Promise<CustomerAddressResponse> {
  return fetcher(`${BASE_URL}/addresses/${addressId}`, {
    method: "DELETE",
  });
}