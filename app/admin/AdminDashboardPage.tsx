"use client"

import { Suspense, useMemo } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

import { Package, CheckCircle, MessageSquare, Star, ArrowUpRight, ArrowDownRight, TrendingUp, MoreHorizontal } from "lucide-react"
import AdminLayout from "./components/AdminLayout"
import { PRODUCT_CATEGORIES } from "@/types"
import { CategoryBadge, StatusBadge } from "./components/custom-ui/Badge"
import { DashboardSkeleton } from "./components/custom-ui/Skeletons"

function getTimeOfDay(hour: number) {
  if (hour >= 5 && hour < 12) return "morning"
  if (hour >= 12 && hour < 18) return "afternoon"
  if (hour >= 18 && hour < 22) return "evening"
  return "night"
}

const GREETING_LABELS = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  night: "Good evening",
} as const

function getGreeting(name = "there") {
  const hour = new Date().getHours()
  const timeOfDay = getTimeOfDay(hour)
  return `${GREETING_LABELS[timeOfDay]}, ${name}`
}

function shortFriendlyName(raw?: string | null) {
  if (!raw) return "there"
  const candidate = raw.split(/[@\s._-]+/).filter(Boolean)[0] ?? raw
  return candidate.charAt(0).toUpperCase() + candidate.slice(1)
}

// ─── Mock data (replace with real server action calls) ──────────────────────
const STATS = [
  {
    label: "Total Products",
    value: "24",
    change: "+3 this month",
    up: true,
    icon: <Package className="w-4 h-4" style={{ color: "#16a34a" }} />,
    iconBg: "#dcfce7",
  },
  {
    label: "Active Listings",
    value: "18",
    change: "75% of total",
    up: true,
    icon: <CheckCircle className="w-4 h-4" style={{ color: "#2563eb" }} />,
    iconBg: "#dbeafe",
  },
  {
    label: "Quote Requests",
    value: "7",
    change: "+2 new today",
    up: true,
    icon: <MessageSquare className="w-4 h-4" style={{ color: "#d97706" }} />,
    iconBg: "#fef9c3",
  },
  {
    label: "Featured Products",
    value: "6",
    change: "1 removed",
    up: false,
    icon: <Star className="w-4 h-4" style={{ color: "#7c3aed" }} />,
    iconBg: "#f3e8ff",
  },
]

const ACTIVITY = [
  { emoji: "📦", bg: "#dcfce7", text: "Copper Wire Scrap was published", time: "2 minutes ago" },
  { emoji: "✏️", bg: "#dbeafe", text: "Aluminium UBC specs updated", time: "1 hour ago" },
  { emoji: "💬", bg: "#fef9c3", text: "New quote request for Lead Battery Scrap", time: "3 hours ago" },
  { emoji: "⭐", bg: "#f3e8ff", text: "Brass Radiator set as featured", time: "Yesterday" },
  { emoji: "🗑️", bg: "#fee2e2", text: "Zinc Ingots (Draft) deleted", time: "2 days ago" },
]

const RECENT_PRODUCTS = [
  { emoji: "🔩", title: "Aluminium UBC Scrap", slug: "aluminium-ubc-scrap", category: "aluminium", status: "active" as const, price: "$1,200/MT", featured: true },
  { emoji: "⚙️", title: "Copper Wire Scrap", slug: "copper-wire-scrap", category: "metals", status: "active" as const, price: "Request Quote", featured: false },
  { emoji: "✨", title: "Brass Radiator Scrap", slug: "brass-radiator-scrap", category: "non-ferrous", status: "draft" as const, price: "$950/MT", featured: false },
]

const CATEGORY_COUNTS = [
  { id: "aluminium", count: 9, total: 24 },
  { id: "metals", count: 7, total: 24 },
  { id: "non-ferrous", count: 5, total: 24 },
  { id: "bulk", count: 3, total: 24 },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayout
      breadcrumbs={[{ label: "Admin" }, { label: "Dashboard" }]}
    >
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </AdminLayout>
  )
}

function DashboardContent() {
  const { data: session } = useSession()
  const name = shortFriendlyName(session?.user?.name ?? session?.user?.email ?? "there")
  const greeting = useMemo(() => getGreeting(name), [name])

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight">
            {greeting} 👋
          </h1>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">
          <TrendingUp className="w-3.5 h-3.5" />
          Last 30 days
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-medium text-gray-500">{stat.label}</span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: stat.iconBg }}
              >
                {stat.icon}
              </div>
            </div>
            <div className="text-[26px] font-semibold text-gray-900 tracking-tight leading-none mb-1.5 font-mono">
              {stat.value}
            </div>
            <div className={`flex items-center gap-1 text-[11.5px] font-medium ${stat.up ? "text-green-700" : "text-red-600"}`}>
              {stat.up
                ? <ArrowUpRight className="w-3 h-3" />
                : <ArrowDownRight className="w-3 h-3" />
              }
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
        {/* Activity feed */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-gray-900">Recent Activity</h2>
            <Link href="/admin/activity" className="text-[12.5px] font-medium text-green-700 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-0 divide-y divide-gray-100">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px] flex-shrink-0 mt-0.5"
                  style={{ background: item.bg }}
                >
                  {item.emoji}
                </div>
                <div>
                  <p className="text-[13px] text-gray-700 leading-snug">{item.text}</p>
                  <p className="text-[11.5px] text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-gray-900">By Category</h2>
            <Link href="/admin/categories" className="text-[12.5px] font-medium text-green-700 hover:underline">
              Details
            </Link>
          </div>
          <div className="space-y-0 divide-y divide-gray-100">
            {CATEGORY_COUNTS.map(({ id, count, total }) => {
              const cat = PRODUCT_CATEGORIES.find((c) => c.id === id)!
              const pct = Math.round((count / total) * 100)
              return (
                <div key={id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: cat.accent + "22" }}
                  >
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12.5px] font-medium text-gray-800">{cat.label}</span>
                      <span className="text-[12px] text-gray-400 font-medium">{count} products</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: cat.accent }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent products table */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-[15px] font-semibold text-gray-900">Recent Products</h2>
          <Link href="/admin/products" className="text-[12.5px] font-medium text-green-700 hover:underline">
            View all products →
          </Link>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Product", "Category", "Status", "Price", ""].map((h) => (
                    <th key={h} className="text-left text-[11.5px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_PRODUCTS.map((p) => {
                  const cat = PRODUCT_CATEGORIES.find((c) => c.id === p.category)!
                  return (
                    <tr key={p.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-base flex-shrink-0">
                            {p.emoji}
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-gray-900">{p.title}</div>
                            <div className="text-[11.5px] text-gray-400 font-mono">{p.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <CategoryBadge category={p.category as any} label={cat.label} icon={cat.icon} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-4 py-3 font-mono text-[12.5px] text-gray-600">{p.price}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/products/${p.slug}/edit`}
                          className="text-[12px] font-medium text-green-700 hover:underline"
                        >
                          Edit →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
