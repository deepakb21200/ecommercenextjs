import { CustomerHomeResponse } from "./types";

const BASE_URL = "/api/customer";

export async function getCustomerHomeDateOverview(): Promise<CustomerHomeResponse> {
  const res = await fetch(`${BASE_URL}/home`);

  if (!res.ok) {
    throw new Error("Failed to fetch customer home data");
  }

  const data = await res.json();

  console.log("fetch",data);
  

  return data; // 👈 correct return
}