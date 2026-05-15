'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Recycle } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { href:'/', label:'Home' },
  { href:'/about', label:'About' },
  { href:'/products', label:'Products' },
  { href:'/services', label:'Services' },
  { href:'/contact', label:'Contact' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
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
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
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
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background:'var(--clr-green)' }}>
            <Recycle size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <p className="leading-none text-base font-bold tracking-wide"
               style={{ fontFamily:'var(--font-display)', color:'var(--tx-primary)', letterSpacing:'0.06em' }}>
              MECHELIN METALS
            </p>
            <p className="text-[9px] tracking-widest uppercase"
               style={{ color:'var(--tx-muted)', fontFamily:'var(--font-body)' }}>
              Nigeria PVT LTD
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                fontFamily:'var(--font-body)',
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
          <Link href="/contact" className="btn btn-green hidden lg:inline-flex" style={{ padding:'0.6rem 1.4rem', fontSize:'0.8rem' }}>
            Get a Quote
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-md transition-colors"
            style={{ color:'var(--tx-secondary)' }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '420px' : '0', borderTop: open ? '1px solid var(--border)' : 'none' }}>
        <div style={{ background:'var(--surface)', padding:'1rem 1.25rem 1.5rem' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="flex items-center py-3 text-sm font-medium border-b transition-colors"
              style={{ borderColor:'var(--border)', color: path === l.href ? 'var(--clr-green)' : 'var(--tx-secondary)', fontFamily:'var(--font-body)' }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-green w-full justify-center mt-4">
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  )
}
