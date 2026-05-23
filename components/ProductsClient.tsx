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
      {/* ── Products Grid ─────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-2)', paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <div className="wrap px-5">

          {/* ── Results bar ── */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Count pill */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--tx-muted)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: filtered.length > 0 ? 'var(--clr-green)' : '#f87171' }}
                />
                {filtered.length === 0 ? 'No results' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
              </span>

              {/* Active category chip */}
              {activesCat !== 'all' && (() => {
                const cat = PRODUCT_CATEGORY_MAP[activesCat as keyof typeof PRODUCT_CATEGORY_MAP]
                return cat ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: `${cat.accent}15`, color: cat.accent, border: `1px solid ${cat.accent}30` }}
                  >
                    {cat.icon} {cat.label}
                  </span>
                ) : null
              })()}

              {/* Search chip */}
              {search && (
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}
                >
                  "{search}"
                </span>
              )}
            </div>

            {/* Clear filters */}
            {(search || activesCat !== 'all') && (
              <button
                onClick={() => { setSearch(''); setActivesCat('all') }}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                style={{
                  color: 'var(--tx-muted)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                }}
              >
                <X size={11} /> Clear all
              </button>
            )}
          </div>

          {/* ── Empty state ── */}
          {filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center text-center py-24 rounded-2xl"
              style={{ border: '1px dashed var(--border)', background: 'var(--surface)' }}
            >
              {/* Icon cluster */}
              <div className="relative mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}
                >
                  <Package size={36} style={{ color: 'var(--tx-faint)' }} />
                </div>
                <span
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  🔍
                </span>
              </div>
              <p
                className="font-black mb-2"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--tx-primary)', letterSpacing: '-0.01em' }}
              >
                NO PRODUCTS FOUND
              </p>
              <p className="text-sm mb-8 max-w-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                No materials match your current filters. Try a different category or clear your search.
              </p>
              <button
                onClick={() => { setSearch(''); setActivesCat('all') }}
                className="btn btn-green"
                style={{ borderRadius: '0.75rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
              >
                Show All Products
              </button>
            </div>

          ) : (
            /* ── Grid ── */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
      <Link
        href={`/products/${product.slug}`}
        className="group block rounded-2xl overflow-hidden h-full"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = accent + '55'
          el.style.transform = 'translateY(-3px)'
          el.style.boxShadow = `0 12px 40px ${accent}18`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--border)'
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
        }}
      >
        {/* ── Image zone ── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
          />
          {/* Bottom-up scrim */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }}
          />

          {/* Category badge — top left */}
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg"
              style={{
                background: `${accent}dd`,
                color: '#fff',
                backdropFilter: 'blur(6px)',
                letterSpacing: '0.03em',
              }}
            >
              {cat?.icon} {cat?.label}
            </span>
          </div>

          {/* Featured badge — top right */}
          {product.featured && (
            <div className="absolute top-3 right-3">
              <span
                className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg"
                style={{ background: 'rgba(217,119,6,0.88)', color: '#fff', backdropFilter: 'blur(6px)' }}
              >
                ★ Featured
              </span>
            </div>
          )}

          {/* Stock pill — bottom left, overlapping body */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.72)',
                color: product.stockAvailable ? '#4ade80' : '#f87171',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${product.stockAvailable ? 'rgba(74,222,128,0.25)' : 'rgba(248,113,113,0.25)'}`,
              }}
            >
              <span
                style={{
                  width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                  background: product.stockAvailable ? '#4ade80' : '#f87171',
                  boxShadow: product.stockAvailable ? '0 0 5px #4ade80' : '0 0 5px #f87171',
                }}
              />
              {product.stockAvailable ? 'In Stock' : 'Out of Stock'}
            </span>

            {/* Export globe — bottom right if applicable */}
            {product.exportAvailable && (
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(2,132,199,0.85)', backdropFilter: 'blur(6px)' }}
                title="Export Available"
              >
                <Globe size={12} style={{ color: '#fff' }} />
              </span>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col p-4" style={{ minHeight: 180 }}>

          {/* Subcategory label */}
          {product.subcategory && (
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: accent }}
            >
              {product.subcategory}
            </p>
          )}

          {/* Title */}
          <h3
            className="mb-2 leading-snug font-black"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              color: 'var(--tx-primary)',
              letterSpacing: '0.02em',
            }}
          >
            {product.title}
          </h3>

          {/* Short desc */}
          <p
            className="text-xs leading-relaxed line-clamp-2 mb-3"
            style={{ color: 'var(--tx-muted)' }}
          >
            {product.shortDescription}
          </p>

          {/* Spec tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.purity && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}22` }}
              >
                {product.purity}
              </span>
            )}
            {product.materialGrade && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}
              >
                {product.materialGrade}
              </span>
            )}
            {product.moq && product.unitType && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}
              >
                MOQ {product.moq} {product.unitType}
              </span>
            )}
          </div>

          {/* Price + CTA row — pinned to bottom */}
          <div
            className="flex items-center justify-between gap-3 mt-auto pt-3"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div>
              {displayPrice ? (
                <>
                  <p
                    className="font-black leading-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      color: 'var(--tx-primary)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {displayPrice}
                  </p>
                  {product.priceNegotiable && (
                    <p className="text-[9px] mt-0.5 font-semibold" style={{ color: 'var(--tx-faint)' }}>
                      Negotiable
                    </p>
                  )}
                </>
              ) : (
                <p className="text-xs font-bold" style={{ color: 'var(--clr-green)' }}>
                  {product.requestQuote ? 'Request Quote' : 'Price on Request'}
                </p>
              )}
            </div>

            {/* Arrow CTA */}
            <span
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rounded-lg"
              style={{ background: accent, color: '#fff' }}
            >
              <ArrowRight size={15} />
            </span>
          </div>
        </div>

        {/* Bottom accent line — slides in on hover */}
        <div
          className="h-0.5 transition-all duration-300"
          style={{ background: `linear-gradient(to right, ${accent}, ${accent}00)` }}
        />
      </Link>
    </AOS>
  )
}