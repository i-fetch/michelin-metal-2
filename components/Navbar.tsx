'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Image from 'next/image'

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    fn() // run on mount so SSR → client is in sync
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [path])

  // When transparent (top of page) on a hero that could be any bg colour,
  // we force white text so it reads against dark hero images.
  // Once scrolled, the frosted surface is applied and we use the theme
  // variables which correctly handle both light and dark mode.
  const linkColor = (href: string) => {
    if (path === href) return 'var(--clr-green)'
    return scrolled ? 'var(--tx-primary)' : 'rgba(255,255,255,0.85)'
  }

  const linkBg = (href: string) =>
    path === href ? 'rgba(22,163,74,0.08)' : 'transparent'

  return (
    <header
      className="z-50 transition-all duration-300"
      // className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background:     scrolled ? 'var(--surface)' : 'transparent',
        borderBottom:   scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)'       : 'none',
      }}
    >
      <div className="wrap flex items-center justify-between px-5 py-4">

<<<<<<< HEAD
        {/* ── Logo ──────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-20 h-20 rounded-md overflow-hidden flex items-center justify-center">
=======
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-16 h-16 rounded-md overflow-hidden flex items-center justify-center">
>>>>>>> e46b3a463e18beb5013845f5554a597ca8198d98
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
<<<<<<< HEAD
              className="text-xl sm:text-2xl tracking-wider font-bold transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-display)',
                // Always brand green — readable on both light + dark + hero
                color: 'var(--clr-green)',
              }}
=======
              className="text-lg sm:text-2xl tracking-wider font-bold transition-colors duration-300"
              style={{ color: 'var(--clr-green)', fontFamily: 'var(--font-display)' }}
>>>>>>> e46b3a463e18beb5013845f5554a597ca8198d98
            >
              MECHELIN METALS
            </h1>
            <span
<<<<<<< HEAD
              className="text-[8px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300"
              style={{
                color: scrolled ? 'var(--tx-faint)' : 'rgba(255,255,255,0.55)',
              }}
=======
              className="text-[8px] sm:text-xs uppercase tracking-[0.22em] font-semibold transition-colors duration-300"
              style={{ color: 'var(--tx-faint)' }}
>>>>>>> e46b3a463e18beb5013845f5554a597ca8198d98
            >
              NIGERIA
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-body)',
                color:      linkColor(l.href),
                background: linkBg(l.href),
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* ── Right side ────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="border lg:hidden p-2 rounded-md transition-colors"
            style={{
              color:       scrolled ? 'var(--tx-secondary)' : 'rgba(255,255,255,0.85)',
              borderColor: scrolled ? 'var(--border)'        : 'rgba(255,255,255,0.25)',
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight:  open ? '420px' : '0',
          borderTop:  open ? '1px solid var(--border)' : 'none',
        }}
      >
        <div style={{ background: 'var(--surface)', padding: '1rem 1.25rem 1.5rem' }}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center py-3 text-sm font-medium border-b transition-colors"
              style={{
                borderColor: 'var(--border)',
                color:       path === l.href ? 'var(--clr-green)' : 'var(--tx-primary)',
                fontFamily:  'var(--font-body)',
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn btn-green w-full justify-center mt-4"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  )
}