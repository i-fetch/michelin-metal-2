"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Handshake, Leaf } from "lucide-react";

// The premium, high-end ease function matching standard engineering sites
const PARALLAX_EASE = [0.16, 1, 0.3, 1] as const;

// ── INTERNAL MICRO COUNT-UP MODULE ──
interface CountUpProps {
  value: string;
  sign: string;
  duration?: number;
}

function CountUp({ value, sign, duration = 2000 }: CountUpProps): React.JSX.Element {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const numericValue = useMemo(() => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  }, [value]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Quad ease-out transition deceleration math
            const easeProgress = progress * (2 - progress);
            
            setCount(Math.floor(easeProgress * numericValue));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(numericValue); // Firm value alignment lock
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [numericValue, duration]);

  return (
    <span ref={elementRef} className="inline-flex items-baseline">
      <span>{count}</span>
      <span className="text-xl font-bold text-[var(--clr-green)] ml-0.5 select-none">
        {sign}
      </span>
    </span>
  );
}

// ── MAIN ABOUT SECTION COMPONENT ──
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
      className="relative w-full bg-[var(--bg-main)] text-[var(--tx-primary)] py-20 md:py-32 overflow-hidden z-10 select-none border-b border-slate-100"
      aria-label="About Company Operational Blueprint"
    >
      {/* LOCALIZED SOFT ATMOSPHERIC ACCENT GLOW (Premium light-mode depth element) */}
      <div 
        aria-hidden="true" 
        className="absolute left-[-10%] top-1/3 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.03] blur-[130px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Balanced Grid Architecture mapping seamlessly to your layout flow */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-start">
          
          {/* ══ LEFT BLOCK: FLOATING METRICS TEXT LAYER ══ */}
          <div className="space-y-7">
            
            {/* Tag component styled explicitly via premium light-mode variables */}
            <motion.div 
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideUpRight}
              className="inline-flex items-center gap-2 bg-emerald-50/60 border border-emerald-600/10 rounded-full py-1.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[var(--clr-green)] shadow-sm"
            >
              <Building2 size={12} />
              About The Company
            </motion.div>

            {/* Display Header utilizing custom display token mapping */}
            <motion.h2 
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideUpRight}
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--tx-primary)] leading-[0.95]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NIGERIA&apos;S FOREMOST <br />
              <span className="text-[var(--clr-green)]">INTEGRATED METAL RECYCLER</span>
            </motion.h2>

            {/* Operational Text Copy blocks */}
            <div 
              className="space-y-5 text-[var(--tx-secondary)] font-normal text-sm md:text-base leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
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

            {/* 2-Column Comprehensive Feature Checks Matrix (Immersive flowing layout) */}
            <motion.div 
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideUpRight}
              className="grid grid-cols-2 gap-x-6 gap-y-4 pt-3 max-w-xl"
            >
              {features.map((feat) => (
                <div 
                  key={feat} 
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[var(--tx-secondary)] transition-transform duration-200 hover:translate-x-1"
                >
                  <CheckCircle2 size={16} className="text-[var(--clr-green)] shrink-0" />
                  <span className="tracking-tight" style={{ fontFamily: "var(--font-body)" }}>{feat}</span>
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
              <a 
                href="" 
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-[var(--tx-primary)] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 hover:bg-[var(--clr-green)] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Handshake size={14} />
                Read Full Story
              </a>
            </motion.div>

          </div>

          {/* ══ RIGHT BLOCK: PARALLAX MEDIA CONTAINER MATRIX ══ */}
          <div className="space-y-6 w-full lg:sticky lg:top-28">
            
            {/* Visual Frame Wrapper */}
            <motion.div 
              className="relative w-full rounded-2xl overflow-hidden border border-slate-100 bg-white p-2 group shadow-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={slideUpLeft}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" 
                  alt="Industrial sorting and metal distribution hub operations" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                />
                
                {/* Light-Mode Bottom Gradient Fade Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />

                {/* Micro Float Indicator Chip Block */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200/60 backdrop-blur-md text-[var(--tx-primary)] text-[10px] font-bold tracking-widest uppercase shadow-sm">
                  <Leaf size={12} className="text-emerald-600 animate-pulse" />
                  <span>Eco-Certified Operations</span>
                </div>
              </div>
            </motion.div>

            {/* Fluid Metric Ribbon Blocks (Clean spacing replaces harsh boxed card borders) */}
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
                  className="p-6 rounded-2xl border border-slate-100 bg-white/60 backdrop-blur-md text-center flex flex-col items-center justify-center min-h-[135px] transition-all duration-300 hover:border-emerald-500/20 hover:bg-white shadow-sm hover:shadow-md hover:-translate-y-1"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: PARALLAX_EASE } }
                  }}
                >
                  <div 
                    className="flex items-center justify-center mb-0.5 font-black text-4xl sm:text-5xl text-[var(--tx-primary)] tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <CountUp value={counter.num} sign={counter.sign} duration={2200} />
                  </div>
                  <p 
                    className="text-[10px] tracking-[0.15em] uppercase text-[var(--tx-muted)] font-bold mt-1.5"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
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