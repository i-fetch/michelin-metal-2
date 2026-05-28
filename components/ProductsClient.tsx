'use client'

import { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Search, ArrowRight, Globe, ShieldCheck, X,
  Boxes, ChevronDown, Package,
  Tag,
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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const cat = PRODUCT_CATEGORY_MAP[product.category]
  const accent = cat?.accent ?? '#16a34a'

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

const EASE_HERO = [0.16, 1, 0.3, 1] as const;

const localStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 }
  }
};

const localFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_HERO } }
};

/* ─────────────────────────────────────────────────────────────
   MAIN CLIENT COMPONENT
───────────────────────────────────────────────────────────── */
export default function ProductsClient({ products }: Props) {
  const [search, setSearch] = useState('')
  const [activesCat, setActivesCat] = useState<string>('all')
  const [sort, setSort] = useState<SortKey>('newest')
  const [loading, setLoading] = useState(false)

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
      case 'oldest': list.sort((a, b) => a.createdAt.localeCompare(b.createdAt)); break
      case 'name_asc': list.sort((a, b) => a.title.localeCompare(b.title)); break
      case 'name_desc': list.sort((a, b) => b.title.localeCompare(a.title)); break
      case 'featured': list.sort((a, b) => Number(b.featured) - Number(a.featured)); break
      default: list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
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
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const trustBadges = [
    { icon: ShieldCheck, label: "ISO Certified" },
    { icon: Globe, label: "International Export" },
    { icon: Boxes, label: "Bulk Supply Available" },
  ];

  // ── PARALLAX LOGISTICS ENGINE ──
  const { scrollY } = useScroll();
  const backgroundImageY = useTransform(scrollY, [0, 800], ["0%", "20%"]);
  const contentY = useTransform(scrollY, [0, 800], ["0%", "8%"]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <>
      {/* ══ HERO ══ */}
      <section
        ref={heroContainerRef}
        className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center justify-between overflow-hidden bg-[#ffffff] pt-36 pb-24 md:pt-44 md:pb-32"
        aria-label="Product Catalogue and Materials Engine Introduction"
      >
        {/* ══ LAYER 1: HARDWARE-ACCELERATED PARALLAX IMAGE ══ */}
        <motion.div
          style={{ y: backgroundImageY }}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
        >
          <Image
            src="/catalogue-industrial-hero.jpg" // High-fidelity raw material storage / bundle yard background asset
            alt="Mechelin Metals Inventory and Product Logistics background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.05]"
          />
        </motion.div>

        {/* ══ LAYER 2: THE CONTRAST STABILIZER MASK ENGINE (CRITICAL FOR READABILITY) ══ */}
        <div className="absolute inset-0 z-[1] pointer-events-none select-none">

          {/* MASK A: Pure white structural block gradient to neutralize asset noise directly underneath the text layout */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10 md:from-white md:via-white/80 md:to-white/5" />

          {/* MASK B: Micro-diffused backdrop blur sheet — separates complex image details from crisp text typography */}
          <div className="absolute top-0 bottom-0 left-0 w-full md:w-[75%] bg-white/20 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,white_50%,transparent_100%)]" />

          {/* MASK C: Top-down light-bleed controller to neutralize high-exposure highlights or bright sky lines */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/60 to-transparent" />

          {/* MASK D: Horizon baseline fading anchor to seamlessly lock section into the white blocks layout below */}
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#ffffff] via-[#ffffff]/90 to-transparent" />

          {/* Technical Brand Matrix Grid-Mesh Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#059669 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        {/* ══ LAYER 3: FOREGROUND HIGH-CONTRAST TYPOGRAPHY & INTERACTIVE CANVAS ══ */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 relative z-[2] will-change-transform"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={localStaggerContainer}
            className="relative max-w-3xl"
          >
            {/* Catalogue Token Badge */}
            <motion.div
              variants={localFadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-600/15 bg-white text-[var(--clr-green)] text-[10px] font-bold tracking-widest uppercase mb-6 font-mono shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
            >
              <Tag size={12} className="text-emerald-600" />
              Our Catalogue
            </motion.div>

            {/* Ultra-Sharp Anti-Aliased Service Header */}
            <div className="overflow-hidden mb-6 py-1">
              <motion.h1
                variants={localFadeUp}
                className="font-black tracking-tighter leading-[0.95] text-slate-950 subpixel-antialiased drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.8rem, 7vw, 5.5rem)'
                }}
              >
                Products &amp;{" "}
                <br className="sm:hidden" />
                <span className="text-[var(--clr-green)]">Materials</span>
              </motion.h1>
            </div>

            {/* High-Readability Segmented Body Paragraph */}
            <motion.p
              variants={localFadeUp}
              className="text-slate-900 font-medium text-base md:text-xl max-w-xl leading-relaxed font-body tracking-tight subpixel-antialiased drop-shadow-[0_1px_4px_rgba(255,255,255,0.6)] mb-8"
            >
              Mechelin Metals Nigeria — premium aluminium, copper, brass, ferrous and non-ferrous
              metals optimized for bulk supply commitments nationwide and internationally.
            </motion.p>

            {/* Trust Badges Bar Row */}
            <motion.div variants={localFadeUp} className="flex flex-wrap gap-5 mb-10">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white/70 backdrop-blur-sm border border-slate-200/60 px-3 py-1.5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.01)] subpixel-antialiased"
                >
                  <badge.icon size={14} className="text-[var(--clr-green)]" />
                  {badge.label}
                </div>
              ))}
            </motion.div>

            {/* Interactive Control Canvas Block Layer */}
            <motion.div
              variants={localFadeUp}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-slate-200/50 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
            >
              {/* Search Input Box Frame */}
              <div
                className="flex items-center gap-2.5 flex-1 px-4 py-3 rounded-xl transition-all duration-300 bg-white border border-slate-200"
                style={{ transitionProperty: "border-color, box-shadow" }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'var(--clr-green)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(5,150,105,0.08)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Search size={15} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search products, materials, grades…"
                  value={search}
                  onChange={e => applyFilter(() => setSearch(e.target.value))}
                  className="flex-1 bg-transparent text-sm outline-none font-medium text-slate-900 placeholder:text-slate-400"
                />
                {search && (
                  <button
                    onClick={() => applyFilter(() => setSearch(''))}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Interactive Custom Select Menu Box */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => applyFilter(() => setSort(e.target.value as SortKey))}
                  className="appearance-none w-full sm:w-[180px] pl-4 pr-10 py-3 rounded-xl text-sm font-semibold outline-none cursor-pointer transition-all duration-300 bg-white border border-slate-200 text-slate-800"
                  style={{ transitionProperty: "border-color, box-shadow" }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = 'var(--clr-green)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(5,150,105,0.08)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="featured">Featured First</option>
                  <option value="name_asc">Name A–Z</option>
                  <option value="name_desc">Name Z–A</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
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
                color: activesCat === 'all' ? '#fff' : 'var(--tx-muted)',
                border: `1.5px solid ${activesCat === 'all' ? 'transparent' : 'var(--border-subtle)'}`,
              }}
            >
              All Materials
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  background: activesCat === 'all' ? 'rgba(255,255,255,0.2)' : 'var(--bg-subtle)',
                  color: activesCat === 'all' ? '#fff' : 'var(--tx-muted)',
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
                  color: activesCat === cat.id ? cat.accent : 'var(--tx-muted)',
                  border: `1.5px solid ${activesCat === cat.id ? cat.accent + '40' : 'var(--border-subtle)'}`,
                }}
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    background: activesCat === cat.id ? `${cat.accent}18` : 'var(--bg-subtle)',
                    color: activesCat === cat.id ? cat.accent : 'var(--tx-muted)',
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