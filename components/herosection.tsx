"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronDown } from "lucide-react";

const CYCLE_WORDS = ["Aluminium", "Ferrous Metals", "Vehicle Scrap", "Non-Ferrous", "UBC Cans"];

/* ─────────────────────────────────────────────────────────────
   PARTICLE CANVAS
   style={} here is intentional — canvas must fill its absolute
   parent and inline is the only reliable cross-browser way.
───────────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    // reads CSS vars so changing --hero-particle-* in globals.css updates particles
    const getVar = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.8 + 0.7,
      alpha: Math.random() * 0.5 + 0.15,
      colorIndex: Math.floor(Math.random() * 3),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = [getVar("--hero-particle-green"), getVar("--hero-particle-blue"), getVar("--hero-particle-muted")];

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 125) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34,197,94,${(0.13 * (1 - d / 125)).toFixed(3)})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;  if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = (colors[p.colorIndex] || "#22c55e") + Math.round(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // style here: canvas MUST be absolute + full-size, this is reliable across browsers
  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 4, pointerEvents: "none" }} />;
}

/* ─────────────────────────────────────────────────────────────
   CYCLING WORD
───────────────────────────────────────────────────────────── */
function CycleWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % CYCLE_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    // min-w keeps layout stable as words change length
    <span className="inline-block" style={{ minWidth: "7ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          // style here: CSS variable — can't use Tailwind for var(--clr-gold)
          style={{ color: "var(--clr-gold)" }}
          className="inline-block font-semibold"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          exit={{   opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.38 }}
        >
          {CYCLE_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  // style here: Framer Motion dynamic transform — must be inline
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <>
      <section ref={sectionRef} className="hero" aria-label="Hero">

        {/* Video — style.y is a Framer Motion MotionValue, must stay inline */}
        <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
          <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover opacity-30">
            <source src="/header-vid.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Static image fallback */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/header-img.png" alt="" aria-hidden="true" className="absolute inset-0 z-[1] w-full h-full object-cover opacity-15" />

        {/* Dark cinematic overlay
            style here: references two CSS variables — no Tailwind equivalent */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2]"
          style={{ background: "linear-gradient(108deg, var(--hero-overlay-from) 0%, var(--hero-overlay-from) 38%, var(--hero-overlay-to) 100%)" }}
        />

        {/* Green radial glow
            style here: CSS variable inside radial-gradient — not expressible in Tailwind */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 55% at 75% 10%, var(--hero-glow), transparent)" }}
        />

        {/* Industrial grid texture
            style here: CSS variable for line colour inside a repeating gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(var(--hero-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid-color) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Particles */}
        <ParticleCanvas />

        {/* Bottom fade into next section
            style here: var(--bg) is the CSS variable for the page background colour */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-40 z-[5] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
        />

        {/* ══ CONTENT ══ */}
        <div className="wrap px-5 relative z-[6] pt-28 pb-24 w-full">

          {/* Badge */}
          <motion.div
            className="tag-gold border inline-flex items-center gap-2 mb-7 backdrop-blur-sm"
            style={{ background: "rgba(245,158,11,0.07)", borderColor: "rgba(245,158,11,0.3)" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {/* style here: animation keyframe on a tiny dot — simpler than a Tailwind custom animation */}
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--clr-gold)", animation: "pulse 2s ease-in-out infinite" }} />
            Nigeria&apos;s Premier Metals Recycler
          </motion.div>

          {/* H1 line 1 — overflow:hidden clips the slide-up reveal */}
          <div className="overflow-hidden leading-none mb-0.5">
            <motion.h1
              className="block m-0 text-white uppercase"
              style={{
                fontFamily: "var(--font-display)",          // CSS var — must be inline
                fontSize: "clamp(3.6rem, 9.5vw, 8rem)",    // clamp — no Tailwind equivalent
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: "0.025em",
              }}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              MECHELIN
            </motion.h1>
          </div>

          {/* H1 line 2 — green accent */}
          <div className="overflow-hidden leading-none mb-6">
            <motion.h1
              className="block m-0 uppercase"
              style={{
                fontFamily: "var(--font-display)",          // CSS var — must be inline
                fontSize: "clamp(3.6rem, 9.5vw, 8rem)",    // clamp — no Tailwind equivalent
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: "0.025em",
                color: "var(--clr-green-light)",            // CSS var — must be inline
              }}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.33, ease: EASE }}
            >
              METALS
            </motion.h1>
          </div>

          {/* Cycling subtitle */}
          <motion.p
            className="flex flex-wrap items-center gap-1 text-white/60 font-light mb-3 max-w-[580px]"
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2.2vw, 1.3rem)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          >
            Transforming&nbsp;<CycleWord />&nbsp;into Global Industrial Value
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-white/40 text-sm leading-relaxed mb-10 max-w-[520px]"
            style={{ fontFamily: "var(--font-body)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
          >
            Leading integrated recycling and raw materials supply company in Nigeria —
            connecting industrial-grade metals to global manufacturing partners across
            China, South Korea, and India.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 mb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
          >
            <Link
              href="/products"
              className="btn btn-green"
              style={{ boxShadow: "0 0 28px rgba(22,163,74,0.35)" }}
            >
              Explore Materials <ArrowRight size={15} />
            </Link>
            <Link
              href="#contact"
              className="btn btn-outline backdrop-blur-sm"
              style={{
                borderColor: "rgba(255,255,255,0.22)",
                color: "rgba(255,255,255,0.78)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              Get a Quote <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Trust chips */}
          <motion.div
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.95 }}
          >
            {["Incorporated 2023", "Private Ltd by Shares", "10+ Years Experience"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-xs text-white/40" style={{ fontFamily: "var(--font-body)" }}>
                <CheckCircle size={13} style={{ color: "var(--clr-green-light)" }} className="shrink-0" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[7] flex flex-col items-center gap-1.5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.2em] text-white/25"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Scroll
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
            <ChevronDown size={18} className="text-green-500/50" />
          </motion.div>
        </motion.div>

      </section>

      {/* ── Stats bar ── */}
      <div className="hero-stats-bar">
        {[
          { num: "10+", label: "Years Active" },
          { num: "50+", label: "Global Buyers" },
          { num: "8+",  label: "Metal Categories" },
          { num: "4+",  label: "Countries Served" },
        ].map((s) => (
          <div key={s.label} className="hero-stats-bar__item">
            <p className="stat-num">{s.num}</p>
            <p className="hero-stats-bar__label">{s.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}