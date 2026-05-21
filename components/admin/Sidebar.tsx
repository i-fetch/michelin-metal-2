'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, LogOut, ChevronRight } from 'lucide-react'
import { logoutAction } from '@/actions/products'

const nav = [
  { href: '/admin/dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/products',  label: 'Products',   icon: Package },
]

export default function AdminSidebar() {
  const path = usePathname()

  return (
    <aside
      className="hidden lg:flex flex-col w-60 min-h-screen border-r"
      style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--clr-green)' }}>
          Mechelin Metals
        </p>
        <p className="text-xs" style={{ color: 'var(--tx-faint)' }}>Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = path.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group"
              style={{
                color:      active ? 'var(--clr-green)' : 'var(--tx-secondary)',
                background: active ? 'rgba(22,163,74,0.08)' : 'transparent',
              }}
            >
              <Icon size={16} />
              {label}
              {active && <ChevronRight size={13} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{ color: 'var(--tx-muted)' }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
