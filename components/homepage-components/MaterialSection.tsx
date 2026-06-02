"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   TILT CARD
───────────────────────────────────────────── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]));

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CARD
───────────────────────────────────────────── */
function MaterialCard({ item }: { item: (typeof MATERIALS)[0] }) {
  return (
    <TiltCard>
      <div
        className="
          group relative rounded-2xl overflow-hidden
          bg-white border border-slate-100
          shadow-sm hover:shadow-xl
          transition-all duration-300
          min-w-[260px] sm:min-w-0
        "
      >
        {/* IMAGE */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.img}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          {/* badge */}
          <div
            className="absolute top-3 left-3 text-[10px] font-bold uppercase px-2 py-1 rounded-md"
            style={{
              background: "rgba(255,255,255,0.9)",
              color: item.accent,
            }}
          >
            {item.category}
          </div>

          {/* icon (cleaner + mature) */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <ArrowUpRight size={14} className="text-slate-900" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <h3 className="font-bold text-slate-900 tracking-wider">{item.name}</h3>

          <p className="text-sm text-slate-500 mt-1 line-clamp-2 ">
            {item.desc}
          </p>

          {/* ── UPDATED BUTTON (MATURE UX) ── */}
          <Link
            href="/products"
            className="
              mt-4 w-full flex items-center justify-between
              px-4 py-2.5 rounded-xl
              bg-[var(--bg-surface)] border border-slate-200
              text-slate-900 text-sm font-semibold
              transition-all duration-300
              hover:border-emerald-200 hover:shadow-md
              group/btn
            "
          >
            <span>Browse All Materials</span>

            <span
              className="
                w-8 h-8 rounded-lg flex items-center justify-center
                bg-emerald-50 text-emerald-600
                group-hover/btn:bg-emerald-600 group-hover/btn:text-white
                transition-all duration-300
              "
            >
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
export default function MaterialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-14 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-wider text-[var(--tx-primary)] leading-[1.05]"
          >
            Our <span className="text-[var(--clr-green)]">Products</span>
          </h2>
        </motion.div>

        {/* DESKTOP GRID */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {MATERIALS.map((item) => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>

        {/* MOBILE CAROUSEL (FASTER + SMOOTHER UX) */}
        <div
          className="
            sm:hidden flex gap-4 overflow-x-auto
            snap-x snap-mandatory pb-4
            scroll-smooth
          "
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {MATERIALS.map((item) => (
            <div key={item.id} className="snap-start min-w-[85%]">
              <MaterialCard item={item} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 rounded-xl bg-white border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="font-bold text-slate-900">
              Need custom sourcing?
            </p>
            <p className="text-sm text-slate-500">
              We supply industrial-grade metals on demand.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-5 py-3 bg-emerald-600 text-white rounded-lg text-sm font-semibold"
          >
            Get Quote
          </Link>
        </div>

      </div>
    </section>
  );
}