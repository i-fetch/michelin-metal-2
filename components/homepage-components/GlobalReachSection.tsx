"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const INTERACTION_EASE = [0.25, 1, 0.5, 1] as const;

export default function GlobalReachSection(): React.JSX.Element {
  const countries = useMemo(() => [
    {
      code: "NG",
      name: "Nigeria",
      flagUrl: "https://flagcdn.com/w160/ng.png", // Direct high-quality flag asset link
      desc: "Headquarters & sourcing operations across Anambra, Lagos, and Port Harcourt industrial zones."
    },
    {
      code: "CN",
      name: "China",
      flagUrl: "https://flagcdn.com/w160/cn.png",
      desc: "Primary export destination — supplying aluminum, ferrous metals, and mixed scrap to major smelters."
    },
    {
      code: "KR",
      name: "South Korea",
      flagUrl: "https://flagcdn.com/w160/kr.png",
      desc: "Premium steel and specialty metals supplied to South Korean industrial manufacturers and foundries."
    },
    {
      code: "IN",
      name: "India",
      flagUrl: "https://flagcdn.com/w160/in.png",
      desc: "Non-ferrous and aluminum scrap exports to India's growing manufacturing and construction sectors."
    }
  ], []);

  return (
    <section 
      id="customers" 
      className="w-full bg-[#11141a] text-white py-20 md:py-28 overflow-hidden border-t border-white/[0.02]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ══ HEADER ELEMENT CONTAINER (Left-Aligned per Layout) ══ */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-14 space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: INTERACTION_EASE }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/5 text-[#22c55e] text-[11px] font-bold tracking-widest uppercase font-[family:var(--font-mono)]"
          >
            <Globe size={12} className="text-[#22c55e]" />
            International Reach
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: INTERACTION_EASE, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight font-[family:var(--font-display)]"
          >
            Our <span className="text-[#22c55e]">Global Customers</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-2xl font-[family:var(--font-body)] text-slate-400 font-normal text-sm md:text-base tracking-wide"
          >
            Serving industrial clients and manufacturing partners across Nigeria, China, South Korea, and India.
          </motion.p>
        </div>

        {/* ══ MAP CONTROLLER WORKSPACE (Deeper Segment Container) ══ */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: INTERACTION_EASE }}
          className="w-full bg-[#161922] border border-white/[0.04] rounded-2xl p-6 md:p-12 mb-12 flex items-center justify-center relative overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]"
        >
          {/* Subtle global gradient backing within map wrapper */}
          <div className="absolute inset-0 bg-radial-gradient from-emerald-500/[0.01] to-transparent pointer-events-none" />

          <svg 
            className="w-full h-auto max-w-[900px] relative z-10 select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]" 
            viewBox="0 0 1000 500" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* CONTINENTS */}
            <path className="fill-[#2a303d] transition-colors duration-500 hover:fill-[#313949]" d="M460 180 Q480 160 510 165 Q540 150 555 170 Q575 175 570 220 Q580 260 560 300 Q550 340 530 360 Q510 380 490 370 Q470 360 450 340 Q430 310 435 280 Q430 240 440 210 Z" />
            <path className="fill-[#2a303d]" d="M460 80 Q490 60 520 70 Q545 65 550 85 Q560 100 545 115 Q530 125 510 120 Q490 130 475 120 Q455 110 460 80 Z" />
            <path className="fill-[#2a303d] transition-colors duration-500 hover:fill-[#313949]" d="M560 60 Q620 40 700 50 Q760 45 800 70 Q840 80 830 120 Q820 160 790 175 Q750 190 710 180 Q670 185 640 170 Q605 160 575 150 Q550 135 555 105 Q555 80 560 60 Z" />
            <path className="fill-[#2a303d]" d="M180 80 Q210 60 240 75 Q265 70 270 100 Q280 130 260 160 Q250 190 240 220 Q230 250 215 270 Q200 285 190 265 Q175 240 170 210 Q160 180 155 155 Q145 125 155 100 Z" />
            <path className="fill-[#2a303d]" d="M760 280 Q800 270 830 280 Q855 285 850 310 Q845 335 815 340 Q785 345 770 325 Q750 305 760 280 Z" />
            <path className="fill-[#2a303d]" d="M215 270 Q235 260 255 275 Q265 295 260 325 Q255 355 240 375 Q225 385 210 370 Q195 350 195 320 Q190 295 215 270 Z" />

            {/* DYNAMIC CONNECTOR PATH VECTORS */}
            <motion.line 
              initial={{ strokeDashoffset: 40, opacity: 0 }}
              whileInView={{ strokeDashoffset: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "linear", delay: 0.4 }}
              x1="510" y1="250" x2="730" y2="120" 
              className="stroke-[#22c55e]/50 stroke-[1.5]" 
              strokeDasharray="6,4" 
            />
            <motion.line 
              initial={{ strokeDashoffset: 40, opacity: 0 }}
              whileInView={{ strokeDashoffset: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "linear", delay: 0.5 }}
              x1="510" y1="250" x2="790" y2="110" 
              className="stroke-[#22c55e]/50 stroke-[1.5]" 
              strokeDasharray="6,4" 
            />
            <motion.line 
              initial={{ strokeDashoffset: 40, opacity: 0 }}
              whileInView={{ strokeDashoffset: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "linear", delay: 0.6 }}
              x1="510" y1="250" x2="660" y2="160" 
              className="stroke-[#22c55e]/50 stroke-[1.5]" 
              strokeDasharray="6,4" 
            />

            {/* RADAR HUB DOTS */}
            {/* Origin Core: Nigeria */}
            <circle cx="510" cy="250" r="7" className="fill-[#22c55e]" />
            <circle cx="510" cy="250" r="14" className="fill-[#22c55e]/20 animate-ping [animation-duration:2.5s]" />
            
            {/* Target Ports */}
            <circle cx="730" cy="120" r="5" className="fill-[#3b82f6]" />
            <circle cx="790" cy="110" r="5" className="fill-[#3b82f6]" />
            <circle cx="660" cy="160" r="5" className="fill-[#3b82f6]" />

            {/* MAP TYPOGRAPHY ANCHORS */}
            <text x="510" y="278" textAnchor="middle" className="fill-white text-[11px] font-bold font-[family:var(--font-mono)] tracking-wide">Nigeria</text>
            <text x="730" y="142" textAnchor="middle" className="fill-slate-400 text-[10px] font-medium font-[family:var(--font-sans)]">China</text>
            <text x="790" y="94" textAnchor="middle" className="fill-slate-400 text-[10px] font-medium font-[family:var(--font-sans)]">S. Korea</text>
            <text x="660" y="182" textAnchor="middle" className="fill-slate-400 text-[10px] font-medium font-[family:var(--font-sans)]">India</text>
          </svg>
        </motion.div>

        {/* ══ COUNTRY INFORMATION MATRIX CARD CANVAS ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {countries.map((country, idx) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, ease: INTERACTION_EASE, delay: idx * 0.05 }}
              whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(26,31,44,0.6)" }}
              className="bg-[#1a1f2c]/30 border border-white/[0.03] rounded-xl p-6 flex flex-col items-start justify-start transition-all duration-300"
            >
              {/* IMAGE FLAG FRAME HOLDER */}
              <div className="w-12 h-8 rounded border border-white/[0.08] overflow-hidden bg-slate-900 mb-4 shadow-sm flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={country.flagUrl} 
                  alt={`${country.name} National Flag`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <h4 className="text-base font-bold tracking-tight text-white mb-2 font-[family:var(--font-display)]">
                {country.name}
              </h4>
              <p className="text-slate-400 font-normal text-xs leading-relaxed font-[family:var(--font-body)]">
                {country.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}