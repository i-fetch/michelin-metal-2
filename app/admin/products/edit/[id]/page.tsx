import { notFound }       from 'next/navigation'
import { getProductById } from '@/actions/products'
import ProductForm        from '@/components/admin/ProductForm'

interface Props { params: Promise<{ id: string }> }

export default async function EditProduct({ params }: Props) {
  const { id }  = await params
  const product = await getProductById(id)
  if (!product) notFound()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
          EDIT PRODUCT
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--tx-muted)' }}>{product.title}</p>
      </div>
      <ProductForm product={product} />
    </div>
  )
}
