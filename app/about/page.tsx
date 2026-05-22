import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Globe2, Leaf, Recycle, ShieldCheck, Target, Users, Zap } from 'lucide-react'
import AOS from '@/components/AnimateOnScroll'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = { title: 'About Us' }

const values = [
  { icon: Leaf, title: 'Sustainability', body: 'Maximising recovery of reusable metals from waste streams to reduce environmental impact.' },
  { icon: ShieldCheck, title: 'Integrity', body: 'Every transaction built on transparency, fair pricing and honest communication.' },
  { icon: Zap, title: 'Innovation', body: 'Continuously adopting advanced sorting, baling and logistics technology.' },
  { icon: Users, title: 'Partnership', body: 'Long-term relationships with manufacturers, suppliers and distributors built on mutual growth.' },
  { icon: Globe2, title: 'Global Thinking', body: 'Rooted in Nigeria, our vision connects West African resources with worldwide demand.' },
  { icon: Target, title: 'Precision', body: 'Every batch carefully sorted to exact specifications — consistent quality every time.' },
]

const milestones = [
  { year: '2013', event: 'Team entered the metal recycling sector across West Africa.' },
  { year: '2018', event: 'Expanded sourcing network and established key manufacturer partnerships.' },
  { year: '2022', event: 'Launched international distribution channels for recycled raw materials.' },
  { year: '2023', event: 'Formally incorporated as Mechelin Metals Nigeria LTD.' },
  { year: '2024', event: 'Increased processing capacity and expanded the product catalogue.' },
  { year: '2026', event: 'Launched B2B Corporate website for global procurement partnerships.' },
]

