// app/products/page.tsx
import type { Metadata } from 'next'
<<<<<<< HEAD
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Package, Tag, Truck } from 'lucide-react'
import AOS from '@/components/AnimateOnScroll'
import ProductGallery from '@/components/ProductGallery'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = { title: 'Products' }

const cats = [
  { id: 'aluminium', label: 'Aluminium', accent: '#16a34a' },
  { id: 'ferrous', label: 'Ferrous Metals', accent: '#0284c7' },
  { id: 'non-ferrous', label: 'Non-Ferrous', accent: '#d97706' },
  { id: 'bulk', label: 'Bulk Supply', accent: '#7c3aed' },
]

const products = [
  {
    id: 1, cat: 'aluminium', name: 'Aluminium Bales', tag: 'Most Requested',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    desc: 'High-density baled aluminium waste, sorted and compressed ready for smelting.',
    specs: ['Grade: Industrial / Mixed Alloy', 'Form: Compressed Bales', 'Purity: 95–99% post-sorting', 'MOQ: 1 Tonne'],
    uses: ['Aluminium smelters', 'Rolling mills', 'Foundries']
  },
  {
    id: 2, cat: 'aluminium', name: 'Aluminium Scrap (Loose)', tag: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    desc: 'Loose sorted aluminium from household appliances, vehicles and building materials.',
    specs: ['Source: Mixed post-consumers', 'Form: Loose / Uncompressed', 'Grade: Extrusion / Cast Mix', 'MOQ: 500 kg'],
    uses: ['Die casting', 'Secondary smelters', 'Export']
  },
  {
    id: 3, cat: 'ferrous', name: 'Heavy Melting Steel (HMS)', tag: 'Industrial Grade',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    desc: 'Heavy gauge steel scrap from demolition and machinery — high iron content.',
    specs: ['Grade: HMS 1 & HMS 2', 'Thickness: ≥ 6mm', 'Iron Content: 90%+', 'MOQ: 5 Tonnes'],
    uses: ['Electric arc furnaces', 'Steel mills', 'Re-rollers']
  },
  {
    id: 4, cat: 'ferrous', name: 'Vehicle Body Scrap', tag: 'High Volume',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    desc: 'Ferrous scrap from end-of-life vehicles — shredded and de-contaminated.',
    specs: ['Source: End-of-life vehicles', 'Form: Shredded / Cut', 'Residual: < 2% non-metal', 'MOQ: 2 Tonnes'],
    uses: ['Steel production', 'Scrap dealers', 'Foundries']
  },
  {
    id: 5, cat: 'ferrous', name: 'Cast Iron Scrap', tag: 'Foundry Grade',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    desc: 'High-carbon cast iron from industrial machinery, suitable for grey iron foundry use.',
    specs: ['Carbon Content: 2–4%', 'Grade: Foundry / No.2 Cast', 'Cleanliness: Oil-free batches', 'MOQ: 1 Tonne'],
    uses: ['Grey iron foundries', 'Ingot production', 'Pipe casting']
  },
  {
    id: 6, cat: 'non-ferrous', name: 'Copper Scrap', tag: 'Premium',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    desc: 'Clean and mixed copper scrap from electrical wire, plumbing and industrial equipment.',
    specs: ['Grade: Bare Bright / #1 / #2', 'Form: Wire, tubing, bus bar', 'Purity: Up to 99.9%', 'MOQ: 200 kg'],
    uses: ['Wire drawing', 'Brass / Bronze alloy', 'Re-melting']
  },
  {
    id: 7, cat: 'non-ferrous', name: 'Brass Scrap', tag: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    desc: 'Mixed and clean brass scrap from plumbing fittings, valves and industrial components.',
    specs: ['Grade: Yellow Brass / Red Brass', 'Zinc Content: 10–40%', 'Form: Mixed / Sorted', 'MOQ: 200 kg'],
    uses: ['Brass ingot production', 'Foundries', 'Export']
  },
  {
    id: 8, cat: 'non-ferrous', name: 'Lead Scrap', tag: 'Industrial',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    desc: 'Recovered lead from batteries and cable sheathing — properly handled and classified.',
    specs: ['Source: Battery / Cable / Soft Lead', 'Purity: 95%+', 'Hazmat: Compliant', 'MOQ: 500 kg'],
    uses: ['Battery recycling', 'Lead ingot casting', 'Shielding']
  },
  {
    id: 9, cat: 'bulk', name: 'Bulk Raw Supply', tag: 'Contract Available',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    desc: 'Direct bulk supply of processed recycled metals to manufacturers and exporters.',
    specs: ['Volume: Custom per contract', 'Packaging: Baled / Containerised', 'Delivery: FOB Lagos / Ex-Works', 'Payment: Bank / LC'],
    uses: ['Manufacturing plants', 'Export traders', 'Industrial distributors']
  },
]

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt: 'Aluminium bales stacked in a warehouse',
    label: 'Aluminium Bales & Scrap',
  },
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt: 'Heavy steel scrap in a yard',
    label: 'Ferrous Scrap Inventory',
  },
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt: 'Close-up of copper wire and metal pieces',
    label: 'Copper & Non-Ferrous Metals',
  },
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt: 'Industrial bulk storage at a shipping terminal',
    label: 'Bulk Supply Logistics',
  },
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt: 'Various metal scraps and raw materials',
    label: 'Mixed Metal Inventory',
  },
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt: 'Metal surfaces and industrial textures',
    label: 'Material Handling & Storage',
  },
]

