import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default:'Mechelin Metals Nigeria | Metal Recycling Solutions', template:'%s | Mechelin Metals' },
  description:"Nigeria's foremost integrated metal recycling company. Aluminium bales, ferrous & non-ferrous metals — national and global bulk supply.",
  keywords:['metal recycling Nigeria','aluminium scrap','ferrous metals','bulk raw materials','West Africa','Anambra'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
