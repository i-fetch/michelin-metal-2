// middleware.ts  (project root)
import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Public routes — always allow
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  const isLoggedIn = !!token
  const isAdmin = token?.role === 'admin'

  // Login page
  if (pathname === '/admin/login') {
    if (isLoggedIn && isAdmin) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
    return NextResponse.next()
  }

  // All other /admin/* routes require authenticated admin
  if (!isLoggedIn || !isAdmin) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
