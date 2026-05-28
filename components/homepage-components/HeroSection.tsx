"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const CYCLE_WORDS = [
  "Aluminium",
  "Ferrous Metals",
  "Vehicle Scrap",
  "Non-Ferrous",
  "UBC Cans",
];

const VIDEO_SRC = "/header-vid.mp4";
const POSTER_SRC = "/images/hero-poster.jpg";

// ───────── COUNT UP ─────────
function CountUp({ target }: { target: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  const { numericValue, suffix } = useMemo(() => {
    const match = target.match(/^(\d+)(.*)$/);
    if (match) return { numericValue: +match[1], suffix: match[2] };
    return { numericValue: 0, suffix: target };
  }, [target]);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;

        let start: number | null = null;

        const animate = (t: number) => {
          if (!start) start = t;

          const p = Math.min((t - start) / 2000, 1);
          const ease = p * (2 - p);

          setCount(Math.floor(ease * numericValue));

          if (p < 1) requestAnimationFrame(animate);
          else setCount(numericValue);
        };

        requestAnimationFrame(animate);
      }
    });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [numericValue]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ───────── WORD ROTATION ─────────
function CycleWord() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((p) => (p + 1) % CYCLE_WORDS.length);
    }, 2800);

    return () => clearInterval(t);
  }, []);

  return (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4 }}
      className="font-semibold text-[var(--clr-green)]"
    >
      {CYCLE_WORDS[i]}
    </motion.span>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // ───────── PARALLAX SYSTEM ─────────
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  const glowY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);

  const smoothVideoY = useSpring(videoY, { stiffness: 60, damping: 20 });
  const smoothScale = useSpring(videoScale, { stiffness: 60, damping: 20 });
  const smoothGlowY = useSpring(glowY, { stiffness: 60, damping: 25 });
  const smoothContentY = useSpring(contentY, { stiffness: 70, damping: 22 });

  const stats = useMemo(
    () => [
      { num: "10+", label: "Years Active" },
      { num: "50+", label: "Global Buyers" },
      { num: "8+", label: "Metal Categories" },
      { num: "4+", label: "Countries Served" },
    ],
    []
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#f7fbf8]"
    >
      {/* ───────── LAYER 1: VIDEO ───────── */}
      <motion.div
        style={{ y: smoothVideoY, scale: smoothScale }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={POSTER_SRC}
          className="w-full h-full object-cover"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </motion.div>

      {/* ───────── LAYER 2: LIGHT FIELD ───────── */}
      <div className="absolute inset-0 z-[1] bg-black/65" />

      <motion.div
        style={{ y: smoothGlowY }}
        className="absolute inset-0 z-[2]"
      >
        <div className="absolute top-[-15%] left-[-10%] w-[45rem] h-[45rem] bg-emerald-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-green-300/10 blur-3xl rounded-full" />
      </motion.div>

      {/* subtle gradient depth */}
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_40%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_35%)]" />

      {/* ───────── LAYER 3: CONTENT ───────── */}
      <motion.div
        style={{
          y: smoothContentY,
          opacity: contentOpacity,
        }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-24"
      >
        {/* badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[var(--clr-green)] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-600">
            Nigeria&apos;s Premier Metals Recycler
          </span>
        </div>

        {/* heading */}
        <div className="mt-8 space-y-2">
          <h1 className="text-[clamp(3rem,9vw,7rem)] font-black tracking-[-0.06em] text-slate-950 leading-[0.92]">
            MECHELIN
          </h1>
          <h1 className="text-[clamp(3rem,9vw,7rem)] font-black tracking-[-0.06em] text-[var(--clr-green)] leading-[0.92]">
            METALS.
          </h1>
        </div>

        {/* animated line */}
        <p className="mt-6 text-[clamp(1.1rem,2vw,1.35rem)] text-slate-900 flex flex-wrap gap-2">
          Transforming <CycleWord /> into Global Industrial Value
        </p>

        {/* description */}
        <p className="mt-5 max-w-2xl text-slate-600 leading-8">
          Leading integrated recycling and raw materials supply company in Nigeria —
          connecting industrial-grade metals to global manufacturing partners across
          China, South Korea, and India with strict compliance frameworks.
        </p>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--clr-green)] text-white text-xs uppercase tracking-[0.22em] font-bold shadow-lg hover:-translate-y-1 transition"
          >
            Explore Materials
          </Link>

          <Link
            href="#contact"
            className="px-8 py-4 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 text-xs uppercase tracking-[0.22em] font-bold text-slate-900 hover:-translate-y-1 transition"
          >
            Get a Quote
          </Link>
        </div>

        {/* stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-slate-200/70 pt-10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl md:text-5xl font-black text-slate-950">
                <CountUp target={s.num} />
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}