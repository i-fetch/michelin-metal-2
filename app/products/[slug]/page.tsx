// app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link  from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft, ArrowRight, CheckCircle, Globe,
  Package, Phone, ShieldCheck, Tag, Truck,
  ChevronRight, Award, Boxes, Clock,
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

  // Build specs table from fields
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
    <>
      {/* ── Breadcrumb ────────────────────────────────────────────── */}
      <section className="pt-24 pb-4" style={{ background: 'var(--bg)' }}>
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
      </section>

      {/* ── Main Product Section ──────────────────────────────────── */}
      <section className="pb-12" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-5">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">

            {/* ── Left: Gallery ── */}
            <div>
              <AOS>
                <ImageGallery images={product.images} title={product.title} accent={accent} />
              </AOS>
            </div>

            {/* ── Right: Info panel ── */}
            <div className="lg:sticky lg:top-24">
              <AOS delay={80}>
                {/* Category + status badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="badge"
                    style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
                    {cat?.icon} {cat?.label}
                  </span>
                  {product.subcategory && (
                    <span className="badge" style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                      {product.subcategory}
                    </span>
                  )}
                  {product.featured && (
                    <span className="badge" style={{ background: 'rgba(217,119,6,0.12)', color: '#d97706', border: '1px solid rgba(217,119,6,0.3)' }}>
                      ★ Featured
                    </span>
                  )}
                  {product.exportAvailable && (
                    <span className="badge" style={{ background: 'rgba(2,132,199,0.1)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.2)' }}>
                      <Globe size={9} /> Export Available
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1
                  className="mb-3 leading-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem,4vw,2.8rem)',
                    color: 'var(--tx-primary)',
                  }}
                >
                  {product.title.toUpperCase()}
                </h1>

                {/* Short desc */}
                <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  {product.shortDescription}
                </p>

                {/* Price Box */}
                <div
                  className="rounded-xl p-5 mb-6"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  {displayPrice ? (
                    <>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1.5"
                        style={{ color: 'var(--tx-faint)' }}>Price per {product.unitType}</p>
                      <p className="price-tag">{displayPrice}</p>
                      {product.priceNegotiable && (
                        <p className="text-xs mt-1.5" style={{ color: 'var(--tx-faint)' }}>
                          ✓ Price is negotiable for bulk orders
                        </p>
                      )}
                      {product.bulkPricing && (
                        <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--clr-green)' }}>
                          {product.bulkPricing}
                        </p>
                      )}
                    </>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--tx-primary)' }}>
                        Price Available on Request
                      </p>
                      <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>
                        Contact our sales team for current pricing, volume discounts and export terms.
                      </p>
                    </div>
                  )}

                  {/* Availability */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-2 text-xs font-semibold"
                      style={{ color: product.stockAvailable ? '#4ade80' : '#f87171' }}>
                      <span className={`avail-dot ${product.stockAvailable ? 'in' : 'out'}`} />
                      {product.stockAvailable ? 'In Stock' : 'Out of Stock'}
                    </div>
                    {product.moq && (
                      <div className="text-xs" style={{ color: 'var(--tx-faint)' }}>
                        MOQ: <span style={{ color: 'var(--tx-secondary)' }}>{product.moq} {product.unitType}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Specs */}
                {specsTable.length > 0 && (
                  <div
                    className="rounded-xl overflow-hidden mb-6"
                    style={{ border: '1px solid var(--border)' }}
                  >
                    <div className="px-4 py-3" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--tx-faint)' }}>
                        Quick Specs
                      </p>
                    </div>
                    <div className="divide-y" style={{ borderColor: 'var(--border)', background: 'var(--bg-3)' }}>
                      {specsTable.map(row => (
                        <div key={row.label} className="flex items-center justify-between px-4 py-2.5 gap-4">
                          <p className="text-xs" style={{ color: 'var(--tx-faint)' }}>{row.label}</p>
                          <p className="text-xs font-semibold text-right" style={{ color: 'var(--tx-secondary)' }}>
                            {row.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA buttons */}
                <div className="flex flex-col gap-3">
                  <Link href="/contact" className="btn btn-green w-full justify-center">
                    <Phone size={16} /> Request a Quote
                  </Link>
                  <Link href="/contact" className="btn btn-outline w-full justify-center">
                    Contact Sales Team
                  </Link>
                </div>

                {/* Company trust bar */}
                <div className="mt-5 pt-5 border-t grid grid-cols-3 gap-3"
                  style={{ borderColor: 'var(--border)' }}>
                  {[
                    { icon: ShieldCheck, label: 'Verified Supplier' },
                    { icon: Award,       label: '10+ Yrs Experience' },
                    { icon: Globe,       label: 'Export Ready' },
                  ].map(b => (
                    <div key={b.label} className="text-center">
                      <b.icon size={18} style={{ color: 'var(--clr-green)', margin: '0 auto 4px' }} />
                      <p className="text-[10px] font-semibold" style={{ color: 'var(--tx-faint)' }}>
                        {b.label}
                      </p>
                    </div>
                  ))}
                </div>
              </AOS>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full Description + Specs + Applications ───────────────── */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap px-5">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10">
            {/* Description */}
            <AOS>
              <p className="tag mb-4">Product Overview</p>
              <h2 className="mb-6"
                style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--tx-primary)' }}>
                FULL DETAILS
              </h2>
              <div className="space-y-4" style={{ color: 'var(--tx-muted)', lineHeight: 1.9, fontSize: '0.925rem' }}>
                {product.fullDescription.split('\n').filter(p => p.trim()).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Detailed specs list */}
              {product.specs.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: 'var(--tx-faint)' }}>
                    <Tag size={11} className="inline mr-1.5" />Detailed Specifications
                  </p>
                  <ul className="space-y-2">
                    {product.specs.map(s => (
                      <li key={s} className="flex items-start gap-3 text-sm"
                        style={{ color: 'var(--tx-secondary)' }}>
                        <CheckCircle size={15} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AOS>

            {/* Applications + tags */}
            <AOS delay={100}>
              {product.applications.length > 0 && (
                <div
                  className="rounded-xl p-6 mb-5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: 'var(--tx-faint)' }}>
                    <Truck size={11} className="inline mr-1.5" />Industrial Applications
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map(a => (
                      <span key={a} className="text-xs px-3 py-1.5 rounded-lg font-medium"
                        style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.tags.length > 0 && (
                <div
                  className="rounded-xl p-5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: 'var(--tx-faint)' }}>Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Logistics Info */}
              {(product.deliveryTimeline || product.packagingType || product.exportAvailable) && (
                <div
                  className="rounded-xl p-6 mt-5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: 'var(--tx-faint)' }}>
                    <Boxes size={11} className="inline mr-1.5" />Logistics
                  </p>
                  <div className="space-y-3">
                    {product.packagingType && (
                      <div className="flex justify-between text-xs">
                        <span style={{ color: 'var(--tx-faint)' }}>Packaging</span>
                        <span style={{ color: 'var(--tx-secondary)' }}>{product.packagingType}</span>
                      </div>
                    )}
                    {product.deliveryTimeline && (
                      <div className="flex justify-between text-xs">
                        <span style={{ color: 'var(--tx-faint)' }}><Clock size={10} className="inline mr-1" />Delivery</span>
                        <span style={{ color: 'var(--tx-secondary)' }}>{product.deliveryTimeline}</span>
                      </div>
                    )}
                    {product.countryOfOrigin && (
                      <div className="flex justify-between text-xs">
                        <span style={{ color: 'var(--tx-faint)' }}>Country of Origin</span>
                        <span style={{ color: 'var(--tx-secondary)' }}>{product.countryOfOrigin}</span>
                      </div>
                    )}
                    {product.exportAvailable && (
                      <div className="flex items-center gap-2 text-xs pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                        <Globe size={12} style={{ color: '#0284c7' }} />
                        <span style={{ color: '#0284c7' }}>International export available</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </AOS>
          </div>
        </div>
      </section>

      {/* ── Related Products ──────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="section" style={{ background: 'var(--bg)' }}>
          <div className="wrap px-5">
            <AOS>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-7 rounded-full" style={{ background: accent }} />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--tx-primary)' }}>
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
                      <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-106"
                        sizes="(max-width:768px) 50vw, 25vw" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>
                        {PRODUCT_CATEGORY_MAP[p.category]?.label}
                      </p>
                      <h4 className="text-sm font-semibold mb-1.5" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
                        {p.title}
                      </h4>
                      <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--tx-muted)' }}>{p.shortDescription}</p>
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

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--clr-green)' }}>
        <AOS>
          <div className="wrap px-5 text-center max-w-lg mx-auto">
            <h2 className="text-white mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
              INTERESTED IN {product.title.toUpperCase()}?
            </h2>
            <p className="text-green-100 mb-8 text-sm leading-relaxed">
              Contact Mechelin Metals for volume pricing, export documentation,
              delivery schedules and custom specifications.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn" style={{ background: '#fff', color: 'var(--clr-green)', fontWeight: 700 }}>
                <Phone size={15} /> Get a Quote
              </Link>
              <Link href="/products" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                <ArrowLeft size={15} /> Browse More
              </Link>
            </div>
          </div>
        </AOS>
      </section>
    </>
  )
}
