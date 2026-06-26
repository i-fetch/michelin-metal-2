'use client'

import Link from 'next/link'
import type { Metadata } from 'next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BarChart3, CheckCircle, ClipboardList, Globe2, Layers, Package, Recycle, Settings, Truck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRef } from 'react'
import Image from 'next/image'
import CTASection from '@/components/CallToAction'
import { useTranslations } from 'next-intl'

// Keeps static icons mapped sequentially to the translated services array
const serviceIcons = [
  Recycle,
  Settings,
  Package,
  Truck,
  Globe2,
  BarChart3,
  ClipboardList,
  Layers,
]

// Premium Core Animations
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
}
const EASE = [0.16, 1, 0.3, 1] as const;

const localStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const localFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

export const metadata: Metadata = { title: "Nigeria's #1 Metal Recycling Company" }

export default function ServicePage() {
  const t = useTranslations("servicePage")
  const tCta = useTranslations("serviceCta")

  const heroContainerRef = useRef<HTMLDivElement>(null);

  // ── PARALLAX LOGISTICS ENGINE ──
  const { scrollY } = useScroll();
  const backgroundImageY = useTransform(scrollY, [0, 800], ["0%", "20%"]);
  const contentY = useTransform(scrollY, [0, 800], ["0%", "8%"]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Safely parse i18n JSON values into arrays for UI rendering
  const servicesArray = t.raw("services") as Array<{ title: string; desc: string; features: string[] }>;
  const industriesArray = t.raw("industries") as string[];
  const whyPointsArray = t.raw("whyPoints") as Array<{ title: string; desc: string }>;
  const coverageArray = t.raw("coverage") as Array<[string, string]>;

  return (
    <div className="w-full min-h-screen bg-[var(--bg-main)] text-[var(--tx-primary)] antialiased selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section
        ref={heroContainerRef}
        className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-between overflow-hidden bg-[#ffffff] pt-36 pb-20 md:pt-44 md:pb-28"
        aria-label="Industrial Services and Capabilities Introduction"
      >
        {/* ══ LAYER 1: HARDWARE-ACCELERATED PARALLAX IMAGE ══ */}
        <motion.div
          style={{ y: backgroundImageY }}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
        >
          <Image
            src="/High-quality-industrial-scrap.jpg"
            alt="Industrial Metallurgical Processing background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.05]"
          />
        </motion.div>

        {/* ══ LAYER 2: THE CONTRAST STABILIZER MASK ENGINE ══ */}
        <div className="absolute inset-0 z-[1] pointer-events-none select-none">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10 md:from-white md:via-white/95 md:to-white/5" />
          <div className="absolute top-0 bottom-0 left-0 w-full md:w-[70%] bg-white/20 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,white_50%,transparent_100%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#ffffff] via-[#ffffff]/90 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#059669 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        {/* ══ LAYER 3: FOREGROUND HIGH-CONTRAST TYPOGRAPHY CANVAS ══ */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 relative z-[2] will-change-transform"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={localStaggerContainer}
            className="relative max-w-3xl"
          >
            {/* Capabilities Token Badge */}
            <motion.div
              variants={localFadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-600/15 bg-white text-[var(--clr-green)] text-[10px] font-bold tracking-widest uppercase mb-6 font-mono shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
            >
              <Layers size={12} className="text-emerald-600" />
              {t("hero.badge")}
            </motion.div>

            {/* Ultra-Sharp Anti-Aliased Service Header */}
            <div className="overflow-hidden mb-6 py-1">
              <motion.h1
                variants={localFadeUp}
                className="tracking-wider text-4xl sm:text-6xl md:text-7xl font-black leading-[0.95] text-slate-950 subpixel-antialiased drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t("hero.title1")}
                <br />
                <span className="text-[var(--clr-green)]">{t("hero.title2")}</span>
              </motion.h1>
            </div>

            {/* High-Readability Segmented Body Paragraph */}
            <motion.p
              variants={localFadeUp}
              className="text-slate-900 font-medium text-base md:text-xl max-w-2xl leading-relaxed font-body tracking-tight subpixel-antialiased drop-shadow-[0_1px_4px_rgba(255,255,255,0.6)]"
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SERVICES CAPACITY GRID ── */}
      <section className="py-20 md:py-32 border-t border-slate-100 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col items-start text-left mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-[10px] font-bold tracking-wider uppercase mb-4 font-sans">
              {t("sections.fullSpectrum")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-wider text-[var(--clr-green)]" style={{ fontFamily: 'var(--font-display)' }}>
              {t("sections.everythingMetal")}
            </h2>
            <p className='text-slate-600'>
              The Company leverages captive resources and advanced capabilities, that is to sourcing, soting and bailing of Aluminuim wastes and distributes same as raw materials to manufacturers.
            </p>
            <p className='text-slate-600'>
              We also deal with all types of Metals from Vehicles, Household Appliances, Building materials and all kinds of Ferrous Metals and Non-Magnetic Metals for Sale, Scraping, Conversion or Metal Foundry purposes.</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
          >
            {servicesArray?.map((s, index) => {
              const IconComponent = serviceIcons[index] || Recycle;
              return (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group flex min-h-full flex-col justify-between border-l-4 border-emerald-600"
                >
                  <div>
                    <div className="flex gap-4 items-start mb-6">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-600/5 border border-emerald-600/10 transition-transform duration-300 group-hover:scale-105 shrink-0">
                        <IconComponent size={18} className="text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 pt-1 tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
                        {s.title}
                      </h3>
                    </div>

                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-normal mb-6">
                      {s.desc}
                    </p>
                  </div>

                  <ul className="grid sm:grid-cols-2 gap-y-2.5 gap-x-4 pt-4 border-t border-slate-100">
                    {s.features?.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate-600 font-normal">
                        <CheckCircle size={13} className="text-emerald-600 shrink-0 mt-0.5" />

                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SUPPLY ── */}
      <section className="py-20 md:py-32 border-t border-slate-200/50 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-600/10 bg-emerald-50/70 text-[var(--clr-green)] text-[10px] font-bold tracking-wider uppercase mb-4 font-sans">
              {t("sections.industriesBadge")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-wider text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              {t("sections.industriesTitle")}
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {industriesArray?.map((ind) => (
              <motion.div
                key={ind}
                variants={fadeUp}
                className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 text-center transition-all duration-200 hover:bg-white hover:border-emerald-600/20 hover:shadow-md cursor-default group"
              >
                <div className="w-10 h-10 rounded-lg mx-auto mb-4 flex items-center justify-center bg-emerald-600/5 border border-emerald-600/10 group-hover:scale-105 transition-transform duration-200">
                  <Package size={18} className="text-emerald-600" />
                </div>
                <p className="text-xs font-bold uppercase tracking-tight text-slate-800">{ind}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION & REGIONAL COVERAGE ── */}
      <section className="py-20 md:py-32 border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* The Mechelin Advantage Metrics */}
            <div className="lg:col-span-7">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-4"
              >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-[10px] font-bold tracking-wider uppercase mb-2 font-sans">
                  {t("sections.whyBadge")}
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-wider text-slate-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
                  {t("sections.whyTitle")}
                </motion.h2>

                <motion.div variants={fadeUp} className="divide-y divide-slate-200/70 border-t border-b border-slate-200/70">
                  {whyPointsArray?.map(({ title, desc }) => (
                    <div key={title} className="flex gap-4 py-5 group">
                      <CheckCircle size={16} className="text-emerald-600 mt-1 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                      <div>
                        <p className="font-extrabold text-sm text-slate-900 mb-1" style={{ fontFamily: 'var(--font-body)' }}>{title}</p>
                        <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Service Coverage Ledger Block */}
            <div className="lg:col-span-5 w-full lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-slate-200/80 p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden"
              >
                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                  {t("sections.coverageTitle")}
                </h3>

                <div className="divide-y divide-slate-100">
                  {coverageArray?.map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-4 gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{k}</span>
                      <span className="text-xs md:text-sm font-semibold text-slate-800 text-right">{v}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm px-6 py-4 rounded-xl mt-6 transition-all duration-200 shadow-sm group">
                  {t("sections.submitRequest")}
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>




      {/* CTA 2 (Dynamic Content Option) */}
      <CTASection
        icon={<Package size={28} />}
        subtitle={tCta("subtitle")}
        title={tCta("title")}
        description={tCta("description")}
        primaryCta={{
          label: tCta("primaryCta"),
          href: '/contact',
          icon: <ArrowRight size={16} />,
        }}
        // secondaryCta={{
        //   label: tCta("secondaryCta"),
        //   href: '/products',
        // }}
        trustText={tCta("trustText")}
      />

      <Footer />
    </div>
  )
}