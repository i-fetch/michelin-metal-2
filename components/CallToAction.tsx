'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type CTAButton = {
   label: string
   href: string
   icon?: ReactNode
}

type CTASectionProps = {
   title: string
   subtitle?: string
   description?: string
   icon?: ReactNode
   primaryCta?: CTAButton
   secondaryCta?: CTAButton
   trustText?: string
   backgroundVariant?: 'default' | 'green' | 'gold'
}

export default function CTASection({
   title,
   subtitle,
   description,
   icon,
   primaryCta,
   secondaryCta,
   trustText,
   backgroundVariant = 'default',
}: CTASectionProps) {
   const backgroundStyle = {
      default: `
      radial-gradient(circle at top left, var(--clr-green-alpha), transparent 40%),
      radial-gradient(circle at bottom right, var(--clr-gold-alpha), transparent 45%),
      var(--bg-main)
    `,
      green: 'var(--clr-green)',
      gold: 'var(--clr-gold)',
   }

   const isSolid = backgroundVariant !== 'default'

   return (
      <section
         className="relative overflow-hidden py-24 bg-green-600"
         style={{
            background: backgroundStyle[backgroundVariant],
         }}
      >
         {/* Decorative blobs (only for default) */}
         {backgroundVariant === 'default' && (
            <>
               <div className="absolute w-full h-full " />
               {/* <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-green-600 blur-3xl" /> */}
               {/* <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[var(--clr-green-alpha)] blur-3xl" /> */}
               {/* <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-green-600 blur-3xl" /> */}
               {/* <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[var(--clr-gold-alpha)] blur-3xl" /> */}
            </>
         )}

         <div className="wrap px-4 text-center max-w-2xl mx-auto relative z-10">
            {/* Icon */}
            {icon && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                     background: isSolid ? 'rgba(255,255,255,0.15)' : 'var(--bg-surface)',
                     boxShadow: isSolid ? 'none' : '0 10px 30px rgba(0,0,0,0.05)',
                     border: isSolid ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border-subtle)',
                  }}
               >
                  {icon}
               </motion.div>
            )}

            {/* Subtitle */}
            {subtitle && (
               <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-2 text-sm"
                  style={{
                     color: isSolid ? 'rgba(255,255,255,0.8)' : 'var(--tx-muted)',
                  }}
               >
                  {subtitle}
               </motion.p>
            )}

            {/* Title */}
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="mb-4 tracking-wide"
               style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: isSolid ? '#fff' : 'var(--tx-primary)',
               }}
            >
               {title}
            </motion.h2>

            {/* Description */}
            {description && (
               <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-10 text-[15px] leading-relaxed"
                  style={{
                     color: isSolid ? 'rgba(255,255,255,0.75)' : 'var(--tx-muted)',
                  }}
               >
                  {description}
               </motion.p>
            )}

            {/* Buttons */}
            {(primaryCta || secondaryCta) && (
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap justify-center gap-4"
               >
                  {primaryCta && (
                     <Link
                        href={primaryCta.href}
                        className="group inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all"
                        style={{
                           background: isSolid ? '#fff' : 'var(--clr-green)',
                           color: isSolid ? 'var(--clr-green)' : '#fff',
                           boxShadow: isSolid
                              ? 'none'
                              : '0 10px 25px rgba(22,163,74,0.25)',
                        }}
                     >
                        {primaryCta.label}
                        <span className="transition-transform group-hover:translate-x-1">
                           {primaryCta.icon}
                        </span>
                     </Link>
                  )}

                  {secondaryCta && (
                     <Link
                        href={secondaryCta.href}
                        className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold"
                        style={{
                           background: 'transparent',
                           color: isSolid ? '#fff' : 'var(--tx-primary)',
                           border: isSolid
                              ? '1px solid rgba(255,255,255,0.3)'
                              : '1px solid var(--border-subtle)',
                        }}
                     >
                        {secondaryCta.label}
                     </Link>
                  )}
               </motion.div>
            )}

            {/* Trust text */}
            {trustText && (
               <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mt-6 text-xs"
                  style={{
                     color: isSolid ? 'rgba(255,255,255,0.6)' : 'var(--tx-muted)',
                  }}
               >
                  {trustText}
               </motion.p>
            )}
         </div>
      </section>
   )
}