"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const MATERIALS = [
  {
    id: 1,
    category: "Non-Ferrous",
    name: "Aluminum",
    desc: "High-purity aluminum scrap ideal for smelting and reprocessing. Available in various grades including 6061 and 6063.",
    img: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=700&q=80",
    accent: "#16a34a",
  },
  {
    id: 2,
    category: "Non-Ferrous",
    name: "Cast Aluminum",
    desc: "Engine blocks, transmission housings, and industrial cast aluminum components for remelting into new alloy products.",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80",
    accent: "#16a34a",
  },
  {
    id: 3,
    category: "Ferrous",
    name: "Iron & Steel",
    desc: "Heavy melting scrap (HMS 1&2), shredded steel, and structural iron for electric arc furnaces and foundry use.",
    img: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=700&q=80",
    accent: "#b45309",
  },
  {
    id: 4,
    category: "Industrial",
    name: "Condenser",
    desc: "Air-conditioning and refrigeration condensers with high copper-aluminum content for efficient material recovery.",
    img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=700&q=80",
    accent: "#0369a1",
  },
  {
    id: 5,
    category: "Non-Ferrous",
    name: "UBC Cans",
    desc: "Baled used beverage cans — one of the most recycled aluminum products globally, ideal for remelting into new sheet material.",
    img: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=700&q=80",
    accent: "#16a34a",
  },
  {
    id: 6,
    category: "Ferrous",
    name: "Ferrous Metals",
    desc: "Comprehensive range of iron-based scrap including structural steel, rebar, plate steel, and industrial equipment scrap.",
    img: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=700&q=80",
    accent: "#b45309",
  },
  {
    id: 7,
    category: "Non-Ferrous",
    name: "Non-Ferrous Metals",
    desc: "Copper, brass, bronze, lead, and zinc in various forms — wires, pipes, fittings, and sheets — ready for processing.",
    img: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=700&q=80",
    accent: "#16a34a",
  },
  {
    id: 8,
    category: "Auto Scrap",
    name: "Vehicle Scrap",
    desc: "End-of-life vehicles stripped and processed — engine blocks, body panels, axles, and mixed metal recovery from automotive sources.",
    img: "https://images.unsplash.com/photo-1584467735871-8e9cb4573e6f?w=700&q=80",
    accent: "#7c3aed",
  },
];

/* ─────────────────────────────────────────────────────────────
   CATEGORY ACCENT COLOUR MAP
───────────────────────────────────────────────────────────── */
const CATEGORY_STYLE: Record<string, { color: string; bg: string }> = {
  "Non-Ferrous": { color: "#16a34a", bg: "rgba(22,163,74,0.08)"  },
  "Ferrous":     { color: "#b45309", bg: "rgba(180,83,9,0.07)"   },
  "Industrial":  { color: "#0369a1", bg: "rgba(3,105,161,0.07)"  },
  "Auto Scrap":  { color: "#7c3aed", bg: "rgba(124,58,237,0.07)" },
};

/* ─────────────────────────────────────────────────────────────
   TILT CARD — magnetic 3-D hover tilt
───────────────────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref   = useRef<HTMLDivElement>(null);
  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const rotX  = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]),   { stiffness: 300, damping: 30 });
  const rotY  = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]),   { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el   = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rotX, rotateY: rotY, scale, transformStyle: "preserve-3d", transformPerspective: 800 }}
      onMouseMove={handleMove}
      onMouseEnter={() => scale.set(1.02)}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); scale.set(1); }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────────────────────── */
function MaterialCard({ item, index }: { item: typeof MATERIALS[0]; index: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const cat    = CATEGORY_STYLE[item.category] ?? CATEGORY_STYLE["Non-Ferrous"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard>
        <div
          className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            boxShadow: hovered
              ? `0 20px 60px rgba(15,23,42,0.12), 0 0 0 1px ${cat.color}22`
              : "0 4px 24px rgba(15,23,42,0.05)",
            transition: "box-shadow 0.35s ease",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* ── Image ── */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image
              src={item.img}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out"
              style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
            />

            {/* Gradient scrim — intensifies on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-400"
              style={{
                background: `linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.55) 100%)`,
                opacity: hovered ? 1 : 0.6,
              }}
            />

            {/* Category pill — top-left, floats over image */}
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{
                background: cat.bg,
                color: cat.color,
                backdropFilter: "blur(8px)",
                border: `1px solid ${cat.color}22`,
              }}
            >
              {item.category}
            </div>

            {/* Hover arrow — top-right corner */}
            <motion.div
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--bg-surface)" }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.22 }}
            >
              <ArrowUpRight size={14} style={{ color: "var(--tx-primary)" }} />
            </motion.div>
          </div>

          {/* ── Content ── */}
          <div className="flex flex-col flex-1 p-5 gap-2">
            <h3
              className="font-bold text-lg leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--tx-primary)",
              }}
            >
              {item.name}
            </h3>

            <p
              className="text-sm leading-relaxed flex-1"
              style={{ color: "var(--tx-secondary)" }}
            >
              {item.desc}
            </p>

            {/* Enquire link — slides in on hover */}
            <div className="overflow-hidden h-7 mt-1">
              <motion.div
                initial={{ y: "110%" }}
                animate={hovered ? { y: 0 } : { y: "110%" }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: cat.color }}
                >
                  Request Quote
                  <ArrowRight size={12} />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom accent line — grows on hover */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ background: cat.color }}
            initial={{ width: "0%" }}
            animate={hovered ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────── */
export default function MaterialsSection() {
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="products"
      className="w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-subtle)" }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(var(--tx-primary) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">

        {/* ══ HEADER ══ */}
        <motion.div
          ref={headerRef}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="tag mb-4">Product Catalogue</p>
            <h2
              className="leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "var(--tx-primary)",
              }}
            >
              Our{" "}
              <span style={{ color: "var(--clr-green)" }}>
                Materials
              </span>{" "}
              &amp;{" "}
              <span style={{ color: "var(--clr-green)" }}>
                Metals
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 md:items-end"
          >
            <p
              className="text-sm leading-relaxed md:text-right max-w-xs"
              style={{ color: "var(--tx-muted)" }}
            >
              Premium-grade recyclable metals sourced, processed, and ready for industrial use.
            </p>
            <Link href="#contact" className="btn btn-green self-start md:self-auto">
              Request a Quote <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* ══ GRID ══ */}
        {/*
          Layout mirrors the screenshot:
          - Row 1: 4 equal columns
          - Row 2: 4 equal columns
          On tablet: 2 columns
          On mobile: 1 column
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MATERIALS.map((item, i) => (
            <MaterialCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ══ BOTTOM CTA STRIP ══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl px-7 py-6"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div>
            <p className="font-bold text-base" style={{ color: "var(--tx-primary)", fontFamily: "var(--font-display)" }}>
              Can&apos;t find what you&apos;re looking for?
            </p>
            <p className="text-sm mt-0.5" style={{ color: "var(--tx-muted)" }}>
              We source and process a wide range of industrial metals on request.
            </p>
          </div>
          <Link href="#contact" className="btn btn-green shrink-0">
            Talk to Our Team <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}