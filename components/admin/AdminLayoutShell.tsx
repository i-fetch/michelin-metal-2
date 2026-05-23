'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import type { ReactNode } from 'react'
import AdminSidebar from './Sidebar'

interface Props {
  user: { name?: string | null; email?: string | null }
  children: ReactNode
}

export default function AdminLayoutShell({ user, children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <AdminSidebar user={user} mobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="admin-main">
        <div className="admin-topbar">
          <button
            type="button"
            className="admin-sidebar-toggle"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open admin navigation"
          >
            <Menu size={16} />
            Menu
          </button>
        </div>

        {children}
      </div>

      {isSidebarOpen && (
        <button
          type="button"
          className="admin-backdrop"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close admin navigation"
        />
      )}
    </div>
  )
}
