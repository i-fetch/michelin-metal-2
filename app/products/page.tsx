// app/products/page.tsx
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getPublicProducts } from '@/actions/products'
import ProductsClient from '@/components/ProductsClient'

export const metadata: Metadata = { title: 'Products & Materials' }
export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getPublicProducts()
  return (
    <Suspense>
      <ProductsClient products={products} />
    </Suspense>
  )
}
