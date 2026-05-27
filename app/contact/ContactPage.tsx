'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ChevronDown,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LocationsSection from '@/components/LocationSection'

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const ENQUIRY_TYPES = [
  'Product Enquiry',
  'Bulk Purchase / Contract',
  'Scrap Metal Sale',
  'Export / Import Partnership',
  'General Information',
  'Other',
]

const PRODUCT_LIST = [
  'Aluminium Bales',
  'Aluminium Scrap (Loose)',
  'Heavy Melting Steel',
  'Vehicle Body Scrap',
  'Cast Iron Scrap',
  'Copper Scrap',
  'Brass Scrap',
  'Lead Scrap',
  'Bulk Raw Supply',
  'Multiple / Other',
]

const QUICK_CONTACTS = [
  { icon: Mail,         label: 'Email Us',       val: 'mechelinmetalsnig@gmail.com', href: 'mailto:mechelinmetalsnig@gmail.com' },
  { icon: MessageSquare,label: 'WhatsApp',        val: 'Send a quick message',        href: 'https://wa.me/2348000000000' },
  { icon: MapPin,       label: 'Head Office',     val: 'Awada Obosi, Anambra',        href: '#locations' },
  { icon: MapPin,       label: 'Commercial Hub',  val: 'Woliwo Layout, Onitsha',      href: '#locations' },
]

const EASE = [0.22, 1, 0.36, 1] as const

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
}) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: direction === 'up'    ?  24 : 0,
        x: direction === 'left'  ? -28 : direction === 'right' ? 28 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* shared input/select/textarea classes */
const fieldBase: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg-surface)',
  border: '1.5px solid var(--border-subtle)',
  borderRadius: '0.75rem',
  padding: '0.8rem 1rem',
  fontSize: '0.875rem',
  color: 'var(--tx-primary)',
  outline: 'none',
  transition: 'border-color 0.2s',
}

