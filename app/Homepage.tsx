
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Globe2, Package, Recycle, ShieldCheck, TrendingUp, Truck, Zap } from 'lucide-react'
import AOS from '@/components/AnimateOnScroll'

export const metadata: Metadata = { title: "Nigeria's #1 Metal Recycling Company" }

const stats = [
   { num: '10+', label: 'Years Active' },
   { num: '50+', label: 'B2B Partners' },
   { num: '100K+', label: 'Tonnes Processed' },
   { num: '2+', label: 'Continents' },
]

const pillars = [
   { icon: Recycle, title: 'Full-Cycle Recycling', body: 'End-to-end processing — collection, sorting, baling, distribution.' },
   { icon: Globe2, title: 'Global Reach', body: 'National supply and international export to manufacturers worldwide.' },
   { icon: ShieldCheck, title: 'Quality Assured', body: 'Every batch graded and verified before it leaves our facility.' },
   { icon: Truck, title: 'Reliable Logistics', body: 'Dependable delivery across West Africa and beyond.' },
]

const featured = [
   { name: 'Aluminium Bales', tag: 'Most Requested', desc: 'Compressed, sorted aluminium waste ready for smelting and manufacturing.' },
   { name: 'Ferrous Scrap', tag: 'Industrial Grade', desc: 'Magnetic and non-magnetic ferrous metals from vehicles and appliances.' },
   { name: 'Non-Ferrous Metals', tag: 'Premium Quality', desc: 'Copper, brass and lead scrap for foundry, conversion and export.' },
   { name: 'Bulk Raw Supply', tag: 'Bulk Available', desc: 'Direct bulk supply on contract to manufacturers — local and global.' },
]

