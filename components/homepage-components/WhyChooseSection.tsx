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
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WhyChooseSection(): React.JSX.Element {
  const t = useTranslations("WhyChoose");

  const strengths = useMemo(() => [
    {
      icon: UserCheck,
      title: t("expertTitle"),
      desc: t("expertDesc")
    },
    {
      icon: History,
      title: t("experienceTitle"),
      desc: t("experienceDesc")
    },
    {
      icon: Globe2,
      title: t("globalTitle"),
      desc: t("globalDesc")
    },
    {
      icon: Truck,
      title: t("logisticsTitle"),
      desc: t("logisticsDesc")
    },
    {
      icon: CreditCard,
      title: t("paymentTitle"),
      desc: t("paymentDesc")
    },
    {
      icon: Leaf,
      title: t("sustainabilityTitle"),
      desc: t("sustainabilityDesc")
    }
  ], [t]);

  return (
    <section
      id="why"
      className="w-full bg-[var(--bg-main)] text-[var(--tx-primary)] py-20 md:py-32 overflow-hidden relative"
      aria-label="Corporate Strengths"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── TWO-COLUMN ASYMMETRICAL CANVAS LINK ── */}
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
              {t("badge")}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-wider text-[var(--tx-primary)] leading-[1.02]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("title")} <br />
              <span className="text-[var(--clr-green)]">
                {t("highlight")}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-[var(--tx-secondary)] text-sm md:text-base leading-relaxed font-normal"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("intro")}</motion.p>
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
                    className="text-lg font-bold tracking-wider text-[var(--tx-primary)] mb-2.5 transition-colors duration-200 group-hover:text-emerald-800"
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