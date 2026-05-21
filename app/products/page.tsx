import type { Metadata }  from 'next'
import Image              from 'next/image'
import Link              from 'next/link'
import { ArrowRight, CheckCircle, Package, Tag, Truck } from 'lucide-react'
import AOS               from '@/components/AnimateOnScroll'
import ProductGallery    from '@/components/ProductGallery'
import { getProducts }   from '@/actions/products'

export const metadata: Metadata = { title: 'Products' }
export const dynamic = 'force-dynamic'  // always fresh from DB

const cats = [
  { id: 'aluminium',   label: 'Aluminium',      accent: '#16a34a' },
  { id: 'ferrous',     label: 'Ferrous Metals',  accent: '#0284c7' },
  { id: 'non-ferrous', label: 'Non-Ferrous',     accent: '#d97706' },
  { id: 'bulk',        label: 'Bulk Supply',     accent: '#7c3aed' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1542728098-5c11ba0e2f3a?w=1200&q=80', alt: 'Aluminium bales stacked in a warehouse', label: 'Aluminium Bales & Scrap' },
  { src: 'https://images.unsplash.com/photo-1516747773444-2df2ecfc6b30?w=1200&q=80', alt: 'Heavy steel scrap in a yard', label: 'Ferrous Scrap Inventory' },
  { src: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=1200&q=80', alt: 'Close-up of copper wire', label: 'Copper & Non-Ferrous Metals' },
  { src: 'https://images.unsplash.com/photo-1498354174636-6a6fbf0a38e4?w=1200&q=80', alt: 'Industrial bulk storage', label: 'Bulk Supply Logistics' },
]

export default async function Products() {
  const products = await getProducts()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="wrap px-5 relative z-10">
          <AOS>
            <p className="tag mb-5">Our Catalogue</p>
            <h1 className="mb-4 leading-none"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,5rem)', color: 'var(--tx-primary)' }}>
              PRODUCTS &<br /><span style={{ color: 'var(--clr-green)' }}>MATERIALS</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--tx-muted)', fontWeight: 300 }}>
              From aluminium bales to ferrous scrap and non-ferrous metals — available for bulk supply nationally and internationally.
            </p>
          </AOS>
          <div className="flex flex-wrap gap-3 mt-8">
            {cats.map(c => (
              <a key={c.id} href={`#${c.id}`}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{ background: `${c.accent}18`, color: c.accent, border: `1px solid ${c.accent}40` }}>
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products by category */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap px-5">
          {cats.map(cat => {
            const items = products.filter(p => p.category === cat.id)
            if (items.length === 0) return null
            return (
              <div key={cat.id} id={cat.id} className="mb-20 scroll-mt-24">
                <AOS>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-1 h-8 rounded-full" style={{ background: cat.accent }} />
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--tx-primary)' }}>
                      {cat.label.toUpperCase()}
                    </h2>
                    <hr className="flex-1" style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--tx-faint)' }}>
                      {items.length} product{items.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </AOS>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p, i) => (
                    <AOS key={p._id} delay={i * 80}>
                      <Link href={`/products/${p.slug}`} className="card rounded-xl overflow-hidden flex flex-col h-full group">
                        <div className="h-1 w-full" style={{ background: cat.accent }} />
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                          />
                        </div>
                        <div className="p-7 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${cat.accent}15` }}>
                              <Package size={18} style={{ color: cat.accent }} />
                            </div>
                          </div>
                          <h3 className="mb-3 text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
                            {p.title}
                          </h3>
                          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--tx-muted)' }}>
                            {p.shortDescription}
                          </p>

                          {p.specs.length > 0 && (
                            <div className="mb-4">
                              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'var(--tx-faint)' }}>
                                <Tag size={10} /> Specs
                              </p>
                              <ul className="space-y-1.5">
                                {p.specs.slice(0, 4).map(s => (
                                  <li key={s} className="flex items-center gap-2 text-xs" style={{ color: 'var(--tx-secondary)' }}>
                                    <CheckCircle size={10} style={{ color: cat.accent, flexShrink: 0 }} />{s}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {p.applications.length > 0 && (
                            <div className="mb-6">
                              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'var(--tx-faint)' }}>
                                <Truck size={10} /> Applications
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {p.applications.map(u => (
                                  <span key={u} className="text-xs px-2.5 py-0.5 rounded-full"
                                    style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)' }}>{u}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="mt-auto btn btn-green text-xs justify-center" style={{ padding: '0.6rem 1rem' }}>
                            View Details <ArrowRight size={13} />
                          </div>
                        </div>
                      </Link>
                    </AOS>
                  ))}
                </div>
              </div>
            )
          })}

          {products.length === 0 && (
            <div className="text-center py-20">
              <p style={{ color: 'var(--tx-muted)' }}>No products available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* <ProductGallery images={galleryImages} /> */}

      {/* CTA */}
      <section className="section" style={{ background: 'var(--clr-green)' }}>
        <AOS>
          <div className="wrap px-5 text-center max-w-lg mx-auto">
            <h2 className="text-white mb-4 text-4xl" style={{ fontFamily: 'var(--font-display)' }}>NEED A CUSTOM QUOTE?</h2>
            <p className="text-green-100 mb-8 text-sm">Our sales team is ready to discuss volume pricing, specs and delivery for any product.</p>
            <Link href="/contact" className="btn" style={{ background: '#fff', color: 'var(--clr-green)' }}>
              Request a Quote <ArrowRight size={15} />
            </Link>
          </div>
        </AOS>
      </section>
    </>
  )
}
