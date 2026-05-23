// app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link  from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft, ArrowRight, CheckCircle, Globe,
  Package, Phone, ShieldCheck, Tag, Truck,
  ChevronRight, Award, Boxes, Clock, MapPin,
  Star, Zap, BarChart3, Shield,
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
    title:       p.seoTitle || p.title,
    description: p.seoDescription || p.shortDescription,
    openGraph: { images: [p.image] },
  }
}

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product  = await getProductBySlug(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.category, slug)
  const cat     = PRODUCT_CATEGORY_MAP[product.category]
  const accent  = cat?.accent ?? '#16a34a'

  const displayPrice = product.showPrice && product.price
    ? `${product.currency} ${product.price.toLocaleString()}`
    : null

  const specsTable = [
    product.purity        && { label: 'Purity',             value: product.purity },
    product.materialGrade && { label: 'Material Grade',      value: product.materialGrade },
    product.condition     && { label: 'Condition',           value: product.condition },
    product.packagingType && { label: 'Packaging',           value: product.packagingType },
    product.unitType      && { label: 'Unit',                value: product.unitType },
    product.moq           && { label: 'Min. Order Qty',      value: `${product.moq} ${product.unitType}` },
    product.quantityAvailable && { label: 'Qty Available',   value: `${product.quantityAvailable} ${product.unitType}` },
    product.supplyCapacity && { label: 'Supply Capacity',    value: product.supplyCapacity },
    product.deliveryTimeline && { label: 'Delivery',         value: product.deliveryTimeline },
    product.countryOfOrigin  && { label: 'Origin',           value: product.countryOfOrigin },
    product.recyclingClass   && { label: 'Recycling Class',  value: product.recyclingClass },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Breadcrumb ── */}
      <div className="pt-24 pb-0" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-5">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--tx-faint)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={11} />
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight size={11} />
            {cat && (
              <>
                <Link href={`/products?cat=${product.category}`} style={{ color: accent }}
                  className="hover:opacity-80 transition-opacity">
                  {cat.label}
                </Link>
                <ChevronRight size={11} />
              </>
            )}
            <span style={{ color: 'var(--tx-secondary)' }}>{product.title}</span>
          </nav>
        </div>
      </div>

      {/* ── HERO: Gallery + Purchase Panel ── */}
      <section className="py-8" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-5">
          <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-8 xl:gap-12 items-start">

            {/* LEFT: Gallery */}
            <AOS>
              <ImageGallery images={product.images} title={product.title} accent={accent} />
            </AOS>

            {/* RIGHT: Purchase Panel */}
            <AOS delay={80}>
              <div className="lg:sticky lg:top-24 space-y-4">

                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
                    {cat?.icon} {cat?.label}
                  </span>
                  {product.subcategory && (
                    <span className="inline-flex items-center text-[11px] font-medium px-3 py-1 rounded-full"
                      style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                      {product.subcategory}
                    </span>
                  )}
                  {product.featured && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(217,119,6,0.12)', color: '#d97706', border: '1px solid rgba(217,119,6,0.3)' }}>
                      ★ Featured
                    </span>
                  )}
                  {product.exportAvailable && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(2,132,199,0.1)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.2)' }}>
                      <Globe size={9} /> Export
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="leading-tight font-black"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                    color: 'var(--tx-primary)',
                    letterSpacing: '-0.01em',
                  }}>
                  {product.title.toUpperCase()}
                </h1>

                {/* Short description */}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  {product.shortDescription}
                </p>

                {/* Divider */}
                <div style={{ height: 1, background: 'var(--border)' }} />

                {/* Price block */}
                <div className="rounded-2xl p-5 space-y-3"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>

                  {displayPrice ? (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1"
                        style={{ color: 'var(--tx-faint)' }}>
                        Price per {product.unitType}
                      </p>
                      <p className="price-tag" style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)' }}>{displayPrice}</p>
                      {product.priceNegotiable && (
                        <p className="text-xs mt-1" style={{ color: 'var(--tx-faint)' }}>
                          ✓ Negotiable for bulk orders
                        </p>
                      )}
                      {product.bulkPricing && (
                        <p className="text-xs mt-1.5 font-semibold" style={{ color: 'var(--clr-green)' }}>
                          {product.bulkPricing}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--tx-primary)' }}>
                        Price on Request
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                        Contact our sales team for current pricing, volume discounts and export terms.
                      </p>
                    </div>
                  )}

                  {/* Stock + MOQ row */}
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${product.stockAvailable ? 'bg-green-400' : 'bg-red-400'}`}
                        style={{ boxShadow: product.stockAvailable ? '0 0 6px #4ade80' : '0 0 6px #f87171' }} />
                      <span className="text-xs font-semibold"
                        style={{ color: product.stockAvailable ? '#4ade80' : '#f87171' }}>
                        {product.stockAvailable ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    {product.moq && (
                      <p className="text-xs" style={{ color: 'var(--tx-faint)' }}>
                        MOQ: <span className="font-semibold" style={{ color: 'var(--tx-secondary)' }}>
                          {product.moq} {product.unitType}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2.5">
                  <Link href="/contact"
                    className="btn btn-green w-full justify-center text-sm font-bold"
                    style={{ paddingTop: '0.8rem', paddingBottom: '0.8rem', borderRadius: '0.75rem' }}>
                    <Phone size={15} /> Request a Quote
                  </Link>
                  <Link href="/contact"
                    className="btn btn-outline w-full justify-center text-sm"
                    style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem', borderRadius: '0.75rem' }}>
                    Contact Sales Team
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { icon: ShieldCheck, label: 'Verified Supplier', color: 'var(--clr-green)' },
                    { icon: Award,       label: '10+ Yrs Experience', color: '#d97706' },
                    { icon: Globe,       label: 'Export Ready',       color: '#0284c7' },
                  ].map(b => (
                    <div key={b.label}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                      style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                      <b.icon size={16} style={{ color: b.color }} />
                      <p className="text-[9px] font-bold uppercase tracking-wide leading-tight"
                        style={{ color: 'var(--tx-faint)' }}>{b.label}</p>
                    </div>
                  ))}
                </div>

                {/* Quick specs — condensed in sidebar */}
                {specsTable.length > 0 && (
                  <div className="rounded-2xl overflow-hidden"
                    style={{ border: '1px solid var(--border)' }}>
                    <div className="px-4 py-2.5 flex items-center gap-2"
                      style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                      <BarChart3 size={12} style={{ color: 'var(--tx-faint)' }} />
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--tx-faint)' }}>
                        Quick Specs
                      </p>
                    </div>
                    <div style={{ background: 'var(--bg-3)' }}>
                      {specsTable.map((row, i) => (
                        <div key={row.label}
                          className="flex items-center justify-between px-4 py-2.5 gap-4"
                          style={{
                            borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                          }}>
                          <p className="text-[11px]" style={{ color: 'var(--tx-faint)' }}>{row.label}</p>
                          <p className="text-[11px] font-semibold text-right" style={{ color: 'var(--tx-secondary)' }}>
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

      {/* ── Full Description + Specs + Applications ── */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap px-5">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10">

            {/* Left: Description + Specs */}
            <AOS>
              <p className="tag mb-3">Product Overview</p>
              <h2 className="mb-6 font-black"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem,3vw,2rem)',
                  color: 'var(--tx-primary)',
                  letterSpacing: '-0.01em',
                }}>
                FULL DETAILS
              </h2>

              <div className="space-y-4 mb-10"
                style={{ color: 'var(--tx-muted)', lineHeight: 1.9, fontSize: '0.925rem' }}>
                {product.fullDescription.split('\n').filter(p => p.trim()).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Detailed specs list */}
              {product.specs.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
                    style={{ color: 'var(--tx-faint)' }}>
                    <Tag size={11} />Detailed Specifications
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.specs.map(s => (
                      <div key={s}
                        className="flex items-start gap-3 p-3 rounded-xl text-sm"
                        style={{
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          color: 'var(--tx-secondary)',
                        }}>
                        <CheckCircle size={14} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </AOS>

            {/* Right: Applications + Logistics + Tags */}
            <AOS delay={100}>
              <div className="space-y-5">

                {/* Applications */}
                {product.applications.length > 0 && (
                  <div className="rounded-2xl p-5"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
                      style={{ color: 'var(--tx-faint)' }}>
                      <Truck size={11} />Industrial Applications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map(a => (
                        <span key={a} className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                          style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}>
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Logistics */}
                {(product.deliveryTimeline || product.packagingType || product.exportAvailable) && (
                  <div className="rounded-2xl p-5"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
                      style={{ color: 'var(--tx-faint)' }}>
                      <Boxes size={11} />Logistics
                    </p>
                    <div className="space-y-3">
                      {product.packagingType && (
                        <div className="flex justify-between text-xs">
                          <span style={{ color: 'var(--tx-faint)' }}>Packaging</span>
                          <span className="font-semibold" style={{ color: 'var(--tx-secondary)' }}>{product.packagingType}</span>
                        </div>
                      )}
                      {product.deliveryTimeline && (
                        <div className="flex justify-between text-xs">
                          <span className="flex items-center gap-1" style={{ color: 'var(--tx-faint)' }}>
                            <Clock size={10} />Delivery
                          </span>
                          <span className="font-semibold" style={{ color: 'var(--tx-secondary)' }}>{product.deliveryTimeline}</span>
                        </div>
                      )}
                      {product.countryOfOrigin && (
                        <div className="flex justify-between text-xs">
                          <span className="flex items-center gap-1" style={{ color: 'var(--tx-faint)' }}>
                            <MapPin size={10} />Origin
                          </span>
                          <span className="font-semibold" style={{ color: 'var(--tx-secondary)' }}>{product.countryOfOrigin}</span>
                        </div>
                      )}
                      {product.exportAvailable && (
                        <div className="flex items-center gap-2 pt-3 border-t text-xs" style={{ borderColor: 'var(--border)' }}>
                          <Globe size={12} style={{ color: '#0284c7' }} />
                          <span style={{ color: '#0284c7', fontWeight: 600 }}>International export available</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="rounded-2xl p-5"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3"
                      style={{ color: 'var(--tx-faint)' }}>Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(t => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-full"
                          style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
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

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section className="section" style={{ background: 'var(--bg)' }}>
          <div className="wrap px-5">
            <AOS>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-7 rounded-full" style={{ background: accent }} />
                  <h2 className="font-black"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: 'var(--tx-primary)' }}>
                    RELATED PRODUCTS
                  </h2>
                </div>
                <Link href="/products" className="btn btn-ghost text-sm">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </AOS>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <AOS key={p._id} delay={i * 60}>
                  <Link href={`/products/${p.slug}`} className="product-card block group">
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <Image src={p.image} alt={p.title} fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 50vw, 25vw" />
                      <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>
                        {PRODUCT_CATEGORY_MAP[p.category]?.label}
                      </p>
                      <h4 className="text-sm font-semibold mb-1.5"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
                        {p.title}
                      </h4>
                      <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--tx-muted)' }}>
                        {p.shortDescription}
                      </p>
                      <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--clr-green)' }}>
                        View Details <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </AOS>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="section" style={{ background: 'var(--clr-green)' }}>
        <AOS>
          <div className="wrap px-5 text-center max-w-lg mx-auto">
            <h2 className="text-white mb-4 font-black"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
              INTERESTED IN {product.title.toUpperCase()}?
            </h2>
            <p className="text-green-100 mb-8 text-sm leading-relaxed">
              Contact Mechelin Metals for volume pricing, export documentation,
              delivery schedules and custom specifications.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn"
                style={{ background: '#fff', color: 'var(--clr-green)', fontWeight: 700 }}>
                <Phone size={15} /> Get a Quote
              </Link>
              <Link href="/products" className="btn"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                <ArrowLeft size={15} /> Browse More
              </Link>
            </div>
          </div>
        </AOS>
      </section>

    </div>
  )
}