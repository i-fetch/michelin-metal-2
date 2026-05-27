
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, CircleCheck, Globe2, Package, Recycle, ShieldCheck, TrendingUp, Truck, Zap } from 'lucide-react'
import AOS from '@/components/AnimateOnScroll'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/homepage-components/HeroSection'
import AboutSection from '@/components/homepage-components/AboutSection'
import VisionSection from '@/components/homepage-components/VisionSection'
import WhyChooseSection from '@/components/homepage-components/WhyChooseSection'
import GlobalReachSection from '@/components/homepage-components/GlobalReachSection'
import LocationsSection from '@/components/LocationSection'
import MaterialsSection from '@/components/homepage-components/MaterialSection'





export const metadata: Metadata = { title: "Nigeria's #1 Metal Recycling Company" }


// const pillars = [
//    { icon: Recycle, title: 'Full-Cycle Recycling', body: 'End-to-end processing — collection, sorting, baling, distribution.' },
//    { icon: Globe2, title: 'Global Reach', body: 'National supply and international export to manufacturers worldwide.' },
//    { icon: ShieldCheck, title: 'Quality Assured', body: 'Every batch graded and verified before it leaves our facility.' },
//    { icon: Truck, title: 'Reliable Logistics', body: 'Dependable delivery across West Africa and beyond.' },
// ]
const pillars = [
   { icon: "🏆", title: 'Decade of Industry Experience', body: 'Over 10 years of proven expertise in metal recycling, scrap processing, and international trade from Nigeria.' },
   { icon: "🌎", title: 'Global Export Connections', body: 'Established trade relationships with buyers in China, South Korea, and India, with growing global market presence.' },
   { icon: "🥇", title: 'Quality Assured', body: 'Every batch graded and verified before it leaves our facility.' },
   { icon: "⚙", title: 'Industrial-Grade Processing', body: 'State-of-the-art sorting, shredding, and baling equipment ensuring premium material quality standards.' },
   // {  icon: "🌎", title: 'Reliable Logistics', body: 'Dependable delivery across West Africa and beyond.' },
   { icon: "🚚", title: 'Strong Logistics Support', body: 'End-to-end logistics coordination, from baling and containerization to port clearance and shipping.' },
   { icon: "♻", title: 'Sustainable Practices', body: 'Eco-friendly recycling processes that minimize environmental impact.' },
]

const featured = [
   { name: 'Aluminium Bales', tag: 'Most Requested', desc: 'Compressed, sorted aluminium waste ready for smelting and manufacturing.' },
   { name: 'Ferrous Scrap', tag: 'Industrial Grade', desc: 'Magnetic and non-magnetic ferrous metals from vehicles and appliances.' },
   { name: 'Non-Ferrous Metals', tag: 'Premium Quality', desc: 'Copper, brass and lead scrap for foundry, conversion and export.' },
   { name: 'Bulk Raw Supply', tag: 'Bulk Available', desc: 'Direct bulk supply on contract to manufacturers — local and global.' },
]

const features = [
   "Aluminum Scrap",
   "Cast Aluminum",
   "Iron & Steel",
   "Condenser Metals",
   "UBC Materials",
   "Vehicle Metals",
   "Ferrous Metals",
   "Non-Ferrous Metals",
];


export default function Homepage() {

   return (
      <>
         <Navbar />
         {/* ── HERO ─────────────────────────────────────────── */}
         <HeroSection />
         {/* ── ABOUT STRIP ──────────────────────────────────── */}
         <AboutSection />

         {/* ── VISION ───────────────────────────────────────── */}
         <VisionSection />

         {/* ── WHY CHOOSE US ───────────────────────────────── */}
         <WhyChooseSection />

         {/* ── GLOBAL REACH ─────────────────────────────────── */}
         <GlobalReachSection />

         {/* ── LOCATIONS ───────────────────────────────────── */}
         <LocationsSection />

         {/* ── PILLARS ───────────────────────────────────────── */}
         {/* <section className="section" style={{ background: 'var(--bg-2)' }}>
            <div className="wrap px-1">
               <AOS>
                  <div className="text-center mb-14">
                     <p className="tag mx-auto mb-4">Why Choose Us</p>
                     <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
                        Trusted by Global <span className="text-green-500">Manufacturers</span>
                     </div>
                     <p className="mb-8 leading-relaxed text-[15px]" style={{ color: 'var(--tx-muted)' }}>
                        Over a decade of excellence in metals recycling, with proven export records and international payment capabilities.                     </p>
                  </div>
               </AOS>
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {pillars.map((p, i) => (
                     <AOS key={p.title} delay={i * 100}>
                        <div className="card rounded-xl p-7 md:h-[223px]">
                           <div
                              className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                              style={{ background: 'rgba(22,163,74,0.10)' }}
                           >
                              <span>{p.icon}</span>
                           </div>

                           <h3
                              className="mb-2 text-base"
                              style={{
                                 fontFamily: 'var(--font-display)',
                                 color: 'var(--tx-primary)',
                                 fontSize: '1.15rem'
                              }}
                           >
                              {p.title}
                           </h3>

                           <p
                              className="text-sm leading-relaxed"
                              style={{ color: 'var(--tx-muted)' }}
                           >
                              {p.body}
                           </p>
                        </div>
                     </AOS>
                  ))}
               </div>
            </div>
         </section> */}

         {/* ── PRODUCTS PREVIEW ─────────────────────────────── */}
         <MaterialsSection />
         {/* <section className="section" style={{ background: 'var(--bg)' }}>
            <div className="wrap px-1">
               <AOS>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                     <div>
                        <p className="tag mb-4">Our Products</p>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--tx-primary)' }}>
                           Premium Export-Grade Materials
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
         </section> */}

         {/* ── VISION/MISSION SECTION ───────────────────────── */}
         <section className="hidden relative overflow-hidden" style={{ background: 'var(--clr-green)' }}>
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

         <Footer />
      </>
   )
}