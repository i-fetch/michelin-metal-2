import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BarChart3, CheckCircle, ClipboardList, Globe2, Layers, Package, Recycle, Settings, Truck } from 'lucide-react'
import AOS from '@/components/AnimateOnScroll'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = { title: 'Services' }

const services = [
  {
    icon: Recycle, accent: '#16a34a', title: 'Metal Sourcing & Collection', desc: 'Extensive sourcing network across West Africa to collect scrap from auto wreckers, demolition sites, factories and households.',
    features: ['On-site collection and pickup', 'Bulk acquisition at competitive rates', 'Wide network across South-East Nigeria', 'Transparent per-tonne pricing']
  },
  {
    icon: Settings, accent: '#0284c7', title: 'Sorting & Classification', desc: 'Manual and mechanical separation of all metals by type, grade, and purity — ensuring clean, contamination-free batches.',
    features: ['Magnetic separation of ferrous metals', 'Manual grading by experienced operators', 'Separation of aluminium, copper, brass, lead', 'Grade certificates available']
  },
  {
    icon: Package, accent: '#d97706', title: 'Baling & Processing', desc: 'Post-sorting, metals are cleaned, cut to specification and compressed into high-density bales ready for smelting or export.',
    features: ['Hydraulic baling to specification', 'Cut-to-size heavy scrap', 'Wire-bound or loose bale options', 'Custom bale dimensions']
  },
  {
    icon: Truck, accent: '#7c3aed', title: 'Logistics & Delivery', desc: 'Full logistics from our Anambra facility to your site — domestic manufacturer or international importer.',
    features: ['Road freight across Nigeria', 'Container stuffing for export', 'FOB Lagos port delivery', 'Real-time shipment coordination']
  },
  {
    icon: Globe2, accent: '#16a34a', title: 'National & Global Distribution', desc: 'Supply of high-performance recycled raw materials to manufacturers domestically and internationally.',
    features: ['Domestic supply to Nigerian manufacturers', 'Export to global buyers', 'Volume contracts available', 'Port documentation support']
  },
  {
    icon: BarChart3, accent: '#0284c7', title: 'B2B Bulk Supply Contracts', desc: 'For manufacturers requiring consistent high-volume supply — structured contracts with guaranteed volumes and timelines.',
    features: ['Monthly/quarterly supply contracts', 'Dedicated account management', 'Priority processing', 'Flexible volume adjustments']
  },
  {
    icon: ClipboardList, accent: '#d97706', title: 'Scrap Metal Consultation', desc: 'Not sure what to do with your industrial scrap? We assess, classify and recommend the optimal recycling or sale route.',
    features: ['Free initial consultation', 'On-site scrap assessment', 'Grade and value estimation', 'Environmental disposal certificates']
  },
  {
    icon: Layers, accent: '#7c3aed', title: 'Custom Material Preparation', desc: 'Metals prepared to exact buyer specifications — for foundry feed, smelter charge or export grade.',
    features: ['Custom sizing and shredding', 'Alloy-specific sorting', 'Export-ready containerisation', 'Material data sheets on request']
  },
]

const industries = ['Aluminium Smelters', 'Steel Mills', 'Foundries', 'Export Traders', 'Manufacturing Plants', 'Construction Industry']

