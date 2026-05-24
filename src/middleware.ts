import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_KEY = new TextEncoder().encode(process.env.JWT_KEY!);

async function verifyToken(token: string): Promise<{ role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_KEY);
    return payload as { role: string };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // ── Admin routes ──
  if (pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ── Login/Signup — already logged in ──
  if (pathname === "/login" || pathname === "/signup") {
    if (token) {
      const decoded = await verifyToken(token);
      if (decoded) {
        return NextResponse.redirect(
          new URL(decoded.role === "admin" ? "/admin" : "/", req.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/signup"],
};