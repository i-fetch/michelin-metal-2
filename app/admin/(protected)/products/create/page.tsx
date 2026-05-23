// app/admin/products/create/page.tsx
import type { Metadata } from 'next'
import Link              from 'next/link'
import { ArrowLeft }     from 'lucide-react'
import ProductForm       from '@/components/admin/ProductForm'
import { createProduct } from '@/actions/products'

export const metadata: Metadata = { title: 'Add Product' }

export default function CreateProductPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products"
          className="flex items-center gap-2 text-sm transition-colors"
          style={{ color: 'var(--tx-muted)' }}>
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
      <div className="mb-8">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--tx-primary)', letterSpacing: '0.04em' }}>
          ADD PRODUCT
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--tx-muted)' }}>
          Create a new product listing in the Mechelin Metals catalogue
        </p>
      </div>
      <div className="rounded-2xl p-6 lg:p-8"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <ProductForm action={createProduct} submitLabel="Publish Product" />
      </div>
    </div>
  )
}
