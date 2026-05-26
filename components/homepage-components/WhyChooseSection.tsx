"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  UserCheck, 
  History, 
  Globe2, 
  Truck, 
  CreditCard, 
  Leaf,
  Award
} from "lucide-react";

const DELAY_STAGGER = 0.04;
const INTERACTION_EASE = [0.25, 1, 0.5, 1] as const;

export default function WhyChooseSection(): React.JSX.Element {
  const strengths = useMemo(() => [
    {
      icon: UserCheck,
      title: "Leading Industry Experts",
      desc: "Our team comprises seasoned metals specialists with deep knowledge of ferrous and non-ferrous material grading, processing standards, and export regulations."
    },
    {
      icon: History,
      title: "Decade of Experience",
      desc: "Over 10 years of operational excellence in metals sourcing, processing, and international trade from Nigeria to global markets."
    },
    {
      icon: Globe2,
      title: "Global Trade Connections",
      desc: "Established trade relationships with buyers in China, South Korea, India, and across West Africa — ensuring your materials reach the right markets."
    },
    {
      icon: Truck,
      title: "Strong Logistics Support",
      desc: "Full container loading, freight forwarding, documentation, and port clearance services managed by our in-house logistics team."
    },
    {
      icon: CreditCard,
      title: "International Payment Capability",
      desc: "We support Letters of Credit (LC), T/T Bank Transfers, and other internationally recognized payment instruments for seamless global trade."
    },
    {
      icon: Leaf,
      title: "Sustainable Operations",
      desc: "Our recycling processes meet international environmental standards, supporting your company's ESG goals and sustainability commitments."
    }
  ], []);

  return (
    <section 
      id="why" 
      className="w-full bg-[#11141a] text-white pt-20 pb-12 overflow-hidden border-t border-white/[0.02]"
    >
      {/* ══ CONTENT CANVAS HOLDER ══ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ══ HEADER ELEMENT CONTAINER ══ */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-16 space-y-5">
          {/* Exact pill shape architecture from screenshot */}
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: INTERACTION_EASE }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/5 text-[#22c55e] text-[11px] font-bold tracking-widest uppercase font-[family:var(--font-mono)]"
          >
            <Award size={12} className="text-[#22c55e]" />
            Our Strengths
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: INTERACTION_EASE, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight font-[family:var(--font-display)]"
          >
            Why Choose <span className="text-[#22c55e]">Mechelin Metals</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-2xl font-[family:var(--font-body)] text-slate-400 font-normal text-sm md:text-base tracking-wide"
          >
            Trusted by manufacturers and industrial buyers across four continents.
          </motion.p>
        </div>
      </div>

      {/* ══ DUAL TONE CANVAS DEVIATION ══ */}
      {/* Visual background section break seen in your layouts */}
      <div className="w-full bg-[#151922] border-t border-b border-white/[0.02] py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* ══ THREE COLUMN GRID ENGINE ══ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengths.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: INTERACTION_EASE, delay: index * DELAY_STAGGER }}
                  whileHover={{ 
                    y: -5,
                    backgroundColor: "rgba(28, 33, 46, 0.7)", 
                    borderColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  className="bg-[#1a1f2c]/50 border border-white/[0.03] rounded-xl p-8 flex flex-col justify-start min-h-[280px] transition-colors duration-300 group cursor-pointer"
                >
                  {/* Icon Block Container matching screenshot spacing properties */}
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-6 bg-[#22c55e]/5 text-[#22c55e] border border-[#22c55e]/10 group-hover:bg-[#22c55e]/10 group-hover:scale-105 transition-all duration-300">
                    <IconComponent size={18} strokeWidth={2.2} />
                  </div>

                  {/* Heading Title Block */}
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-3 font-[family:var(--font-display)] group-hover:text-[#22c55e] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Text Block Content */}
                  <p className="text-slate-400 font-normal text-xs md:text-sm leading-relaxed font-[family:var(--font-body)] group-hover:text-slate-300 transition-colors duration-300">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}