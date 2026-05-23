import type { Metadata } from 'next'
import './globals.css'

import { Bebas_Neue, DM_Sans, DM_Mono } from 'next/font/google'
import SessionWrapper from '@/components/SessionWrapper/SessionWrapper'
import ScrollToTopButton from '@/components/ScrollToTop'

const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const mono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Mechelin Metals Nigeria | Metal Recycling Solutions',
    template: '%s | Mechelin Metals',
  },
  description: "Nigeria's foremost integrated metal recycling company. Aluminium bales, ferrous & non-ferrous metals — national and global bulk supply.",
  keywords: [
    'metal recycling Nigeria',
    'aluminium scrap',
    'ferrous metals',
    'bulk raw materials',
    'West Africa',
    'Anambra',
  ],

  icons: {
    icon: [
      {
        url: "/logo-favicon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],

    shortcut: "/logo-favicon.png",

    apple: "/logo-favicon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body cz-shortcut-listen="true">
        <SessionWrapper>
          {children}
          <ScrollToTopButton />
        </SessionWrapper>
      </body>
    </html>
  )
}