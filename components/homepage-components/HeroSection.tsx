"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CYCLE_WORDS = ["Aluminium", "Ferrous Metals", "Vehicle Scrap", "Non-Ferrous", "UBC Cans"];
const EASE = [0.16, 1, 0.3, 1] as const;

// ── INTERNAL MICRO COUNT-UP MODULE ──
interface CountUpProps {
  target: string;
  duration?: number;
}

function CountUp({ target, duration = 2000 }: CountUpProps): React.JSX.Element {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const { numericValue, suffix } = useMemo(() => {
    const match = target.match(/^(\d+)(.*)$/);
    if (match) {
      return { numericValue: parseInt(match[1], 10), suffix: match[2] };
    }
    return { numericValue: 0, suffix: target };
  }, [target]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress * (2 - progress);
            
            setCount(Math.floor(easeProgress * numericValue));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(numericValue);
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

  return <span ref={elementRef}>{count}{suffix}</span>;
}

// ── CYCLING WORD ANIMATION MODULE ──
function CycleWord(): React.JSX.Element {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % CYCLE_WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-block min-w-[7ch] sm:min-w-[8ch]">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          className="inline-block font-bold text-[var(--clr-green)]"
          initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {CYCLE_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── MAIN HERO SECTION COMPONENT ──
export default function HeroSection(): React.JSX.Element {
  const statsData = useMemo(() => [
    { num: "10+", label: "Years Active" },
    { num: "50+", label: "Global Buyers" },
    { num: "8+", label: "Metal Categories" },
    { num: "4+", label: "Countries Served" },
  ], []);

  return (
    <section
      className="relative w-full flex flex-col justify-between overflow-hidden bg-[var(--bg-main)] pt-20 pb-20 md:pt-28 md:pb-28"
      aria-label="Hero Introduction"
    >
      {/* Structural Fluid Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-emerald-500/5 to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-amber-500/5 to-transparent blur-3xl" />
      </div>

      {/* Main Foreground Typography Canvas */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 relative z-10 flex-1">
        
        {/* Premium Light-Mode Brand Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 bg-[var(--clr-gold-alpha)] border border-amber-600/10 rounded-full py-1.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[var(--clr-gold)] shadow-sm"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-gold)] animate-pulse" />
          Nigeria&apos;s Premier Metals Recycler
        </motion.div>

        {/* Reengineered Editorial Headlines */}
        <div className="space-y-1 mb-6">
          <div className="overflow-hidden">
            <motion.h1
              className="block m-0 text-[var(--tx-primary)] font-black tracking-tighter text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95]"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            >
              MECHELIN
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              className="block m-0 text-[var(--clr-green)] font-black tracking-tighter text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95]"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            >
              METALS.
            </motion.h1>
          </div>
        </div>

        {/* Dynamic Typography Loop Slider */}
        <motion.p
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--tx-primary)] font-normal mb-5 max-w-2xl text-[clamp(1.1rem,2vw,1.35rem)] leading-snug tracking-tight"
          style={{ fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
        >
          Transforming <CycleWord /> into Global Industrial Value
        </motion.p>

        {/* Main Context Paragraph Text */}
        <motion.p
          className="text-[var(--tx-secondary)] text-sm md:text-base leading-relaxed mb-8 max-w-xl font-normal"
          style={{ fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
        >
          Leading integrated recycling and raw materials supply company in Nigeria — 
          connecting industrial-grade metals to global manufacturing partners across 
          China, South Korea, and India with strict compliance frameworks.
        </motion.p>

        {/* Immersive Premium Light Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3.5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
        >
          <Link
            href="/products"
            className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-[var(--clr-green)] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 hover:bg-emerald-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Explore Materials <ArrowRight size={14} />
          </Link>

          <Link
            href="#contact"
            className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-white border border-slate-200 text-[var(--tx-primary)] text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 hover:bg-slate-50 shadow-sm hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>

      {/* ── FLOWING METRICS RIBBON ── */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 relative z-10 mt-14 md:mt-16">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 border-t border-slate-200/80 pt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-left group"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
            >
              <p 
                className="text-4xl md:text-5xl font-black text-[var(--tx-primary)] leading-none transition-transform duration-300 group-hover:translate-x-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <CountUp target={stat.num} duration={2000} />
              </p>
              <p 
                className="text-[10px] tracking-[0.2em] uppercase text-[var(--tx-muted)] mt-2.5 font-bold"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}