import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutSection from '@/components/homepage-components/AboutSection'
import WhyChooseSection from '@/components/homepage-components/WhyChooseSection'
import GlobalReachSection from '@/components/homepage-components/GlobalReachSection'
import LocationsSection from '@/components/LocationSection'
import MaterialsSection from '@/components/homepage-components/MaterialSection'
import HeroHeader from '@/components/homepage-components/HeroHeader'

import CTASection from '@/components/CallToAction'
import { ArrowRight, Package } from 'lucide-react'


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
         <CTASection
            icon={<Package size={28} />}
            subtitle="Industrial Bulk Supply & Procurement"
            title="READY TO PARTNER WITH US?"
            description="Whether you need reliable raw material supply or have scrap metal to move — our team is ready."
            primaryCta={{
               label: 'Request Quote',
               href: '/contact',
               icon: <ArrowRight size={16} />,
            }}
            secondaryCta={{
               label: 'Browse Products',
               href: '/products',
            }}
            trustText="Trusted by industrial buyers and scrap dealers across West Africa"
         />


         <Footer />
      </>
   )
}