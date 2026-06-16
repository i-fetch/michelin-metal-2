"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Award,
  // Globe2,
  // CalendarClock,
  // Truck,
  // ShieldCheck,
  // Leaf,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WhyChooseSection(): React.JSX.Element {
  const t = useTranslations("WhyChoose");

  const strengths = useMemo(
    () => [
      {
        icon: "🏆",
        title: t("expertTitle"),
        desc: t("expertDesc"),
      },
      {
        icon: "📆",
        title: t("experienceTitle"),
        desc: t("experienceDesc"),
      },
      {
        icon: "🌍",
        title: t("globalTitle"),
        desc: t("globalDesc"),
      },
      {
        icon: "🚚",
        title: t("logisticsTitle"),
        desc: t("logisticsDesc"),
      },
      {
        icon: "🛡️",
        title: t("paymentTitle"),
        desc: t("paymentDesc"),
      },
      {
        icon: "🌱",
        title: t("sustainabilityTitle"),
        desc: t("sustainabilityDesc"),
      },
    ],
    [t]
  );

  return (
    <section
      id="why"
      className="relative overflow-hidden bg-[var(--bg-main)] py-24 lg:py-36"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase">
                <Award size={14} />
                {t("badge")}
              </div>

              <h2 className="mt-6 text-4xl md:text-5xl xl:text-6xl font-black leading-tight text-[var(--tx-primary)]">
                {t("title")}
                <span className="block text-[var(--clr-green)]">
                  {t("highlight")}
                </span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-[var(--tx-secondary)] max-w-md">
                {t("intro")}
              </p>

              {/* Trust Metrics */}
              <div className="grid grid-cols-3 gap-5 mt-10">
                <div>
                  <h3 className="text-3xl font-black text-[var(--clr-green)]">
                    10+
                  </h3>
                  <p className="text-xs text-[var(--tx-secondary)]">
                    Years Experience
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-[var(--clr-green)]">
                    25+
                  </h3>
                  <p className="text-xs text-[var(--tx-secondary)]">
                    Countries
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-[var(--clr-green)]">
                    500+
                  </h3>
                  <p className="text-xs text-[var(--tx-secondary)]">
                    Deliveries
                  </p>
                </div>
              </div>

              <button className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--clr-green)] text-white px-6 py-3 font-semibold transition-all hover:shadow-xl hover:shadow-emerald-500/20">
                Learn More
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </motion.div>
          </div>

          {/* RIGHT FEATURES */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {strengths.map((item, index) => {
                // const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: EASE,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 backdrop-blur-sm p-8 shadow-sm hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Gradient Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-50 via-transparent to-transparent" />

                    <div className="relative z-10">
                      {/* <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[var(--clr-green)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon size={26} />
                      </div> */}
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl">
                        {item.icon}
                      </div>

                      <h3 className="text-xl font-bold text-[var(--tx-primary)] mb-3">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-[var(--tx-secondary)]">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}