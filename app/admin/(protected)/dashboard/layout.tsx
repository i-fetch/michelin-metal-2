import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-dashboard-layout">{children}</div>
}