export default function About() {
  return (
    <>
    <Navbar />
      {/* Hero */}
      <section className="relative pt-12 pb-20 overflow-hidden"
        style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="wrap px-5 relative z-10">
          <AOS>
            <p className="tag mb-5">Who We Are</p>
            <h1 className="mb-5 leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,5.5rem)', color: 'var(--tx-primary)' }}>
              ABOUT MECHELIN
              <br />
              <span style={{ color: 'var(--clr-green)' }}>METALS NIGERIA</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--tx-muted)', fontWeight: 300 }}>
              A decade of expertise, formalised in 2023. Nigeria&apos;s premier integrated metal recycling company.
            </p>
          </AOS>
        </div>
      </section>

      {/* Story */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap px-1 grid md:grid-cols-2 gap-16 items-center">
          <AOS>
            <p className="tag mb-5">Our Story</p>
            <h2 className="mb-6 leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
              MORE THAN A DECADE IN THE MAKING
            </h2>
            <p className="mb-4 leading-relaxed text-[15px]" style={{ color: 'var(--tx-secondary)' }}>
              Mechelin Metals Nigeria LTD is Nigeria&apos;s foremost integrated metal recycling company. Though formally incorporated in 2023, our team has been active in the metal recycling industry for over a decade — building deep expertise, infrastructure, and trust across West Africa.
            </p>
            <p className="mb-4 leading-relaxed text-[15px]" style={{ color: 'var(--tx-secondary)' }}>
              We leverage captive resources and advanced capabilities for the sourcing, sorting, and baling of aluminium waste and distributing same as raw materials to manufacturers. We deal with all types of metals — ferrous and non-ferrous — for sale, scrapping, conversion, or foundry purposes.
            </p>
            <p className="mb-8 leading-relaxed text-[15px]" style={{ color: 'var(--tx-muted)' }}>
              Our national and global distribution of high-performance recycled raw materials is driven by a genuine concern for benefiting the environment.
            </p>
            <Link href="/products" className="btn btn-green">See Our Products <ArrowRight size={15} /></Link>
          </AOS>

          <AOS delay={180}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-square relative">
                <Image
                  src="https://images.unsplash.com/photo-1774327988852-531c6eba5397?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM2fE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D"
                  // src="https://images.unsplash.com/photo-1778249132540-b2c209ffb1ee?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D"
                  alt="Metal processing facility"
                  fill className="object-cover"
                />
              </div>
              {/* overlapping cards */}
              <div className="absolute -bottom-6 -right-4 rounded-xl p-5 shadow-2xl card" style={{ minWidth: 180 }}>
                <p className="stat-num">10+</p>
                <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'var(--tx-muted)' }}>Years Active</p>
              </div>
              <div className="absolute -top-4 -left-4 rounded-xl p-4 shadow-xl"
                style={{ background: 'var(--clr-gold)', minWidth: 130 }}>
                <p className="text-zinc-900 text-2xl font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>100K+</p>
                <p className="text-zinc-700 text-xs mt-1 uppercase tracking-widest">Tonnes Processed</p>
              </div>
            </div>
          </AOS>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-1">
          <AOS>
            <div className="text-center mb-14">
              <p className="tag mx-auto mb-4">What Drives Us</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
                VISION & MISSION
              </h2>
            </div>
          </AOS>
          <div className="grid md:grid-cols-2 gap-6">
            <AOS>
              <div className="rounded-2xl p-5 h-full" style={{ background: 'var(--clr-green)' }}>
                <Target size={36} color="#fff" className="mb-5" />
                <h3 className="text-white mb-4 text-3xl" style={{ fontFamily: 'var(--font-display)' }}>OUR VISION</h3>
                <p className="text-green-100 leading-relaxed">
                  To become the leading provider of sustainable metals recycling solutions on the global stage, driving the circular economy through innovation, safety, and superior material recovery.
                </p>
              </div>
            </AOS>
            <AOS delay={150}>
              <div className="rounded-2xl p-5 h-full card">
                <Zap size={36} style={{ color: 'var(--clr-gold)' }} className="mb-5" />
                <h3 className="mb-4 text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>OUR MISSION</h3>
                <p className="leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
                  To revolutionize metal recycling by turning waste into high-quality raw materials through technological innovation and sustainable practices — benefiting industry and environment.
                </p>
              </div>
            </AOS>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap px-1">
          <AOS>
            <div className="text-center mb-14">
              <p className="tag mx-auto mb-4">What We Stand For</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
                CORE VALUES
              </h2>
            </div>
          </AOS>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <AOS key={v.title} delay={i * 80}>
                <div className="card rounded-xl p-7">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                    style={{ background: 'rgba(22,163,74,0.10)' }}>
                    <v.icon size={20} style={{ color: 'var(--clr-green)' }} />
                  </div>
                  <h3 className="mb-2 text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{v.body}</p>
                </div>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-1">
          <AOS>
            <div className="text-center mb-14">
              <p className="tag mx-auto mb-4">Our Journey</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
                COMPANY MILESTONES
              </h2>
            </div>
          </AOS>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-[21px] top-2 bottom-2 w-0.5" style={{ background: 'var(--border)' }} />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <AOS key={m.year} delay={i * 80}>
                  <div className="flex gap-6 items-start">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 text-xs font-bold"
                      style={{ background: 'var(--clr-green)', color: '#fff', fontFamily: 'var(--font-body)' }}>
                      {m.year.slice(2)}
                    </div>
                    <div className="card rounded-xl p-5 flex-1">
                      <p className="text-sm font-bold mb-1" style={{ color: 'var(--clr-green)', fontFamily: 'var(--font-mono)' }}>{m.year}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{m.event}</p>
                    </div>
                  </div>
                </AOS>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company info + CTA */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap px-1">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <AOS>
              <p className="tag mb-5">Company Details</p>
              <h2 className="mb-8" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--tx-primary)' }}>
                REGISTRATION & OPERATIONS
              </h2>
              {[
                ['Company Name', 'Mechelin Metals Nigeria LTD'],
                ['Business Type', 'Private Company Limited by Shares'],
                ['Industry', 'Metal Recycle Industry'],
                ['Incorporated', '2023'],
                ['Operations', 'West Africa, Nigeria'],
                ['HQ Address', 'No. 23 Nathan Okafor Street, Awada Obosi, Anambra'],
                ['Branch Address', 'No. 32 Louis Mbanefo Street, Woliwo Layout, Anambra'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 py-3.5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <CheckCircle size={14} style={{ color: 'var(--clr-green)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--tx-faint)' }}>{k}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--tx-primary)' }}>{v}</p>
                  </div>
                </div>
              ))}
            </AOS>
            <AOS delay={180}>
              <div className="rounded-2xl p-5 sticky top-28" style={{ background: 'var(--clr-green)' }}>
                <Recycle size={48} color="#fff" className="mb-6" />
                <h3 className="text-white mb-3 text-3xl" style={{ fontFamily: 'var(--font-display)' }}>READY TO WORK WITH US?</h3>
                <p className="text-green-100 mb-8 text-sm leading-relaxed">
                  Whether you need bulk recycled metals or have scrap to sell, our team is standing by.
                </p>
                <Link href="/contact" className="btn" style={{ background: '#fff', color: 'var(--clr-green)', fontFamily: 'var(--font-body)' }}>
                  Contact Our Team <ArrowRight size={15} />
                </Link>
              </div>
            </AOS>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
