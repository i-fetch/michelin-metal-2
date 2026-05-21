import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getAuthSession } from '@/auth'
import AdminSidebar from '@/components/admin/Sidebar'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getAuthSession()
  if (!session || (session.user as any)?.role !== 'admin') redirect('/admin/login')

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}
