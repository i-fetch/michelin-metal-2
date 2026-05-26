"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Handshake, Leaf } from "lucide-react";

// The premium, high-end ease function matching standard engineering sites
const PARALLAX_EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutSection(): React.JSX.Element {
  const features = useMemo(() => [
    "Aluminum Scrap",
    "Cast Aluminum",
    "Iron & Steel",
    "Condenser Metals",
    "UBC Materials",
    "Vehicle Metals",
    "Ferrous Metals",
    "Non-Ferrous Metals"
  ], []);

  const counters = useMemo(() => [
    { num: "10", sign: "+", label: "Years Experience" },
    { num: "50", sign: "+", label: "Global Buyers" },
    { num: "30", sign: "+", label: "Partnerships" },
    { num: "100", sign: "%", label: "Sustainable Ops" }
  ], []);

  // Soft localized structural layout animations
  const slideUpRight = {
    hidden: { opacity: 0, y: 40, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.9, ease: PARALLAX_EASE, delay: i * 0.06 }
    })
  };

  const slideUpLeft = {
    hidden: { opacity: 0, y: 50, x: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1, ease: PARALLAX_EASE, delay: 0.1 }
    }
  };

  return (
    <section 
      id="about" 
      className="relative w-full bg-transparent text-white py-20 md:py-32 overflow-hidden z-10 select-none"
      aria-label="About Company Operational Blueprint"
    >
      {/* LOCALIZED SOFT ATMOSPHERIC ACCENT GLOW (Subtle variant shifting away from the Hero positioning) */}
      <div 
        aria-hidden="true" 
        className="absolute left-[-10%] top-1/3 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.02] blur-[140px] pointer-events-none mix-blend-screen" 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Balanced Grid Architecture mapping seamlessly to your design layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-start">
          
          {/* ══ LEFT BLOCK: FLOATING METRICS TEXT LAYER ══ */}
          <div className="space-y-7">
            
            {/* Tag component styled explicitly via your stylesheet token configuration */}
            <motion.div 
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideUpRight}
              className="tag"
            >
              <Building2 size={12} />
              About The Company
            </motion.div>

            {/* Display Header utilizing your imported Bebas Neue token mapping */}
            <motion.h2 
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideUpRight}
              className="text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-wide text-white leading-[0.95] font-[family:var(--font-display)]"
            >
              NIGERIA&apos;S FOREMOST <br />
              <span className="text-[var(--clr-green-light)]">INTEGRATED METAL RECYCLER</span>
            </motion.h2>

            {/* Operational Text Copy blocks */}
            <div className="space-y-5 font-[family:var(--font-body)] text-slate-300 font-light tracking-wide text-sm md:text-base leading-relaxed">
              <motion.p 
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideUpRight}
              >
                Mechelin Metals Nigeria LTD leverages captive resources and advanced capabilities to source, sort and bale aluminium waste, distributing it as raw material to manufacturers. We handle all types of ferrous and non-ferrous metals for sale, scrapping, conversion and foundry purposes.
              </motion.p>

              <motion.p 
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideUpRight}
              >
                Based in Anambra State, we bridge the gap between Nigerian scrap metal suppliers and international manufacturers, ensuring premium quality and reliable supply chains across borders.
              </motion.p>
            </div>

            {/* 2-Column Comprehensive Feature Checks Matrix */}
            <motion.div 
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideUpRight}
              className="grid grid-cols-2 gap-x-4 gap-y-4 pt-3"
            >
              {features.map((feat) => (
                <div 
                  key={feat} 
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-200 transition-transform duration-200 hover:translate-x-1"
                >
                  <CheckCircle2 size={16} className="text-[var(--clr-green-light)] shrink-0" />
                  <span className="font-[family:var(--font-body)] tracking-wide">{feat}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Trigger Link Core Button */}
            <motion.div 
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideUpRight}
              className="pt-4"
            >
              <a href="#contact" className="btn btn-green uppercase text-xs tracking-wider">
                <Handshake size={14} />
                Read Full Story
              </a>
            </motion.div>

          </div>

          {/* ══ RIGHT BLOCK: PARALLAX MEDIA CONTAINER MATRIX ══ */}
          <div className="space-y-6 w-full lg:sticky lg:top-28">
            
            {/* Visual Glass Wrapper Frame */}
            <motion.div 
              className="relative w-full rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] p-2 group shadow-2xl backdrop-blur-xs"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={slideUpLeft}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-950">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" 
                  alt="Industrial sorting and metal distribution hub operations" 
                  className="w-full h-full object-cover grayscale opacity-60 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-80"
                  loading="lazy"
                />
                
                {/* Visual Bottom Fade Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Micro Float Indicator Chip Block */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-black/80 border border-white/[0.05] backdrop-blur-md text-slate-300 text-[10px] font-bold tracking-widest uppercase">
                  <Leaf size={12} className="text-emerald-400 animate-pulse" />
                  <span>Eco-Certified Operations</span>
                </div>
              </div>
            </motion.div>

            {/* Reconstructed Translucent Data Matrix Cards Sitting Cleanly Over the Parallax Layers */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
              }}
            >
              {counters.map((counter) => (
                <motion.div 
                  key={counter.label} 
                  className="p-6 rounded-xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-md text-center flex flex-col items-center justify-center min-h-[135px] transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.04] hover:-translate-y-1"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: PARALLAX_EASE } }
                  }}
                >
                  <div className="flex items-center justify-center mb-0.5 font-[family:var(--font-display)]">
                    <span className="text-4xl sm:text-5xl font-normal text-[var(--clr-green-light)] tracking-wide line-height-1">
                      {counter.num}
                    </span>
                    <span className="text-xl font-normal text-[var(--clr-green-light)] ml-0.5">
                      {counter.sign}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs tracking-widest uppercase text-slate-400 font-bold font-[family:var(--font-body)] mt-1.5">
                    {counter.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}