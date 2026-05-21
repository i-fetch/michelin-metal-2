import type { Metadata }       from 'next'
import Image                    from 'next/image'
import Link                     from 'next/link'
import { notFound }             from 'next/navigation'
import { ArrowRight, ArrowLeft, CheckCircle, Package, Tag, Truck } from 'lucide-react'
import AOS                      from '@/components/AnimateOnScroll'
import { getProductBySlug, getProducts } from '@/actions/products'

const CAT_ACCENT: Record<string, string> = {
  aluminium:    '#16a34a',
  ferrous:      '#0284c7',
  'non-ferrous':'#d97706',
  bulk:         '#7c3aed',
}

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getProductBySlug(slug)
  return p ? { title: p.title, description: p.shortDescription } : {}
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params
  const p        = await getProductBySlug(slug)
  if (!p) notFound()

  const accent   = CAT_ACCENT[p.category] ?? '#16a34a'
  const related  = (await getProducts(p.category)).filter(r => r._id !== p._id).slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 pb-4" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-5">
          <Link href="/products" className="flex items-center gap-2 text-sm w-fit"
            style={{ color: 'var(--tx-muted)' }}>
            <ArrowLeft size={14} /> Back to Products
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pb-16" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <AOS>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 420 }}>
                <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: accent }} />
                <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority />
              </div>
            </AOS>

            {/* Info */}
            <AOS delay={100}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full capitalize"
                    style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}40` }}>
                    {p.category.replace('-', ' ')}
                  </span>
                  {p.featured && (
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: 'rgba(22,163,74,0.1)', color: 'var(--clr-green)', border: '1px solid rgba(22,163,74,0.25)' }}>
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="mb-4 leading-tight"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
                  {p.title}
                </h1>
                <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  {p.fullDescription}
                </p>

                {/* Specs */}
                {p.specs.length > 0 && (
                  <div className="mb-6">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: 'var(--tx-faint)' }}>
                      <Tag size={11} /> Specifications
                    </p>
                    <ul className="space-y-2">
                      {p.specs.map(s => (
                        <li key={s} className="flex items-center gap-3 text-sm" style={{ color: 'var(--tx-secondary)' }}>
                          <CheckCircle size={13} style={{ color: accent, flexShrink: 0 }} />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Applications */}
                {p.applications.length > 0 && (
                  <div className="mb-8">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: 'var(--tx-faint)' }}>
                      <Truck size={11} /> Applications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.applications.map(u => (
                        <span key={u} className="text-xs px-3 py-1 rounded-full"
                          style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 flex-wrap">
                  <Link href="/contact" className="btn btn-green">
                    Enquire Now <ArrowRight size={14} />
                  </Link>
                  <Link href="/contact" className="btn text-sm"
                    style={{ background: 'var(--bg-3)', color: 'var(--tx-secondary)', border: '1px solid var(--border)' }}>
                    Request a Quote
                  </Link>
                </div>
              </div>
            </AOS>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-2)' }}>
          <div className="wrap px-5">
            <AOS>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-1 h-8 rounded-full" style={{ background: accent }} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--tx-primary)' }}>
                  RELATED PRODUCTS
                </h2>
                <hr className="flex-1" style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
              </div>
            </AOS>

            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r, i) => (
                <AOS key={r._id} delay={i * 80}>
                  <Link href={`/products/${r.slug}`}
                    className="card rounded-xl overflow-hidden flex flex-col group">
                    <div className="h-1 w-full" style={{ background: accent }} />
                    <div className="relative h-44 overflow-hidden">
                      <Image src={r.image} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 33vw" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${accent}15` }}>
                        <Package size={15} style={{ color: accent }} />
                      </div>
                      <h3 className="mb-2 text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>{r.title}</h3>
                      <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--tx-muted)' }}>{r.shortDescription}</p>
                      <div className="mt-auto flex items-center gap-1 text-xs font-semibold" style={{ color: accent }}>
                        View Details <ArrowRight size={11} />
                      </div>
                    </div>
                  </Link>
                </AOS>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section" style={{ background: 'var(--clr-green)' }}>
        <AOS>
          <div className="wrap px-5 text-center max-w-lg mx-auto">
            <h2 className="text-white mb-4 text-4xl" style={{ fontFamily: 'var(--font-display)' }}>READY TO ORDER?</h2>
            <p className="text-green-100 mb-8 text-sm">Contact our team to discuss volume, specifications and delivery.</p>
            <Link href="/contact" className="btn" style={{ background: '#fff', color: 'var(--clr-green)' }}>
              Get in Touch <ArrowRight size={15} />
            </Link>
          </div>
        </AOS>
      </section>
    </>
  )
}
