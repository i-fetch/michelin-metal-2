// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  const isAuthenticated = !!token;
  const isAdmin = token?.role === "admin";

  // Allow non-admin routes
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Prevent logged-in admin from seeing login page again
  if (isLoginPage && isAuthenticated && isAdmin) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", req.url)
    );
  }

  // Protect all admin pages
  if (!isAuthenticated || !isAdmin) {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};