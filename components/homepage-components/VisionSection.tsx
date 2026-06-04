"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Globe2, 
  FlaskConical, 
  Recycle, 
  Sprout, 
  Zap, 
  Award 
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function VisionSection(): React.JSX.Element {
  const coreVisions = useMemo(() => [
    {
      icon: Globe2,
      tag: "PRIMARY VISION",
      title: "Global Leadership in Sustainable Metals",
      desc: "To become the leading provider of sustainable metals recycling solutions on the global stage, driving the circular economy through innovation, safety, and superior material recovery.",
    },
    {
      icon: FlaskConical,
      tag: "INNOVATION VISION",
      title: "Revolutionizing Metal Recycling",
      desc: "To revolutionize metal recycling by turning waste into high-quality raw materials through technological innovation and sustainable practices that meet international standards.",
    },
  ], []);

  const guidingMottos = useMemo(() => [
    {
      icon: Recycle,
      tag: "OPERATIONAL PILLAR",
      title: "Transform Waste Into Valuable Resources",
      desc: "Every piece of scrap metal holds hidden industrial value. We extract that utility and redirect it cleanly into the global manufacturing chain.",
    },
    {
      icon: Sprout,
      tag: "ENVIRONMENTAL STEWARDSHIP",
      title: "Revive Nature Through Deep Recycling",
      desc: "Our operations are rooted in ecosystems protection — protecting fragile local landscapes by diverting industrial waste into productive cycles.",
    },
    {
      icon: Zap,
      tag: "ENERGY ELIMINATION",
      title: "Promote Green Energy Frameworks",
      desc: "Championing a production future where secondary processed materials significantly lower the carbon footprint of heavy metal manufacturing.",
    },
    {
      icon: Award,
      tag: "CORE CORPORATE VALUE",
      title: "Integrity, Quality, & Long-Term Partnership",
      desc: "Building lasting supply relationships with global partners through completely transparent trading, rigid assaying, and strict shipping schedules.",
    },
  ], []);

  return (
    <section 
      id="vision" 
      className="w-full bg-[var(--bg-main)] text-[var(--tx-primary)] py-20 md:py-32 overflow-hidden relative"
      aria-label="Corporate Vision and Principles"
    >
      {/* Immersive Organic Ambient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-emerald-500/[0.02] to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.p 
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--clr-green)] mb-3"
            style={{ fontFamily: "var(--font-body)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Strategic Architecture
          </motion.p>
          <motion.h2 
            className="text-[clamp(2rem,4vw,3.75rem)] font-black tracking-wider text-[var(--tx-primary)] leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          >
            Guiding principles driving every single ton we process.
          </motion.h2>
        </div>

        {/* ── PART 1: THE MACRO VISION (Asymmetric Split Columns) ── */}
        <div className="space-y-16 md:space-y-24 mb-20 md:mb-32">
          {coreVisions.map((vision, idx) => {
            const Icon = vision.icon;
            return (
              <motion.div 
                key={vision.tag}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: EASE, delay: idx * 0.1 }}
              >
                {/* Meta Meta Tag column */}
                <div className="lg:col-span-3 pt-1">
                  <span 
                    className="inline-block text-[10px] font-bold tracking-widest text-[var(--tx-muted)] group-hover:text-[var(--clr-green)] transition-colors duration-300 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    // {vision.tag}
                  </span>
                </div>

                {/* Big Display Headline column */}
                <div className="lg:col-span-5">
                  <h3 
                    className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--tx-primary)] leading-tight m-0"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {vision.title}
                  </h3>
                </div>

                {/* Narrative Description & Icon link column */}
                <div className="lg:col-span-4 flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Icon size={16} className="text-[var(--clr-green)]" />
                  </div>
                  <p 
                    className="text-[var(--tx-secondary)] text-sm md:text-base leading-relaxed m-0 font-normal"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {vision.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── PART 2: THE OPERATIONAL PILLARS (Integrated Continuous Flow) ── */}
        <div className="border-t border-slate-200/80 pt-16 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Static Indicator column */}
            <div className="lg:col-span-3">
              <div className="top-28 block sticky">
                <h4 
                  className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--tx-muted)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Execution Model
                </h4>
              </div>
            </div>

            {/* Right Continuous Seamless Flowing Content List */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {guidingMottos.map((motto, idx) => {
                return (
                  <motion.div 
                    key={motto.title}
                    className="flex flex-col text-left group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: EASE, delay: idx * 0.08 }}
                  >
                    <span 
                      className="text-[10px] font-bold tracking-widest text-[var(--clr-green)] mb-3 block"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {motto.tag}
                    </span>
                    <h5 
                      className="text-lg font-bold tracking-tight text-[var(--tx-primary)] mb-3 group-hover:text-emerald-800 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {motto.title}
                    </h5>
                    <p 
                      className="text-[var(--tx-secondary)] text-xs md:text-sm leading-relaxed font-normal m-0"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {motto.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}