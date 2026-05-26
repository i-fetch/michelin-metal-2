// app/components/LocationsSection.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Clock, Phone, Navigation } from "lucide-react";

interface BranchDetails {
  id: string;
  tag: string;
  title: string;
  address: string;
  mapQuery: string;
  mapsLink: string;
  hours: string;
}

export default function LocationsSection() {
  const [activeBranchId, setActiveBranchId] = useState<string>("branch1");

  const branches: Record<string, BranchDetails> = useMemo(() => ({
    branch1: {
      id: "branch1",
      tag: "Branch 01",
      title: "Awada – Head Office",
      address: "No. 23 Nathan Okafor St, Awada Obosi, Anambra State, Nigeria",
      // ENGINEERED FIX: Force absolute GPS coordinates inside the 'q=' parameter to bypass local string mapping failures and lock the native red marker
      mapQuery: "6.125510,6.881252", 
      mapsLink: "https://www.google.com/maps/search/?api=1&query=6.125510,6.881252",
      hours: "Mon – Sat: 8am – 6pm",
    },
    branch2: {
      id: "branch2",
      tag: "Branch 02",
      title: "Woliwo Layout – Commercial Hub",
      address: "No. 32 Louis Mbanefo St, Woliwo Layout, Onitsha, Anambra State, Nigeria",
      // ENGINEERED FIX: Coordinate anchoring for precise Woliwo Hub localization mapping
      mapQuery: "6.134440,6.792250",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=6.134440,6.792250",
      hours: "Mon – Fri: 8am – 5pm",
    },
  }), []);

  const activeBranch = branches[activeBranchId];

  return (
    <section className="w-full py-20 md:py-28 bg-[#0a0c10] text-white overflow-hidden border-t border-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ══ SECTION HEADER ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-14 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <span
            className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border"
            style={{
              color: "var(--clr-green, #22c55e)",
              background: "rgba(34,197,94,0.05)",
              borderColor: "rgba(34,197,94,0.15)",
            }}
          >
            Our Network
          </span>

          <h3
            className="text-3xl sm:text-4xl font-black tracking-tight uppercase"
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              color: "var(--tx-primary, #ffffff)",
            }}
          >
            Our Strategic Locations
          </h3>

          <p
            className="text-sm md:text-base mt-2 max-w-xl font-normal"
            style={{ color: "var(--tx-muted, #94a3b8)" }}
          >
            Select an operational hub below to synchronize the interactive map interface.
          </p>
        </motion.div>

        {/* ══ BALANCED COMBINED GRID WORKSPACE (No Dead Space) ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT INTERACTIVE CONTROL STRIP PANEL */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between h-full">
            {Object.values(branches).map((branch) => {
              const isActive = activeBranchId === branch.id;

              return (
                <motion.div
                  key={branch.id}
                  whileHover={{ y: isActive ? 0 : -2 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveBranchId(branch.id)}
                  className="w-full text-left p-6 md:p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between flex-1 relative group overflow-hidden"
                  style={{
                    background: isActive ? "rgba(16, 20, 29, 0.9)" : "rgba(16, 20, 29, 0.4)",
                    borderColor: isActive
                      ? "var(--clr-green, #22c55e)"
                      : "rgba(255,255,255,0.03)",
                    boxShadow: isActive ? "0 10px 30px -10px rgba(34,197,94,0.1)" : "none"
                  }}
                >
                  {/* Active Background Glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.02] to-transparent pointer-events-none" />
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border font-mono"
                        style={{
                          background: isActive ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.02)",
                          color: isActive ? "var(--clr-green, #22c55e)" : "var(--tx-muted, #94a3b8)",
                          borderColor: isActive ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)",
                        }}
                      >
                        {branch.tag}
                      </span>
                      
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                        isActive ? "bg-[#22c55e]/10 border-[#22c55e]/20 text-[#22c55e]" : "bg-white/[0.02] border-white/[0.05] text-slate-500"
                      }`}>
                        <MapPin size={15} fill={isActive ? "currentColor" : "none"} />
                      </div>
                    </div>

                    <h4
                      className="font-bold text-xl tracking-tight transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-display, sans-serif)",
                        color: isActive ? "#ffffff" : "var(--tx-secondary, #cbd5e1)",
                      }}
                    >
                      {branch.title}
                    </h4>

                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-3 font-normal max-w-sm">
                      {branch.address}
                    </p>
                  </div>

                  {/* Micro Metadata Metrics */}
                  <div className="pt-5 mt-6 border-t border-white/[0.03] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-slate-600" />
                      <span>{branch.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone size={13} className="text-slate-600" />
                      <span>On Request</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT CANVAS CONTAINER HOLDING STABLE LIVE MAP */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 min-h-[450px] lg:min-h-full bg-[#10141d] border border-white/[0.04] rounded-2xl overflow-hidden relative shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] flex flex-col justify-between group"
          >
            {/* Live Synchronized Iframe Shell Layer */}
            <div className="w-full h-full flex-1 relative bg-[#0e1117] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={activeBranchId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  title={`${activeBranch.title} Real Map View`}
                  // Uses standard embedded search maps endpoint with forced coordinate positioning parameter
                  src={`https://maps.google.com/maps?q=${activeBranch.mapQuery}&z=16&output=embed&iwloc=near`}
                  className="w-full h-full border-0 absolute inset-0 filter invert-[0.9] hue-rotate-[180deg] contrast-[0.95] brightness-[0.85]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </AnimatePresence>
              
              {/* Vignette styling shadow gradients overlay over map workspace */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10141d] via-transparent to-transparent pointer-events-none z-10" />
            </div>

            {/* LOWER INTERACTIVE RUNTIME NAVIGATION BADGE CONTROL BAR */}
            <div className="w-full bg-[#10141d] border-t border-white/[0.04] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-20">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-widest font-bold">Map Active Target</span>
                  <span className="text-xs font-bold text-slate-200">
                    {activeBranch.title}
                  </span>
                </div>
              </div>

              <a
                href={activeBranch.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#22c55e] text-black text-xs font-bold font-mono tracking-wide uppercase hover:bg-[#1ebd53] shadow-[0_4px_20px_rgba(34,197,94,0.2)] transition-all duration-200"
              >
                <Navigation size={12} fill="currentColor" />
                Launch Navigation Route
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}