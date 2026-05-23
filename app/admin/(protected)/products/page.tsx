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
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--tx-primary)', letterSpacing: '0.04em' }}>
            PRODUCTS
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--tx-muted)' }}>
            {products.length} product{products.length !== 1 ? 's' : ''} in catalogue
          </p>
        </div>
        <Link href="/admin/products/create" className="btn btn-green flex-shrink-0">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        {products.length === 0 ? (
          <div className="text-center py-24">
            <Package size={40} style={{ color: 'var(--tx-faint)', margin: '0 auto 16px' }} />
            <p className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
              NO PRODUCTS YET
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--tx-muted)' }}>
              Start building your catalogue
            </p>
            <Link href="/admin/products/create" className="btn btn-green">
              <Plus size={15} /> Create First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Flags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => {
                  const cat = PRODUCT_CATEGORY_MAP[p.category]
                  return (
                    <tr key={p._id}>
                      {/* Product col */}
                      <td style={{ minWidth: 240 }}>
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                            style={{ border: '1px solid var(--border)' }}>
                            <Image src={p.image} alt={p.title} fill className="object-cover" sizes="48px" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
                              <Link href={`/products/${p.slug}`} target="_blank"
                                className="hover:underline hover:text-green-400 transition-colors">
                                {p.title}
                              </Link>
                            </p>
                            {p.subcategory && (
                              <p className="text-[10px] mt-0.5" style={{ color: 'var(--tx-faint)' }}>
                                {p.subcategory}
                              </p>
                            )}
                            <p className="text-[10px]" style={{ color: 'var(--tx-faint)', fontFamily: 'var(--font-mono)' }}>
                              /{p.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td>
                        <span className="badge"
                          style={{ background: `${cat?.accent ?? '#888'}18`, color: cat?.accent ?? '#888' }}>
                          {cat?.icon} {cat?.label ?? p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td>
                        {p.showPrice && p.price ? (
                          <div>
                            <p className="text-sm font-semibold" style={{ color: 'var(--clr-green)', fontFamily: 'var(--font-display)' }}>
                              {p.currency} {p.price.toLocaleString()}
                            </p>
                            {p.priceNegotiable && (
                              <p className="text-[10px]" style={{ color: 'var(--tx-faint)' }}>Negotiable</p>
                            )}
                          </div>
                        ) : p.requestQuote ? (
                          <span className="text-xs" style={{ color: 'var(--tx-muted)' }}>On Request</span>
                        ) : (
                          <span className="text-xs" style={{ color: 'var(--tx-faint)' }}>—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <span className="badge"
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

                      {/* Flags */}
                      <td>
                        <div className="flex items-center gap-2">
                          {p.featured && <Star size={13} style={{ color: '#d97706' }} title="Featured" />}
                          {p.exportAvailable && <Globe size={13} style={{ color: '#0284c7' }} title="Export" />}
                          {p.stockAvailable
                            ? <span className="avail-dot in" title="In Stock" />
                            : <span className="avail-dot out" title="Out of Stock" />
                          }
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/products/edit/${p._id}`}
                            className="text-xs px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
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
        )}
      </div>
    </div>
  )
}
