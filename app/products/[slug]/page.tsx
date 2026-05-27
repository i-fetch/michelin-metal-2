// app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft, ArrowRight, CheckCircle, Globe,
  Package, Phone, ShieldCheck, Tag, Truck,
  ChevronRight, Award, Boxes, Clock, MapPin,
  BarChart3,
} from 'lucide-react'
import AOS from '@/components/AnimateOnScroll'
import ImageGallery from '@/components/ImageGallery'
import { PRODUCT_CATEGORY_MAP } from '@/lib/productCategories'
import { getProductBySlug, getRelatedProducts } from '@/actions/products'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getProductBySlug(slug)
  if (!p) return { title: 'Not Found' }
  return {
    title: p.seoTitle || p.title,
    description: p.seoDescription || p.shortDescription,
    openGraph: { images: [p.image] },
  }
}

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.category, slug)
  const cat = PRODUCT_CATEGORY_MAP[product.category]
  const accent = cat?.accent ?? '#16a34a'

  const displayPrice = product.showPrice && product.price
    ? `${product.currency} ${product.price.toLocaleString()}`
    : null

  const specsTable = [
    product.purity && { label: 'Purity', value: product.purity },
    product.materialGrade && { label: 'Material Grade', value: product.materialGrade },
    product.condition && { label: 'Condition', value: product.condition },
    product.packagingType && { label: 'Packaging', value: product.packagingType },
    product.unitType && { label: 'Unit', value: product.unitType },
    product.moq && { label: 'Min. Order Qty', value: `${product.moq} ${product.unitType}` },
    product.quantityAvailable && { label: 'Qty Available', value: `${product.quantityAvailable} ${product.unitType}` },
    product.supplyCapacity && { label: 'Supply Capacity', value: product.supplyCapacity },
    product.deliveryTimeline && { label: 'Delivery', value: product.deliveryTimeline },
    product.countryOfOrigin && { label: 'Origin', value: product.countryOfOrigin },
    product.recyclingClass && { label: 'Recycling Class', value: product.recyclingClass },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* ══ BREADCRUMB ══ */}
      <div
        className="pt-24 pb-0"
        style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--tx-muted)' }}>
            <Link href="/" className="hover:underline transition-colors" style={{ color: 'var(--tx-muted)' }}>Home</Link>
            <ChevronRight size={11} />
            <Link href="/products" className="hover:underline transition-colors" style={{ color: 'var(--tx-muted)' }}>Products</Link>
            <ChevronRight size={11} />
            {cat && (
              <>
                <Link
                  href={`/products?cat=${product.category}`}
                  className="font-semibold hover:underline"
                  style={{ color: accent }}
                >
                  {cat.label}
                </Link>
                <ChevronRight size={11} />
              </>
            )}
            <span className="font-medium truncate max-w-[180px]" style={{ color: 'var(--tx-primary)' }}>
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ══ HERO: Gallery + Purchase Panel ══ */}
      <section className="py-12" style={{ background: 'var(--bg-main)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 xl:gap-14 items-start">

            {/* LEFT: Gallery */}
            <AOS>
              <ImageGallery images={product.images} title={product.title} accent={accent} />
            </AOS>

            {/* RIGHT: Purchase Panel */}
            <AOS delay={80}>
              <div className="lg:sticky lg:top-24 flex flex-col gap-5">

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}28` }}
                  >
                    {cat?.icon}&nbsp;{cat?.label}
                  </span>
                  {product.subcategory && (
                    <span
                      className="inline-flex items-center text-[11px] font-medium px-3 py-1 rounded-full"
                      style={{ background: 'var(--bg-subtle)', color: 'var(--tx-muted)', border: '1px solid var(--border-subtle)' }}
                    >
                      {product.subcategory}
                    </span>
                  )}
                  {product.featured && (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(180,83,9,0.10)', color: '#b45309', border: '1px solid rgba(180,83,9,0.22)' }}
                    >
                      ★ Featured
                    </span>
                  )}
                  {product.exportAvailable && (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(2,132,199,0.09)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.2)' }}
                    >
                      <Globe size={9} /> Export
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1
                  className="leading-tight font-black"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)',
                    color: 'var(--tx-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {product.title.toUpperCase()}
                </h1>

                {/* Short desc */}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
                  {product.shortDescription}
                </p>

                {/* Divider */}
                <div style={{ height: 1, background: 'var(--border-subtle)' }} />

                {/* Price block */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1.5px solid var(--border-subtle)',
                    boxShadow: '0 4px 20px rgba(15,23,42,0.05)',
                  }}
                >
                  {displayPrice ? (
                    <div className="mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--tx-muted)' }}>
                        Price per {product.unitType}
                      </p>
                      <p
                        className="font-black leading-none"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.8rem,4vw,2.4rem)',
                          color: 'var(--clr-green)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {displayPrice}
                      </p>
                      {product.priceNegotiable && (
                        <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--tx-muted)' }}>
                          ✓ Negotiable for bulk orders
                        </p>
                      )}
                      {product.bulkPricing && (
                        <p className="text-xs mt-1 font-semibold" style={{ color: 'var(--clr-green)' }}>
                          {product.bulkPricing}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <p className="text-sm font-bold mb-1" style={{ color: 'var(--tx-primary)' }}>Price on Request</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                        Contact our sales team for current pricing, volume discounts and export terms.
                      </p>
                    </div>
                  )}

                  {/* Stock + MOQ */}
                  <div
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: product.stockAvailable ? '#22c55e' : '#f87171',
                          boxShadow: product.stockAvailable ? '0 0 6px #22c55e' : '0 0 6px #f87171',
                        }}
                      />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: product.stockAvailable ? '#16a34a' : '#dc2626' }}
                      >
                        {product.stockAvailable ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    {product.moq && (
                      <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>
                        MOQ:&nbsp;
                        <span className="font-semibold" style={{ color: 'var(--tx-secondary)' }}>
                          {product.moq} {product.unitType}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/contact"
                    className="btn btn-green w-full justify-center font-bold"
                    style={{ paddingTop: '0.85rem', paddingBottom: '0.85rem', borderRadius: '0.75rem' }}
                  >
                    <Phone size={15} /> Request a Quote
                  </Link>
                  <Link
                    href="/contact"
                    className="btn btn-outline w-full justify-center"
                    style={{ paddingTop: '0.8rem', paddingBottom: '0.8rem', borderRadius: '0.75rem' }}
                  >
                    Contact Sales Team
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: ShieldCheck, label: 'Verified Supplier', color: 'var(--clr-green)' },
                    { icon: Award, label: '10+ Yrs Experience', color: '#b45309' },
                    { icon: Globe, label: 'Export Ready', color: '#0284c7' },
                  ].map(b => (
                    <div
                      key={b.label}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                      style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}
                    >
                      <b.icon size={15} style={{ color: b.color }} />
                      <p className="text-[9px] font-bold uppercase tracking-wide leading-tight" style={{ color: 'var(--tx-muted)' }}>
                        {b.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quick specs */}
                {specsTable.length > 0 && (
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
                    <div
                      className="px-4 py-3 flex items-center gap-2"
                      style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
                    >
                      <BarChart3 size={12} style={{ color: 'var(--tx-muted)' }} />
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--tx-muted)' }}>
                        Quick Specs
                      </p>
                    </div>
                    <div style={{ background: 'var(--bg-surface)' }}>
                      {specsTable.map((row, i) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between px-4 py-2.5 gap-4"
                          style={{ borderTop: i > 0 ? '1px solid var(--border-subtle)' : 'none' }}
                        >
                          <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>{row.label}</p>
                          <p className="text-[11px] font-semibold text-right" style={{ color: 'var(--tx-primary)' }}>
                            {row.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </AOS>
          </div>
        </div>
      </section>

      {/* ══ FULL DESCRIPTION + SPECS + APPLICATIONS ══ */}
      <section className="py-16 md:py-24" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">

            {/* Left: Full description + specs */}
            <AOS>
              <p className="tag mb-4">Product Overview</p>
              <h2
                className="mb-7 font-black"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  color: 'var(--tx-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                Full Details
              </h2>

              <div className="space-y-4 mb-12" style={{ color: 'var(--tx-secondary)', lineHeight: 1.9, fontSize: '0.925rem' }}>
                {product.fullDescription.split('\n').filter(p => p.trim()).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {product.specs.length > 0 && (
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2"
                    style={{ color: 'var(--tx-muted)' }}
                  >
                    <Tag size={11} /> Detailed Specifications
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.specs.map(s => (
                      <div
                        key={s}
                        className="flex items-start gap-3 p-4 rounded-xl text-sm"
                        style={{
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--tx-secondary)',
                        }}
                      >
                        <CheckCircle size={14} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </AOS>

            {/* Right sidebar: Applications + Logistics + Tags */}
            <AOS delay={100}>
              <div className="flex flex-col gap-4">

                {product.applications.length > 0 && (
                  <div
                    className="rounded-2xl p-5"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--tx-muted)' }}>
                      <Truck size={11} /> Industrial Applications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map(a => (
                        <span
                          key={a}
                          className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                          style={{ background: `${accent}0e`, color: accent, border: `1px solid ${accent}22` }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(product.deliveryTimeline || product.packagingType || product.exportAvailable) && (
                  <div
                    className="rounded-2xl p-5"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--tx-muted)' }}>
                      <Boxes size={11} /> Logistics
                    </p>
                    <div className="flex flex-col gap-3">
                      {product.packagingType && (
                        <div className="flex justify-between text-xs">
                          <span style={{ color: 'var(--tx-muted)' }}>Packaging</span>
                          <span className="font-semibold" style={{ color: 'var(--tx-secondary)' }}>{product.packagingType}</span>
                        </div>
                      )}
                      {product.deliveryTimeline && (
                        <div className="flex justify-between text-xs">
                          <span className="flex items-center gap-1" style={{ color: 'var(--tx-muted)' }}>
                            <Clock size={10} /> Delivery
                          </span>
                          <span className="font-semibold" style={{ color: 'var(--tx-secondary)' }}>{product.deliveryTimeline}</span>
                        </div>
                      )}
                      {product.countryOfOrigin && (
                        <div className="flex justify-between text-xs">
                          <span className="flex items-center gap-1" style={{ color: 'var(--tx-muted)' }}>
                            <MapPin size={10} /> Origin
                          </span>
                          <span className="font-semibold" style={{ color: 'var(--tx-secondary)' }}>{product.countryOfOrigin}</span>
                        </div>
                      )}
                      {product.exportAvailable && (
                        <div
                          className="flex items-center gap-2 pt-3 text-xs"
                          style={{ borderTop: '1px solid var(--border-subtle)' }}
                        >
                          <Globe size={12} style={{ color: '#0284c7' }} />
                          <span className="font-semibold" style={{ color: '#0284c7' }}>International export available</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {product.tags.length > 0 && (
                  <div
                    className="rounded-2xl p-5"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--tx-muted)' }}>
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(t => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-1 rounded-full"
                          style={{ background: 'var(--bg-subtle)', color: 'var(--tx-muted)', border: '1px solid var(--border-subtle)' }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </AOS>
          </div>
        </div>
      </section>

      {/* ══ RELATED PRODUCTS ══ */}
      {related.length > 0 && (
        <section className="py-16 md:py-24" style={{ background: 'var(--bg-main)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <AOS>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-7 rounded-full" style={{ background: accent }} />
                  <h2
                    className="font-black"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                      color: 'var(--tx-primary)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Related Products
                  </h2>
                </div>
                <Link href="/products" className="btn btn-outline text-sm">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </AOS>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <div key={p._id}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="
          group flex flex-col rounded-2xl overflow-hidden
          transition-all duration-300
          bg-[var(--bg-surface)]
          border border-[var(--border-subtle)]
          shadow-[0_2px_12px_rgba(15,23,42,0.04)]
          hover:-translate-y-1
          hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)]
        "
                  >
                    {/* IMAGE */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 50vw, 25vw"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.55)] to-transparent" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 flex flex-col gap-1.5">
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: accent }}
                      >
                        {PRODUCT_CATEGORY_MAP[p.category]?.label}
                      </p>

                      <h4
                        className="text-sm font-bold leading-snug"
                        style={{ fontFamily: "var(--font-display)", color: "var(--tx-primary)" }}
                      >
                        {p.title}
                      </h4>

                      <p className="text-xs line-clamp-2 mb-2" style={{ color: "var(--tx-muted)" }}>
                        {p.shortDescription}
                      </p>

                      <span
                        className="flex items-center gap-1.5 text-xs font-semibold transition-colors group-hover:text-[var(--clr-green)]"
                      >
                        View Details <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ CTA BANNER ══ */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
        <AOS>
          <div className="max-w-xl mx-auto px-5 text-center">
            <p className="tag mx-auto mb-5">Get In Touch</p>
            <h2
              className="mb-4 leading-none font-black"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                color: 'var(--tx-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Interested in{' '}
              <span style={{ color: 'var(--clr-green)' }}>
                {product.title}?
              </span>
            </h2>
            <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
              Contact Mechelin Metals for volume pricing, export documentation,
              delivery schedules and custom specifications.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-green">
                <Phone size={15} /> Get a Quote
              </Link>
              <Link href="/products" className="btn btn-outline">
                <ArrowLeft size={15} /> Browse More
              </Link>
            </div>
          </div>
        </AOS>
      </section>

    </div>
  )
}