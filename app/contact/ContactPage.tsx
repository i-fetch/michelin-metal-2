'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence, useTransform, useScroll } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ChevronDown,
  MailQuestion,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LocationsSection from '@/components/LocationSection'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */


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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: direction === 'up' ? 24 : 0,
        x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
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
const EASE_HERO = [0.16, 1, 0.3, 1] as const;

const localStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const localFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_HERO } }
};

/* ─────────────────────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────────────────────── */
export default function ContactPage(): React.JSX.Element {
  const t = useTranslations("contactPage")

  const ENQUIRY_TYPES = [
    t("enquiryTypes.0"),
    t("enquiryTypes.1"),
    t("enquiryTypes.2"),
    t("enquiryTypes.3"),
    t("enquiryTypes.4"),
    t("enquiryTypes.5"),
  ]

  const PRODUCT_LIST = [
    t("productList.0"),
    t("productList.1"),
    t("productList.2"),
    t("productList.3"),
    t("productList.4"),
    t("productList.5"),
    t("productList.6"),
    t("productList.7"),
    t("productList.8"),
    t("productList.9"),
  ]

  const QUICK_CONTACTS = [
    { icon: Mail, label: t("quickContacts.0.label"), val: t("quickContacts.0.val"), href: 'mailto:mechelinmetalsnig@gmail.com' },
    { icon: MessageSquare, label: t("quickContacts.1.label"), val: t("quickContacts.1.val"), href: 'https://wa.me/2348000000000' },
    { icon: MapPin, label: t("quickContacts.2.label"), val: t("quickContacts.2.val"), href: '#locations' },
    { icon: MapPin, label: t("quickContacts.3.label"), val: t("quickContacts.3.val"), href: '#locations' },
  ]

  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', type: '', product: '', volume: '',
    message: '', channel: 'email',
  })
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setSubmitError('Please fill in your name, email, and message.')
      return
    }

    setBusy(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result?.error || 'Failed to submit contact form')
      }

      setDone(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit your request. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    setDone(false)
    setForm({ name: '', company: '', email: '', phone: '', country: '', type: '', product: '', volume: '', message: '', channel: 'email' })
  }
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // ── PARALLAX LOGISTICS ENGINE ──
  const { scrollY } = useScroll();
  const backgroundImageY = useTransform(scrollY, [0, 800], ["0%", "20%"]);
  const contentY = useTransform(scrollY, [0, 800], ["0%", "8%"]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)' }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <section
        ref={heroContainerRef}
        className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-between overflow-hidden bg-[#ffffff] pt-36 pb-20 md:pt-44 md:pb-28"
        aria-label="Contact Procurement and Supply Operations"
      >
        {/* ══ LAYER 1: HARDWARE-ACCELERATED PARALLAX IMAGE ══ */}
        <motion.div
          style={{ y: backgroundImageY }}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
        >
          <Image
            src="/contact-corporate-hero.jpg" // High-fidelity enterprise office / operations communications background asset
            alt="Mechelin Metals Corporate Operations Communications background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.05]"
          />
        </motion.div>

        {/* ══ LAYER 2: THE CONTRAST STABILIZER MASK ENGINE (CRITICAL FOR READABILITY) ══ */}
        <div className="absolute inset-0 z-[1] pointer-events-none select-none">

          {/* MASK A: Pure white architectural block gradient to neutralize asset noise directly underneath the text layout */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-white/85 to-white/10 md:from-white md:via-white/95 md:via-white/80 md:to-white/5" />

          {/* MASK B: Micro-diffused backdrop blur sheet — separates complex image details from crisp text typography */}
          <div className="absolute top-0 bottom-0 left-0 w-full md:w-[70%] bg-white/20 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,white_50%,transparent_100%)]" />

          {/* MASK C: Top-down light-bleed controller to neutralize high-exposure highlights or bright sky lines */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/60 to-transparent" />

          {/* MASK D: Horizon baseline fading anchor to seamlessly lock section into the white blocks layout below */}
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#ffffff] via-[#ffffff]/90 to-transparent" />

          {/* Technical Brand Matrix Grid-Mesh Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#059669 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        {/* ══ LAYER 3: FOREGROUND HIGH-CONTRAST TYPOGRAPHY CANVAS ══ */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 relative z-[2] will-change-transform"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={localStaggerContainer}
            className="relative max-w-3xl"
          >
            {/* Communications Token Badge */}
            <motion.div
              variants={localFadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-600/15 bg-white text-[var(--clr-green)] text-[10px] font-bold tracking-widest uppercase mb-6 font-mono shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
            >
              <MailQuestion size={12} className="text-emerald-600" />
              {t("hero.badge")}
            </motion.div>

            {/* Ultra-Sharp Anti-Aliased Service Header */}
            <div className="overflow-hidden mb-6 py-1">
              <motion.h1
                variants={localFadeUp}
                className="font-black tracking-wider leading-[0.95] text-slate-950 subpixel-antialiased drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)] uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 7.5vw, 6rem)'
                }}
              >
                {t("hero.title1")}
                <br />
                <span className="text-[var(--clr-green)]">{t("hero.title2")}</span>
              </motion.h1>
            </div>

            {/* High-Readability Segmented Body Paragraph */}
            <motion.p
              variants={localFadeUp}
              className="text-slate-900 font-medium text-base md:text-xl max-w-xl leading-relaxed font-body tracking-tight subpixel-antialiased drop-shadow-[0_1px_4px_rgba(255,255,255,0.6)]"
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>
        </motion.div>
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
                <p className="tag mb-4">{t("form.titleTag")}</p>
                <h2
                  className="mb-10 leading-none tracking-wider"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 900,
                    color: 'var(--tx-primary)',
                  }}
                >
                  {t("form.title")} {' '}
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
                      {t("form.buttons.successTitle")}
                    </h3>
                    <p
                      className="text-sm leading-relaxed max-w-sm mx-auto mb-8"
                      style={{ color: 'var(--tx-secondary)' }}
                    >
                      {t("form.buttons.successMessage")}
                    </p>
                    <button
                      onClick={reset}
                      className="btn btn-green"
                    >
                      {t("form.buttons.another")}
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
                      <Field label={t("form.fields.fullName")} required>
                        <input
                          name="name" required value={form.name} onChange={set}
                          placeholder={t("form.placeholders.fullName")}
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                      <Field label={t("form.fields.company")}>
                        <input
                          name="company" value={form.company} onChange={set}
                          placeholder={t("form.placeholders.company")}
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label={t("form.fields.email")} required>
                        <input
                          type="email" name="email" required value={form.email} onChange={set}
                          placeholder={t("form.placeholders.email")}
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                      <Field label={t("form.fields.phone")}>
                        <input
                          name="phone" value={form.phone} onChange={set}
                          placeholder={t("form.placeholders.phone")}
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label={t("form.fields.country")}>
                        <input
                          name="country" value={form.country} onChange={set}
                          placeholder={t("form.placeholders.country")}
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                      <Field label={t("form.fields.type")}>
                        <div className="relative">
                          <select
                            name="type" value={form.type} onChange={set}
                            style={{ ...fieldBase, paddingRight: '2.5rem', cursor: 'pointer', appearance: 'none' }}
                            onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                            onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                          >
                            <option value="">{t("form.placeholders.type")}</option>
                            {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--tx-muted)' }} />
                        </div>
                      </Field>
                    </div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label={t("form.fields.product")}>
                        <div className="relative">
                          <select
                            name="product" value={form.product} onChange={set}
                            style={{ ...fieldBase, paddingRight: '2.5rem', cursor: 'pointer', appearance: 'none' }}
                            onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                            onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                          >
                            <option value="">{t("form.placeholders.product")}</option>
                            {PRODUCT_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--tx-muted)' }} />
                        </div>
                      </Field>
                      <Field label={t("form.fields.volume")}>
                        <input
                          name="volume" value={form.volume} onChange={set}
                          placeholder={t("form.placeholders.volume")}
                          style={fieldBase}
                          onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </Field>
                    </div>

                    {/* Message */}
                    <Field label={t("form.fields.message")} required>
                      <textarea
                        name="message" required value={form.message} onChange={set}
                        rows={5}
                        placeholder={t("form.placeholders.message")}
                        style={{ ...fieldBase, resize: 'none' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--clr-green)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                      />
                    </Field>

                    {/* Preferred channel */}
                    <div className="flex flex-col gap-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--tx-muted)' }}>
                        {t("form.fields.channel")}
                      </p>
                      <div className="flex gap-6 flex-wrap">
                        {(t.raw("form.channels") as string[]).map((ch: string) => (
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
                            {t("form.buttons.sending")}
                          </>
                        ) : (
                          <>{t("form.buttons.submit")} <Send size={14} /></>
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
                    {t("sidebar.contactDetails")}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { icon: MapPin, label: t("sidebar.details.headOffice"), val: t("sidebar.details.headOffice") },
                      { icon: Mail, label: t("sidebar.details.email"), val: t("sidebar.details.email") },
                      { icon: Phone, label: t("sidebar.details.phone"), val: t("sidebar.details.phoneValue") },
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
                    {t("sidebar.businessHours")}
                  </h3>
                  <div className="flex flex-col gap-0">
                    {(t.raw("sidebar.hours") as any[]).map(({ day, time }: any, i: number) => (
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
                          style={{ color: time !== 'Closed' ? 'var(--tx-primary)' : 'var(--tx-muted)' }}
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
                    {t("sidebar.explore")}
                  </h3>
                  <div className="flex flex-col">
                    {[
                      { href: '/products', label: t("sidebar.links.0") },
                      { href: '/services', label: t("sidebar.links.1") },
                      { href: '/about', label: t("sidebar.links.2") },
                    ].map(({ href, label }: any, i: number) => (
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