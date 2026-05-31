"use client"

import { useState } from "react"
import { Search, MailOpen, Mail, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AdminLayout from "../components/AdminLayout"
import { NoInquiriesEmpty } from "../components/custom-ui/EmptyStates"
import { Badge } from "../components/custom-ui/Badge"

interface Inquiry {
  id: string
  name: string
  email: string
  company?: string
  product: string
  productCategory: string
  message: string
  date: string
  status: "new" | "in-review" | "replied" | "closed"
}

const MOCK_INQUIRIES: Inquiry[] = [
  { id: "1", name: "Ahmed Al-Rashid", email: "ahmed@metalco.ae", company: "MetalCo UAE", product: "Copper Wire Scrap", productCategory: "metals", message: "We are interested in sourcing 20MT monthly. Please send us your latest price sheet and availability for Q1 2025.", date: "Today, 9:41 AM", status: "new" },
  { id: "2", name: "Liu Wei", email: "lwei@shandong.cn", company: "Shandong Metals Ltd", product: "Aluminium UBC Scrap", productCategory: "aluminium", message: "Need pricing for a 100MT FCL shipment. Can you provide SGS cert and provide loading photos before shipment?", date: "Yesterday, 2:15 PM", status: "in-review" },
  { id: "3", name: "Carlos Mendes", email: "c.mendes@metais.br", company: "Metais do Brasil", product: "Brass Radiator Scrap", productCategory: "non-ferrous", message: "Can you provide an SGS inspection certificate with your shipment? We need ISRI grade confirmation.", date: "Dec 18, 10:30 AM", status: "replied" },
  { id: "4", name: "Olusegun Bello", email: "o.bello@lagosmetal.ng", product: "Lead Battery Scrap", productCategory: "metals", message: "Interested in 5MT trial order. Do you ship to Lagos? What are your payment terms?", date: "Dec 17, 4:00 PM", status: "new" },
  { id: "5", name: "Fatima Al-Zahraa", email: "fatima@gulftrade.qa", company: "Gulf Trade Qatar", product: "Industrial Container Bulk", productCategory: "bulk", message: "We handle large volume imports. Please contact us to discuss a 6-month supply contract.", date: "Dec 15, 11:00 AM", status: "closed" },
]

const STATUS_MAP = {
  new: { variant: "yellow" as const, label: "New" },
  "in-review": { variant: "blue" as const, label: "In Review" },
  replied: { variant: "green" as const, label: "Replied" },
  closed: { variant: "gray" as const, label: "Closed" },
}

const CAT_ICONS: Record<string, string> = {
  aluminium: "🔩", metals: "⚙️", "non-ferrous": "✨", bulk: "📦",
}

export default function InquiriesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES)

  const filtered = inquiries.filter((i) => {
    const matchSearch = !search ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.product.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || i.status === statusFilter
    return matchSearch && matchStatus
  })

  const updateStatus = (id: string, status: Inquiry["status"]) => {
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i))
  }

  const newCount = inquiries.filter((i) => i.status === "new").length

  return (
    <AdminLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Inquiries" }]}>
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight">Inquiries</h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            {newCount > 0 ? (
              <span className="text-green-700 font-medium">{newCount} unread</span>
            ) : "All caught up"} · {inquiries.length} total requests
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2.5 p-3.5 border-b border-gray-100 flex-wrap">
          <div className="relative flex-1 max-w-[260px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by name, product…"
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[12.5px] text-gray-700 outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {["all", "new", "in-review", "replied", "closed"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-full text-[12.5px] border transition-all capitalize ${
                  statusFilter === s
                    ? "bg-green-600 border-green-600 text-white font-medium"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {s === "all" ? "All" : s.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <NoInquiriesEmpty />
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((inquiry) => {
              const statusCfg = STATUS_MAP[inquiry.status]
              const isExpanded = expandedId === inquiry.id
              const isNew = inquiry.status === "new"

              return (
                <div key={inquiry.id} className={`transition-colors ${isNew ? "bg-green-50/30" : "hover:bg-gray-50/50"}`}>
                  <div
                    className="flex items-start gap-3 px-4 py-3.5 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : inquiry.id)}
                  >
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-[12px] font-semibold text-white flex-shrink-0 mt-0.5">
                      {inquiry.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[13.5px] font-semibold ${isNew ? "text-gray-900" : "text-gray-700"}`}>
                            {inquiry.name}
                          </span>
                          {inquiry.company && (
                            <span className="text-[12px] text-gray-400">· {inquiry.company}</span>
                          )}
                          {isNew && (
                            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                          <span className="text-[11.5px] text-gray-400 whitespace-nowrap">{inquiry.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[13px]">{CAT_ICONS[inquiry.productCategory]}</span>
                        <span className="text-[12.5px] font-medium text-gray-700">{inquiry.product}</span>
                      </div>
                      <p className={`text-[12.5px] text-gray-500 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
                        {inquiry.message}
                      </p>
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  </div>

                  {/* Expanded row */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 ml-12 space-y-3">
                          <div className="flex items-center gap-2 text-[12.5px] text-gray-500">
                            <Mail className="w-3.5 h-3.5" />
                            <a href={`mailto:${inquiry.email}`} className="text-green-700 hover:underline">
                              {inquiry.email}
                            </a>
                          </div>

                          {/* Full message */}
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                            <p className="text-[13px] text-gray-700 leading-relaxed">{inquiry.message}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <a
                              href={`mailto:${inquiry.email}?subject=Re: ${inquiry.product} Inquiry`}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[12.5px] font-medium rounded-lg transition-colors"
                            >
                              <MailOpen className="w-3.5 h-3.5" />
                              Reply via Email
                            </a>
                            {inquiry.status !== "in-review" && inquiry.status !== "replied" && (
                              <button
                                onClick={() => updateStatus(inquiry.id, "in-review")}
                                className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-[12.5px] font-medium rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                Mark In Review
                              </button>
                            )}
                            {inquiry.status !== "replied" && (
                              <button
                                onClick={() => updateStatus(inquiry.id, "replied")}
                                className="px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 text-[12.5px] font-medium rounded-lg hover:bg-green-100 transition-colors"
                              >
                                Mark Replied
                              </button>
                            )}
                            {inquiry.status !== "closed" && (
                              <button
                                onClick={() => updateStatus(inquiry.id, "closed")}
                                className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-[12.5px] font-medium rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                Close
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
