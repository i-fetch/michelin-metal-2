'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ScrollToTopButton from '@/components/ScrollToTop'

interface Props {
  children: ReactNode
}

export default function LayoutWrapper({ children }: Props) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main style={{ paddingTop: !isAdminRoute ? '84px' : undefined }}>
        {children}
        {!isAdminRoute && <ScrollToTopButton />}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  )
}