export default function Homepage() {
   return (
      <>
         {/* ── HERO ─────────────────────────────────────────── */}
         <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
               <Image
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
                  alt="Industrial metal recycling facility"
                  fill
                  priority
                  className="object-cover"
               />
               {/* gradient overlay */}
               <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg, rgba(9,9,11,0.88) 45%, rgba(9,9,11,0.45) 100%)' }} />
            </div>

            {/* content */}
            <div className="wrap px-5 relative z-10 pt-28 pb-24">
               <div className="max-w-full">
                  {/* <div className="max-w-2xl"> */}
                  <div
                     className="tag-gold border inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-medium mb-5">
                     <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate animate-pulse" />
                     Metal Recycle Industry · West Africa
                  </div>

                  <h1 className="text-white mb-6 leading-none"
                     style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem,8vw,6.5rem)', letterSpacing: '0.03em' }}>
                     TURNING METAL{' '}
                     <span style={{ color: 'var(--clr-green-light)' }}>WASTE</span>
                     {' '}INTO GLOBAL{' '}
                     <span style={{ color: 'var(--clr-gold)' }}>VALUE</span>
                  </h1>

                  <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg"
                     style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                     Mechelin Metals Nigeria — sourcing, sorting, baling and distributing aluminium and ferrous metals to manufacturers across West Africa and the world.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-16">
                     <Link href="/products" className="btn btn-green">Explore Products <ArrowRight size={15} /></Link>
                     <Link href="/about" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Our Story <ArrowRight size={15} /></Link>
                  </div>

                  {/* trust ticks */}
                  <div className="flex flex-wrap gap-6">
                     {['Incorporated 2023', 'Private Ltd by Shares', '10+ Years Experience'].map(t => (
                        <span key={t} className="flex items-center gap-2 text-sm text-white/50">
                           <CheckCircle size={13} style={{ color: 'var(--clr-green-light)' }} />{t}
                        </span>
                     ))}
                  </div>
               </div>
            </div>

            {/* Floating stats bar */}
            <div className="absolute bottom-0 inset-x-0 z-10 hidden md:block">
               <div className="wrap px-5">
                  <div className="grid grid-cols-4 rounded-t-2xl overflow-hidden"
                     style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderBottom: 'none' }}>
                     {stats.map((s, i) => (
                        <div key={s.label}
                           className="py-5 px-6 text-center"
                           style={{ borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                           <p className="stat-num">{s.num}</p>
                           <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'var(--tx-muted)' }}>{s.label}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* mobile stats */}
         <div className="md:hidden grid grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
            {stats.map(s => (
               <div key={s.label} className="py-6 text-center" style={{ background: 'var(--surface)' }}>
                  <p className="stat-num">{s.num}</p>
                  <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'var(--tx-muted)' }}>{s.label}</p>
               </div>
            ))}
         </div>

         {/* ── ABOUT STRIP ──────────────────────────────────── */}
         <section className="section" style={{ background: 'var(--bg)' }}>
            <div className="wrap px-1">
               <div className="grid md:grid-cols-2 gap-16 items-center">
                  <AOS>
                     <p className="tag mb-4">About The Company</p>
                     <h2 className="mb-5 leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: 'var(--tx-primary)' }}>
                        NIGERIA&apos;S FOREMOST INTEGRATED METAL RECYCLER
                     </h2>
                     <p className="mb-4 leading-relaxed text-[15px]" style={{ color: 'var(--tx-secondary)' }}>
                        Mechelin Metals Nigeria LTD leverages captive resources and advanced capabilities to source, sort and bale aluminium waste, distributing it as raw material to manufacturers. We handle all types of ferrous and non-ferrous metals for sale, scrapping, conversion and foundry purposes.
                     </p>
                     <p className="mb-8 leading-relaxed text-[15px]" style={{ color: 'var(--tx-muted)' }}>
                        Formally incorporated in 2023, our team has been active in the industry for over a decade — building infrastructure and global distribution networks that benefit both industry and environment.
                     </p>
                     <Link href="/about" className="btn btn-green">Read Full Story <ArrowRight size={15} /></Link>
                  </AOS>

                  <AOS delay={180}>
                     <div className="relative">
                        {/* Image */}
                        <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
                           <Image
                              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
                              alt="Scrap metal processing"
                              fill
                              className="object-cover"
                           />
                        </div>
                        {/* floating stat card */}
                        <div className="absolute -bottom-5 -left-5 rounded-xl p-5 shadow-xl"
                           style={{ background: 'var(--clr-green)', minWidth: 150 }}>
                           <p className="text-white text-3xl font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>10+</p>
                           <p className="text-green-100 text-xs mt-1 uppercase tracking-widest">Years of Industry Experience</p>
                        </div>
                     </div>
                  </AOS>
               </div>
            </div>
         </section>

         {/* ── PILLARS ───────────────────────────────────────── */}
         <section className="section" style={{ background: 'var(--bg-2)' }}>
            <div className="wrap px-1">
               <AOS>
                  <div className="text-center mb-14">
                     <p className="tag mx-auto mb-4">Why Choose Us</p>
                     <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
                        THE MECHELIN EDGE
                     </h2>
                  </div>
               </AOS>
               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {pillars.map((p, i) => (
                     <AOS key={p.title} delay={i * 100}>
                        <div className="card rounded-xl p-7">
                           <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                              style={{ background: 'rgba(22,163,74,0.10)' }}>
                              <p.icon size={20} style={{ color: 'var(--clr-green)' }} />
                           </div>
                           <h3 className="mb-2 text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)', fontSize: '1.15rem' }}>
                              {p.title}
                           </h3>
                           <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{p.body}</p>
                        </div>
                     </AOS>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PRODUCTS PREVIEW ─────────────────────────────── */}
         <section className="section" style={{ background: 'var(--bg)' }}>
            <div className="wrap px-1">
               <AOS>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                     <div>
                        <p className="tag mb-4">Our Catalogue</p>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
                           CORE PRODUCTS
                        </h2>
                     </div>
                     <Link href="/products" className="btn btn-outline text-sm">View All <ArrowRight size={14} /></Link>
                  </div>
               </AOS>
               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {featured.map((f, i) => (
                     <AOS key={f.name} delay={i * 90}>
                        <div className="card rounded-xl overflow-hidden group">
                           <div className="h-1.5 w-full" style={{ background: `hsl(${138 + i * 8},55%,${38 - i * 3}%)` }} />
                           <div className="p-6">
                              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--clr-green)' }}>{f.tag}</p>
                              <h3 className="mb-3 text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>{f.name}</h3>
                              <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{f.desc}</p>
                              <Link href="/contact" className="flex items-center gap-1.5 mt-5 text-xs font-semibold transition-all"
                                 style={{ color: 'var(--clr-green)' }}>
                                 Enquire <ArrowRight size={12} />
                              </Link>
                           </div>
                        </div>
                     </AOS>
                  ))}
               </div>
            </div>
         </section>

         {/* ── VISION/MISSION SECTION ───────────────────────── */}
         <section className="relative overflow-hidden" style={{ background: 'var(--clr-green)' }}>
            <div className="absolute inset-0 grid-dots opacity-10" />
            <div className="wrap px-3 py-20 relative z-10">
               <div className="grid md:grid-cols-2 gap-10">
                  {[
                     { icon: Zap, title: 'Our Vision', body: 'To become the leading provider of sustainable metals recycling solutions globally — driving the circular economy through innovation, safety, and superior material recovery.' },
                     { icon: TrendingUp, title: 'Our Mission', body: 'To revolutionize metal recycling by turning waste into high-quality raw materials through technological innovation and sustainable practices that benefit the environment.' },
                  ].map(({ icon: Icon, title, body }) => (
                     <div key={title} className="flex gap-5">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                           style={{ background: 'rgba(255,255,255,0.15)' }}>
                           <Icon size={22} color="#fff" />
                        </div>
                        <div>
                           <h3 className="text-white mb-3 text-2xl" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
                           <p className="text-green-100 text-sm leading-relaxed">{body}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CTA ──────────────────────────────────────────── */}
         <section className="section" style={{ background: 'var(--bg-2)' }}>
            <AOS>
               <div className="wrap px-3 text-center max-w-xl mx-auto">
                  <Package size={40} style={{ color: 'var(--clr-green)', margin: '0 auto 1.5rem' }} />
                  <h2 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,2.8rem)', color: 'var(--tx-primary)' }}>
                     READY TO PARTNER WITH US?
                  </h2>
                  <p className="mb-8 text-[15px]" style={{ color: 'var(--tx-muted)' }}>
                     Whether you need reliable raw material supply or have scrap metal to move — our team is ready.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                     <Link href="/contact" className="btn btn-green">Contact Us <ArrowRight size={15} /></Link>
                     <Link href="/services" className="btn btn-outline">Our Services <ArrowRight size={15} /></Link>
                  </div>
               </div>
            </AOS>
         </section>
      </>
   )
}