import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

export default auth((req: NextRequest & { auth: { user?: { role?: string } } | null }) => {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login'

  if (isAdminRoute) {
    const session = req.auth
    const isAdmin = session?.user?.role === 'admin'

    if (!session || !isAdmin) {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin((?!/login).*)'],
}