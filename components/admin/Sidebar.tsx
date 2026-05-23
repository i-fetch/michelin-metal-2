// components/admin/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/actions/auth'
import {
  LayoutDashboard,
  Package,
  Plus,
  LogOut,
  ExternalLink,
  Layers,
  X,
} from 'lucide-react'

interface Props {
  user: { name?: string | null; email?: string | null; role?: string | null }
  mobileOpen?: boolean
  onClose?: () => void
}

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/products/create', label: 'Add Product', icon: Plus },
]

export default function AdminSidebar({ user, mobileOpen, onClose }: Props) {
  const path = usePathname()

  return (
    <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div className="px-5 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.2)' }}
          >
            <Layers size={16} style={{ color: '#16a34a' }} />
          </div>
          <div>
            <p
              className="text-sm font-bold leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--tx-primary)',
                letterSpacing: '0.06em',
              }}
            >
              MECHELIN
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--tx-faint)' }}>
              Admin Console
            </p>
          </div>
        </div>

        {onClose ? (
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <p
          className="text-[9px] font-bold uppercase tracking-widest px-3 py-2 mt-1"
          style={{ color: 'var(--tx-faint)' }}
        >
          Navigation
        </p>
        {NAV.map(item => {
          const active = item.href === '/admin/dashboard'
            ? path === item.href
            : path.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
              style={{
                background: active ? 'rgba(22,163,74,0.12)' : 'transparent',
                color: active ? '#16a34a' : 'var(--tx-muted)',
                borderLeft: active ? '2px solid #16a34a' : '2px solid transparent',
              }}
            >
              <item.icon size={15} />
              {item.label}
              {item.href === '/admin/products/create' && (
                <span
                  className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(22,163,74,0.2)', color: '#16a34a' }}
                >
                  NEW
                </span>
              )}
            </Link>
          )
        })}

        <p
          className="text-[9px] font-bold uppercase tracking-widest px-3 py-2 mt-4"
          style={{ color: 'var(--tx-faint)' }}
        >
          Site
        </p>
        <Link
          href="/products"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
          style={{ color: 'var(--tx-muted)' }}
        >
          <ExternalLink size={15} />
          View Live Site
        </Link>
      </nav>

      {/* User */}
      <div className="p-3" style={{ borderTop: '1px solid var(--border)' }}>
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
            style={{ background: 'rgba(22,163,74,0.2)', color: '#16a34a' }}
          >
            {user.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: 'var(--tx-primary)' }}>
              {user.name ?? 'Admin'}
            </p>
            <p className="text-[10px] truncate" style={{ color: 'var(--tx-faint)' }}>
              {user.email}
            </p>
            <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--tx-faint)' }}>
              {user.role ? user.role.toUpperCase() : 'ADMIN'}
            </p>
          </div>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all"
            style={{ color: 'var(--tx-faint)' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#f87171'
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--tx-faint)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <LogOut size={13} /> Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
