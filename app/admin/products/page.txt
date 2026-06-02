"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

import { Search, Filter, Download, Plus, MoreVertical, Edit2, Eye, Trash2, Star } from "lucide-react"
import { Product, PRODUCT_CATEGORIES } from "@/types"
import AdminLayout from "../components/AdminLayout"
import { NoProductsEmpty, NoSearchResults } from "../components/custom-ui/EmptyStates"
import { Badge, CategoryBadge, StatusBadge } from "../components/custom-ui/Badge"
import Toggle from "../components/custom-ui/Toggle"
import DeleteModal from "../components/custom-ui/DeleteModal"

// ─── Mock data ───────────────────────────────────────────────────────────────
const MOCK_PRODUCTS: Product[] = [
  { _id: "1", title: "Aluminium UBC Scrap", slug: "aluminium-ubc-scrap", images: [], shortDescription: "", fullDescription: "", category: "aluminium", subcategory: "UBC", featured: true, status: "active", specs: [], applications: [], purity: "99.5%", materialGrade: "Grade A", condition: "Baled", recyclingClass: "Class 1", price: 1200, currency: "USD", showPrice: true, bulkPricing: "", requestQuote: false },
  { _id: "2", title: "Copper Wire Scrap", slug: "copper-wire-scrap", images: [], shortDescription: "", fullDescription: "", category: "metals", subcategory: "Copper", featured: true, status: "active", specs: [], applications: [], purity: "99.9%", materialGrade: "Premium", condition: "Stripped", recyclingClass: "Class 1", price: null, currency: "USD", showPrice: false, bulkPricing: "", requestQuote: true },
  { _id: "3", title: "Brass Radiator Scrap", slug: "brass-radiator-scrap", images: [], shortDescription: "", fullDescription: "", category: "non-ferrous", subcategory: "Radiator Brass", featured: false, status: "draft", specs: [], applications: [], purity: "70%", materialGrade: "Standard", condition: "Mixed", recyclingClass: "Class 2", price: 950, currency: "USD", showPrice: true, bulkPricing: "", requestQuote: true },
  { _id: "4", title: "Industrial Bulk Aluminium", slug: "industrial-bulk-aluminium", images: [], shortDescription: "", fullDescription: "", category: "bulk", subcategory: "Container Supply", featured: false, status: "archived", specs: [], applications: [], purity: "", materialGrade: "Mixed", condition: "Unsorted", recyclingClass: "Class 3", price: 800, currency: "USD", showPrice: true, bulkPricing: "", requestQuote: false },
  { _id: "5", title: "Lead Battery Scrap", slug: "lead-battery-scrap", images: [], shortDescription: "", fullDescription: "", category: "metals", subcategory: "Battery Scrap", featured: false, status: "active", specs: [], applications: [], purity: "98%", materialGrade: "ISRI Standard", condition: "Drained", recyclingClass: "Class 1", price: 320, currency: "USD", showPrice: true, bulkPricing: "", requestQuote: true },
  { _id: "6", title: "Aluminium Radiator Scrap", slug: "aluminium-radiator-scrap", images: [], shortDescription: "", fullDescription: "", category: "aluminium", subcategory: "Radiator", featured: false, status: "active", specs: [], applications: [], purity: "95%", materialGrade: "Grade 2", condition: "Compressed", recyclingClass: "Class 2", price: 880, currency: "USD", showPrice: true, bulkPricing: "", requestQuote: false },
]

const CAT_ICONS: Record<string, string> = { aluminium: "🔩", metals: "⚙️", "non-ferrous": "✨", bulk: "📦" }

const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
  { label: "⭐ Featured", value: "featured" },
]

