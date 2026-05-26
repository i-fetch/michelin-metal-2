"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const CYCLE_WORDS = ["Aluminium", "Ferrous Metals", "Vehicle Scrap", "Non-Ferrous", "UBC Cans"];
const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────
   OPTIMIZED PARTICLE CANVAS COMPONENT
───────────────────────────────────────────────────────────── */
function ParticleCanvas(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      colorIndex: number;
    }> = [];
    
    const resize = () => {
      if (!canvas) return;
      // Capture accurate physical dimensions of the parent section container
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;

      // Seed particles evenly across the absolute computed coordinates
      particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.4 + 0.15,
        colorIndex: Math.floor(Math.random() * 3),
      }));
    };
    
    // Initial calculate & assign
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const getVar = (v: string) => 
      getComputedStyle(document.documentElement).getPropertyValue(v).trim() || "#22c55e";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = [
        getVar("--hero-particle-green"), 
        getVar("--hero-particle-blue"), 
        getVar("--hero-particle-muted")
      ];

      // Draw responsive interconnected structural grid web lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${(0.08 * (1 - d / 150))})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw and transform independent drift arrays
      particles.forEach((p) => {
        p.x += p.vx; 
        p.y += p.vy;
        
        // Accurate screen-edge wrap checks matching new explicit dimensions
        if (p.x < 0) p.x = canvas.width; 
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; 
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = colors[p.colorIndex] || "#22c55e";
        ctx.fill();
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };
    
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      aria-hidden="true" 
      className="absolute inset-0 w-full h-full z-[4] block pointer-events-none" 
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   DYNAMIC CYCLING TEXT COMPONENT
───────────────────────────────────────────────────────────── */
function CycleWord(): React.JSX.Element {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % CYCLE_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-block min-w-[7ch] sm:min-w-[8ch]">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          className="inline-block font-semibold text-[--clr-gold]"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {CYCLE_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   DEEP PARALLAX HERO SECTION - CLEAN HIGH-CONTRAST REBUILD
───────────────────────────────────────────────────────────── */
export default function HeroSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { mass: 0.2, stiffness: 80, damping: 25 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // High displacement parallax rates for maximum motion effect
  const videoY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const videoScale = useTransform(smoothProgress, [0, 1], [1.0, 1.15]);
  const backgroundElementsY = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0]);

  const trustChips = useMemo(() => [
    "Incorporated 2023",
    "Private Ltd by Shares",
    "10+ Years Experience"
  ], []);

  const statsData = useMemo(() => [
    { num: "10+", label: "Years Active" },
    { num: "50+", label: "Global Buyers" },
    { num: "8+", label: "Metal Categories" },
    { num: "4+", label: "Countries Served" },
  ], []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#09090b] pt-40 pb-20 md:pt-52 md:pb-28"
      aria-label="Hero Section"
    >
      {/* DEEP BASE LAYER: Video Engine */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: videoY, scale: videoScale }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-20 object-center"
        >
          <source src="/header-vid.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Fallback Graphic */}
      <motion.img
        src="/header-img.png"
        alt=""
        aria-hidden="true"
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 z-[1] w-full h-full object-cover opacity-5 object-center pointer-events-none will-change-transform"
      />

      {/* RE-ENGINEERED OVERLAY: Ink-black transparent background blend style */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-tr from-[#09090b] via-[#09090b]/90 to-transparent"
      />

      {/* MOUNTED BACKGROUND SYSTEM: Linked to motion vectors */}
      <motion.div
        aria-hidden="true"
        style={{ y: backgroundElementsY }}
        className="absolute inset-0 z-[3] pointer-events-none will-change-transform"
      >
        {/* Saturated Emerald Glow Vector */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_15%,var(--hero-glow),transparent)]" />

        {/* Tech Mesh Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--hero-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--hero-grid-color)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </motion.div>

      {/* Floating Particle Space Layer */}
      <ParticleCanvas />

      {/* ══ FOREGROUND VIEWPORT CONTENT ══ */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="wrap w-full px-6 sm:px-8 lg:px-12 relative z-[6] mb-auto will-change-transform"
      >
        {/* Gold Badge */}
        <motion.div
          className="tag-gold border inline-flex items-center gap-2 mb-7 backdrop-blur-md bg-amber-500/[0.04] border-amber-500/20 rounded-full py-1.5 px-4 text-xs font-semibold uppercase tracking-wider text-[--clr-gold]"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <span className="w-2 h-2 rounded-full shrink-0 bg-[var(--clr-gold)] animate-pulse" />
          Nigeria&apos;s Premier Metals Recycler
        </motion.div>

        {/* Headline - Part 1 */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            className="block m-0 text-white uppercase font-black tracking-tight font-[family:var(--font-display)] text-[clamp(2.6rem,8.5vw,7rem)] lg:text-[7.5rem] leading-[0.92]"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            MECHELIN
          </motion.h1>
        </div>

        {/* Headline - Part 2 */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="block m-0 uppercase font-black tracking-tight font-[family:var(--font-display)] text-[clamp(2.6rem,8.5vw,7rem)] lg:text-[7.5rem] leading-[0.92] text-[var(--clr-green-light)]"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
          >
            METALS
          </motion.h1>
        </div>

        {/* Loop Text Slider */}
        <motion.p
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/90 font-light mb-4 max-w-2xl font-[family:var(--font-body)] text-[clamp(1.1rem,2vw,1.4rem)] leading-snug"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        >
          Transforming <CycleWord /> into Global Industrial Value
        </motion.p>

        {/* Corporate Positioning Subcopy */}
        <motion.p
          className="text-slate-400 text-sm md:text-base leading-relaxed mb-12 max-w-xl font-light font-[family:var(--font-body)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
        >
          Leading integrated recycling and raw materials supply company in Nigeria —
          connecting industrial-grade metals to global manufacturing partners across
          China, South Korea, and India.
        </motion.p>

        {/* High-Contrast Action Terminal Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
        >
          <Link
            href="/products"
            className="btn btn-green shadow-[0_0_24px_rgba(22,163,74,0.2)] flex justify-center items-center font-bold tracking-wide"
          >
            Explore Materials <ArrowRight size={16} className="ml-1.5" />
          </Link>

          <Link
            href="#contact"
            className="inline-flex justify-center items-center gap-2 px-7 py-3.5 border-2 border-slate-700 bg-[#0d0d10] text-slate-100 font-bold text-sm rounded-md tracking-wide shadow-2xl hover:bg-[var(--clr-green)] hover:border-[var(--clr-green)] hover:text-white transition-all duration-200"
          >
            Get a Quote <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Metadata Compliance Anchors */}
        <motion.div
          className="flex flex-wrap gap-x-6 gap-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {trustChips.map((chip) => (
            <span
              key={chip}
              className="flex items-center gap-2 text-xs text-slate-500 font-medium font-[family:var(--font-body)]"
            >
              <CheckCircle size={14} className="text-[var(--clr-green-light)] shrink-0" />
              {chip}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── METRICS DASHBOARD RIBBON: Fully Raw & Transparent Content Overlay ── */}
      <div className="wrap w-full px-6 sm:px-8 lg:px-12 relative z-10 mt-16">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 md:gap-x-12 border-t border-slate-800/40 pt-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.85 // Kicks off beautifully right as the upper elements finish layout
              }
            }
          }}
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-left md:text-center group"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE }
                }
              }}
            >
              <p className="stat-num text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--clr-green)] leading-none font-[family:var(--font-display)] transition-transform duration-300 group-hover:translate-x-1 md:group-hover:translate-x-0 md:group-hover:-translate-y-1">
                {stat.num}
              </p>
              <p className="hero-stats-bar__label text-xs tracking-widest uppercase text-slate-400 mt-3 font-semibold font-[family:var(--font-body)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}