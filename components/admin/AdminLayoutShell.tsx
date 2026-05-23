'use client'

import { usePathname } from 'next/navigation'
import AdminSidebar from './Sidebar'
import type { ReactNode } from 'react'

export default function AdminLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="admin-layout">
      <AdminSidebar user={{ name: 'Admin', email: null }} />
      <main className="admin-main">{children}</main>
    </div>
  )
}
