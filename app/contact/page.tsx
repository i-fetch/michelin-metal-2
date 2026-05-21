'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react'
import AOS from '@/components/AnimateOnScroll'
import LocationsSection from '@/components/LocationsSection'

const enquiryTypes = ['Product Enquiry', 'Bulk Purchase / Contract', 'Scrap Metal Sale', 'Export / Import Partnership', 'General Information', 'Other']
const productList = ['Aluminium Bales', 'Aluminium Scrap (Loose)', 'Heavy Melting Steel', 'Vehicle Body Scrap', 'Cast Iron Scrap', 'Copper Scrap', 'Brass Scrap', 'Lead Scrap', 'Bulk Raw Supply', 'Multiple / Other']

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', country: '', type: '', product: '', volume: '', message: '', channel: 'email' })
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = () => {
    if (!form.name || !form.email || !form.message) return
    setBusy(true)
    setTimeout(() => { setBusy(false); setDone(true) }, 1400)
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0 grid-dots opacity-20" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }} />
        <div className="wrap px-5 relative z-10">
          <AOS>
            <p className="tag mb-5">Reach Us</p>
            <h1 className="mb-4 leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,5rem)', color: 'var(--tx-primary)' }}>
              GET IN<br /><span style={{ color: 'var(--clr-green)' }}>TOUCH</span>
            </h1>
            <p className="text-lg max-w-md" style={{ color: 'var(--tx-muted)', fontWeight: 300 }}>
              Ready to source metals, sell scrap, or explore a supply partnership? We&apos;re here.
            </p>
          </AOS>
        </div>
      </section>

      {/* Contact cards */}
      <section style={{ background: 'var(--bg-2)', padding: '1.5rem 0' }}>
        <div className="wrap px-5 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Mail, label: 'Email', val: 'mechelinmetalsnig@gmail.com', href: 'mailto:mechelinmetalsnig@gmail.com' },
            { icon: MessageSquare, label: 'WhatsApp', val: 'Message us directly', href: '#' },
            { icon: MapPin, label: 'Head Office', val: 'Awada Obosi, Anambra, Nigeria', href: '#' },
          ].map(({ icon: Icon, label, val, href }) => (
            <a key={label} href={href}
              className="card rounded-xl p-5 flex items-center gap-4 group transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(22,163,74,0.10)' }}>
                <Icon size={18} style={{ color: 'var(--clr-green)' }} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--tx-faint)' }}>{label}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--tx-primary)' }}>{val}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form + info */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-5">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Form */}
            <div className="lg:col-span-2">
              <AOS>
                <p className="tag mb-5">Send an Enquiry</p>
                <h2 className="mb-8" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--tx-primary)' }}>
                  ENQUIRY FORM
                </h2>
              </AOS>

              {done ? (
                <AOS>
                  <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(22,163,74,0.08)', border: '1.5px solid rgba(22,163,74,0.25)' }}>
                    <CheckCircle2 size={52} style={{ color: 'var(--clr-green)', margin: '0 auto 1.5rem' }} />
                    <h3 className="mb-2 text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>ENQUIRY RECEIVED!</h3>
                    <p className="mb-6 text-sm" style={{ color: 'var(--tx-muted)' }}>
                      Thank you <strong style={{ color: 'var(--tx-primary)' }}>{form.name}</strong> — we&apos;ll respond within 1 business day via your preferred channel.
                    </p>
                    <button onClick={() => { setDone(false); setForm({ name: '', company: '', email: '', phone: '', country: '', type: '', product: '', volume: '', message: '', channel: 'email' }) }}
                      className="btn btn-green">
                      Submit Another
                    </button>
                  </div>
                </AOS>
              ) : (
                <AOS delay={100}>
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>Full Name *</label>
                        <input name="name" value={form.name} onChange={set} placeholder="John Adeyemi" className="field" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>Company Name</label>
                        <input name="company" value={form.company} onChange={set} placeholder="Your Company Ltd" className="field" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>Email Address *</label>
                        <input type="email" name="email" value={form.email} onChange={set} placeholder="you@company.com" className="field" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>Phone / WhatsApp</label>
                        <input name="phone" value={form.phone} onChange={set} placeholder="+234 800 000 0000" className="field" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>Country</label>
                        <input name="country" value={form.country} onChange={set} placeholder="Nigeria" className="field" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>Enquiry Type</label>
                        <select name="type" value={form.type} onChange={set} className="field">
                          <option value="">Select...</option>
                          {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>Product of Interest</label>
                        <select name="product" value={form.product} onChange={set} className="field">
                          <option value="">Select product...</option>
                          {productList.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>Volume (Tonnes)</label>
                        <input name="volume" value={form.volume} onChange={set} placeholder="e.g. 5 tonnes/month" className="field" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>Message *</label>
                      <textarea name="message" value={form.message} onChange={set} rows={5}
                        placeholder="Describe your requirements — specifications, delivery location, timeline..."
                        className="field resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--tx-faint)' }}>Preferred Response</label>
                      <div className="flex gap-5">
                        {['email', 'whatsapp', 'call'].map(ch => (
                          <label key={ch} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="channel" value={ch} checked={form.channel === ch} onChange={set} className="accent-green-600" />
                            <span className="text-sm capitalize" style={{ color: 'var(--tx-secondary)' }}>{ch}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <button onClick={submit} disabled={busy || !form.name || !form.email || !form.message}
                      className="btn btn-green disabled:opacity-50 disabled:cursor-not-allowed">
                      {busy ? 'Sending...' : 'Send Enquiry'} <Send size={14} />
                    </button>
                  </div>
                </AOS>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <AOS delay={200}>
                <div className="card rounded-2xl p-7">
                  <h3 className="mb-5 text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>CONTACT DETAILS</h3>
                  <div className="space-y-4">
                    {[
                      { icon: MapPin, label: 'Address', val: 'No. 23 Nathan Okafor Street, Awada Obosi, Anambra State, Nigeria' },
                      { icon: Mail, label: 'Email', val: 'mechelinmetalsnig@gmail.com' },
                      { icon: Phone, label: 'Phone', val: 'Available on request' },
                    ].map(({ icon: Icon, label, val }) => (
                      <div key={label} className="flex gap-3">
                        <Icon size={14} style={{ color: 'var(--clr-green)', marginTop: 2, flexShrink: 0 }} />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--tx-faint)' }}>{label}</p>
                          <p className="text-sm mt-0.5" style={{ color: 'var(--tx-secondary)' }}>{val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AOS>

              <AOS delay={300}>
                <div className="card rounded-2xl p-7">
                  <h3 className="mb-4 text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>BUSINESS HOURS</h3>
                  {[['Mon – Fri', '8:00am – 6:00pm'], ['Saturday', '8:00am – 2:00pm'], ['Sunday', 'Closed']].map(([d, t]) => (
                    <div key={d} className="flex justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span className="text-sm" style={{ color: 'var(--tx-muted)' }}>{d}</span>
                      <span className="text-sm font-semibold" style={{ color: t === 'Closed' ? 'var(--tx-faint)' : 'var(--tx-primary)' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </AOS>

              <AOS delay={380}>
                <div className="rounded-2xl p-7" style={{ background: 'var(--clr-green)' }}>
                  <h3 className="text-white mb-3 text-xl" style={{ fontFamily: 'var(--font-display)' }}>QUICK LINKS</h3>
                  {[{ href: '/products', label: 'Browse Products' }, { href: '/services', label: 'Our Services' }, { href: '/about', label: 'About The Company' }].map(l => (
                    <Link key={l.href} href={l.href}
                      className="flex items-center justify-between py-3 text-sm font-medium text-green-100 hover:text-white transition-colors"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                      {l.label} <ArrowRight size={13} />
                    </Link>
                  ))}
                </div>
              </AOS>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section py-20" style={{ background: 'var(--bg-2)', transition: 'all 0.3s ease' }}>
        <LocationsSection />
      </section>
    </>
  )
}
