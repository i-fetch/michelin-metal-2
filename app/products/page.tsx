// app/products/page.tsx
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getPublicProducts } from '@/actions/products'
import ProductsClient from '@/components/ProductsClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = { title: 'Products & Materials' }
export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getPublicProducts()
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="p-4 text-center">Loading products...</div>}>
        <ProductsClient products={products} />
      </Suspense>
      <Footer />
    </>
  )
}
