import { Eye, MessageSquare, Clock, Star, ArrowUpRight } from "lucide-react"
import AdminLayout from "../components/AdminLayout"

const STATS = [
  { label: "Page Views", value: "2,841", change: "+12% vs last month", icon: Eye, iconBg: "#dcfce7", iconColor: "#16a34a" },
  { label: "Quote Requests", value: "47", change: "+8 this week", icon: MessageSquare, iconBg: "#fef9c3", iconColor: "#ca8a04" },
  { label: "Avg. Session", value: "3:24", change: "+28s avg", icon: Clock, iconBg: "#dbeafe", iconColor: "#2563eb" },
  { label: "Top Product", value: "UBC", change: "847 views", icon: Star, iconBg: "#f3e8ff", iconColor: "#7c3aed" },
]

export default function AnalyticsPage() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Analytics" }]}>
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight">Analytics</h1>
        <p className="text-[13px] text-gray-500 mt-0.5">Product performance and catalogue insights</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-medium text-gray-500">{stat.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: stat.iconBg }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.iconColor }} />
              </div>
            </div>
            <div className="text-[26px] font-semibold text-gray-900 tracking-tight leading-none mb-1.5">
              {stat.value}
            </div>
            <div className="flex items-center gap-1 text-[11.5px] font-medium text-green-700">
              <ArrowUpRight className="w-3 h-3" />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon placeholder */}
      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-[15px] font-semibold text-gray-900">Traffic Overview</h2>
          <p className="text-[13px] text-gray-400 mt-0.5">Views and engagement over time</p>
        </div>
        {/* Chart area placeholder */}
        <div className="p-8 flex flex-col items-center justify-center text-center min-h-[240px]">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-4"/>
            </svg>
          </div>
          <h3 className="text-[15px] font-semibold text-gray-800 mb-1">Analytics coming soon</h3>
          <p className="text-[13px] text-gray-400 max-w-[280px] leading-relaxed">
            Detailed charts and conversion metrics will appear here once your catalogue receives visitor traffic.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
