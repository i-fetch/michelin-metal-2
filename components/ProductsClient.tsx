'use client'

import { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Search, ArrowRight, Globe, ShieldCheck, X,
  Boxes, ChevronDown, Package,
} from 'lucide-react'
import AOS from '@/components/AnimateOnScroll'
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_MAP } from '@/lib/productCategories'
import type { Product } from '@/types'

type SortKey = 'newest' | 'oldest' | 'name_asc' | 'name_desc' | 'featured'
interface Props { products: Product[] }

const EASE = [0.22, 1, 0.36, 1] as const

/* ─────────────────────────────────────────────────────────────
   SKELETON LOADER — mirrors real card layout
───────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
    >
      {/* image area */}
      <div className="shimmer" style={{ aspectRatio: '16/10', width: '100%' }} />
      <div className="p-4 flex flex-col gap-3">
        {/* category label */}
        <div className="shimmer h-3 w-16 rounded-full" />
        {/* title */}
        <div className="shimmer h-5 w-4/5 rounded-lg" />
        {/* desc lines */}
        <div className="flex flex-col gap-1.5">
          <div className="shimmer h-3 w-full rounded" />
          <div className="shimmer h-3 w-3/4 rounded" />
        </div>
        {/* tags */}
        <div className="flex gap-2 pt-1">
          <div className="shimmer h-5 w-14 rounded-md" />
          <div className="shimmer h-5 w-14 rounded-md" />
        </div>
        {/* price + arrow row */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <div className="shimmer h-6 w-24 rounded-lg" />
          <div className="shimmer w-8 h-8 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────────────────────── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-50px' })
  const cat     = PRODUCT_CATEGORY_MAP[product.category]
  const accent  = cat?.accent ?? '#16a34a'

  const displayPrice = product.showPrice && product.price
    ? `${product.currency} ${product.price.toLocaleString()}`
    : null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: EASE }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex flex-col rounded-2xl overflow-hidden h-full transition-all duration-300"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 2px 12px rgba(15,23,42,0.04)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = `0 16px 48px rgba(15,23,42,0.10), 0 0 0 1px ${accent}28`
          el.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = '0 2px 12px rgba(15,23,42,0.04)'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Image zone */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
          />
          {/* scrim */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.08) 55%, transparent 100%)' }}
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm"
              style={{ background: `${accent}e0`, color: '#fff', letterSpacing: '0.04em' }}
            >
              {cat?.icon}&nbsp;{cat?.label}
            </span>
          </div>

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 right-3">
              <span
                className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm"
                style={{ background: 'rgba(180,83,9,0.88)', color: '#fff' }}
              >
                ★ Featured
              </span>
            </div>
          )}

          {/* Bottom row on image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(15,23,42,0.75)',
                backdropFilter: 'blur(8px)',
                color: product.stockAvailable ? '#4ade80' : '#f87171',
                border: `1px solid ${product.stockAvailable ? 'rgba(74,222,128,0.22)' : 'rgba(248,113,113,0.22)'}`,
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
            {product.exportAvailable && (
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{ background: 'rgba(2,132,199,0.85)' }}
                title="Export Available"
              >
                <Globe size={12} color="#fff" />
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col p-5 flex-1 gap-2">
          {product.subcategory && (
            <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
              {product.subcategory}
            </p>
          )}

          <h3
            className="font-bold leading-snug"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              color: 'var(--tx-primary)',
              letterSpacing: '0.01em',
            }}
          >
            {product.title}
          </h3>

          <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--tx-secondary)' }}>
            {product.shortDescription}
          </p>

          {/* Spec tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.purity && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}22` }}>
                {product.purity}
              </span>
            )}
            {product.materialGrade && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={{ background: 'var(--bg-subtle)', color: 'var(--tx-muted)', border: '1px solid var(--border-subtle)' }}>
                {product.materialGrade}
              </span>
            )}
            {product.moq && product.unitType && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={{ background: 'var(--bg-subtle)', color: 'var(--tx-muted)', border: '1px solid var(--border-subtle)' }}>
                MOQ {product.moq} {product.unitType}
              </span>
            )}
          </div>

          {/* Price + CTA */}
          <div
            className="flex items-center justify-between gap-3 pt-3 mt-auto"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <div>
              {displayPrice ? (
                <>
                  <p
                    className="font-black leading-none"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--tx-primary)' }}
                  >
                    {displayPrice}
                  </p>
                  {product.priceNegotiable && (
                    <p className="text-[9px] mt-0.5 font-semibold" style={{ color: 'var(--tx-muted)' }}>Negotiable</p>
                  )}
                </>
              ) : (
                <p className="text-xs font-bold" style={{ color: 'var(--clr-green)' }}>
                  {product.requestQuote ? 'Request Quote' : 'Price on Request'}
                </p>
              )}
            </div>
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rounded-lg group-hover:scale-110"
              style={{ background: accent, color: '#fff' }}
            >
              <ArrowRight size={15} />
            </span>
          </div>
        </div>

        {/* Bottom accent sweep */}
        <div
          className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: `linear-gradient(to right, ${accent}, ${accent}00)` }}
        />
      </Link>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN CLIENT COMPONENT
