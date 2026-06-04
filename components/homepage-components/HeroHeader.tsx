"use client"

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MedalIcon } from 'lucide-react'
import { motion } from "framer-motion"

export const metadata: Metadata = {
  title: "Nigeria's #1 Metal Recycling Company"
}

const stats = [
  { num: '10+', label: 'Years Active' },
  { num: '50+', label: 'B2B Partners' },
  { num: '100K+', label: 'Tonnes Processed' },
  { num: '2+', label: 'Continents' },
]

// ── Animation Variants ─────────────────────────────
import { cubicBezier, Variants } from "framer-motion"

const ease = cubicBezier(0.22, 1, 0.36, 1)

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
}
export default function HeroHeader() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={container}
        className="relative min-h-screen flex items-center overflow-hidden"
      >

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            // playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/header-vid.mp4" type="video/mp4" />
          </video>

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `
                linear-gradient(
                  105deg,
                  rgba(9,9,11,0.88) 42%,
                  rgba(9,9,11,0.55) 100%
                ),
                url('/header-img.png')
              `,
            }}
          />
        </div>

        {/* CONTENT */}
        <div className="wrap px-5 relative z-10 pt-10">
          <div className="max-w-full">

            {/* Tag */}
            <motion.div
              variants={item}
              className="tag-gold border inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-medium mb-5"
            >
              <MedalIcon className="text-gold-500" size={16} />
              Metal Recycle Industry · West Africa
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={item}
              className="text-white mb-6 leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem,8vw,6.5rem)',
                letterSpacing: '0.03em'
              }}
            >
              TURNING METAL{' '}
              <span style={{ color: 'var(--clr-green-light)' }}>WASTE</span>{' '}
              INTO GLOBAL{' '}
              <span style={{ color: 'var(--clr-gold)' }}>VALUE</span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={item}
              className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300
              }}
            >
              Mechelin Metals Nigeria — sourcing, sorting, baling and distributing aluminium and ferrous metals to manufacturers across West Africa and the world.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-4 mb-16"
            >
              <Link href="/products" className="btn btn-green">
                Explore Products <ArrowRight size={15} />
              </Link>

              <Link
                href="/about"
                className="btn btn-outline"
                style={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#fff'
                }}
              >
                Our Story <ArrowRight size={15} />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* FLOATING STATS (DESKTOP) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 inset-x-0 z-10 hidden md:block"
        >
          <div className="w-11/12 bg-white mx-auto rounded-t-lg border border-gray-300 overflow-hidden">
            <div className="grid grid-cols-4 divide-x divide-gray-300">

              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="py-5 px-6 text-center"
                >
                  <p className="stat-num tracking-wider">{s.num}</p>
                  <p className="text-xs uppercase tracking-widest mt-1 text-[var(--tx-muted)]">
                    {s.label}
                  </p>
                </motion.div>
              ))}

            </div>
          </div>
        </motion.div>

      </motion.section>

      {/* MOBILE STATS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="md:hidden grid grid-cols-2 divide-x divide-y divide-gray-300 bg-[var(--border)]"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="py-6 text-center bg-[var(--surface)]"
          >
            <p className="stat-num tracking-wider">{s.num}</p>
            <p className="text-xs uppercase tracking-widest mt-1 text-[var(--tx-muted)]">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}