export default function Products() {
  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="pt-32 pb-16 relative" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="wrap px-5 relative z-10">
          <AOS>
            <p className="tag mb-5">Our Catalogue</p>
            <h1 className="mb-4 leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,5rem)', color: 'var(--tx-primary)' }}>
              PRODUCTS &<br /><span style={{ color: 'var(--clr-green)' }}>MATERIALS</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--tx-muted)', fontWeight: 300 }}>
              From aluminium bales to ferrous scrap and non-ferrous metals — available for bulk supply nationally and internationally.
            </p>
          </AOS>

          {/* Category pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {cats.map(c => (
              <a key={c.id} href={`#${c.id}`}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{ background: `${c.accent}18`, color: c.accent, border: `1px solid ${c.accent}40`, fontFamily: 'var(--font-body)' }}>
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap px-5">
          {cats.map(cat => {
            const items = products.filter(p => p.cat === cat.id)
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
                    <AOS key={p.id} delay={i * 80}>
                      <div className="card rounded-xl overflow-hidden flex flex-col h-full">
                        <div className="h-1 w-full" style={{ background: cat.accent }} />
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="p-7 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ background: `${cat.accent}15` }}>
                              <Package size={18} style={{ color: cat.accent }} />
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                              style={{ background: `${cat.accent}15`, color: cat.accent }}>
                              {p.tag}
                            </span>
                          </div>
                          <h3 className="mb-3 text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>{p.name}</h3>
                          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--tx-muted)' }}>{p.desc}</p>

                          <div className="mb-4">
                            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'var(--tx-faint)' }}>
                              <Tag size={10} /> Specs
                            </p>
                            <ul className="space-y-1.5">
                              {p.specs.map(s => (
                                <li key={s} className="flex items-center gap-2 text-xs" style={{ color: 'var(--tx-secondary)' }}>
                                  <CheckCircle size={10} style={{ color: cat.accent, flexShrink: 0 }} />{s}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-6">
                            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'var(--tx-faint)' }}>
                              <Truck size={10} /> Applications
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {p.uses.map(u => (
                                <span key={u} className="text-xs px-2.5 py-0.5 rounded-full"
                                  style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)' }}>{u}</span>
                              ))}
                            </div>
                          </div>

                          <Link href="/contact" className="mt-auto btn btn-green text-xs justify-center" style={{ padding: '0.6rem 1rem' }}>
                            Enquire Now <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </AOS>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <ProductGallery images={galleryImages} />

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

      <Footer />
    </>
=======
import { Suspense } from 'react'
import { getPublicProducts } from '@/actions/products'
import ProductsClient from '@/components/ProductsClient'

export const metadata: Metadata = { title: 'Products & Materials' }
export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getPublicProducts()
  return (
    <Suspense>
      <ProductsClient products={products} />
    </Suspense>
>>>>>>> 7ef21dc694fba76255b9941494ec1bbebc6c853b
  )
}
