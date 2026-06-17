// WhatWeDeal.tsx
"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type MetalItem = {
  icon: string;
  name: string;
  desc: string;
  actionKey: string;
};

export default function WhatWeDeal(): React.JSX.Element {
  const metals: MetalItem[] = useMemo(
    () => [
      {
        icon: "🔩",
        name: "Aluminium",
        desc: "Premium-grade sorted aluminium scrap, bailed and ready for smelting or direct manufacturing use.",
        actionKey: "Aluminium",
      },
      {
        icon: "⚙️",
        name: "Cast Aluminium",
        desc: "High-purity cast aluminium sourced from engines, machinery, and automotive components.",
        actionKey: "Cast Aluminium",
      },
      {
        icon: "🏗️",
        name: "Cast Iron",
        desc: "Sorted cast iron scrap suitable for foundry operations and metal reprocessing.",
        actionKey: "Cast Iron",
      },
      {
        icon: "❄️",
        name: "Condenser",
        desc: "Copper and aluminium condensers from HVAC and refrigeration equipment, carefully processed.",
        actionKey: "Condenser",
      },
      {
        icon: "🥤",
        name: "UBC",
        desc: "Used Beverage Cans — cleaned, sorted, and bailed aluminium UBC for recycling.",
        actionKey: "UBC",
      },
      {
        icon: "🔧",
        name: "Non-Ferrous Metals",
        desc: "Magnetic and non-magnetic ferrous metals from vehicles, buildings, and appliances.",
        actionKey: "Non-Ferrous Metals",
      },
    ],
    []
  );

  const handleScrollToCalculator = (key: string) => {
    const el = document.getElementById("calculator");
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth" });

    // optional: emit event or store selected metal
    console.log("Selected metal:", key);
  };

  return (
    <section
      id="metals"
      className="relative py-24 lg:py-32 bg-[var(--bg-main)] text-[var(--tx-primary)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-600/10 bg-emerald-50/70 text-[var(--clr-green)] text-[10px] font-bold tracking-wider uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Globe size={12} className="" />
            What We Deal In
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-black mt-3 tracking-wide"
          >
            Our Major Metals
          </motion.h2>

          <p className="text-sm md:text-base text-[var(--tx-secondary)] mt-5 leading-relaxed">
            We trade, recycle, and supply premium-quality metals for industrial
            applications. Each grade is processed to meet strict specification standards.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metals.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: EASE,
              }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm p-7 shadow-sm hover:shadow-xl transition-all"
            >
              {/* ICON */}
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="tracking-wider text-lg font-bold mb-2 group-hover:text-emerald-700 transition-colors">
                {item.name}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-[var(--tx-secondary)] leading-relaxed">
                {item.desc}
              </p>

              {/* CTA */}
              <button
                onClick={() => handleScrollToCalculator(item.actionKey)}
                className="mt-6 hidden items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-500 transition"
              // className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-500 transition"
              >
                Check Value Rate
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}