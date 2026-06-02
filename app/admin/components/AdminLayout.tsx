"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { signOut as nextAuthSignOut, useSession } from "next-auth/react"
import {
  LayoutDashboard, Package, PlusCircle, List, Home, Eye,
  MessageSquare, Settings, BarChart2, LogOut, Menu, X,
  Bell, Search, ChevronRight, ChevronLeft, Star,
} from "lucide-react"

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
      { label: "Analytics", icon: BarChart2, href: "/admin/analytics" },
    ],
  },
  {
    label: "Catalogue",
    items: [
      { label: "Products", icon: Package, href: "/admin/products", badge: "24" },
      { label: "Categories", icon: List, href: "/admin/categories" },
      { label: "Add Product", icon: PlusCircle, href: "/admin/products/new" },
    ],
  },
  {
    label: "Storefront",
    items: [
      { label: "Public Listing", icon: Home, href: "/product" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", icon: Settings, href: "/admin/settings" },
    ],
  },
]

interface AdminLayoutProps {
  children: React.ReactNode
  breadcrumbs?: { label: string; href?: string }[]
  title?: string
  actions?: React.ReactNode
}
export default function AdminLayout({ children, breadcrumbs, title, actions }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleSignOut = () => {
    // next-auth signOut; redirect to login page after sign-out
    nextAuthSignOut({ callbackUrl: "/signin" })
  }

  const displayName = (() => {
    const rawName = session?.user?.name ?? session?.user?.email ?? "Admin"
    const firstChunk = rawName.split(/[@\s._-]+/)[0]
    return firstChunk.length > 0
      ? firstChunk[0].toUpperCase() + firstChunk.slice(1)
      : "Admin"
  })()

  const userInitials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "AD"

  const sidebarCollapsed = mobileOpen ? false : collapsed

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="h-14 flex items-center gap-2.5 px-3.5 border-b border-gray-100 flex-shrink-0">
        <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="font-semibold text-[15px] text-gray-900 overflow-hidden whitespace-nowrap"
            >
              Mechelin Admin
            </motion.span>
          )}
        </AnimatePresence>
        {mobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="ml-auto inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors md:hidden"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-none">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="px-2 mb-1">
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-semibold tracking-widest text-gray-400 px-2 py-2 uppercase"
                >
                  {section.label}
                </motion.div>
              )}
            </AnimatePresence>
            {section.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ x: sidebarCollapsed ? 0 : 2 }}
                    className={`
                      flex items-center gap-2.5 px-2 py-[7px] rounded-lg mb-0.5 cursor-pointer transition-colors
                      ${sidebarCollapsed ? "justify-center" : ""}
                      ${isActive
                        ? "bg-green-50 text-green-800 font-medium"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      }
                    `}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-green-700" : ""}`} />
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="text-[13.5px] overflow-hidden whitespace-nowrap flex-1"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!sidebarCollapsed && item.badge && (
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-gray-100 p-2">
        <div className={`flex items-center gap-2.5 px-2 py-[7px] rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${sidebarCollapsed ? "justify-center" : ""}`}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
            {userInitials}
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 overflow-hidden"
              >
                <div className="text-[12.5px] font-medium text-gray-800 whitespace-nowrap">
                  {displayName}
                </div>
                <div className="text-[11px] text-gray-400 whitespace-nowrap">
                  {session?.user?.role === "admin" ? "Administrator" : "User"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!sidebarCollapsed && (
            <button onClick={handleSignOut} className="p-1 rounded-md text-gray-400 hover:text-red-500 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-4 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-20"
      >
        <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronLeft className="w-3 h-3 text-gray-500" />
        </motion.div>
      </button>
    </>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 56 : 220 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex flex-col bg-white border-r border-gray-200 relative flex-shrink-0 overflow-visible"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[220px] bg-white border-r border-gray-200 z-50 flex flex-col md:hidden overflow-hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center gap-3 px-4 md:px-5 flex-shrink-0">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Breadcrumbs */}
          {breadcrumbs && (
            <nav className="hidden sm:flex items-center gap-1.5 text-[13px] text-gray-400">
              {breadcrumbs.map((bc, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
                  {bc.href ? (
                    <Link href={bc.href} className="hover:text-gray-700 transition-colors">{bc.label}</Link>
                  ) : (
                    <span className="text-gray-800 font-medium">{bc.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Search */}
          <div className="flex-1 max-w-xs ml-4 relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products…"
              className="w-full pl-8 pr-3 py-1.5 bg-gray-100 border border-transparent rounded-lg text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-green-500/10 transition-all"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button className="hidden w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
            </button>
            {actions}
            <Link
              href="/admin/products/new"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[13px] font-medium transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Product</span>
            </Link>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-[11px] font-semibold text-white cursor-pointer">
              {userInitials}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-5 md:p-6 max-w-[1200px]">
            {title && (
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight">{title}</h1>
                </div>
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
