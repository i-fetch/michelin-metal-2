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

const EASE = [0.16, 1, 0.3, 1] as const;

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
      className="w-full bg-[var(--bg-main)] text-[var(--tx-primary)] py-20 md:py-32 overflow-hidden relative"
      aria-label="Corporate Strengths"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: STICKY BRAND HEADLINE ANCHOR */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-600/10 bg-emerald-50/70 text-[var(--clr-green)] text-[10px] font-bold tracking-wider uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Award size={12} />
              Enterprise Capabilities
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--tx-primary)] leading-[1.02]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WHY CHOOSE <br />
              <span className="text-[var(--clr-green)]">MECHELIN METALS.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-[var(--tx-secondary)] text-sm md:text-base leading-relaxed font-normal"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Trusted by heavy manufacturers and industrial foundries across four continents to deliver processed metal cargo exactly to assay specifications.
            </motion.p>
          </div>

          {/* RIGHT COLUMN: CONTINUOUS INTEGRATED FEATURE LIST */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14 lg:pl-6">
            {strengths.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
                  className="group flex flex-col text-left border-l-2 border-slate-100 hover:border-[var(--clr-green)] pl-6 transition-colors duration-300"
                >
                  {/* Micro Icon Marker */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-50 border border-slate-100 text-[var(--tx-muted)] group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-[var(--clr-green)] transition-all duration-300 mb-5">
                    <IconComponent size={15} strokeWidth={2.2} />
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-lg font-bold tracking-tight text-[var(--tx-primary)] mb-2.5 transition-colors duration-200 group-hover:text-emerald-800"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-[var(--tx-secondary)] text-xs md:text-sm leading-relaxed font-normal m-0"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
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