export default function Services() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0 grid-dots opacity-20" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }} />
        <div className="wrap px-5 relative z-10">
          <AOS>
            <p className="tag mb-5">What we do</p>
             <h1 className="mb-5 leading-none" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)', fontSize: 'clamp(3rem,7vw,5.5rem)' }}>
              OUR
              <span className="ml-2" style={{ color: 'var(--clr-green)' }}>SERVICES</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--tx-muted)', fontWeight: 300 }}>
              End-to-end metal recycling solutions — from collection and sorting to baling, logistics and global bulk distribution.
            </p>
          </AOS>
        </div>
      </section>

      {/* Services grid */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-5">
          <AOS>
            <div className="text-center mb-14">
              <p className="tag mx-auto mb-4">Full-Spectrum Capability</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
                EVERYTHING METAL, END-TO-END
              </h2>
            </div>
          </AOS>
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <AOS key={s.title} delay={(i % 2) * 100}>
                <div className="card rounded-xl overflow-hidden">
                  <div className="h-1" style={{ background: s.accent }} />
                  <div className="p-8">
                    <div className="flex gap-4 items-start mb-5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${s.accent}15` }}>
                        <s.icon size={20} style={{ color: s.accent }} />
                      </div>
                      <h3 className="pt-1 text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>{s.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--tx-muted)' }}>{s.desc}</p>
                    <ul className="grid grid-cols-2 gap-y-2 gap-x-3">
                      {s.features.map(f => (
                        <li key={f} className="flex items-start gap-1.5 text-xs" style={{ color: 'var(--tx-secondary)' }}>
                          <CheckCircle size={11} style={{ color: s.accent, marginTop: 2, flexShrink: 0 }} />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap px-5">
          <AOS>
            <div className="text-center mb-12">
              <p className="tag mx-auto mb-4">Who We Serve</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
                INDUSTRIES WE SUPPLY
              </h2>
            </div>
          </AOS>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <AOS key={ind} delay={i * 60}>
                <div className="card rounded-xl p-5 text-center group cursor-default">
                  <div className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center"
                    style={{ background: 'rgba(22,163,74,0.10)' }}>
                    <Package size={18} style={{ color: 'var(--clr-green)' }} />
                  </div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--tx-secondary)' }}>{ind}</p>
                </div>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage table */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-5">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AOS>
              <p className="tag mb-5">The Mechelin Difference</p>
              <h2 className="mb-8" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--tx-primary)' }}>
                WHY CLIENTS CHOOSE US
              </h2>
              {[
                ['Integrated Operations', 'We own the full process — cutting out middlemen and reducing your cost.'],
                ['Consistent Quality', 'Rigorous sorting and QC means you get exactly what you ordered, every time.'],
                ['Reliable Volume', 'Our sourcing network ensures bulk orders are met consistently, month after month.'],
                ['Flexible Terms', 'Spot orders or long-term supply contracts — we adapt to your procurement cycle.'],
                ['Environmental Compliance', 'Our processes support your sustainability and ESG reporting requirements.'],
              ].map(([t, d]) => (
                <div key={t as string} className="flex gap-4 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <CheckCircle size={16} style={{ color: 'var(--clr-green)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--tx-primary)' }}>{t}</p>
                    <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>{d}</p>
                  </div>
                </div>
              ))}
            </AOS>
            <AOS delay={160}>
              <div className="card rounded-2xl p-8">
                <h3 className="mb-6 text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>SERVICE COVERAGE</h3>
                {[
                  ['Sourcing Network', 'South-East & South-West Nigeria'],
                  ['Processing Facility', 'Awada Obosi, Anambra State'],
                  ['Domestic Delivery', 'All major Nigerian cities'],
                  ['Export Port', 'Apapa Port, Lagos'],
                  ['International', 'West Africa, Asia, Europe'],
                  ['Hours', 'Mon–Sat  8:00am – 6:00pm'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3.5" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span className="text-sm" style={{ color: 'var(--tx-muted)' }}>{k}</span>
                    <span className="text-sm font-medium text-right" style={{ color: 'var(--tx-primary)' }}>{v}</span>
                  </div>
                ))}
                <Link href="/contact" className="btn btn-green w-full justify-center mt-6">
                  Enquire Now <ArrowRight size={15} />
                </Link>
              </div>
            </AOS>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--clr-green)' }}>
        <AOS>
          <div className="wrap px-5 text-center max-w-lg mx-auto">
            <h2 className="text-white mb-4 text-4xl" style={{ fontFamily: 'var(--font-display)' }}>DISCUSS YOUR REQUIREMENTS</h2>
            <p className="text-green-100 mb-8 text-sm">From a one-off purchase to a long-term supply partnership — we&apos;ll find the right solution.</p>
            <Link href="/contact" className="btn" style={{ background: '#fff', color: 'var(--clr-green)' }}>
              Get In Touch <ArrowRight size={15} />
            </Link>
          </div>
        </AOS>
      </section>

      <Footer />
    </>
  )
}
