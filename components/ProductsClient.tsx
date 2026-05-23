// components/ProductsClient.tsx
'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link  from 'next/link'
import {
  Search, SlidersHorizontal, ArrowRight, CheckCircle,
  Package, Globe, ShieldCheck, Tag, ChevronDown, X, Boxes,
} from 'lucide-react'
import AOS from '@/components/AnimateOnScroll'
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_MAP } from '@/lib/productCategories'
import type { Product } from '@/types'

type SortKey = 'newest' | 'oldest' | 'name_asc' | 'name_desc' | 'featured'

interface Props { products: Product[] }

export default function ProductsClient({ products }: Props) {
  const [search,     setSearch]     = useState('')
  const [activesCat, setActivesCat] = useState<string>('all')
  const [sort,       setSort]       = useState<SortKey>('newest')
  const [showFilter, setShowFilter] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (activesCat !== 'all') list = list.filter(p => p.category === activesCat)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    switch (sort) {
      case 'oldest':   list.sort((a,b) => a.createdAt.localeCompare(b.createdAt)); break
      case 'name_asc': list.sort((a,b) => a.title.localeCompare(b.title)); break
      case 'name_desc':list.sort((a,b) => b.title.localeCompare(a.title)); break
      case 'featured': list.sort((a,b) => Number(b.featured) - Number(a.featured)); break
      default:         list.sort((a,b) => b.createdAt.localeCompare(a.createdAt))
    }
    return list
  }, [products, activesCat, search, sort])

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: products.length }
    for (const c of PRODUCT_CATEGORIES) {
      map[c.id] = products.filter(p => p.category === c.id).length
    }
    return map
  }, [products])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-28 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #0d1a0d 100%)' }}
      >
        <div className="absolute inset-0 grid-dots opacity-20" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #16a34a 0%, transparent 70%)' }} />

        <div className="wrap px-5 relative z-10">
          <AOS>
            <p className="tag mb-4">Our Catalogue</p>
            <h1
              className="mb-4 leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem,7vw,5.5rem)',
                color: 'var(--tx-primary)',
              }}
            >
              PRODUCTS &{' '}
              <span style={{ color: 'var(--clr-green)' }}>MATERIALS</span>
            </h1>
            <p className="max-w-2xl text-base mb-8" style={{ color: 'var(--tx-muted)', fontWeight: 300 }}>
              Mechelin Metals Nigeria — premium aluminium, copper, brass, ferrous and non-ferrous
              metals available for bulk supply nationwide and internationally.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: ShieldCheck, label: 'ISO Certified' },
                { icon: Globe,       label: 'International Export' },
                { icon: Boxes,       label: 'Bulk Supply Available' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 text-xs font-semibold"
                  style={{ color: 'var(--tx-muted)' }}>
                  <b.icon size={14} style={{ color: 'var(--clr-green)' }} />
                  {b.label}
                </div>
              ))}
            </div>
          </AOS>

          {/* ── Search + Sort bar ── */}
          <AOS delay={100}>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="search-bar flex-1">
                <Search size={16} style={{ color: 'var(--tx-faint)', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search products, materials, grades…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button onClick={() => setSearch('')} style={{ color: 'var(--tx-faint)' }}>
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as SortKey)}
                  className="field appearance-none pr-8 cursor-pointer"
                  style={{ minWidth: 160 }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="featured">Featured First</option>
                  <option value="name_asc">Name A–Z</option>
                  <option value="name_desc">Name Z–A</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--tx-faint)' }} />
              </div>
            </div>
          </AOS>
        </div>
      </section>

      {/* ── Category Filter Bar ───────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 border-b"
        style={{ background: 'rgba(10,10,10,0.95)', borderColor: 'var(--border)', backdropFilter: 'blur(12px)' }}
      >
        <div className="wrap px-5">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => setActivesCat('all')}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: activesCat === 'all' ? 'var(--clr-green)' : 'var(--surface)',
                color:      activesCat === 'all' ? '#fff'             : 'var(--tx-muted)',
                border:     `1px solid ${activesCat === 'all' ? 'transparent' : 'var(--border)'}`,
              }}
            >
              All Materials
              <span className="text-xs opacity-70">({counts.all})</span>
            </button>
            {PRODUCT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActivesCat(cat.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0"
                style={{
                  background: activesCat === cat.id ? `${cat.accent}20` : 'var(--surface)',
                  color:      activesCat === cat.id ? cat.accent         : 'var(--tx-muted)',
                  border:     `1px solid ${activesCat === cat.id ? cat.accent + '50' : 'var(--border)'}`,
                }}
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span className="text-xs opacity-70">({counts[cat.id] ?? 0})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Products Grid ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap px-5">
          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>
              {filtered.length === 0
                ? 'No products found'
                : `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
              {activesCat !== 'all' && (
                <span style={{ color: 'var(--clr-green)' }}>
                  {' '}in {PRODUCT_CATEGORY_MAP[activesCat as keyof typeof PRODUCT_CATEGORY_MAP]?.label}
                </span>
              )}
            </p>
            {(search || activesCat !== 'all') && (
              <button
                onClick={() => { setSearch(''); setActivesCat('all') }}
                className="flex items-center gap-1 text-xs"
                style={{ color: 'var(--tx-muted)' }}
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Package size={48} style={{ color: 'var(--tx-faint)', margin: '0 auto 16px' }} />
              <p className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
                NO PRODUCTS FOUND
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--tx-muted)' }}>
                Try adjusting your search or category filter.
              </p>
              <button onClick={() => { setSearch(''); setActivesCat('all') }} className="btn btn-green">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--clr-green)' }}>
        <AOS>
          <div className="wrap px-5 text-center max-w-lg mx-auto">
            <p className="text-green-200 text-xs font-bold uppercase tracking-widest mb-3">
              Mechelin Metals Nigeria PVT LTD
            </p>
            <h2
              className="text-white mb-4"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)' }}
            >
              NEED BULK SUPPLY?
            </h2>
            <p className="text-green-100 mb-8 text-sm leading-relaxed">
              Our sales team is ready to discuss volume pricing, custom specifications,
              export documentation and delivery timelines for any product.
            </p>
            <Link href="/contact" className="btn" style={{ background: '#fff', color: 'var(--clr-green)', fontWeight: 700 }}>
              Request a Quote <ArrowRight size={15} />
            </Link>
          </div>
        </AOS>
      </section>
    </>
  )
}

/* ── Product Card ─────────────────────────────────────────────────────────── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const cat    = PRODUCT_CATEGORY_MAP[product.category]
  const accent = cat?.accent ?? '#16a34a'

  const displayPrice = product.showPrice && product.price
    ? `${product.currency} ${product.price.toLocaleString()}`
    : null

  return (
    <AOS delay={Math.min(index % 4, 3) * 60}>
      <Link href={`/products/${product.slug}`} className="product-card block group">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-106"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <span
              className="badge text-white"
              style={{ background: `${accent}cc`, backdropFilter: 'blur(4px)' }}
            >
              {cat?.icon} {cat?.label}
            </span>
            {product.featured && (
              <span className="badge" style={{ background: 'rgba(217,119,6,0.85)', color: '#fff' }}>
                ★ Featured
              </span>
            )}
          </div>

          {/* Stock status */}
          <div className="absolute bottom-3 left-3">
            <span
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.7)', color: product.stockAvailable ? '#4ade80' : '#f87171' }}
            >
              <span className={`avail-dot ${product.stockAvailable ? 'in' : 'out'}`} />
              {product.stockAvailable ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          {/* Subcategory */}
          {product.subcategory && (
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: accent }}>
              {product.subcategory}
            </p>
          )}

          {/* Title */}
          <h3
            className="mb-2 leading-snug"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              color: 'var(--tx-primary)',
              letterSpacing: '0.03em',
            }}
          >
            {product.title}
          </h3>

          {/* Short desc */}
          <p
            className="text-xs leading-relaxed mb-4 line-clamp-2"
            style={{ color: 'var(--tx-muted)' }}
          >
            {product.shortDescription}
          </p>

          {/* Key specs row */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.purity && (
              <span className="badge" style={{ background: 'rgba(22,163,74,0.1)', color: 'var(--clr-green)', border: '1px solid rgba(22,163,74,0.2)' }}>
                <Tag size={9} /> {product.purity}
              </span>
            )}
            {product.materialGrade && (
              <span className="badge" style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                {product.materialGrade}
              </span>
            )}
            {product.unitType && product.moq && (
              <span className="badge" style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                MOQ: {product.moq} {product.unitType}
              </span>
            )}
            {product.exportAvailable && (
              <span className="badge" style={{ background: 'rgba(2,132,199,0.1)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.2)' }}>
                <Globe size={9} /> Export
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-auto pt-4 border-t flex items-center justify-between gap-3"
            style={{ borderColor: 'var(--border)' }}>
            <div>
              {displayPrice ? (
                <p className="price-tag" style={{ fontSize: '1.1rem' }}>{displayPrice}</p>
              ) : product.priceNegotiable || product.requestQuote ? (
                <p className="text-xs font-semibold" style={{ color: 'var(--clr-green)' }}>
                  Price on Request
                </p>
              ) : (
                <p className="text-xs" style={{ color: 'var(--tx-faint)' }}>Contact for price</p>
              )}
              {product.priceNegotiable && displayPrice && (
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--tx-faint)' }}>Negotiable</p>
              )}
            </div>
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{ background: 'var(--clr-green)', color: '#fff' }}
            >
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </AOS>
  )
}
