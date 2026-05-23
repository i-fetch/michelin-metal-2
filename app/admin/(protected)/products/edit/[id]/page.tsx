// app/admin/products/edit/[id]/page.tsx
import type { Metadata } from 'next'
import Link              from 'next/link'
import { notFound }      from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import ProductForm       from '@/components/admin/ProductForm'
import { getProductById } from '@/actions/products'
import { updateProduct } from '@/actions/products'

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Edit Product' }

export default async function EditProductPage({ params }: Props) {
  const { id }  = await params
  const product = await getProductById(id)
  if (!product) notFound()

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link href="/admin/products"
          className="flex items-center gap-2 text-sm transition-colors"
          style={{ color: 'var(--tx-muted)' }}>
          <ArrowLeft size={16} /> Back to Products
        </Link>
        <Link href={`/products/${product.slug}`} target="_blank"
          className="flex items-center gap-1.5 text-xs"
          style={{ color: 'var(--clr-green)' }}>
          <ExternalLink size={12} /> View Live
        </Link>
      </div>
      <div className="mb-8">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--tx-primary)', letterSpacing: '0.04em' }}>
          EDIT PRODUCT
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--tx-muted)' }}>
          {product.title}
        </p>
      </div>
      <div className="rounded-2xl p-6 lg:p-8"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <ProductForm product={product} action={updateProduct} submitLabel="Save Changes" />
      </div>
    </div>
  )
}
