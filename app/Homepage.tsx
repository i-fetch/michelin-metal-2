import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutSection from '@/components/homepage-components/AboutSection'
import WhyChooseSection from '@/components/homepage-components/WhyChooseSection'
import GlobalReachSection from '@/components/homepage-components/GlobalReachSection'
import LocationsSection from '@/components/LocationSection'
import MaterialsSection from '@/components/homepage-components/MaterialSection'
import HeroHeader from '@/components/homepage-components/HeroHeader'
import CallToAction from '@/components/CallToAction'


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
         <CallToAction />

         <Footer />
      </>
   )
}