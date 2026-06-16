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


const services = [
  {
    icon: Recycle,
    title: 'Metal Sourcing & Collection',
    desc: 'Extensive sourcing network across West Africa to collect scrap from auto wreckers, demolition sites, factories and households.',
    features: ['On-site collection and pickup', 'Bulk acquisition at competitive rates', 'Wide network across South-East Nigeria', 'Transparent per-tonne pricing']
  },
  {
    icon: Settings,
    title: 'Sorting & Classification',
    desc: 'Manual and mechanical separation of all metals by type, grade, and purity — ensuring clean, contamination-free batches.',
    features: ['Magnetic separation of ferrous metals', 'Manual grading by experienced operators', 'Separation of aluminium, copper, brass, lead', 'Grade certificates available']
  },
  {
    icon: Package,
    title: 'Baling & Processing',
    desc: 'Post-sorting, metals are cleaned, cut to specification and compressed into high-density bales ready for smelting or export.',
    features: ['Hydraulic baling to specification', 'Cut-to-size heavy scrap', 'Wire-bound or loose bale options', 'Custom bale dimensions']
  },
  {
    icon: Truck,
    title: 'Logistics & Delivery',
    desc: 'Full logistics from our Anambra facility to your site — domestic manufacturer or international importer.',
    features: ['Road freight across Nigeria', 'Container stuffing for export', 'FOB Lagos port delivery', 'Real-time shipment coordination']
  },
  {
    icon: Globe2,
    title: 'National & Global Distribution',
    desc: 'Supply of high-performance recycled raw materials to manufacturers domestically and internationally.',
    features: ['Domestic supply to Nigerian manufacturers', 'Export to global buyers', 'Volume contracts available', 'Port documentation support']
  },
  {
    icon: BarChart3,
    title: 'B2B Bulk Supply Contracts',
    desc: 'For manufacturers requiring consistent high-volume supply — structured contracts with guaranteed volumes and timelines.',
    features: ['Monthly/quarterly supply contracts', 'Dedicated account management', 'Priority processing', 'Flexible volume adjustments']
  },
  {
    icon: ClipboardList,
    title: 'Scrap Metal Consultation',
    desc: 'Not sure what to do with your industrial scrap? We assess, classify and recommend the optimal recycling or sale route.',
    features: ['Free initial consultation', 'On-site scrap assessment', 'Grade and value estimation', 'Environmental disposal certificates']
  },
  {
    icon: Layers,
    title: 'Custom Material Preparation',
    desc: 'Metals prepared to exact buyer specifications — for foundry feed, smelter charge or export grade.',
    features: ['Custom sizing and shredding', 'Alloy-specific sorting', 'Export-ready containerisation', 'Material data sheets on request']
  },
]