export default function AdminProductsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [products, setProducts] = useState(MOCK_PRODUCTS)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const PER_PAGE = 10

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.includes(search.toLowerCase())
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "featured" ? p.featured : p.status === statusFilter)
      const matchCat = categoryFilter === "all" || p.category === categoryFilter
      return matchSearch && matchStatus && matchCat
    })
  }, [products, search, statusFilter, categoryFilter])

  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    setSelected((prev) =>
      prev.size === paginated.length ? new Set() : new Set(paginated.map((p) => p._id))
    )
  }

  const toggleFeatured = (id: string) => {
    setProducts((prev) => prev.map((p) => p._id === id ? { ...p, featured: !p.featured } : p))
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    await new Promise((r) => setTimeout(r, 800)) // replace with: await deleteProduct(deleteTarget._id)
    setProducts((prev) => prev.filter((p) => p._id !== deleteTarget._id))
    setDeleteLoading(false)
    setDeleteTarget(null)
  }

  return (
    <AdminLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Products" }]}>
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight">Products</h1>
          <p className="text-[13px] text-gray-500 mt-0.5">{products.length} products across 4 categories</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[13px] font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2.5 p-3.5 border-b border-gray-100 flex-wrap">
          <div className="relative flex-1 max-w-[260px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
              type="text"
              placeholder="Search products…"
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[12.5px] text-gray-700 outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all placeholder-gray-400"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1) }}
            className="px-2.5 py-1.5 border border-gray-200 rounded-lg text-[12.5px] text-gray-600 bg-white outline-none focus:border-green-500 cursor-pointer"
          >
            <option value="all">All categories</option>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-200 rounded-lg text-[12.5px] text-gray-600 bg-white hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          {selected.size > 0 && (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-[12px] text-gray-500">{selected.size} selected</span>
              <button className="text-[12px] text-red-600 font-medium hover:underline">Delete</button>
            </div>
          )}
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-200 rounded-lg text-[12.5px] text-gray-600 bg-white hover:bg-gray-50 transition-colors ml-auto">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-gray-100 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setStatusFilter(tab.value); setCurrentPage(1) }}
              className={`px-3 py-1 rounded-full text-[12.5px] transition-all whitespace-nowrap border ${
                statusFilter === tab.value
                  ? "bg-green-600 border-green-600 text-white font-medium"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {tab.label}
              {tab.value !== "featured" && (
                <span className="ml-1 opacity-60">
                  ({tab.value === "all"
                    ? products.length
                    : products.filter((p) => p.status === tab.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {paginated.length === 0 ? (
            search ? <NoSearchResults query={search} /> : <NoProductsEmpty />
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-2.5 text-left w-8">
                    <input
                      type="checkbox"
                      checked={selected.size === paginated.length && paginated.length > 0}
                      onChange={toggleAll}
                      className="w-3.5 h-3.5 accent-green-600 cursor-pointer"
                    />
                  </th>
                  {["Product", "Category", "Subcategory", "Status", "Featured", "Price", "Grade", ""].map((h) => (
                    <th key={h} className="text-left text-[11.5px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginated.map((p) => {
                    const cat = PRODUCT_CATEGORIES.find((c) => c.id === p.category)!
                    return (
                      <motion.tr
                        key={p._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`border-b border-gray-100 last:border-0 transition-colors ${
                          selected.has(p._id) ? "bg-green-50/40" : "hover:bg-gray-50/50"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selected.has(p._id)}
                            onChange={() => toggleSelect(p._id)}
                            className="w-3.5 h-3.5 accent-green-600 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-base flex-shrink-0">
                              {CAT_ICONS[p.category]}
                            </div>
                            <div>
                              <div className="text-[13px] font-medium text-gray-900">{p.title}</div>
                              <div className="text-[11.5px] text-gray-400 font-mono">{p.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <CategoryBadge category={p.category} label={cat.label} icon={cat.icon} />
                        </td>
                        <td className="px-4 py-3 text-[12.5px] text-gray-500">{p.subcategory}</td>
                        <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                        <td className="px-4 py-3">
                          <Toggle
                            checked={p.featured}
                            onChange={() => toggleFeatured(p._id)}
                            size="sm"
                          />
                        </td>
                        <td className="px-4 py-3 font-mono text-[12.5px] text-gray-600">
                          {p.showPrice && p.price ? `$${p.price.toLocaleString()}/MT` : "Request Quote"}
                        </td>
                        <td className="px-4 py-3">
                          {p.materialGrade && (
                            <Badge variant={p.materialGrade === "Premium" ? "purple" : p.materialGrade === "Grade A" ? "blue" : "gray"} dot={false}>
                              {p.materialGrade}
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === p._id ? null : p._id)}
                              className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <AnimatePresence>
                              {openMenuId === p._id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                  transition={{ duration: 0.1 }}
                                  className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg min-w-[140px] z-20 overflow-hidden"
                                >
                                  <button
                                    onClick={() => { router.push(`/admin/products/${p._id}/edit`); setOpenMenuId(null) }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" /> Edit
                                  </button>
                                  <button
                                    onClick={() => { router.push(`/product/${p.slug}`); setOpenMenuId(null) }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Eye className="w-3.5 h-3.5" /> View
                                  </button>
                                  <button
                                    onClick={() => { toggleFeatured(p._id); setOpenMenuId(null) }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Star className="w-3.5 h-3.5" />
                                    {p.featured ? "Unfeature" : "Feature"}
                                  </button>
                                  <div className="h-px bg-gray-100" />
                                  <button
                                    onClick={() => { setDeleteTarget(p); setOpenMenuId(null) }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-[12px] text-gray-400">
              Showing {((currentPage - 1) * PER_PAGE) + 1}–{Math.min(currentPage * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 border border-gray-200 rounded-md flex items-center justify-center text-[12.5px] bg-white text-gray-600 hover:border-green-500 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 border rounded-md flex items-center justify-center text-[12.5px] transition-colors ${
                    page === currentPage
                      ? "bg-green-600 border-green-600 text-white font-medium"
                      : "bg-white border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 border border-gray-200 rounded-md flex items-center justify-center text-[12.5px] bg-white text-gray-600 hover:border-green-500 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >›</button>
            </div>
          </div>
        )}
      </div>

      {/* Delete modal */}
      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        productTitle={deleteTarget?.title ?? ""}
        loading={deleteLoading}
      />
    </AdminLayout>
  )
}
