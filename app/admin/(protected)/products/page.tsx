// app/admin/products/page.tsx
import type { Metadata } from 'next'
import Link              from 'next/link'
import Image             from 'next/image'
import { Plus, Package, Globe, Star } from 'lucide-react'
import { getProducts }   from '@/actions/products'
import DeleteButton      from '@/components/admin/DeleteButton'
import { PRODUCT_CATEGORY_MAP } from '@/lib/productCategories'

export const metadata: Metadata = { title: 'Products' }
export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full box-border overflow-hidden">
      {/* ── Top Header Layout ── */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4 h-14 sm:h-16 box-border">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
            PRODUCTS
          </h1>
          <p className="text-xs sm:text-sm truncate mt-0.5" style={{ color: 'var(--tx-muted)' }}>
            {products.length} product{products.length !== 1 ? 's' : ''} in catalogue
          </p>
        </div>
        
        {/* Anti-Shift Action Button */}
        <Link href="/admin/products/create" 
          className="btn btn-green flex-shrink-0 flex items-center justify-center gap-2 h-10 w-10 sm:w-auto sm:px-4 box-border"
          title="Add Product">
          <Plus size={16} className="flex-shrink-0" /> 
          <span className="hidden sm:inline whitespace-nowrap">Add Product</span>
        </Link>
      </div>

      {/* ── Main Data View Container ── */}
      <div className="rounded-2xl overflow-hidden w-full flex flex-col min-w-0" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        {products.length === 0 ? (
          <div className="text-center py-24 px-4 flex flex-col items-center justify-center">
            <Package size={40} style={{ color: 'var(--tx-faint)' }} className="mb-4" />
            <p className="text-base sm:text-lg font-bold mb-2 tracking-wider" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
              NO PRODUCTS YET
            </p>
            <p className="text-xs sm:text-sm mb-6" style={{ color: 'var(--tx-muted)' }}>
              Start building your catalogue
            </p>
            <Link href="/admin/products/create" className="btn btn-green text-sm h-10 px-4 flex items-center justify-center gap-2">
              <Plus size={15} /> Create First Product
            </Link>
          </div>
        ) : (
          <>
            {/* ── Mobile View — Responsive Stacked Cards ── */}
            <div className="divide-y divide-[var(--border)] md:hidden">
              {products.map(p => {
                const cat = PRODUCT_CATEGORY_MAP[p.category]
                return (
                  <div key={p._id} className="p-4 flex flex-col gap-4 box-border min-h-[140px]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                          style={{ border: '1px solid var(--border)' }}>
                          <Image src={p.image} alt={p.title} fill className="object-cover" sizes="48px" priority />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: 'var(--tx-primary)' }}>
                            <Link href={`/products/${p.slug}`} target="_blank" className="hover:underline transition-colors">
                              {p.title}
                            </Link>
                          </p>
                          {p.subcategory && (
                            <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--tx-faint)' }}>
                              {p.subcategory}
                            </p>
                          )}
                          <p className="text-[9px] truncate tracking-wide font-mono mt-0.5" style={{ color: 'var(--tx-faint)' }}>
                            /{p.slug}
                          </p>
                        </div>
                      </div>

                      {/* Flag Visual Indicators */}
                      <div className="flex items-center gap-1.5 flex-shrink-0 pt-0.5">
                        {p.featured && <Star size={13} style={{ color: '#d97706' }} />}
                        {p.exportAvailable && <Globe size={13} style={{ color: '#0284c7' }} />}
                        <span className={`w-2 h-2 rounded-full inline-block ${p.stockAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-1 border-t border-[var(--border)] border-dashed">
                      <div className="flex flex-col gap-1 min-w-0">
                        {/* Price rendering */}
                        {p.showPrice && p.price ? (
                          <p className="text-xs font-bold leading-none" style={{ color: 'var(--clr-green)', fontFamily: 'var(--font-display)' }}>
                            {p.currency} {p.price.toLocaleString()}
                          </p>
                        ) : (
                          <span className="text-[11px] leading-none" style={{ color: 'var(--tx-muted)' }}>
                            {p.requestQuote ? 'On Request' : '—'}
                          </span>
                        )}
                        
                        {/* Badges row */}
                        <div className="flex gap-1.5 items-center mt-1">
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded truncate max-w-[80px]"
                            style={{ background: `${cat?.accent ?? '#888'}18`, color: cat?.accent ?? '#888' }}>
                            {cat?.label ?? p.category}
                          </span>
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded uppercase"
                            style={
                              p.status === 'active'
                                ? { background: 'rgba(22,163,74,0.1)', color: '#16a34a' }
                                : p.status === 'draft'
                                ? { background: 'rgba(217,119,6,0.1)', color: '#d97706' }
                                : { background: 'var(--bg-3)', color: 'var(--tx-faint)' }
                            }>
                            {p.status}
                          </span>
                        </div>
                      </div>

                      {/* Context Action Triggers */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Link href={`/admin/products/edit/${p._id}`}
                          className="text-xs px-3 h-8 rounded-lg transition-colors inline-flex items-center justify-center"
                          style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                          Edit
                        </Link>
                        <DeleteButton id={p._id} title={p.title} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Desktop View — Fixed Width Layout Grid ── */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }} className="bg-[var(--bg-1)] select-none">
                    <th className="p-4 text-[11px] font-bold uppercase tracking-wider w-[35%]" style={{ color: 'var(--tx-faint)' }}>Product</th>
                    <th className="p-4 text-[11px] font-bold uppercase tracking-wider w-[18%]" style={{ color: 'var(--tx-faint)' }}>Category</th>
                    <th className="p-4 text-[11px] font-bold uppercase tracking-wider w-[17%]" style={{ color: 'var(--tx-faint)' }}>Price</th>
                    <th className="p-4 text-[11px] font-bold uppercase tracking-wider w-[12%]" style={{ color: 'var(--tx-faint)' }}>Status</th>
                    <th className="p-4 text-[11px] font-bold uppercase tracking-wider w-[8%]" style={{ color: 'var(--tx-faint)' }}>Flags</th>
                    <th className="p-4 w-[10%]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {products.map(p => {
                    const cat = PRODUCT_CATEGORY_MAP[p.category]
                    return (
                      <tr key={p._id} className="hover:bg-[var(--bg-2)] transition-colors h-[80px]">
                        {/* Product information columns */}
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0"
                              style={{ border: '1px solid var(--border)' }}>
                              <Image src={p.image} alt={p.title} fill className="object-cover" sizes="44px" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate" style={{ color: 'var(--tx-primary)' }}>
                                <Link href={`/products/${p.slug}`} target="_blank"
                                  className="hover:underline hover:text-green-400 transition-colors">
                                  {p.title}
                                </Link>
                              </p>
                              {p.subcategory ? (
                                <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--tx-faint)' }}>
                                  {p.subcategory}
                                </p>
                              ) : (
                                <p className="text-[10px] opacity-0 select-none mt-0.5">—</p>
                              )}
                              <p className="text-[10px] truncate font-mono tracking-tight" style={{ color: 'var(--tx-faint)' }}>
                                /{p.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category Assignment badges */}
                        <td className="p-4 align-middle">
                          <span className="badge inline-block max-w-full truncate text-xs px-2.5 py-0.5 rounded"
                            style={{ background: `${cat?.accent ?? '#888'}18`, color: cat?.accent ?? '#888' }}>
                            {cat?.icon} {cat?.label ?? p.category}
                          </span>
                        </td>

                        {/* Inventory Value fields */}
                        <td className="p-4 align-middle">
                          {p.showPrice && p.price ? (
                            <div className="truncate">
                              <p className="text-sm font-semibold" style={{ color: 'var(--clr-green)', fontFamily: 'var(--font-display)' }}>
                                {p.currency} {p.price.toLocaleString()}
                              </p>
                              {p.priceNegotiable ? (
                                <p className="text-[10px]" style={{ color: 'var(--tx-faint)' }}>Negotiable</p>
                              ) : (
                                <p className="text-[10px] opacity-0 select-none">—</p>
                              )}
                            </div>
                          ) : p.requestQuote ? (
                            <span className="text-xs" style={{ color: 'var(--tx-muted)' }}>On Request</span>
                          ) : (
                            <span className="text-xs select-none" style={{ color: 'var(--tx-faint)' }}>—</span>
                          )}
                        </td>

                        {/* System Status metrics */}
                        <td className="p-4 align-middle">
                          <span className="badge inline-block text-xs px-2.5 py-0.5 rounded uppercase"
                            style={
                              p.status === 'active'
                                ? { background: 'rgba(22,163,74,0.12)', color: '#16a34a' }
                                : p.status === 'draft'
                                ? { background: 'rgba(217,119,6,0.12)', color: '#d97706' }
                                : { background: 'var(--bg-3)', color: 'var(--tx-faint)' }
                            }>
                            {p.status}
                          </span>
                        </td>

                        {/* Attribute Flags nodes */}
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            {p.featured && <Star size={13} style={{ color: '#d97706' }} title="Featured" />}
                            {p.exportAvailable && <Globe size={13} style={{ color: '#0284c7' }} title="Export" />}
                            <span className={`w-2 h-2 rounded-full inline-block flex-shrink-0 ${p.stockAvailable ? 'bg-green-500' : 'bg-red-500'}`} 
                              title={p.stockAvailable ? "In Stock" : "Out of Stock"} />
                          </div>
                        </td>

                        {/* Modifying mutations components */}
                        <td className="p-4 align-middle text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/products/edit/${p._id}`}
                              className="text-xs px-3 h-8 rounded-lg transition-colors inline-flex items-center justify-center"
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
    </div>
  )
}