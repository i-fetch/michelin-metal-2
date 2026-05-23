// app/admin/dashboard/page.tsx
import type { Metadata } from 'next'
import Link              from 'next/link'
import Image             from 'next/image'
import { Plus, Package, TrendingUp, Star, Globe, ArrowRight, Layers, BarChart3 } from 'lucide-react'
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_MAP } from '@/lib/productCategories'
import { getProducts }   from '@/actions/products'
import DeleteButton      from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const products = await getProducts()
  const total    = products.length
  const active   = products.filter(p => p.status === 'active').length
  const featured = products.filter(p => p.featured).length
  const exported = products.filter(p => p.exportAvailable).length
  const recent   = products.slice(0, 8)

  const catStats = PRODUCT_CATEGORIES.map(c => ({
    ...c,
    count: products.filter(p => p.category === c.id).length,
  }))

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full box-border overflow-hidden">
      {/* ── Top Header ── */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4 h-16 box-border">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-0.5 sm:mb-1 truncate" style={{ color: 'var(--tx-faint)' }}>
            Mechelin Metals Nigeria
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)', letterSpacing: '0.04em' }}>
            DASHBOARD
          </h1>
          <p className="text-xs sm:text-sm truncate mt-0.5" style={{ color: 'var(--tx-muted)' }}>
            Product catalogue overview
          </p>
        </div>
        
        {/* Responsive Anti-Shift Button */}
        <Link href="/admin/products/create" 
          className="btn btn-green flex-shrink-0 flex items-center justify-center gap-2 h-10 w-10 sm:w-auto sm:px-4 box-border"
          title="Add Product">
          <Plus size={16} className="flex-shrink-0" /> 
          <span className="hidden sm:inline whitespace-nowrap">Add Product</span>
        </Link>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { label: 'Total Products', value: total,    icon: Package,    color: '#a8a29e', bg: 'rgba(168,162,158,0.08)' },
          { label: 'Active',         value: active,   icon: TrendingUp, color: '#16a34a', bg: 'rgba(22,163,74,0.08)'   },
          { label: 'Featured',       value: featured, icon: Star,       color: '#d97706', bg: 'rgba(217,119,6,0.08)'   },
          { label: 'Export Ready',   value: exported, icon: Globe,      color: '#0284c7', bg: 'rgba(2,132,199,0.08)'   },
        ].map(s => (
          <div key={s.label} className="stat-card p-4 rounded-xl flex flex-col justify-between" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest leading-tight line-clamp-1 sm:line-clamp-none" style={{ color: 'var(--tx-faint)' }}>
                {s.label}
              </p>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: s.bg }}>
                <s.icon size={14} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl sm:text-4xl font-bold mt-auto"
              style={{ fontFamily: 'var(--font-display)', color: s.color, letterSpacing: '0.04em' }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* ── Recent Products View ── */}
        <div className="rounded-2xl overflow-hidden w-full flex flex-col min-w-0" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between px-4 sm:px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)', letterSpacing: '0.08em' }}>
              Recent Products
            </h2>
            <Link href="/admin/products" className="flex items-center gap-1.5 text-xs font-semibold hover:underline"
              style={{ color: 'var(--clr-green)' }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Package size={36} style={{ color: 'var(--tx-faint)', margin: '0 auto 12px' }} />
              <p className="text-sm mb-5" style={{ color: 'var(--tx-muted)' }}>No products yet</p>
              <Link href="/admin/products/create" className="btn btn-green text-sm h-9 px-4 inline-flex items-center gap-2">
                <Plus size={14} /> Create First Product
              </Link>
            </div>
          ) : (
            <>
              {/* Mobile View Card List */}
              <div className="divide-y divide-[var(--border)] md:hidden">
                {recent.map(p => {
                  const cat = PRODUCT_CATEGORY_MAP[p.category]
                  return (
                    <div key={p._id} className="p-4 flex flex-col gap-3 box-border">
                      <div className="flex items-center justify-between gap-4 min-h-[40px]">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                            style={{ border: '1px solid var(--border)' }}>
                            <Image src={p.image} alt={p.title} fill className="object-cover" sizes="40px" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: 'var(--tx-primary)' }}>
                              {p.title}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5 truncate">
                              <span className="text-[9px] font-medium px-1 py-0.2 rounded truncate max-w-[90px]"
                                style={{ background: `${cat?.accent ?? '#888'}15`, color: cat?.accent ?? '#888' }}>
                                {cat?.label ?? p.category}
                              </span>
                              {p.subcategory && (
                                <span className="text-[9px] truncate" style={{ color: 'var(--tx-faint)' }}>
                                  • {p.subcategory}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {p.exportAvailable && <Globe size={13} style={{ color: '#0284c7' }} />}
                          <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}`} />
                        </div>
                      </div>

                      {/* Unified Actions Row for Mobile */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border)] border-dashed">
                        <Link href={`/admin/products/edit/${p._id}`}
                          className="text-[11px] px-3 h-7 rounded-md transition-colors inline-flex items-center justify-center"
                          style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                          Edit
                        </Link>
                        <DeleteButton id={p._id} title={p.title} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Desktop View Table Data Grid */}
              <div className="hidden md:block w-full overflow-x-auto">
                <table className="data-table w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }} className="bg-[var(--bg-1)]">
                      <th className="p-4 text-[11px] font-bold uppercase tracking-wider w-[40%]" style={{ color: 'var(--tx-faint)' }}>Product</th>
                      <th className="p-4 text-[11px] font-bold uppercase tracking-wider w-[22%]" style={{ color: 'var(--tx-faint)' }}>Category</th>
                      <th className="p-4 text-[11px] font-bold uppercase tracking-wider w-[14%]" style={{ color: 'var(--tx-faint)' }}>Status</th>
                      <th className="p-4 text-[11px] font-bold uppercase tracking-wider w-[10%]" style={{ color: 'var(--tx-faint)' }}>Export</th>
                      <th className="p-4 w-[14%]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {recent.map(p => {
                      const cat = PRODUCT_CATEGORY_MAP[p.category]
                      return (
                        <tr key={p._id} className="hover:bg-[var(--bg-2)] transition-colors h-[72px]">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                                style={{ border: '1px solid var(--border)' }}>
                                <Image src={p.image} alt={p.title} fill className="object-cover" sizes="40px" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate" style={{ color: 'var(--tx-primary)' }}>
                                  {p.title}
                                </p>
                                {p.subcategory ? (
                                  <p className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--tx-faint)' }}>
                                    {p.subcategory}
                                  </p>
                                ) : (
                                  <p className="text-[10px] opacity-0 select-none mt-0.5">—</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <span className="badge inline-block max-w-full truncate text-xs px-2.5 py-0.5 rounded"
                              style={{ background: `${cat?.accent ?? '#888'}18`, color: cat?.accent ?? '#888' }}>
                              {cat?.label ?? p.category}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <span className="badge inline-block text-xs px-2.5 py-0.5 rounded uppercase"
                              style={
                                p.status === 'active'
                                  ? { background: 'rgba(22,163,74,0.1)', color: '#16a34a' }
                                  : p.status === 'draft'
                                  ? { background: 'rgba(217,119,6,0.1)', color: '#d97706' }
                                  : { background: 'var(--bg-3)', color: 'var(--tx-faint)' }
                              }>
                              {p.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            {p.exportAvailable ? (
                              <Globe size={14} style={{ color: '#0284c7' }} />
                            ) : (
                              <span className="text-xs select-none" style={{ color: 'var(--tx-faint)' }}>—</span>
                            )}
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link href={`/admin/products/edit/${p._id}`}
                                className="text-xs px-3 py-1.5 rounded-lg transition-colors inline-flex items-center justify-center"
                                style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                                Edit
                              </Link>
                              <DeleteButton id={p._id} title={p.title} />
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* ── Category Breakdown Panel ── */}
        <div className="rounded-2xl overflow-hidden w-full flex-shrink-0" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-sm font-bold uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)', letterSpacing: '0.08em' }}>
              By Category
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {catStats.map(c => (
              <div key={c.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--tx-secondary)' }}>
                    <span className="flex-shrink-0">{c.icon}</span> <span className="truncate">{c.label}</span>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0 ml-2" style={{ color: c.accent }}>
                    {c.count}
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-3)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: total > 0 ? `${(c.count / total) * 100}%` : '0%', background: c.accent }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <Link href="/admin/products" className="btn btn-outline w-full justify-center text-xs h-9 items-center flex">
              Manage All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}