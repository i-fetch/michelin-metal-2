import Link    from 'next/link'
import Image   from 'next/image'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { getProducts }   from '@/actions/products'
import DeleteButton      from '@/components/admin/DeleteButton'

export default async function AdminProducts() {
  const products = await getProducts()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
            PRODUCTS
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--tx-muted)' }}>
            {products.length} product{products.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link href="/admin/products/create" className="btn btn-green text-sm flex items-center gap-2">
          <Plus size={15} /> Add Product
        </Link>
      </div>

      {/* Table */}
      {products.length === 0 ? (
        <div className="card rounded-xl p-12 text-center" style={{ border: '1.5px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>No products yet.</p>
          <Link href="/admin/products/create" className="btn btn-green text-sm mt-4 inline-flex items-center gap-2">
            <Plus size={13} /> Create your first product
          </Link>
        </div>
      ) : (
        <div className="card rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-3)' }}>
                {['Product','Category','Featured','Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--tx-faint)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}
                  className="transition-colors hover:bg-[rgba(22,163,74,0.03)]">
                  {/* Product */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                        <Image src={p.image} alt={p.title} width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: 'var(--tx-primary)' }}>{p.title}</p>
                        <p className="text-xs" style={{ color: 'var(--tx-faint)' }}>{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-full capitalize"
                      style={{ background: 'var(--bg-3)', color: 'var(--tx-muted)', border: '1px solid var(--border)' }}>
                      {p.category}
                    </span>
                  </td>
                  {/* Featured */}
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${p.featured ? 'text-green-600' : ''}`}
                      style={{ background: p.featured ? 'rgba(22,163,74,0.1)' : 'var(--bg-3)',
                               color: p.featured ? 'var(--clr-green)' : 'var(--tx-faint)',
                               border: `1px solid ${p.featured ? 'rgba(22,163,74,0.25)' : 'var(--border)'}` }}>
                      {p.featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/edit/${p._id}`}
                        className="p-2 rounded-lg transition-colors hover:bg-[rgba(22,163,74,0.08)]"
                        style={{ color: 'var(--tx-muted)' }}>
                        <Pencil size={14} />
                      </Link>
                      <DeleteButton id={p._id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
