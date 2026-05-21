// Navbar.tsx

'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Image from 'next/image'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [path])

  return (
    <header
      className="z-50 transition-all duration-300"
      // className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'var(--surface)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div className="wrap flex items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="w-20 h-20 rounded-md overflow-hidden flex items-center justify-center">
            <Image
              src="/logo.png"
              width={30}
              height={30}
              className="w-full h-full object-cover"
              alt="MedSupply"
              priority
              unoptimized
            />
          </div>

          <div className="text-white dark:text-green-500 flex flex-col leading-none">
            <h1 className="text-xl sm:text-2xl tracking-wider ">
              MECHELIN METALS
            </h1>

            <span className="text-[8px] uppercase tracking-[0.22em] text-slate-400 font-semibold">
              NIGERIA
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                fontFamily: 'var(--font-body)',
                color: path === l.href ? 'var(--clr-green)' : 'var(--tx-secondary)',
                background: path === l.href ? 'rgba(22,163,74,0.08)' : 'transparent',
              }}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="border lg:hidden p-2 rounded-md transition-colors"
            style={{ color: 'var(--tx-secondary)' }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '420px' : '0', borderTop: open ? '1px solid var(--border)' : 'none' }}>
        <div style={{ background: 'var(--surface)', padding: '1rem 1.25rem 1.5rem' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="flex items-center py-3 text-sm font-medium border-b transition-colors"
              style={{ borderColor: 'var(--border)', color: path === l.href ? 'var(--clr-green)' : 'var(--tx-secondary)', fontFamily: 'var(--font-body)' }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="hidden btn btn-green w-full justify-center mt-4">
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  )
}
