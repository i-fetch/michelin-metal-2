import ProductForm from '@/components/admin/ProductForm'

export default function CreateProduct() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
          NEW PRODUCT
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--tx-muted)' }}>
          Fill in the details below to add a product to your catalogue.
        </p>
      </div>
      <ProductForm />
    </div>
  )
}
