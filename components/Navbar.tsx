"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

const links = [
  { href: "/", label: "Home", desc: "Main corporate portal" },
  { href: "/about", label: "About", desc: "Our history & capabilities" },
  { href: "/products", label: "Products", desc: "Industrial metal categories" },
  { href: "/services", label: "Services", desc: "Global shipping infrastructure" },
  { href: "/contact", label: "Contact", desc: "Get institutional quotes" },
];

export default function Navbar(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setIsMenuOpen(false), [path])

  return (
    <>
      {/* ── GLASS NAVBAR LAYER ── */}
      <nav className="relative w-full bg-white/30 backdrop-blur-2xl border-b border-white/20 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-16 h-16 rounded-md overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.png"
                width={20}
                height={20}
                className="w-full h-full object-cover"
                alt="Mechelin Metals"
                priority
                unoptimized
              />
            </div>

            <div className="flex flex-col leading-none">
              <h1
                className="text-lg sm:text-2xl tracking-wider font-bold transition-colors duration-300"
                style={{ color: 'var(--clr-green)', fontFamily: 'var(--font-display)' }}
              >
                MECHELIN METALS
              </h1>
              <span
                className="text-[8px] sm:text-xs uppercase tracking-[0.22em] font-semibold transition-colors duration-300"
                style={{ color: 'var(--tx-faint)' }}
              >
                NIGERIA LIMITED
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8 mx-auto px-6">
            {links.map((link) => {
              const isActive = path === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-xs font-bold uppercase tracking-widest text-[var(--tx-secondary)] hover:text-[var(--tx-primary)] transition-colors py-2"
                >
                  {link.label}

                  {isActive && (
                    <motion.span
                      layoutId="activeDesktopIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--clr-green)] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right side ────────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="border lg:hidden p-2 rounded-md transition-colors"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER (GLASS FIXED) ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-md z-50"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 180 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[460px]
                         bg-white
                         border-l border-white/20
                         z-50 p-8 sm:p-12 flex flex-col justify-between"
            >

              <div className="flex items-center justify-between border-b border-white/20 pb-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      width={20}
                      height={20}
                      className="w-full h-full object-cover"
                      alt="Mechelin Metals"
                      priority
                      unoptimized
                    />
                  </div>

                  <div className="flex flex-col leading-none">
                    <h1
                      className="text-lg sm:text-2xl tracking-wider font-bold transition-colors duration-300"
                      style={{ color: 'var(--clr-green)', fontFamily: 'var(--font-display)' }}
                    >
                      MECHELIN METALS
                    </h1>
                    <span
                      className="text-[8px] sm:text-xs uppercase tracking-[0.22em] font-semibold transition-colors duration-300"
                      style={{ color: 'var(--tx-faint)' }}
                    >
                      NIGERIA
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/30 bg-white/20 backdrop-blur-xl"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col space-y-6 my-auto">
                {links.map((link) => (
                  <React.Fragment key={link.href}>
                    <Link className="block" href={link.href}>
                      <h2 className="text-2xl font-black text-[var(--clr-green)] font-display"
                      >
                        {link.label}
                      </h2>
                      <p className="text-xs text-[var(--tx-secondary)]">
                        {link.desc}
                      </p>
                    </Link>
                    <hr className="border-t border-white/20" />
                  </React.Fragment>
                ))}
              </nav>

              <div className="border-t border-white/20 pt-6">
                <Link
                  href="/contact"
                  className="block text-center py-4 bg-[var(--tx-primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl"
                >
                  Get Quotes
                </Link>
              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}