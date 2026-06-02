"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Navigation, ArrowRight, Building2, Store } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const BRANCHES = [
  {
    id: "branch1",
    tag: "Branch 01",
    label: "Head Office",
    title: "Awada, Obosi",
    address: "No. 23 Nathan Okafor Street, Awada Obosi, Anambra State, Nigeria.",
    note: "Accessible through Rainbow-Net behind Army Barracks Onitsha.",
    hours: "Mon – Sat: 8am – 6pm",
    mapQuery: "6.125510,6.881252",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=6.125510,6.881252",
    Icon: Building2,
  },
  {
    id: "branch2",
    tag: "Branch 02",
    label: "Commercial Office",
    title: "Woliwo Layout, Onitsha",
    address: "No. 32 Louis Mbanefo Street, Woliwo Layout, Onitsha, Anambra State, Nigeria.",
    note: "Located in the heart of Onitsha's commercial district.",
    hours: "Mon – Fri: 8am – 5pm",
    mapQuery: "6.134440,6.792250",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=6.134440,6.792250",
    Icon: Store,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   LOCATIONS SECTION
───────────────────────────────────────────────────────────── */
export default function LocationsSection() {
  const [activeId, setActiveId] = useState("branch1");
  const active = BRANCHES.find((b) => b.id === activeId)!;

  return (
    <section id="location" className="w-full py-14 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-main)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ══ HEADER ══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <p className="tag mb-4">Find Us</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontWeight: 900,
                color: "var(--tx-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Our{" "}
              <span style={{ color: "var(--clr-green)" }}>Locations</span>
            </h2>
            <p className="text-sm md:text-base max-w-sm" style={{ color: "var(--tx-muted)" }}>
              Two strategic hubs in Anambra State — Nigeria&apos;s industrial heartland.
            </p>
          </div>
        </motion.div>

        {/* ══ MOBILE: TAB TOGGLE ══ */}
        {/* Visible only below lg — pill toggle to switch branches */}
        <div className="lg:hidden mb-6">
          <div
            className="flex rounded-2xl p-1.5 gap-1.5"
            style={{ background: "var(--bg-subtle)" }}
          >
            {BRANCHES.map((b) => {
              const isActive = activeId === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setActiveId(b.id)}
                  className="relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-colors duration-200"
                  style={{ color: isActive ? "var(--bg-surface)" : "var(--tx-muted)" }}
                >
                  {/* sliding active pill */}
                  {isActive && (
                    <motion.div
                      layoutId="mobilePill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "var(--clr-green)" }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                  <b.Icon size={15} className="relative z-10 shrink-0" />
                  <span className="relative z-10 truncate">{b.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ MAIN GRID ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">

          {/* ── LEFT: Branch cards (desktop sidebar / hidden on mobile) ── */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-4">
            {BRANCHES.map((b, i) => {
              const isActive = activeId === b.id;
              return (
                <motion.button
                  key={b.id}
                  onClick={() => setActiveId(b.id)}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  whileHover={!isActive ? { x: 4 } : {}}
                  className="w-full text-left rounded-2xl border p-6 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group"
                  style={{
                    background: isActive ? "var(--bg-surface)" : "var(--bg-subtle)",
                    borderColor: isActive ? "var(--clr-green)" : "var(--border-subtle)",
                    boxShadow: isActive ? "0 8px 32px rgba(22,163,74,0.10)" : "none",
                  }}
                >
                  {/* active left accent bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 top-4 bottom-4 w-[3px] h-full rounded-full"
                      style={{ background: "var(--clr-green)" }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}

                  {/* top row */}
                  <div className="flex items-start justify-between gap-3 pl-3">
                    <div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 block"
                        style={{ color: isActive ? "var(--clr-green)" : "var(--tx-muted)" }}
                      >
                        {b.tag}
                      </span>
                      <h4
                        className="font-bold text-lg leading-tight"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: isActive ? "var(--tx-primary)" : "var(--tx-secondary)",
                        }}
                      >
                        {b.title}
                      </h4>
                    </div>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: isActive ? "var(--clr-green-alpha)" : "transparent",
                        border: `1px solid ${isActive ? "rgba(22,163,74,0.2)" : "var(--border-subtle)"}`,
                        color: isActive ? "var(--clr-green)" : "var(--tx-muted)",
                      }}
                    >
                      <b.Icon size={16} />
                    </div>
                  </div>

                  {/* address */}
                  <p
                    className="text-xs leading-relaxed pl-3"
                    style={{ color: "var(--tx-muted)" }}
                  >
                    {b.address}
                  </p>

                  {/* meta footer */}
                  <div
                    className="flex items-center justify-between pt-3 pl-3"
                    style={{ borderTop: "1px solid var(--border-subtle)" }}
                  >
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--tx-muted)" }}>
                      <Clock size={12} />
                      {b.hours}
                    </span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: isActive ? "var(--clr-green)" : "var(--tx-muted)" }}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ── RIGHT: Map + detail card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="lg:col-span-8 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "0 16px 48px rgba(15,23,42,0.07)",
            }}
          >
            {/* Map area */}
            <div className="relative w-full" style={{ height: "clamp(240px, 45vw, 420px)" }}>
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={activeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  title={`${active.title} Map`}
                  src={`https://maps.google.com/maps?q=${active.mapQuery}&z=16&output=embed&iwloc=near`}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </AnimatePresence>

              {/* subtle top fade for clean blending */}
              <div
                className="absolute top-0 left-0 right-0 h-8 pointer-events-none z-10"
                style={{ background: "linear-gradient(to bottom, var(--bg-surface), transparent)" }}
              />

              {/* Branch tag pill floating on map */}
              <div className="absolute top-4 left-4 z-20">
                <motion.div
                  key={activeId + "-tag"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
                  style={{
                    background: "var(--bg-surface)",
                    color: "var(--clr-green)",
                    border: "1px solid rgba(22,163,74,0.2)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {active.tag} — {active.label}
                </motion.div>
              </div>
            </div>

            {/* Detail strip below map */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId + "-detail"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 sm:p-6"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                {/* Address block */}
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: "var(--clr-green-alpha)",
                      color: "var(--clr-green)",
                      border: "1px solid rgba(22,163,74,0.15)",
                    }}
                  >
                    <MapPin size={15} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="font-bold text-sm mb-0.5 truncate"
                      style={{ color: "var(--tx-primary)" }}
                    >
                      {active.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--tx-muted)" }}>
                      {active.address}
                    </p>
                    {active.note && (
                      <p className="text-xs mt-1 italic" style={{ color: "var(--tx-muted)" }}>
                        {active.note}
                      </p>
                    )}
                    <span className="flex items-center gap-1.5 text-xs mt-2" style={{ color: "var(--tx-muted)" }}>
                      <Clock size={11} /> {active.hours}
                    </span>
                  </div>
                </div>

                {/* Navigate CTA */}
                <a
                  href={active.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-green shrink-0 flex items-center gap-2 text-xs"
                >
                  <Navigation size={13} />
                  Get Directions
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Mobile: branch switcher inside the card */}
            <div
              className="lg:hidden px-5 pb-5 flex flex-col gap-3"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <p className="text-[10px] uppercase tracking-widest pt-4 font-semibold" style={{ color: "var(--tx-muted)" }}>
                Switch Branch
              </p>
              <div className="flex flex-col gap-2">
                {BRANCHES.map((b) => {
                  const isActive = activeId === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setActiveId(b.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200"
                      style={{
                        background: isActive ? "var(--clr-green-alpha)" : "var(--bg-subtle)",
                        color: isActive ? "var(--clr-green)" : "var(--tx-secondary)",
                        border: `1px solid ${isActive ? "rgba(22,163,74,0.2)" : "var(--border-subtle)"}`,
                      }}
                    >
                      <b.Icon size={15} className="shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="block font-semibold truncate">{b.title}</span>
                        <span className="block text-xs truncate" style={{ color: "var(--tx-muted)" }}>{b.tag}</span>
                      </div>
                      {isActive && (
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: "var(--clr-green)" }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}