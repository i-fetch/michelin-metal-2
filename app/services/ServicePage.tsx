'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, CheckCircle, ClipboardList, Globe2, Layers, Package, Recycle, Settings, Truck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

export default function ServicePage() {
  return (
    <div className="w-full min-h-screen bg-[var(--bg-main)] text-[var(--tx-primary)] antialiased selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Dynamic Matrix Dots Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-emerald-50/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-600/10 bg-emerald-50/70 text-[var(--clr-green)] text-[10px] font-bold tracking-wider uppercase mb-6 font-sans">
              <Layers size={12} />
              Capabilities &amp; Solutions
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              OUR INDUSTRIAL
              <br />
              <span className="text-[var(--clr-green)]">SERVICES.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-[var(--tx-secondary)] text-base md:text-xl font-normal max-w-2xl leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              End-to-end metallurgical processing structures—engineered from baseline raw material collection and high-density packaging to cross-border maritime supply logistics.
            </motion.p>
          </motion.div>
        </div>
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
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
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
                className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative group pl-6 flex flex-col justify-between"
              >
                {/* Embedded Interactive Rail Accents matching your About design */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-emerald-600 scale-y-[0.15] opacity-40 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-300 origin-bottom" />
                
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
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
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
                <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
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
      <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              DISCUSS YOUR METALLURGICAL OVERHEADS
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              From isolated custom processing batches to dedicated corporate mill allocation setups — we engineer strategic answers suited to your parameters.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs md:text-sm px-8 py-4 rounded-xl transition-all duration-200 shadow-lg group">
              Initiate B2B Consultations
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}