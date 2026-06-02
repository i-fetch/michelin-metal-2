import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Package } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutSection from '@/components/homepage-components/AboutSection'
import WhyChooseSection from '@/components/homepage-components/WhyChooseSection'
import GlobalReachSection from '@/components/homepage-components/GlobalReachSection'
import LocationsSection from '@/components/LocationSection'
import MaterialsSection from '@/components/homepage-components/MaterialSection'
import HeroHeader from '@/components/homepage-components/HeroHeader'


export const metadata: Metadata = { title: "Nigeria's #1 Metal Recycling Company" }


export default function Homepage() {

   return (
      <>
         <Navbar />
         {/* ── HERO ─────────────────────────────────────────── */}
         <HeroHeader />
         {/* ── ABOUT STRIP ──────────────────────────────────── */}
         <AboutSection />

         {/* ── WHY CHOOSE US ───────────────────────────────── */}
         <WhyChooseSection />

         {/* ── GLOBAL REACH ─────────────────────────────────── */}
         <GlobalReachSection />

         {/* ── LOCATIONS ───────────────────────────────────── */}
         <LocationsSection />



         {/* ── PRODUCTS PREVIEW ─────────────────────────────── */}
         <MaterialsSection />




         {/* ── CTA ──────────────────────────────────────────── */}
         <section className="section" style={{ background: 'var(--bg-2)' }}>
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
         </section>

         <Footer />
      </>
   )
}