'use client'
import { useTransition, useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, AlertCircle } from 'lucide-react'
import { createProduct, updateProduct } from '@/actions/products'
import type { IProduct } from '@/types'

const CATEGORIES = [
  { value: 'aluminium',   label: 'Aluminium' },
  { value: 'ferrous',     label: 'Ferrous Metals' },
  { value: 'non-ferrous', label: 'Non-Ferrous' },
  { value: 'bulk',        label: 'Bulk Supply' },
]

interface Props { product?: IProduct }

export default function ProductForm({ product }: Props) {
  const isEdit = !!product
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(product?.image ?? null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = isEdit
        ? await updateProduct(product._id, fd)
        : await createProduct(fd)
      if (res && !res.success) setError(res.error)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7 max-w-3xl">
      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
          style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#ef4444' }}>
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {/* Image upload */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--tx-faint)' }}>
          Product Image {!isEdit && '*'}
        </label>
        <input ref={fileRef} type="file" name="image" accept="image/*" onChange={handleFile} className="hidden" />
        <div
          onClick={() => fileRef.current?.click()}
          className="relative rounded-xl overflow-hidden cursor-pointer transition-all hover:opacity-90 flex items-center justify-center"
          style={{ height: 200, background: 'var(--bg-3)', border: '1.5px dashed var(--border)' }}
        >
          {preview ? (
            <>
              <Image src={preview} alt="Preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Upload size={22} className="text-white" />
              </div>
            </>
          ) : (
            <div className="text-center">
              <Upload size={24} className="mx-auto mb-2" style={{ color: 'var(--tx-faint)' }} />
              <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>Click to upload image</p>
              <p className="text-xs mt-1" style={{ color: 'var(--tx-faint)' }}>JPG, PNG, WebP</p>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>
          Product Title *
        </label>
        <input name="title" required defaultValue={product?.title} placeholder="e.g. Aluminium Bales" className="field" />
      </div>

      {/* Category + Featured row */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>
            Category *
          </label>
          <select name="category" required defaultValue={product?.category ?? ''} className="field">
            <option value="">Select category…</option>
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>
            Featured
          </label>
          <select name="featured" defaultValue={product?.featured ? 'true' : 'false'} className="field">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>

      {/* Short description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>
          Short Description * <span className="normal-case font-normal">(shown on cards)</span>
        </label>
        <input name="shortDescription" required defaultValue={product?.shortDescription}
          placeholder="One-line summary of the product…" className="field" />
      </div>

      {/* Full description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>
          Full Description *
        </label>
        <textarea name="fullDescription" required rows={5} defaultValue={product?.fullDescription}
          placeholder="Detailed product description for the product page…"
          className="field resize-none" />
      </div>

      {/* Specs */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>
          Specs <span className="normal-case font-normal">(one per line)</span>
        </label>
        <textarea name="specs" rows={4} defaultValue={product?.specs?.join('\n')}
          placeholder={'Grade: Industrial / Mixed Alloy\nForm: Compressed Bales\nPurity: 95–99%\nMOQ: 1 Tonne'}
          className="field resize-none" />
      </div>

      {/* Applications */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>
          Applications <span className="normal-case font-normal">(one per line)</span>
        </label>
        <textarea name="applications" rows={3} defaultValue={product?.applications?.join('\n')}
          placeholder={'Aluminium smelters\nRolling mills\nFoundries'}
          className="field resize-none" />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={isPending}
          className="btn btn-green disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
          {isPending && <Loader2 size={14} className="animate-spin" />}
          {isPending ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Product'}
        </button>
        <a href="/admin/products" className="text-sm" style={{ color: 'var(--tx-muted)' }}>Cancel</a>
      </div>
    </form>
  )
}
