import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🍪 Extract cookie
  const cookie = request.headers.get("cookie") || "";
  const hasTempToken = cookie.includes("tempToken");

  let isAuthenticated = false;

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        cookie: cookie || "",
      },
    });

    if (res.ok) {
      isAuthenticated = true;
    }
  } catch (error) {
    // fallback → treat as not authenticated
    isAuthenticated = false;
  }

  // 🧭 ROUTING LOGIC

  // 1️⃣ Root route
  if (pathname === "/") {
    return NextResponse.next();
  }

  // 2️⃣ Auth routes
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 🔥 VERIFY OTP PAGE
  if (pathname.startsWith("/verify-otp")) {
    if (!hasTempToken) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }
  // 3️⃣ Protected routes
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/verify-otp", "/dashboard/:path*"],
};
