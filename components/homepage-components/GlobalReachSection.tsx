"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Globe, ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function GlobalReachSection(): React.JSX.Element {
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const countries = useMemo(() => [
    {
      code: "NG",
      name: "Nigeria",
      flagUrl: "https://flagcdn.com/w160/ng.png",
      coordinates: { x: 510, y: 250 },
      desc: "Headquarters & sourcing infrastructure across active industrial collection zones in Anambra, Lagos, and Port Harcourt."
    },
    {
      code: "CN",
      name: "China",
      flagUrl: "https://flagcdn.com/w160/cn.png",
      coordinates: { x: 730, y: 120 },
      desc: "Primary industrial destination — delivering certified aluminium, ferrous profiles, and mixed scrap directly to large-scale smelting plants."
    },
    {
      code: "KR",
      name: "South Korea",
      flagUrl: "https://flagcdn.com/w160/kr.png",
      coordinates: { x: 790, y: 110 },
      desc: "Premium grade heavy steel and specialty foundry casting components supplied consistently to corporate manufacturing hubs."
    },
    {
      code: "IN",
      name: "India",
      flagUrl: "https://flagcdn.com/w160/in.png",
      coordinates: { x: 660, y: 160 },
      desc: "High-purity non-ferrous and structured shredder scrap exports supporting growing national automotive and infrastructure pipelines."
    }
  ], []);

  return (
    <section 
      id="customers" 
      className="w-full bg-[var(--bg-main)] text-[var(--tx-primary)] py-20 md:py-32 overflow-hidden relative select-none"
      aria-label="Global Trade Networks"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col items-start text-left mb-16 max-w-3xl space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-600/10 bg-emerald-50/70 text-[var(--clr-green)] text-[10px] font-bold tracking-wider uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Globe size={12} className={activeCode ? "animate-spin-slow" : ""} />
            Logistics &amp; Distribution
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-wider text-[var(--tx-primary)] leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            OUR <span className="text-[var(--clr-green)]">GLOBAL CUSTOMERS.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[var(--tx-secondary)] text-sm md:text-base leading-relaxed font-normal max-w-2xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Facilitating heavy industrial metal distribution channels out of West Africa directly into primary processing centers across China, South Korea, and India.
          </motion.p>
        </div>

        {/* ── HIGH-END LIGHT MODE VECTOR MAP WORKSPACE ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="hidden bg-slate-50/40 border border-slate-200/60 rounded-2xl p-6 md:p-12 mb-20 items-center justify-center relative overflow-hidden shadow-sm backdrop-blur-sm"
          // className="w-full bg-slate-50/40 border border-slate-200/60 rounded-2xl p-6 md:p-12 mb-20 flex items-center justify-center relative overflow-hidden shadow-sm backdrop-blur-sm"
        >
          {/* Technical Grid Accent Overlay */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <svg 
            className="w-full h-auto max-w-[860px] relative z-10" 
            viewBox="0 0 1000 500" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* CONTINENT HIGH-CONTRAST LIGHT LAYER */}
            <g className="stroke-slate-200/70 stroke-[1.2]">
              {/* Africa / Nigeria Region */}
              <path 
                className={`transition-all duration-500 ease-out ${activeCode === "NG" ? "fill-emerald-50/80 stroke-emerald-500/30" : "fill-slate-100/90"}`}
                d="M460 180 Q480 160 510 165 Q540 150 555 170 Q575 175 570 220 Q580 260 560 300 Q550 340 530 360 Q510 380 490 370 Q470 360 450 340 Q430 310 435 280 Q430 240 440 210 Z" 
              />
              {/* Madagascar / Minor Africa Elements */}
              <path className="fill-slate-100/90" d="M460 80 Q490 60 520 70 Q545 65 550 85 Q560 100 545 115 Q530 125 510 120 Q490 130 475 120 Q455 110 460 80 Z" />
              {/* Eurasia / China, India, Korea Regions */}
              <path 
                className={`transition-all duration-500 ease-out ${activeCode && activeCode !== "NG" ? "fill-emerald-50/50 stroke-emerald-500/20" : "fill-slate-100/90"}`}
                d="M560 60 Q620 40 700 50 Q760 45 800 70 Q840 80 830 120 Q820 160 790 175 Q750 190 710 180 Q670 185 640 170 Q605 160 575 150 Q550 135 555 105 Q555 80 560 60 Z" 
              />
              {/* Other Static Continents */}
              <path className="fill-slate-100/50 stroke-slate-200/40" d="M180 80 Q210 60 240 75 Q265 70 270 100 Q280 130 260 160 Q250 190 240 220 Q230 250 215 270 Q200 285 190 265 Q175 240 170 210 Q160 180 155 155 Q145 125 155 100 Z" />
              <path className="fill-slate-100/50 stroke-slate-200/40" d="M760 280 Q800 270 830 280 Q855 285 850 310 Q845 335 815 340 Q785 345 770 325 Q750 305 760 280 Z" />
              <path className="fill-slate-100/50 stroke-slate-200/40" d="M215 270 Q235 260 255 275 Q265 295 260 325 Q255 355 240 375 Q225 385 210 370 Q195 350 195 320 Q190 295 215 270 Z" />
            </g>

            {/* DYNAMIC SHIELDING FLUID FREIGHT ROUTES */}
            {countries.slice(1).map((c) => {
              const isRouteActive = activeCode === "NG" || activeCode === c.code;
              return (
                <g key={`route-${c.code}`}>
                  {/* Underlay constant line */}
                  <line 
                    x1="510" y1="250" 
                    x2={c.coordinates.x} y2={c.coordinates.y} 
                    className="stroke-slate-200 stroke-[1.5]"
                  />
                  {/* Glowing dynamic path */}
                  <motion.line 
                    initial={{ strokeDashoffset: 40, opacity: 0 }}
                    animate={isRouteActive ? { strokeDashoffset: 0, opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1.2, ease: "linear" }}
                    x1="510" y1="250" 
                    x2={c.coordinates.x} y2={c.coordinates.y} 
                    className="stroke-[var(--clr-green)] stroke-[2]" 
                    strokeDasharray="6,4" 
                  />
                </g>
              );
            })}

            {/* PULSING GEO-COORDINATE HUBS */}
            {/* Primary Center: Nigeria */}
            <g className="cursor-pointer" onMouseEnter={() => setActiveCode("NG")} onMouseLeave={() => setActiveCode(null)}>
              <circle cx="510" cy="250" r="6" className="fill-[var(--clr-green)]" />
              <circle cx="510" cy="250" r="15" className={`fill-[var(--clr-green)]/20 transition-transform duration-300 ${activeCode === "NG" ? "scale-125 animate-pulse" : "animate-ping"}`} />
            </g>
            
            {/* Global Target Node Loops */}
            {countries.slice(1).map((c) => {
              const isTargeted = activeCode === c.code;
              return (
                <g 
                  key={`node-${c.code}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveCode(c.code)}
                  onMouseLeave={() => setActiveCode(null)}
                >
                  <circle cx={c.coordinates.x} cy={c.coordinates.y} r="4.5" className={`transition-colors duration-300 ${isTargeted ? "fill-emerald-600" : "fill-slate-600"}`} />
                  {isTargeted && <circle cx={c.coordinates.x} cy={c.coordinates.y} r="12" className="fill-emerald-600/20 animate-pulse" />}
                </g>
              );
            })}

            {/* GEOGRAPHIC TYPOGRAPHY MATRIX */}
            <text x="510" y="278" textAnchor="middle" className={`text-[11px] font-black tracking-wider uppercase transition-colors duration-300 ${activeCode === "NG" ? "fill-emerald-800" : "fill-[var(--tx-primary)]"}`} style={{ fontFamily: "var(--font-body)" }}>Nigeria</text>
            <text x="730" y="142" textAnchor="middle" className={`text-[10px] font-bold transition-colors duration-300 ${activeCode === "CN" ? "fill-emerald-700 font-extrabold" : "fill-[var(--tx-muted)]"}`} style={{ fontFamily: "var(--font-body)" }}>China</text>
            <text x="790" y="94" textAnchor="middle" className={`text-[10px] font-bold transition-colors duration-300 ${activeCode === "KR" ? "fill-emerald-700 font-extrabold" : "fill-[var(--tx-muted)]"}`} style={{ fontFamily: "var(--font-body)" }}>S. Korea</text>
            <text x="660" y="182" textAnchor="middle" className={`text-[10px] font-bold transition-colors duration-300 ${activeCode === "IN" ? "fill-emerald-700 font-extrabold" : "fill-[var(--tx-muted)]"}`} style={{ fontFamily: "var(--font-body)" }}>India</text>
          </svg>
        </motion.div>

        {/* ── INTEGRATED DATA ALIGNMENT ROW (Fluid & Premium Interactive) ── */}
        <div className="border-t border-slate-200/60 pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {countries.map((country, idx) => {
            const isHovered = activeCode === country.code;
            
            return (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: idx * 0.05 }}
                onMouseEnter={() => setActiveCode(country.code)}
                onMouseLeave={() => setActiveCode(null)}
                className="flex flex-col items-start text-left relative pl-4 group cursor-pointer"
              >
                {/* Micro Sliding Left Accent Accent Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-[var(--clr-green)] transition-all duration-300 origin-bottom
                  ${isHovered ? "scale-y-100 opacity-100" : "scale-y-25 opacity-40 group-hover:opacity-70"}
                `} />

                  {/* Flag Asset Frame */}
                <div className="w-9 h-6 rounded border border-slate-200/80 overflow-hidden bg-slate-50 mb-4 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src={country.flagUrl} 
                    alt={`${country.name} National Flag`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Title Matrix */}
                <h4 
                  className="text-lg font-extrabold tracking-wider text-[var(--tx-primary)] mb-2 flex items-center gap-1 transition-colors duration-200 group-hover:text-emerald-800"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {country.name}
                  <ArrowUpRight size={14} className={`text-slate-300 transition-all duration-300 ${isHovered ? "text-emerald-600 translate-x-0.5 -translate-y-0.5" : "group-hover:text-slate-400"}`} />
                </h4>
                
                {/* Description */}
                <p 
                  className="text-[var(--tx-secondary)] text-xs md:text-sm leading-relaxed font-normal m-0 transition-colors duration-300 group-hover:text-slate-700"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {country.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}