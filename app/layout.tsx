import type { Metadata } from 'next'
import './globals.css'
import SessionWrapper from '@/components/SessionWrapper/SessionWrapper'
import ScrollToTopButton from '@/components/ScrollToTop'
import { Bebas_Neue, DM_Sans, DM_Mono, Geist } from 'next/font/google'
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner'
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
  // Setting explicitly to light mode for standard browser engine layouts
  keywords: [
    'metal recycling Nigeria',
    'aluminium scrap',
    'non-ferrous metals',
    'bulk raw materials',
    'West Africa',
    'Anambra',
  ],
  icons: {
    icon: [{ url: "/logo-favicon.png", type: "image/png", sizes: "32x32" }],
    shortcut: "/logo-favicon.png",
    apple: "/logo-favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale}
      // Removed all traces of the "dark" class flag completely
      className={cn(display.variable, body.variable, mono.variable, "font-sans", geist.variable)}
      style={{ colorScheme: 'light' }}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body cz-shortcut-listen="true" className="antialiased bg-app text-tx-primary">
        <NextIntlClientProvider messages={messages} >
          <SessionWrapper>
            {children}
            <Toaster />
            <ScrollToTopButton />
          </SessionWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}