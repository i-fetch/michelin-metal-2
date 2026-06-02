// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Paths that are strictly protected
const AUTH_ROUTES = ["/admin"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from the admin login page
  if (token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const isAdminRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isLoginRoute = pathname === "/signin";

  if (isAdminRoute && !isLoginRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

