"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const links = [
  { href: "/", label: "Overview", desc: "Main corporate portal" },
  { href: "/about", label: "Enterprise", desc: "Our history & capabilities" },
  { href: "/products", label: "Materials Supply", desc: "Industrial metal categories" },
  { href: "/services", label: "Logistics & Trade", desc: "Global shipping infrastructure" },
  { href: "/contact", label: "Contact Terminal", desc: "Get institutional quotes" },
];

export default function Navbar(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [path]);

  return (
    <>
      {/* ── STATIC ARCHITECTURAL NAVBAR LAYER ── */}
      <nav className="relative w-full bg-white border-b border-slate-100 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex items-center justify-between">
          
          {/* Brand Identity Block */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-white border border-slate-100 shadow-sm transition-transform duration-500 group-hover:rotate-180">
              <Image
                src="/logo.png"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                alt="Mechelin Logo"
                unoptimized
              />
            </div>
            <div className="flex flex-col select-none">
              <span className="text-sm font-black tracking-tight text-[var(--tx-primary)]">
                MECHELIN <span className="text-[var(--clr-green)]">METALS</span>
              </span>
            </div>
          </Link>

          {/* Inline Exposed Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 mx-auto px-6">
            {links.map((link) => {
              const isActive = path === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-xs font-bold uppercase tracking-widest text-[var(--tx-secondary)] transition-colors hover:text-[var(--tx-primary)] py-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeDesktopIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--clr-green)] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Asymmetric Controls */}
          <div className="flex items-center gap-6 shrink-0">
            {/* <Link
              href="/products"
              className="hidden sm:inline-block text-xs font-bold tracking-widest uppercase text-[var(--tx-secondary)] hover:text-[var(--clr-green)] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Materials Hub →
            </Link> */}

            {/* Unique Aside Menu Trigger (CRITICAL: Added lg:hidden to hide completely on desktop) */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex lg:hidden items-center gap-3 pl-4 border-l border-slate-200 group relative"
              aria-label="Open Navigation Aside"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--tx-primary)]">
                Menu
              </span>
              <div className="w-5 h-4 flex flex-col justify-between items-end">
                <span className="w-5 h-[2px] bg-[var(--tx-primary)] rounded-full transition-all duration-300 group-hover:w-3" />
                <span className="w-4 h-[2px] bg-[var(--tx-primary)] rounded-full transition-all duration-300 group-hover:w-5" />
                <span className="w-2 h-[2px] bg-[var(--tx-primary)] rounded-full transition-all duration-300 group-hover:w-4" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE/TABLET SIDE DRAWER ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Darkening Backdrop Over Light Canvas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/10 backdrop-blur-md z-50 cursor-zoom-out"
            />

            {/* The Aside Navigation Deck */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 180 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[460px] bg-white border-l border-slate-100 shadow-2xl z-50 p-8 sm:p-12 flex flex-col justify-between"
            >
              {/* Top Row Indicator & Close Action */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--tx-muted)] uppercase">
                  Navigation Deck
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[var(--tx-secondary)] hover:bg-slate-50 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Central Staggered Menu List */}
              <nav className="flex flex-col space-y-6 my-auto">
                {links.map((link, i) => {
                  const isActive = path === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        className="group block relative"
                      >
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[var(--clr-green)] rounded-full transition-all duration-300 group-hover:h-6" />
                        <div className="pl-0 group-hover:pl-4 transition-all duration-300">
                          <h2 
                            className={`text-2xl sm:text-3xl font-black tracking-tight ${
                              isActive ? "text-[var(--clr-green)]" : "text-[var(--tx-primary)]"
                            }`}
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {link.label}
                          </h2>
                          <p className="text-xs text-[var(--tx-secondary)] mt-0.5">
                            {link.desc}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Aside Bottom Metadata Panel */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="text-xs text-[var(--tx-secondary)]">
                  <p className="font-semibold text-[var(--tx-primary)]">Lagos Operations Center</p>
                  <p className="text-[var(--tx-muted)] mt-0.5">Industrial Metal Recycling & Export Infrastructure</p>
                </div>
                <Link
                  href="/contact"
                  className="block w-full text-center py-4 bg-[var(--tx-primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-[var(--clr-green)]"
                >
                  Initialize Project Discussion
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}