───────────────────────────────────────────────────────────── */
export default function ProductsClient({ products }: Props) {
  const [search,     setSearch]     = useState('')
  const [activesCat, setActivesCat] = useState<string>('all')
  const [sort,       setSort]       = useState<SortKey>('newest')
  const [loading,    setLoading]    = useState(false)

  /* simulate loading when filter changes for skeleton demo */
  const applyFilter = (fn: () => void) => {
    setLoading(true)
    fn()
    setTimeout(() => setLoading(false), 400)
  }

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
      case 'oldest':    list.sort((a, b) => a.createdAt.localeCompare(b.createdAt)); break
      case 'name_asc':  list.sort((a, b) => a.title.localeCompare(b.title)); break
      case 'name_desc': list.sort((a, b) => b.title.localeCompare(a.title)); break
      case 'featured':  list.sort((a, b) => Number(b.featured) - Number(a.featured)); break
      default:          list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
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
      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'var(--bg-main)' }}>
        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(var(--tx-primary) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Green glow */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <p className="tag mb-5">Our Catalogue</p>
            <h1
              className="mb-5 leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                fontWeight: 900,
                color: 'var(--tx-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Products &amp;{' '}
              <span style={{ color: 'var(--clr-green)' }}>Materials</span>
            </h1>
            <p
              className="max-w-xl text-base mb-10 leading-relaxed"
              style={{ color: 'var(--tx-secondary)', fontWeight: 300 }}
            >
              Mechelin Metals Nigeria — premium aluminium, copper, brass, ferrous and non-ferrous
              metals available for bulk supply nationwide and internationally.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 mb-10">
              {[
                { icon: ShieldCheck, label: 'ISO Certified' },
                { icon: Globe,       label: 'International Export' },
                { icon: Boxes,       label: 'Bulk Supply Available' },
              ].map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}
                  className="flex items-center gap-2 text-xs font-semibold"
                  style={{ color: 'var(--tx-muted)' }}
                >
                  <b.icon size={14} style={{ color: 'var(--clr-green)' }} />
                  {b.label}
                </motion.div>
              ))}
            </div>

            {/* Search + sort */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl"
            >
              {/* Search */}
              <div
                className="flex items-center gap-2.5 flex-1 px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-subtle)',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--clr-green)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
              >
                <Search size={15} style={{ color: 'var(--tx-muted)', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search products, materials, grades…"
                  value={search}
                  onChange={e => applyFilter(() => setSearch(e.target.value))}
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: 'var(--tx-primary)' }}
                />
                {search && (
                  <button onClick={() => applyFilter(() => setSearch(''))} style={{ color: 'var(--tx-muted)' }}>
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => applyFilter(() => setSort(e.target.value as SortKey))}
                  className="appearance-none pl-4 pr-9 py-3 rounded-xl text-sm font-medium outline-none cursor-pointer transition-all duration-200"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1.5px solid var(--border-subtle)',
                    color: 'var(--tx-primary)',
                    minWidth: 165,
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="featured">Featured First</option>
                  <option value="name_asc">Name A–Z</option>
                  <option value="name_desc">Name Z–A</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--tx-muted)' }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ STICKY FILTER BAR ══ */}
      <div
        className="sticky top-0 z-30"
        style={{
          background: 'rgba(248,250,252,0.9)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div
            className="flex items-center gap-2 overflow-x-auto py-3"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* All button */}
            <button
              onClick={() => applyFilter(() => setActivesCat('all'))}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0"
              style={{
                background: activesCat === 'all' ? 'var(--clr-green)' : 'var(--bg-surface)',
                color:      activesCat === 'all' ? '#fff' : 'var(--tx-muted)',
                border:     `1.5px solid ${activesCat === 'all' ? 'transparent' : 'var(--border-subtle)'}`,
              }}
            >
              All Materials
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  background: activesCat === 'all' ? 'rgba(255,255,255,0.2)' : 'var(--bg-subtle)',
                  color:      activesCat === 'all' ? '#fff' : 'var(--tx-muted)',
                }}
              >
                {counts.all}
              </span>
            </button>

            {PRODUCT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => applyFilter(() => setActivesCat(cat.id))}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0"
                style={{
                  background: activesCat === cat.id ? `${cat.accent}14` : 'var(--bg-surface)',
                  color:      activesCat === cat.id ? cat.accent : 'var(--tx-muted)',
                  border:     `1.5px solid ${activesCat === cat.id ? cat.accent + '40' : 'var(--border-subtle)'}`,
                }}
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    background: activesCat === cat.id ? `${cat.accent}18` : 'var(--bg-subtle)',
                    color:      activesCat === cat.id ? cat.accent : 'var(--tx-muted)',
                  }}
                >
                  {counts[cat.id] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ GRID SECTION ══ */}
      <section className="py-10 pb-24" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Results bar */}
          <div className="flex items-center justify-between gap-4 mb-7">
            <div className="flex items-center gap-2.5 flex-wrap">
              <AnimatePresence mode="wait">
                <motion.span
                  key={filtered.length}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--tx-muted)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: filtered.length > 0 ? 'var(--clr-green)' : '#f87171' }}
                  />
                  {filtered.length === 0 ? 'No results' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
                </motion.span>
              </AnimatePresence>

              {activesCat !== 'all' && (() => {
                const cat = PRODUCT_CATEGORY_MAP[activesCat as keyof typeof PRODUCT_CATEGORY_MAP]
                return cat ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: `${cat.accent}12`, color: cat.accent, border: `1px solid ${cat.accent}28` }}
                  >
                    {cat.icon} {cat.label}
                  </span>
                ) : null
              })()}

              {search && (
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: 'var(--bg-surface)', color: 'var(--tx-muted)', border: '1px solid var(--border-subtle)' }}
                >
                  &ldquo;{search}&rdquo;
                </span>
              )}
            </div>

            {(search || activesCat !== 'all') && (
              <button
                onClick={() => applyFilter(() => { setSearch(''); setActivesCat('all') })}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                style={{
                  color: 'var(--tx-muted)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                }}
              >
                <X size={11} /> Clear all
              </button>
            )}
          </div>

          {/* Grid / Skeleton / Empty */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SkeletonGrid />
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center py-28 rounded-2xl"
                style={{ border: '1.5px dashed var(--border-subtle)', background: 'var(--bg-surface)' }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative"
                  style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}
                >
                  <Package size={34} style={{ color: 'var(--tx-muted)' }} />
                  <span className="absolute -top-2 -right-2 text-base">🔍</span>
                </div>
                <h3
                  className="font-black mb-2"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--tx-primary)', letterSpacing: '-0.01em' }}
                >
                  No Products Found
                </h3>
                <p className="text-sm mb-8 max-w-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  No materials match your current filters. Try a different category or clear your search.
                </p>
                <button
                  onClick={() => applyFilter(() => { setSearch(''); setActivesCat('all') })}
                  className="btn btn-green"
                >
                  Show All Products
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product._id} product={product} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-24" style={{ background: 'var(--bg-surface)' }}>
        <AOS>
          <div className="max-w-2xl mx-auto px-5 text-center">
            <p className="tag mx-auto mb-5">Mechelin Metals Nigeria</p>
            <h2
              className="mb-4 leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: 'var(--tx-primary)',
              }}
            >
              Need Bulk{' '}
              <span style={{ color: 'var(--clr-green)' }}>Supply?</span>
            </h2>
            <p className="mb-8 text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'var(--tx-secondary)' }}>
              Our sales team is ready to discuss volume pricing, custom specifications,
              export documentation and delivery timelines for any product.
            </p>
            <Link href="/contact" className="btn btn-green">
              Request a Quote <ArrowRight size={15} />
            </Link>
          </div>
        </AOS>
      </section>
    </>
  )
}