// Footer.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  // Multi-language tracking array mapped inside the component execution scope
  const dynamicLinks = [
    { href: '/about', key: 'about' },
    { href: '/products', key: 'products' },
    { href: '/services', key: 'services' },
    { href: '/contact', key: 'contact' },
  ];

  const productKeys = [
    "aluminiumBales",
    "nonFerrousScrap",
    "copperScrap",
    "brassScrap",
    "bulkSupply",
  ] as const;

  return (
    <footer style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
      <div className="wrap px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand Presentation Column */}
          <div className="md:col-span-5">

            {/* Logo Group */}
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

            {/* Localized Brand Pitch */}
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--tx-muted)' }}>
              {t('brandDescription')}
            </p>

            {/* Structural Contacts Stack */}
            <div className="flex flex-col gap-3">
              {[
                { icon: MapPin, text: 'No. 23 Nathan Okafor St, Awada Obosi, Anambra, Nigeria' },
                { icon: MapPin, text: 'No. 32 Louis Mbanefo St, Woliwo Layout, Anambra, Nigeria' },
                { icon: Mail, text: 'mechelinmetalsnig@gmail.com' },
                { icon: Phone, text: 'WhatsApp preferred' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex gap-2.5 items-start text-sm" style={{ color: 'var(--tx-muted)' }}>
                  <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--clr-green)' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Route Map */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--tx-faint)' }}>
              {t('navigation')}
            </p>
            <ul className="space-y-2.5">
              {dynamicLinks.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-1.5 text-sm transition-colors hover:gap-2.5"
                    style={{ color: 'var(--tx-secondary)', fontFamily: 'var(--font-body)' }}
                  >
                    <ArrowUpRight size={12} style={{ color: 'var(--clr-green)' }} />
                    {t(`links.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Products Catalog Subsection */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--tx-faint)' }}>
              {t('products')}
            </p>
            <ul className="space-y-2.5">
              {productKeys.map((key) => (
                <li key={key}>
                  <Link
                    href="/products"
                    className="flex items-center gap-1.5 text-sm transition-colors hover:gap-2.5"
                    style={{ color: "var(--tx-secondary)" }}
                  >
                    <ArrowUpRight size={12} style={{ color: "var(--clr-green)" }} />
                    {t(`productList.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Footer Baseboard */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '1rem 0' }}>
        <div className="wrap px-5 text-center flex flex-col sm:flex-row items-center justify-center gap-2 text-xs" style={{ color: 'var(--tx-faint)' }}>
          <span className="text-xs text-center">
            © {new Date().getFullYear()} Mechelin Metals Nigeria LTD <br />
            {t('copyright')}
          </span>
        </div>
      </div>
    </footer>
  );
}