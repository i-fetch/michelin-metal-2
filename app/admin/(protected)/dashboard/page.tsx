// app/admin/dashboard/page.tsx
import type { Metadata } from 'next'
import Link              from 'next/link'
import Image             from 'next/image'
import { Plus, Package, TrendingUp, Star, Globe, ArrowRight, Layers, BarChart3 } from 'lucide-react'
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_MAP } from '@/lib/productCategories'
import { getProducts }   from '@/actions/products'

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
    <div className="p-6 lg:p-8">
      {/* ── Top Header ── */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--tx-faint)' }}>
            Mechelin Metals Nigeria
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--tx-primary)', letterSpacing: '0.04em' }}>
            DASHBOARD
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--tx-muted)' }}>
            Product catalogue overview
          </p>
        </div>
        <Link href="/admin/products/create" className="btn btn-green flex-shrink-0">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Products', value: total,    icon: Package,    color: '#a8a29e', bg: 'rgba(168,162,158,0.08)' },
          { label: 'Active',         value: active,   icon: TrendingUp, color: '#16a34a', bg: 'rgba(22,163,74,0.08)'   },
          { label: 'Featured',       value: featured, icon: Star,       color: '#d97706', bg: 'rgba(217,119,6,0.08)'   },
          { label: 'Export Ready',   value: exported, icon: Globe,      color: '#0284c7', bg: 'rgba(2,132,199,0.08)'   },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--tx-faint)' }}>
                {s.label}
              </p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: s.bg }}>
                <s.icon size={15} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-4xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: s.color, letterSpacing: '0.04em' }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* ── Recent Products Table ── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-sm font-bold uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)', letterSpacing: '0.08em' }}>
              Recent Products
            </h2>
            <Link href="/admin/products" className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: 'var(--clr-green)' }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="text-center py-16">
              <Package size={36} style={{ color: 'var(--tx-faint)', margin: '0 auto 12px' }} />
              <p className="text-sm mb-5" style={{ color: 'var(--tx-muted)' }}>No products yet</p>
              <Link href="/admin/products/create" className="btn btn-green text-sm">
                <Plus size={14} /> Create First Product
              </Link>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Export</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recent.map(p => {
                  const cat = PRODUCT_CATEGORY_MAP[p.category]
                  return (
                    <tr key={p._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                            style={{ border: '1px solid var(--border)' }}>
                            <Image src={p.image} alt={p.title} fill className="object-cover" sizes="40px" />
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--tx-primary)' }}>
                              {p.title}
                            </p>
                            {p.subcategory && (
                              <p className="text-[10px] mt-0.5" style={{ color: 'var(--tx-faint)' }}>
                                {p.subcategory}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge"
                          style={{ background: `${cat?.accent ?? '#888'}18`, color: cat?.accent ?? '#888' }}>
                          {cat?.label ?? p.category}
                        </span>
                      </td>
                      <td>
                        <span className="badge"
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
                      <td>
                        {p.exportAvailable
                          ? <Globe size={14} style={{ color: '#0284c7' }} />
                          : <span className="text-xs" style={{ color: 'var(--tx-faint)' }}>—</span>
                        }
                      </td>
                      <td>
                        <Link href={`/admin/products/edit/${p._id}`}
                          className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                          style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                          Edit
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Category Breakdown ── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
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
                    <span>{c.icon}</span> {c.label}
                  </div>
                  <span className="text-xs font-bold" style={{ color: c.accent }}>
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
            <Link href="/admin/products" className="btn btn-outline w-full justify-center text-xs">
              Manage All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
