// lib/auth.ts — ek jagah likho, har route mein import karo

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type DecodedToken = { id: string; role: string };
type AuthResult = { decoded: DecodedToken; error?: never; status?: never }
  | { error: string; status: number; decoded?: never };

export function requireAdmin(req: NextRequest): AuthResult {
  const token = req.cookies.get("token")?.value;
  if (!token) return { error: "Unauthorized", status: 401 };
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY!) as DecodedToken;
    if (decoded.role !== "admin") return { error: "Admin access only", status: 403 };
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

export function getAuthUser(req: NextRequest): AuthResult {
  const token = req.cookies.get("token")?.value;
  if (!token) return { error: "Unauthorized", status: 401 };
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY!) as DecodedToken;
    // const decoded = jwt.verify(token, process.env.JWT_KEY!) 
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}









//  import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// type DecodedToken = { id: string; role: string };

// export type AuthResult =
//   | { decoded: DecodedToken; error?: never; status?: never }
//   | { error: string; status: number; decoded?: never };

// export function requireAdmin(req: NextRequest): AuthResult {
//   const token = req.cookies.get("token")?.value;
//   if (!token) return { error: "Unauthorized", status: 401 };
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_KEY!) as DecodedToken;
//     if (decoded.role !== "admin") return { error: "Admin access only", status: 403 };
//     return { decoded };
//   } catch {
//     return { error: "Invalid token", status: 401 };
//   }
// }

// export function getAuthUser(req: NextRequest): AuthResult {
//   const token = req.cookies.get("token")?.value;
//   if (!token) return { error: "Unauthorized", status: 401 };
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_KEY!) as DecodedToken;
//     return { decoded };
//   } catch {
//     return { error: "Invalid token", status: 401 };
//   }
// }