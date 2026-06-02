import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "MechelinAdmin — Industrial Materials Dashboard",
    template: "%s | MechelinAdmin",
  },
  description: "Premium non-ferrous scrap metals admin dashboard and product catalogue.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-gray-50 text-gray-900" cz-shortcut-listen="true">{children}</body>
    </html>
  )
}
