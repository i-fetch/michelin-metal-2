// app/admin/(protected)/layout.tsx
import { auth }     from '@/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/Sidebar'

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || session.user?.role !== 'admin') redirect('/admin/login')
  return (
    <div className="admin-wrap">
      <AdminSidebar user={session.user} />
      <main className="admin-main">{children}</main>
    </div>
  )
}
