import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutSection from '@/components/homepage-components/AboutSection'
import WhyChooseSection from '@/components/homepage-components/WhyChooseSection'
import GlobalReachSection from '@/components/homepage-components/GlobalReachSection'
// import LocationsSection from '@/components/LocationSection'
import MaterialsSection from '@/components/homepage-components/MaterialSection'
import HeroHeader from '@/components/homepage-components/HeroHeader'

import CTASection from '@/components/CallToAction'
import { ArrowRight, Package } from 'lucide-react'
import { useTranslations } from 'next-intl'


export const metadata: Metadata = { title: "Nigeria's #1 Metal Recycling Company" }


export default function Homepage() {
   const t = useTranslations("cta");

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

        
         {/* ── PRODUCTS PREVIEW ─────────────────────────────── */}
         <MaterialsSection />

         {/* ── CTA ──────────────────────────────────────────── */}
         <CTASection
            icon={<Package size={28} />}
            subtitle={t("subtitle")}
            title={t("title")}
            description={t("description")}
            primaryCta={{
               label: t("primaryCta"),
               href: '/contact',
               icon: <ArrowRight size={16} />,
            }}
            secondaryCta={{
               label: t("secondaryCta"),
               href: '/products',
            }}
            trustText={t("trustText")}
         />


         <Footer />
      </>
   )
}