'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle, Globe2, Target, Zap, TrendingUp, Package } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRef } from 'react'
import WhyChooseSection from '@/components/homepage-components/WhyChooseSection'
import CallToAction from '@/components/CallToAction'
import CTASection from '@/components/CallToAction'


const milestones = [
    { year: '2013', title: 'Industrial Market Entry', event: 'Initial deployment and asset sourcing across active West African heavy scrap sectors.' },
    { year: '2018', title: 'Infrastructure Expansion', event: 'Established regional consolidation hubs and primary partnerships with local manufacturers.' },
    { year: '2022', title: 'Global Forwarding Channels', event: 'Launched cross-border maritime logistics pipelines supplying heavy industries across Asia.' },
    { year: '2023', title: 'Corporate Incorporation', event: 'Formally integrated operations under Mechelin Metals Nigeria LTD.' },
    { year: '2024', title: 'Processing Scalability', event: 'Commissioned industrial baling machinery, significantly expanding processing capacities.' },
    { year: '2026', title: 'Digital Procurement Infrastructure', event: 'Launched enterprise-grade B2B platform for seamless global supplier and buyer routing.' },
]

// Premium Motion Animation Orchestration
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
        transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
}

const lineGrow = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }
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
export default function AboutPage() {
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
                className="relative min-h-[78vh] sm:min-h-[82vh] flex items-center overflow-hidden bg-[#ffffff]"
                aria-label="About Corporate Profile Introduction"
            >
                {/* ══ LAYER 1: HARDWARE-ACCELERATED PARALLAX IMAGE ══ */}
                <motion.div
                    style={{ y: backgroundImageY }}
                    className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                >
                    <Image
                        src="/header-img.png"
                        alt="Industrial Metals Operations background"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center scale-[1.05]"
                    />
                </motion.div>

                {/* ══ LAYER 2: THE CONTRAST STABILIZER MASK ENGINE (CRITICAL FOR READABILITY) ══ */}
                <div className="absolute inset-0 z-[1] pointer-events-none select-none">

                    {/* MASK A: Heavy mathematical white block left-gradient anchor to flatten asset noise under text */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95  to-white/10 md:from-white md:via-white/95  md:to-white/5" />

                    {/* MASK B: Micro-diffused backdrop blur sheet — isolates background details away from text planes */}
                    <div className="absolute top-0 bottom-0 left-0 w-full md:w-[70%] bg-white/20 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,white_50%,transparent_100%)]" />

                    {/* MASK C: Top-down light-bleed controller to offset bright sky or overhead imagery elements */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/60 to-transparent" />

                    {/* MASK D: Baseline canvas structural merging element */}
                    <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#ffffff] via-[#ffffff]/90 to-transparent" />

                    {/* Technical Grid-Mesh Overlay */}
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
                    style={{
                        y: contentY,
                        opacity: contentOpacity,
                    }}
                    className="
        max-w-7xl mx-auto w-full 
        px-6 sm:px-8 lg:px-12 
        relative z-[2] will-change-transform
        
        /* ✔️ REAL POSITION CONTROL */
        -translate-y-10 sm:-translate-y-6 lg:translate-y-0
    "
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={localStaggerContainer}
                        className="relative max-w-3xl
            flex flex-col justify-center
            min-h-[55vh]
        "
                    >
                        {/* Badge Panel */}
                        <motion.div
                            variants={localFadeUp}
                            className="inline-flex items-center w-max gap-2 px-4 py-1.5 rounded-full border border-emerald-600/15 bg-white text-[var(--clr-green)] text-[10px] font-bold tracking-widest uppercase mb-6 font-mono shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
                        >
                            <Globe2 size={12} className="animate-[spin_10s_linear_infinite] text-emerald-600" />
                            Enterprise Infrastructure
                        </motion.div>

                        {/* Ultra-Sharp Anti-Aliased Heading */}
                        <div className="overflow-hidden mb-6 py-1">
                            <motion.h1
                                variants={localFadeUp}
                                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider leading-[0.95] text-slate-950 subpixel-antialiased drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                ABOUT MECHELIN
                                <br />
                                <span className="text-[var(--clr-green)]">METALS NIGERIA.</span>
                            </motion.h1>
                        </div>

                        {/* High-Readability Segmented Body Paragraph */}
                        <motion.p
                            variants={localFadeUp}
                            className="text-slate-900 font-medium text-base md:text-xl max-w-2xl leading-relaxed font-body tracking-tight subpixel-antialiased drop-shadow-[0_1px_4px_rgba(255,255,255,0.6)]"
                        >
                            A decade of heavy industry operations, institutionalised for the global market.
                            Nigeria&apos;s premier integrated metal reclamation, industrial extraction, and multi-continent distribution enterprise.
                        </motion.p>
                    </motion.div>
                </motion.div>
            </section>
            {/* ── STORY SECTION ── */}
            <section className="py-20 md:py-32 border-t border-slate-100 bg-slate-50/30">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-12 gap-12 md:gap-16 items-center">

                    <motion.div
                        className="md:col-span-7"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-100/80 text-slate-600 text-[10px] font-bold tracking-wider uppercase mb-6 font-sans">
                            Our Legacy
                        </motion.div>
                        <motion.h2
                            variants={fadeUp}
                            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-slate-900 leading-none mb-6"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            MORE THAN A DECADE IN THE MAKING
                        </motion.h2>
                        <motion.div variants={fadeUp} className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-normal max-w-xl">
                            <p>
                                Mechelin Metals Nigeria LTD is West Africa&apos;s foremost integrated structural reclamation and metal processing corporation. While formally incorporated in 2023, our foundation spans over ten years of deep operational deployment across active recycling, sorting, and supply chains.
                            </p>
                            <p>
                                We leverage captive resources and institutional machinery infrastructures to source, safely process, and premium-bale ferrous and non-ferrous variants. Our materials feed directly into precision manufacturing lines, foundries, and domestic smelting conglomerates.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="mt-8">
                            <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs md:text-sm px-6 py-3 rounded-xl shadow-sm transition-all duration-200 group">
                                Explore Product Portfolio
                                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <div className="md:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative rounded-2xl overflow-hidden aspect-square w-full max-w-[440px] mx-auto border border-slate-200 shadow-xl bg-white p-3 grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                        >
                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                                <Image
                                    src="/building-structure.png"
                                    alt="Metal processing facility platform"
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Overlapping Typography Badges */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="absolute -bottom-6 -right-2 rounded-xl p-5 border border-slate-200 bg-white shadow-xl min-w-[200px] backdrop-blur-md"
                        >
                            <span className="flex items-center gap-2 text-[var(--clr-green)] font-mono text-[10px] font-bold tracking-wider uppercase mb-1">
                                <TrendingUp size={12} /> Performance
                            </span>
                            <p className="text-4xl font-black tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>100K+</p>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Metric Tonnes Forwarded</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="absolute -top-4 -left-4 rounded-xl p-4 border border-emerald-600/10 bg-emerald-600 text-white shadow-xl min-w-[140px]"
                        >
                            <p className="text-3xl font-black tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>10+</p>
                            <p className="text-[10px] opacity-80 mt-1.5 uppercase font-bold tracking-widest leading-none">Years Industry Presence</p>
                        </motion.div>
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

            {/* ── VISION & MISSION ARCHITECTURE ── */}
            <section className="py-20 md:py-32 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="flex flex-col items-start text-left mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-600/10 bg-emerald-50/70 text-[var(--clr-green)] text-[10px] font-bold tracking-wider uppercase mb-4 font-sans">
                            Corporate Roadmap
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black tracking-wider text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                            VISION &amp; MISSION ARCHITECTURE
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={fadeUp}
                            className="rounded-2xl p-8 md:p-12 h-full bg-slate-900 text-white relative overflow-hidden group border border-slate-800 shadow-lg"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-150" />
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/20 border border-emerald-500/30 mb-8">
                                <Target size={24} className="text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>OUR VISION</h3>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-normal">
                                To anchor the West African scrap asset framework directly into international consumer pipelines, championing pristine material specifications while driving regional circular economies through advanced zero-loss engineering.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={fadeUp}
                            transition={{ delay: 0.15 }}
                            className="rounded-2xl p-8 md:p-12 h-full bg-slate-50 border border-slate-200/80 relative overflow-hidden group shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-600/10 border border-emerald-600/20 mb-8">
                                <Zap size={24} className="text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>OUR MISSION</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                                To revolutionise bulk metal reclamation by standardising processing criteria and deploying tech-enabled sorting structures—delivering high-purity smelter components directly to global downstream manufacturers.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── WHY CHOOSE US ───────────────────────────────── */}
            <WhyChooseSection />


            {/* ── TIMELINE MILESTONES ── */}
            <section className="py-20 md:py-32 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="flex flex-col items-start text-left mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-600/10 bg-emerald-50/70 text-[var(--clr-green)] text-[10px] font-bold tracking-wider uppercase mb-4 font-sans">
                            The Ledger
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black tracking-wider text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                            HISTORICAL MILESTONES
                        </h2>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Continuous Axis Rail Grid Line */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={lineGrow}
                            className="absolute left-6 md:left-1/2 top-2 bottom-2 w-[1.5px] bg-slate-200 -translate-x-1/2 origin-top hidden md:block"
                        />
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={lineGrow}
                            className="absolute left-6 top-2 bottom-2 w-[1.5px] bg-slate-200 origin-top md:hidden"
                        />

                        <div className="space-y-12">
                            {milestones.map((m, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <div key={m.year} className={`flex flex-col md:flex-row items-start relative ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                        {/* Central Indicator Node Ring */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.15, duration: 0.4 }}
                                            className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-[3px] border-emerald-600 bg-white -translate-x-1/2 z-20 mt-1.5"
                                        />

                                        {/* Open Flow Ledger Blocks */}
                                        <motion.div
                                            className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8"
                                            initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: '-40px' }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className={`bg-slate-50/70 border border-slate-200 p-6 rounded-xl relative group transition-all duration-200 hover:bg-white hover:shadow-md ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                                <span className="font-mono text-xs font-bold text-emerald-600 block mb-1">{m.year}</span>
                                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2" style={{ fontFamily: 'var(--font-body)' }}>{m.title}</h4>
                                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-normal">{m.event}</p>
                                            </div>
                                        </motion.div>

                                        <div className="hidden md:block w-1/2" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── REGISTRATION + OPERATIONAL STATS ── */}
            <section className="py-20 md:py-32 border-t border-slate-200/60 bg-slate-50/40">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">

                        {/* Technical Statutory Records Ledger */}
                        <div className="lg:col-span-7 w-full">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-100px' }}
                                variants={staggerContainer}
                            >
                                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-[10px] font-bold tracking-wider uppercase mb-5 font-sans">
                                    Compliance &amp; Incorporation
                                </motion.div>
                                <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-black tracking-wider text-slate-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
                                    REGISTRATION &amp; STATUTORY DETAILS
                                </motion.h2>

                                <motion.div variants={fadeUp} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                                    {[
                                        ['Company Name', 'Mechelin Metals Nigeria LTD'],
                                        ['Business Entity', 'Private Company Limited by Shares'],
                                        ['Industry Classification', 'Industrial Reclamation & Solid Metallurgy Recyclables'],
                                        ['Incorporation Target', '2023'],
                                        ['Sourcing Footprint', 'West African Trade Basins / Nigerian National Logistics Hubs'],
                                        ['Headquarters Address', 'No. 23 Nathan Okafor Street, Awada Obosi, Anambra'],
                                        ['Operational Branch', 'No. 32 Louis Mbanefo Street, Woliwo Layout, Anambra'],
                                    ].map(([k, v], idx) => (
                                        <div
                                            key={k}
                                            className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4 transition-colors duration-150 hover:bg-slate-50/80 ${idx !== 6 ? 'border-b border-slate-100' : ''}`}
                                        >
                                            <div className="flex items-center gap-2 sm:w-1/3 shrink-0">
                                                <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                                                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{k}</p>
                                            </div>
                                            <p className="text-xs md:text-sm font-semibold text-slate-800 sm:w-2/3">{v}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>


                    </div>
                </div>
            </section>

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
        </div>
    )
}