const industries = ['Aluminium Smelters', 'Steel Mills', 'Foundries', 'Export Traders', 'Manufacturing Plants', 'Construction Industry']

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
  const t = useTranslations("cta2");



  const heroContainerRef = useRef<HTMLDivElement>(null);

  // ── PARALLAX LOGISTICS ENGINE ──
  const { scrollY } = useScroll();
  const backgroundImageY = useTransform(scrollY, [0, 800], ["0%", "20%"]);
  const contentY = useTransform(scrollY, [0, 800], ["0%", "8%"]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
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
            src="/High-quality-industrial-scrap.jpg" // High-fidelity logistics / processing background asset
            alt="Industrial Metallurgical Processing background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.05]"
          />

        </motion.div>

        {/* ══ LAYER 2: THE CONTRAST STABILIZER MASK ENGINE (CRITICAL FOR READABILITY) ══ */}
        <div className="absolute inset-0 z-[1] pointer-events-none select-none">

          {/* MASK A: Pure white structural block gradient to neutralize asset noise directly underneath the text layout */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10 md:from-white md:via-white/95 md:to-white/5" />

          {/* MASK B: Micro-diffused backdrop blur sheet — separates complex image details from crisp text typography */}
          <div className="absolute top-0 bottom-0 left-0 w-full md:w-[70%] bg-white/20 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,white_50%,transparent_100%)]" />

          {/* MASK C: Top-down light-bleed controller to neutralize high-exposure highlights or bright sky lines */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/60 to-transparent" />

          {/* MASK D: Horizon baseline fading anchor to seamlessly lock section into the white blocks layout below */}
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#ffffff] via-[#ffffff]/90 to-transparent" />

          {/* Technical Brand Matrix Grid-Mesh Overlay */}
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
              Capabilities &amp; Solutions
            </motion.div>

            {/* Ultra-Sharp Anti-Aliased Service Header */}
            <div className="overflow-hidden mb-6 py-1">
              <motion.h1
                variants={localFadeUp}
                className="tracking-wider text-4xl sm:text-6xl md:text-7xl font-black leading-[0.95] text-slate-950 subpixel-antialiased drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                OUR INDUSTRIAL
                <br />
                <span className="text-[var(--clr-green)]">SERVICES.</span>
              </motion.h1>
            </div>

            {/* High-Readability Segmented Body Paragraph */}
            <motion.p
              variants={localFadeUp}
              className="text-slate-900 font-medium text-base md:text-xl max-w-2xl leading-relaxed font-body tracking-tight subpixel-antialiased drop-shadow-[0_1px_4px_rgba(255,255,255,0.6)]"
            >
              End-to-end metallurgical processing structures—engineered from baseline raw material collection
              and high-density packaging to secure cross-border maritime supply logistics.
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
              Full-Spectrum Delivery
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-wider text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              EVERYTHING METAL, END-TO-END
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group flex min-h-full flex-col justify-between border-l-4 border-emerald-600"
              >
                <div>
                  <div className="flex gap-4 items-start mb-6">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-600/5 border border-emerald-600/10 transition-transform duration-300 group-hover:scale-105 shrink-0">
                      <s.icon size={18} className="text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 pt-1" style={{ fontFamily: 'var(--font-display)' }}>
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-normal mb-6">
                    {s.desc}
                  </p>
                </div>

                <ul className="grid sm:grid-cols-2 gap-y-2.5 gap-x-4 pt-4 border-t border-slate-100">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-600 font-normal">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
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
              Downstream Infrastructure
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-wider text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              INDUSTRIES WE SUPPLY
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {industries.map((ind) => (
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
                  The Mechelin Difference
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-wider text-slate-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
                  WHY BULK BUYERS ROUTE THROUGH MECHELIN
                </motion.h2>

                <motion.div variants={fadeUp} className="divide-y divide-slate-200/70 border-t border-b border-slate-200/70">
                  {[
                    ['Integrated Operations', 'We directly manage full recovery pipelines, clearing out intermediate trading layers to anchor high efficiency.'],
                    ['Consistent Purity Criteria', 'Strict grading guidelines and rigorous QA ensure allocations fulfill designated purity specs on every run.'],
                    ['Sustained Cargo Capacities', 'Our industrial-scale footprint ensures high-volume bulk requests are matched continuously month after month.'],
                    ['Adaptable Execution Terms', 'We engineer transactional criteria around your procurement layout, offering spot purchasing and structured terms.'],
                    ['Environmental Framework Compliance', 'Every operational process generates data frameworks to bolster your modern corporate sustainability objectives.'],
                  ].map(([t, d]) => (
                    <div key={t} className="flex gap-4 py-5 group">
                      <CheckCircle size={16} className="text-emerald-600 mt-1 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                      <div>
                        <p className="font-extrabold text-sm text-slate-900 mb-1" style={{ fontFamily: 'var(--font-body)' }}>{t}</p>
                        <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed">{d}</p>
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
                  SERVICE COVERAGE BALANCES
                </h3>

                <div className="divide-y divide-slate-100">
                  {[
                    ['Sourcing Network', 'South-East & South-West Nigeria'],
                    ['Processing Facility', 'Awada Obosi, Anambra State'],
                    ['Domestic Delivery', 'All Major Industrial Cities'],
                    ['Export Hub', 'Apapa Port Terminal, Lagos'],
                    ['International Lines', 'West Africa, Asia, Europe'],
                    ['Operational Hours', 'Mon–Sat | 8:00am – 6:00pm'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-4 gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{k}</span>
                      <span className="text-xs md:text-sm font-semibold text-slate-800 text-right">{v}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm px-6 py-4 rounded-xl mt-6 transition-all duration-200 shadow-sm group">
                  Submit Operational Request
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── INTERACTIVE GLOBAL INDUSTRIAL BLOCK ── */}

      {/* CTA */}
      <CTASection
        icon={<Package size={28} />}
        subtitle="Bulk Industrial Supply"
        title="DISCUSS YOUR METALLURGICAL OVERHEADS?"
        description="From isolated custom processing batches to dedicated corporate mill allocation setups — we engineer strategic answers suited to your parameters."
        primaryCta={{
          label: 'Initiate B2B Consultations',
          href: '/contact',
          icon: <ArrowRight size={16} />,
        }}
        trustText="Trusted by industrial buyers across West Africa"
      />

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
    </div>
  )
}