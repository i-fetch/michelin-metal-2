// app/admin/(protected)/layout.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminLayoutShell from '@/components/admin/AdminLayoutShell'

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || session.user?.role !== 'admin') redirect('/admin/login')

  return (
    <AdminLayoutShell user={session.user}>
      {children}
    </AdminLayoutShell>
  )
}
