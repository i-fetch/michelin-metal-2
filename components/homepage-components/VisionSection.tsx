// app/components/VisionSectionDarkPreview.tsx
"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Globe2, 
  FlaskConical, 
  Recycle, 
  Sprout, 
  Zap, 
  Award 
} from "lucide-react";

const PREMIUM_EASE = [0.25, 1, 0.5, 1] as const;

export default function VisionSectionDarkPreview(): React.JSX.Element {
  const cards = useMemo(() => [
    {
      icon: Globe2,
      tag: "PRIMARY VISION",
      title: "Global Leadership in Sustainable Metals",
      desc: "To become the leading provider of sustainable metals recycling solutions on the global stage, driving the circular economy through innovation, safety, and superior material recovery.",
      themeColorClass: "text-[#22c55e]", // --clr-green-light
      iconWrapper: "bg-[#16a34a]/10 text-[#22c55e] group-hover:bg-[#16a34a]/20"
    },
    {
      icon: FlaskConical,
      tag: "INNOVATION VISION",
      title: "Revolutionizing Metal Recycling",
      desc: "To revolutionize metal recycling by turning waste into high-quality raw materials through technological innovation and sustainable practices that meet international standards.",
      themeColorClass: "text-[#22c55e]", 
      iconWrapper: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20"
    },
    {
      icon: Recycle,
      tag: "MOTTO",
      title: '"Transform Waste Into Valuable Resources"',
      desc: "Every piece of scrap metal holds industrial value. We extract that value and redirect it into the global manufacturing chain.",
      themeColorClass: "text-blue-400",
      iconWrapper: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20"
    },
    {
      icon: Sprout,
      tag: "MOTTO",
      title: '"Revive Nature Through Recycling"',
      desc: "Our operations are rooted in environmental stewardship — protecting ecosystems by diverting industrial waste from landfills into productive cycles.",
      themeColorClass: "text-blue-400",
      iconWrapper: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20"
    },
    {
      icon: Zap,
      tag: "MOTTO",
      title: '"Promote Green Energy Through Waste Elimination"',
      desc: "We champion a future where industrial waste becomes the fuel for green energy and a cleaner, more resource-efficient world.",
      themeColorClass: "text-blue-400",
      iconWrapper: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20"
    },
    {
      icon: Award,
      tag: "CORE VALUE",
      title: "Integrity. Quality. Partnership.",
      desc: "We build lasting relationships with clients through transparent dealings, consistent quality control, and reliable delivery schedules.",
      themeColorClass: "text-[#22c55e]", 
      iconWrapper: "bg-[#f59e0b]/10 text-[#f59e0b] group-hover:bg-[#f59e0b]/20"
    }
  ], []);

  return (
    <section 
      id="vision" 
      // Mapped exactly to your cinematic dark layout token: --bg-2 (#11141a) & --tx-primary (#fafafa)
      className="w-full bg-[#11141a] text-[#fafafa] py-16 md:py-24 border-t border-[rgba(255,255,255,0.04)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ══ HEADER ══ */}
        <div className="mb-12 md:mb-16 max-w-3xl flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-sans text-[#fafafa]">
            Vision &amp; <span className="text-[#22c55e]">Motto</span>
          </h2>
          {/* Mapped exactly to --tx-muted (#a1a1aa) */}
          <p className="text-[#a1a1aa] font-normal text-sm md:text-base tracking-wide">
            Guiding principles that drive every ton of material we process.
          </p>
        </div>

        {/* ══ GRID CANVAS ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: PREMIUM_EASE, delay: index * 0.04 }}
                whileHover={{ 
                  y: -4,
                  scale: 1.01
                }}
                // Card Default Base: bg-surface (#1a1f26) & border (rgba(255,255,255,0.04))
                // Card Hover Base: bg-surface-2 (#222933) & border-strong (rgba(255,255,255,0.10))
                // Shadow Mapped exactly to --shadow-sm
                className="bg-[#1a1f26] border border-[rgba(255,255,255,0.04)] rounded-xl p-8 flex flex-col justify-start min-h-[300px] cursor-pointer group hover:bg-[#222933] hover:border-[rgba(255,255,255,0.10)] shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all duration-300"
              >
                {/* Icon Wrapper */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105 ${card.iconWrapper}`}>
                  <IconComponent size={20} strokeWidth={2} />
                </div>

                {/* Categorization Tag */}
                <span className={`text-[11px] font-bold tracking-widest block mb-3 uppercase ${card.themeColorClass}`}>
                  {card.tag}
                </span>

                {/* Title Text mapped to --tx-primary (#fafafa) */}
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#fafafa] mb-4 leading-snug group-hover:text-[#22c55e] transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Subtext Description: transitions from --tx-muted (#a1a1aa) to --tx-secondary (#d4d4d8) on card hover */}
                <p className="text-[#a1a1aa] font-normal text-xs md:text-sm leading-relaxed group-hover:text-[#d4d4d8] transition-colors duration-300">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}