function Field({
  label,
  children,
  required,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{ color: 'var(--tx-muted)' }}
      >
        {label}{required && <span style={{ color: 'var(--clr-green)' }}> *</span>}
      </label>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────────────────────── */
export default function ContactPage(): React.JSX.Element {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', type: '', product: '', volume: '',
    message: '', channel: 'email',
  })
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setBusy(true)
    setTimeout(() => { setBusy(false); setDone(true) }, 1400)
  }

  const reset = () => {
    setDone(false)
    setForm({ name: '', company: '', email: '', phone: '', country: '', type: '', product: '', volume: '', message: '', channel: 'email' })
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)' }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'var(--bg-main)' }}>
        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(var(--tx-primary) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            height: 480,
          }}
        />
        {/* Green glow */}
        <div
          className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <FadeIn>
            <p className="tag mb-5">Reach Us</p>
            <h1
              className="mb-5 leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                color: 'var(--tx-primary)',
                textTransform: 'uppercase',
              }}
            >
              Get In<br />
              <span style={{ color: 'var(--clr-green)' }}>Touch</span>
            </h1>
            <p
              className="text-base leading-relaxed max-w-lg"
              style={{ color: 'var(--tx-secondary)', fontWeight: 300 }}
            >
              Ready to source metals, sell scrap, or explore a strategic supply
              partnership? Our procurement team is ready for your requirements.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ QUICK CONTACT CARDS ══ */}
      <section className="py-8" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_CONTACTS.map(({ icon: Icon, label, val, href }, i) => (
              <FadeIn key={label} delay={i * 0.07}>
                <Link
                  href={href}
                  className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-3px)'
                    el.style.boxShadow = '0 12px 32px rgba(15,23,42,0.09)'
                    el.style.borderColor = 'rgba(22,163,74,0.3)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = '0 2px 8px rgba(15,23,42,0.04)'
                    el.style.borderColor = 'var(--border-subtle)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{ background: 'var(--clr-green-alpha)', color: 'var(--clr-green)' }}
                  >
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.14em] mb-0.5"
                      style={{ color: 'var(--tx-muted)' }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-semibold truncate transition-colors duration-200 group-hover:text-green-600"
                      style={{ color: 'var(--tx-primary)' }}
                    >
                      {val}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FORM + SIDEBAR ══ */}
      <section className="py-20 md:py-28" style={{ background: 'var(--bg-main)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* ── FORM ── */}
            <div className="lg:col-span-8">
              <FadeIn>
                <p className="tag mb-4">Enquiry Form</p>
                <h2
                  className="mb-10 leading-none"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    color: 'var(--tx-primary)',
                  }}
                >
                  Send Us a{' '}
                  <span style={{ color: 'var(--clr-green)' }}>Message</span>
                </h2>
              </FadeIn>

              <AnimatePresence mode="wait">
                {done ? (
                  /* ── SUCCESS STATE ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="rounded-2xl p-12 text-center"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 4px 24px rgba(15,23,42,0.06)',
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'var(--clr-green-alpha)', border: '1px solid rgba(22,163,74,0.2)' }}
                    >
                      <CheckCircle2 size={32} style={{ color: 'var(--clr-green)' }} />
                    </div>
                    <h3
                      className="font-black mb-3"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.6rem',
                        color: 'var(--tx-primary)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Enquiry Received!
                    </h3>
                    <p
                      className="text-sm leading-relaxed max-w-sm mx-auto mb-8"
                      style={{ color: 'var(--tx-secondary)' }}
                    >
                      Thank you,{' '}
                      <span className="font-semibold" style={{ color: 'var(--tx-primary)' }}>
                        {form.name}
                      </span>
                      . Your enquiry has been received. A specialist will respond within 1 business day.
                    </p>
                    <button
                      onClick={reset}
                      className="btn btn-green"
                    >
                      Send Another Enquiry
                    </button>
                  </motion.div>
                ) : (
                  /* ── FORM ── */
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Full Name" required>
                        <input
                          name="name" required value={form.name} onChange={set}
                          placeholder="John Adeyemi"
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                      <Field label="Company Name">
                        <input
                          name="company" value={form.company} onChange={set}
                          placeholder="Your Company Ltd"
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Email Address" required>
                        <input
                          type="email" name="email" required value={form.email} onChange={set}
                          placeholder="you@company.com"
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                      <Field label="Phone / WhatsApp">
                        <input
                          name="phone" value={form.phone} onChange={set}
                          placeholder="+234 800 000 0000"
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Country">
                        <input
                          name="country" value={form.country} onChange={set}
                          placeholder="Nigeria"
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                      <Field label="Enquiry Type">
                        <div className="relative">
                          <select
                            name="type" value={form.type} onChange={set}
                            style={{ ...fieldBase, paddingRight: '2.5rem', cursor: 'pointer', appearance: 'none' }}
                            onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                            onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                          >
                            <option value="">Select type…</option>
                            {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--tx-muted)' }} />
                        </div>
                      </Field>
                    </div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Product of Interest">
                        <div className="relative">
                          <select
                            name="product" value={form.product} onChange={set}
                            style={{ ...fieldBase, paddingRight: '2.5rem', cursor: 'pointer', appearance: 'none' }}
                            onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                            onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                          >
                            <option value="">Select product…</option>
                            {PRODUCT_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--tx-muted)' }} />
                        </div>
                      </Field>
                      <Field label="Estimated Volume">
                        <input
                          name="volume" value={form.volume} onChange={set}
                          placeholder="e.g. 25 tonnes / month"
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                    </div>

                    {/* Message */}
                    <Field label="Your Message" required>
                      <textarea
                        name="message" required value={form.message} onChange={set}
                        rows={5}
                        placeholder="Tell us about your requirements — grades, specifications, delivery port, timeline…"
                        style={{ ...fieldBase, resize: 'none' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                      />
                    </Field>

                    {/* Preferred channel */}
                    <div className="flex flex-col gap-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--tx-muted)' }}>
                        Preferred Response Channel
                      </p>
                      <div className="flex gap-6 flex-wrap">
                        {['email', 'whatsapp', 'call'].map(ch => (
                          <label key={ch} className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="radio" name="channel" value={ch}
                              checked={form.channel === ch} onChange={set}
                              className="accent-green-600 h-4 w-4"
                            />
                            <span className="text-sm capitalize" style={{ color: 'var(--tx-secondary)' }}>{ch}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={busy || !form.name || !form.email || !form.message}
                        className="btn btn-green disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ boxShadow: '0 0 24px rgba(22,163,74,0.25)' }}
                      >
                        {busy ? (
                          <>
                            <span
                              className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                              style={{ display: 'inline-block' }}
                            />
                            Sending…
                          </>
                        ) : (
                          <>Send Enquiry <Send size={14} /></>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-28">

              {/* Contact Details */}
              <FadeIn delay={0.1} direction="right">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: '0 2px 12px rgba(15,23,42,0.04)',
                  }}
                >
                  <h3
                    className="text-xs font-bold uppercase tracking-[0.14em] mb-5"
                    style={{ color: 'var(--tx-muted)' }}
                  >
                    Contact Details
                  </h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { icon: MapPin, label: 'Head Office',  val: 'No. 23 Nathan Okafor Street, Awada Obosi, Anambra State, Nigeria' },
                      { icon: Mail,   label: 'Email',        val: 'mechelinmetalsnig@gmail.com' },
                      { icon: Phone,  label: 'Phone',        val: 'Available on verified request' },
                    ].map(({ icon: Icon, label, val }) => (
                      <div key={label} className="flex gap-3 items-start">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: 'var(--clr-green-alpha)', color: 'var(--clr-green)' }}
                        >
                          <Icon size={13} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-0.5" style={{ color: 'var(--tx-muted)' }}>
                            {label}
                          </p>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Business Hours */}
              <FadeIn delay={0.18} direction="right">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: '0 2px 12px rgba(15,23,42,0.04)',
                  }}
                >
                  <h3
                    className="text-xs font-bold uppercase tracking-[0.14em] mb-4"
                    style={{ color: 'var(--tx-muted)' }}
                  >
                    Business Hours
                  </h3>
                  <div className="flex flex-col gap-0">
                    {[
                      { day: 'Mon – Fri',  time: '8:00am – 6:00pm', active: true  },
                      { day: 'Saturday',   time: '8:00am – 2:00pm', active: true  },
                      { day: 'Sunday',     time: 'Closed',           active: false },
                    ].map(({ day, time, active }, i) => (
                      <div
                        key={day}
                        className="flex justify-between items-center py-3 text-xs"
                        style={{
                          borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none',
                        }}
                      >
                        <span style={{ color: 'var(--tx-secondary)' }}>{day}</span>
                        <span
                          className="font-semibold"
                          style={{ color: active ? 'var(--tx-primary)' : 'var(--tx-muted)' }}
                        >
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Quick Links */}
              <FadeIn delay={0.26} direction="right">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'var(--clr-green-alpha)',
                    border: '1px solid rgba(22,163,74,0.15)',
                  }}
                >
                  <h3
                    className="text-xs font-bold uppercase tracking-[0.14em] mb-4"
                    style={{ color: 'var(--clr-green)' }}
                  >
                    Explore
                  </h3>
                  <div className="flex flex-col">
                    {[
                      { href: '/products', label: 'Browse Our Catalogue'        },
                      { href: '/services', label: 'Industrial Processing Services' },
                      { href: '/about',    label: 'About Mechelin Metals'         },
                    ].map(({ href, label }, i) => (
                      <Link
                        key={href}
                        href={href}
                        className="group flex items-center justify-between py-3 text-xs font-semibold transition-colors duration-200"
                        style={{
                          color: 'var(--tx-primary)',
                          borderBottom: i < 2 ? '1px solid rgba(22,163,74,0.1)' : 'none',
                        }}
                      >
                        {label}
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                          style={{ color: 'var(--clr-green)' }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </section>

      {/* ══ MAP / LOCATIONS ══ */}
      <section id="locations" className="w-full" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <LocationsSection />
      </section>

      <Footer />
    </div>
  )
}