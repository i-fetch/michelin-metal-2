import Link from 'next/link'
import { Package, Plus, ArrowRight } from 'lucide-react'
import { getProducts } from '@/actions/products'

export default async function AdminDashboard() {
  const products  = await getProducts()
  const featured  = products.filter(p => p.featured).length
  const byCategory = ['aluminium','ferrous','non-ferrous','bulk'].map(cat => ({
    cat, count: products.filter(p => p.category === cat).length,
  }))

  return (
    <div className="p-8">
      {/* Topbar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
            DASHBOARD
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--tx-muted)' }}>
            Welcome back — Mechelin Metals Admin
          </p>
        </div>
        <Link href="/admin/products/create" className="btn btn-green text-sm flex items-center gap-2">
          <Plus size={15} /> New Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Products', value: products.length,    accent: 'var(--clr-green)' },
          { label: 'Featured',       value: featured,            accent: '#0284c7' },
          { label: 'Categories',     value: 4,                   accent: '#d97706' },
          { label: 'Published',      value: products.length,    accent: '#7c3aed' },
        ].map(({ label, value, accent }) => (
          <div key={label} className="card rounded-xl p-5" style={{ border: '1.5px solid var(--border)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--tx-faint)' }}>{label}</p>
            <p className="text-3xl font-bold" style={{ color: accent, fontFamily: 'var(--font-display)' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="card rounded-xl p-6 mb-6" style={{ border: '1.5px solid var(--border)' }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--tx-faint)' }}>By Category</h2>
        <div className="space-y-3">
          {byCategory.map(({ cat, count }) => (
            <div key={cat} className="flex items-center gap-3">
              <Package size={13} style={{ color: 'var(--clr-green)', flexShrink: 0 }} />
              <span className="text-sm capitalize flex-1" style={{ color: 'var(--tx-secondary)' }}>{cat}</span>
              <span className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/admin/products" className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--clr-green)' }}>
        Manage all products <ArrowRight size={13} />
      </Link>
    </div>
  )
}
