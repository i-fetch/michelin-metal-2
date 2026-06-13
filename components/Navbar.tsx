"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
// import { useTranslations } from "next-intl";
import LanguageSwitcher from "./lang/LanguageSwitcher";

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
  // const [isOpen, setIsOpen] = useState(false)
  const [locale, setLocale] = useState("")
  const router = useRouter();

  // const t = useTranslations("Navbar");
  useEffect(() => {
    setIsMenuOpen(false)
    const cookieLocale = document.cookie
      .split("; ").find(row => row.startsWith("MYNEXTAPP_LOCALE="))?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale}`;
      router.refresh();
    }
  }, [router, path]);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    document.cookie = `MYNEXTAPP_LOCALE=${newLocale}`;
    router.refresh();
  }

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

            {/* Language Switcher Desktop */}
            <div className="hidden xl:flex items-center ml-4 min-w-[140px]">
              <LanguageSwitcher
                locale={locale}
                changeLocale={changeLocale}
              />
            </div>
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



              {/* Drawer Header */}
  <div className="grid grid-cols-[48px_1fr_48px] items-center gap-3 border-b border-white/20 pb-5">
  <Link
    href="/"
    className="w-12 h-12 rounded-xl overflow-hidden bg-[var(--bg-subtle)]"
  >
    <Image
      src="/logo.png"
      width={48}
      height={48}
      className="w-full h-full object-cover"
      alt="Mechelin Metals"
      priority
      unoptimized
    />
  </Link>

  <LanguageSwitcher
    locale={locale}
    changeLocale={changeLocale}
  />

  <button
    onClick={() => setIsMenuOpen(false)}
    className="w-12 h-12 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-center"
  >
    <X size={18} />
  </button>
</div>
              {/* Drawer Links */}
              <nav className="flex flex-col space-y-8 my-auto">                {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)} className="group block">
                    <h2 className="text-xl font-bold tracking-wider text-[var(--tx-primary)] group-hover:text-[var(--clr-green)] transition-colors">
                      {link.label}
                    </h2>
                    <p className="text-xs text-[var(--tx-muted)]">{link.desc}</p>
                  </Link>
                </motion.div>
              ))}
              </nav>


              {/* Drawer Footer */}
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



