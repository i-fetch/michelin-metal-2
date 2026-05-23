'use client'

import { useActionState, useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Loader2, Upload, X, ChevronDown, ChevronRight, ChevronLeft,
  Package, Settings, Truck, DollarSign, Tag, CheckCircle2,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  PRODUCT_CATEGORIES, UNIT_TYPES, CURRENCIES, PACKAGING_TYPES,
} from '@/lib/productCategories'
import type { Product } from '@/types'

interface Props {
  product?: Product
  action: (prevState: any, formData: FormData) => Promise<any>
  submitLabel: string
}

const CONDITIONS = ['Recycled', 'Scrap', 'Processed', 'Refined', 'Mixed', 'Clean']

const STEPS = [
  { id: 0, label: 'Basic Info',  short: 'Basic',    icon: Package    },
  { id: 1, label: 'Specs',       short: 'Specs',    icon: Settings   },
  { id: 2, label: 'Logistics',   short: 'Logistics',icon: Truck      },
  { id: 3, label: 'Pricing',     short: 'Pricing',  icon: DollarSign },
  { id: 4, label: 'SEO & Tags',  short: 'SEO',      icon: Tag        },
] as const

export default function ProductForm({ product, action, submitLabel }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const fileRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState(0)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedPreviews, setSelectedPreviews] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState(
    product?.imageIds?.map((id, idx) => ({ id, src: product.images[idx] })) ?? []
  )
  const [showPrice, setShowPrice] = useState(product?.showPrice ?? true)
  const [requestQuote, setRequestQuote] = useState(product?.requestQuote ?? false)

  const [state, formAction, pending] = useActionState(
    async (prev: any, fd: FormData) => {
      const result = await action(prev, fd)
      if (result.success) {
        toast({ title: 'Saved!', description: `Product ${product ? 'updated' : 'created'} successfully.` })
        router.push('/admin/products')
        router.refresh()
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' })
      }
      return result
    },
    { success: false, error: '' }
  )

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setSelectedFiles(p => [...p, ...files])
    setSelectedPreviews(p => [...p, ...files.map(f => URL.createObjectURL(f))])
  }
  function removeNew(i: number) {
    setSelectedFiles(p => p.filter((_, j) => j !== i))
    setSelectedPreviews(p => p.filter((_, j) => j !== i))
  }
  function removeExisting(i: number) {
    if (!confirm('Remove this image from the product?')) return
    setExistingImages(p => p.filter((_, j) => j !== i))
  }

  const totalImages = existingImages.length + selectedFiles.length
  const isLastStep = step === STEPS.length - 1

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Safety guard: never allow submission unless the user is on the final step
    if (!isLastStep) {
      e.preventDefault()
      return
    }
    const fd = new FormData(e.currentTarget)
    fd.set('existingImageIds', JSON.stringify(existingImages.map(i => i.id)))
    selectedFiles.forEach(f => fd.append('images', f))
    e.preventDefault()
    formAction(fd)
  }

  return (
    <form onSubmit={handleSubmit}>
      {product && <input type="hidden" name="id" value={product._id} />}

      {/* ── Step Progress Bar ── */}
      <div className="mb-8">
        {/* Mobile: compact pill progress */}
        <div className="flex sm:hidden items-center justify-between mb-4 px-1">
          <span className="text-xs font-semibold" style={{ color: 'var(--tx-faint)' }}>
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-sm font-bold" style={{ color: 'var(--tx-primary)' }}>
            {STEPS[step].label}
          </span>
        </div>
        {/* Mobile: thin progress bar */}
        <div className="sm:hidden h-1.5 rounded-full mb-6" style={{ background: 'var(--bg-3)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((step + 1) / STEPS.length) * 100}%`,
              background: 'var(--clr-green)',
            }}
          />
        </div>

        {/* Desktop: full step indicators */}
        <div className="hidden sm:flex items-center gap-0">
          {STEPS.map((s, idx) => {
            const Icon = s.icon
            const isDone = idx < step
            const isActive = idx === step
            const isUpcoming = idx > step
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => setStep(idx)}
                  className="flex flex-col items-center gap-1.5 group transition-all"
                  style={{ minWidth: 64 }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
                    style={{
                      background: isDone
                        ? 'var(--clr-green)'
                        : isActive
                        ? 'rgba(22,163,74,0.15)'
                        : 'var(--bg-3)',
                      border: isActive
                        ? '2px solid var(--clr-green)'
                        : isDone
                        ? '2px solid var(--clr-green)'
                        : '2px solid var(--border)',
                    }}
                  >
                    {isDone ? (
                      <CheckCircle2 size={16} style={{ color: '#fff' }} />
                    ) : (
                      <Icon
                        size={15}
                        style={{
                          color: isActive ? 'var(--clr-green)' : 'var(--tx-faint)',
                        }}
                      />
                    )}
                  </div>
                  <span
                    className="text-[10px] font-semibold leading-tight text-center"
                    style={{
                      color: isActive
                        ? 'var(--tx-primary)'
                        : isDone
                        ? 'var(--clr-green)'
                        : 'var(--tx-faint)',
                    }}
                  >
                    {s.short}
                  </span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mx-1 transition-all duration-500"
                    style={{
                      background: idx < step ? 'var(--clr-green)' : 'var(--border)',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Step Panels — ALL rendered, hidden via display:none to preserve form state ── */}

      {/* STEP 0: Basic Info */}
      <div style={{ display: step === 0 ? 'block' : 'none' }}>
        <StepHeading title="Basic Info" subtitle="Tell buyers what you're selling" />
        <div className="space-y-5">
          <Row label="Product Title *">
            <input name="title" required defaultValue={product?.title}
              placeholder="e.g. Aluminium UBC Bales" className="field" />
          </Row>

          <div className="grid sm:grid-cols-2 gap-5">
            <Row label="Category *">
              <div className="relative">
                <select name="category" required defaultValue={product?.category ?? 'aluminium'} className="field appearance-none pr-8 cursor-pointer">
                  {PRODUCT_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--tx-faint)' }} />
              </div>
            </Row>
            <Row label="Subcategory">
              <input name="subcategory" defaultValue={product?.subcategory}
                placeholder="e.g. UBC, Profile, Copper Wire…" className="field" />
            </Row>
          </div>

          <Row label="Short Description *">
            <textarea name="shortDescription" required rows={2} defaultValue={product?.shortDescription}
              placeholder="1–2 sentence summary shown on product cards…" className="field" style={{ resize: 'vertical' }} />
          </Row>

          <Row label="Full Description *">
            <textarea name="fullDescription" required rows={6} defaultValue={product?.fullDescription}
              placeholder="Detailed product description. Paragraph breaks supported." className="field" style={{ resize: 'vertical' }} />
          </Row>

          <div className="grid sm:grid-cols-2 gap-5">
            <Row label="Status">
              <div className="relative">
                <select name="status" defaultValue={product?.status ?? 'active'} className="field appearance-none pr-8 cursor-pointer">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--tx-faint)' }} />
              </div>
            </Row>
            <Row label="&nbsp;">
              <label className="flex items-center gap-3 h-full cursor-pointer">
                <input type="checkbox" name="featured" value="true" defaultChecked={product?.featured}
                  className="w-4 h-4 accent-green-600 rounded" />
                <span className="text-sm" style={{ color: 'var(--tx-secondary)' }}>Mark as Featured</span>
              </label>
            </Row>
          </div>

          {/* Images */}
          <div>
            <p className="field-label">Product Images * ({totalImages} total)</p>

            {existingImages.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 mb-4">
                {existingImages.map((img, idx) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden"
                    style={{ aspectRatio: '1', border: '1px solid var(--border)' }}>
                    <Image src={img.src} alt="" fill className="object-cover" sizes="80px" />
                    <button type="button" onClick={() => removeExisting(idx)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(239,68,68,0.9)' }}>
                      <X size={11} className="text-white" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(0,0,0,0.75)', color: '#fff' }}>MAIN</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedPreviews.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 mb-4">
                {selectedPreviews.map((src, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden"
                    style={{ aspectRatio: '1', border: '1px solid rgba(22,163,74,0.3)' }}>
                    <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                    <button type="button" onClick={() => removeNew(idx)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(239,68,68,0.9)' }}>
                      <X size={11} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-xl overflow-hidden cursor-pointer"
              style={{ border: '2px dashed var(--border)', minHeight: 120 }}
              onClick={() => fileRef.current?.click()}>
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(22,163,74,0.1)' }}>
                  <Upload size={18} style={{ color: 'var(--clr-green)' }} />
                </div>
                <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>Click to add images</p>
                <p className="text-xs" style={{ color: 'var(--tx-faint)' }}>Multiple files • PNG, JPG, WEBP up to 10MB each</p>
              </div>
              <input ref={fileRef} type="file" name="images" accept="image/*" multiple className="hidden" onChange={handleFiles} />
            </div>
          </div>
        </div>
      </div>

      {/* STEP 1: Specs */}
      <div style={{ display: step === 1 ? 'block' : 'none' }}>
        <StepHeading title="Specifications" subtitle="Material grades, condition, and detailed specs" />
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Row label="Purity">
              <input name="purity" defaultValue={product?.purity}
                placeholder="e.g. 99.7% Al, ≥99% Cu" className="field" />
            </Row>
            <Row label="Material Grade">
              <input name="materialGrade" defaultValue={product?.materialGrade}
                placeholder="e.g. A356, No.1 Copper, HMS 1" className="field" />
            </Row>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Row label="Condition">
              <div className="relative">
                <select name="condition" defaultValue={product?.condition ?? 'Recycled'} className="field appearance-none pr-8 cursor-pointer">
                  {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--tx-faint)' }} />
              </div>
            </Row>
            <Row label="Recycling Classification">
              <input name="recyclingClass" defaultValue={product?.recyclingClass}
                placeholder="e.g. Twitch, Taint/Tabor, Birch/Cliff" className="field" />
            </Row>
          </div>
          <Row label="Detailed Specifications (one per line)">
            <textarea name="specs" rows={6} defaultValue={product?.specs.join('\n')}
              placeholder={"Purity: ≥98% Al\nForm: Bales / Loose\nDensity: 2.7 g/cm³\nFe content: <0.3%"}
              className="field" style={{ resize: 'vertical', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }} />
          </Row>
          <Row label="Industrial Applications (one per line)">
            <textarea name="applications" rows={4} defaultValue={product?.applications.join('\n')}
              placeholder={"Automotive casting\nSecondary smelting\nExtrusion billet\nExport"}
              className="field" style={{ resize: 'vertical' }} />
          </Row>
        </div>
      </div>

      {/* STEP 2: Logistics */}
      <div style={{ display: step === 2 ? 'block' : 'none' }}>
        <StepHeading title="Logistics" subtitle="Quantities, packaging, and delivery details" />
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Row label="Quantity Available">
              <input name="quantityAvailable" defaultValue={product?.quantityAvailable}
                placeholder="e.g. 50, 200, 1000" className="field" />
            </Row>
            <Row label="Unit Type">
              <div className="relative">
                <select name="unitType" defaultValue={product?.unitType ?? 'Metric Tons'} className="field appearance-none pr-8 cursor-pointer">
                  {UNIT_TYPES.map(u => <option key={u}>{u}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--tx-faint)' }} />
              </div>
            </Row>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Row label="Minimum Order Quantity (MOQ)">
              <input name="moq" defaultValue={product?.moq}
                placeholder="e.g. 5, 20, 1 container" className="field" />
            </Row>
            <Row label="Monthly Supply Capacity">
              <input name="supplyCapacity" defaultValue={product?.supplyCapacity}
                placeholder="e.g. 500 MT/month" className="field" />
            </Row>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Row label="Packaging Type">
              <div className="relative">
                <select name="packagingType" defaultValue={product?.packagingType ?? 'Baled'} className="field appearance-none pr-8 cursor-pointer">
                  {PACKAGING_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--tx-faint)' }} />
              </div>
            </Row>
            <Row label="Country of Origin">
              <input name="countryOfOrigin" defaultValue={product?.countryOfOrigin ?? 'Nigeria'}
                placeholder="Nigeria" className="field" />
            </Row>
          </div>
          <Row label="Delivery Timeline">
            <input name="deliveryTimeline" defaultValue={product?.deliveryTimeline}
              placeholder="e.g. 7–14 business days, FOB Lagos" className="field" />
          </Row>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: 'var(--tx-secondary)' }}>
              <input type="checkbox" name="exportAvailable" value="true" defaultChecked={product?.exportAvailable ?? true}
                className="w-4 h-4 accent-green-600" />
              Export Available (International)
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: 'var(--tx-secondary)' }}>
              <input type="checkbox" name="stockAvailable" value="true" defaultChecked={product?.stockAvailable ?? true}
                className="w-4 h-4 accent-green-600" />
              In Stock / Available
            </label>
          </div>
        </div>
      </div>

      {/* STEP 3: Pricing */}
      <div style={{ display: step === 3 ? 'block' : 'none' }}>
        <StepHeading title="Pricing" subtitle="Set your pricing strategy and visibility" />
        <div className="space-y-5">
          <div className="flex flex-wrap gap-5 p-4 rounded-xl" style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
            <label className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: 'var(--tx-secondary)' }}>
              <input type="checkbox" name="showPrice" value="true"
                checked={showPrice} onChange={e => setShowPrice(e.target.checked)}
                className="w-4 h-4 accent-green-600" />
              Show Price Publicly
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: 'var(--tx-secondary)' }}>
              <input type="checkbox" name="priceNegotiable" value="true" defaultChecked={product?.priceNegotiable}
                className="w-4 h-4 accent-green-600" />
              Price Negotiable
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: 'var(--tx-secondary)' }}>
              <input type="checkbox" name="requestQuote" value="true"
                checked={requestQuote} onChange={e => setRequestQuote(e.target.checked)}
                className="w-4 h-4 accent-green-600" />
              "Request Quote" (hide price)
            </label>
          </div>

          {!requestQuote && (
            <div className="grid sm:grid-cols-2 gap-5">
              <Row label="Price">
                <input name="price" type="number" min="0" step="0.01"
                  defaultValue={product?.price ?? ''}
                  placeholder="e.g. 1500" className="field" />
              </Row>
              <Row label="Currency">
                <div className="relative">
                  <select name="currency" defaultValue={product?.currency ?? 'USD'} className="field appearance-none pr-8 cursor-pointer">
                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--tx-faint)' }} />
                </div>
              </Row>
            </div>
          )}

          <Row label="Bulk Pricing Notes">
            <textarea name="bulkPricing" rows={3} defaultValue={product?.bulkPricing}
              placeholder="e.g. 5% discount for orders above 50 MT. Contact for container pricing."
              className="field" style={{ resize: 'vertical' }} />
          </Row>
        </div>
      </div>

      {/* STEP 4: SEO */}
      <div style={{ display: step === 4 ? 'block' : 'none' }}>
        <StepHeading title="SEO & Tags" subtitle="Help buyers discover your product online" />
        <div className="space-y-5">
          <Row label="SEO Title (leave blank to use product title)">
            <input name="seoTitle" defaultValue={product?.seoTitle}
              placeholder="Optimized title for search engines…" className="field" />
          </Row>
          <Row label="SEO Meta Description">
            <textarea name="seoDescription" rows={3} defaultValue={product?.seoDescription}
              placeholder="150–160 character description for search results…"
              className="field" style={{ resize: 'vertical' }} />
          </Row>
          <Row label="Tags (comma-separated)">
            <input name="tags" defaultValue={product?.tags?.join(', ')}
              placeholder="aluminium, scrap, recycled, bulk, export, Nigeria" className="field" />
          </Row>
        </div>
      </div>

      {/* ── Error ── */}
      {!state.success && state.error && (
        <div className="mt-5 px-4 py-3 rounded-xl text-sm"
          style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
          {state.error}
        </div>
      )}

      {/* ── Navigation Footer ── */}
      <div
        className="flex items-center gap-3 pt-6 mt-8 border-t flex-wrap"
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Back */}
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            className="btn btn-outline flex items-center gap-1.5"
          >
            <ChevronLeft size={14} />
            Back
          </button>
        )}

        {/* Cancel (only on first step) */}
        {step === 0 && (
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="btn btn-outline"
          >
            Cancel
          </button>
        )}

        <div className="flex items-center gap-3 ml-auto flex-wrap justify-end">
          {/* Image warning */}
          {isLastStep && totalImages === 0 && !pending && (
            <p className="text-xs" style={{ color: '#f87171' }}>At least 1 image required (add in Basic Info)</p>
          )}

          {/* Next OR Submit */}
          {!isLastStep ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="btn btn-green flex items-center gap-1.5"
            >
              Next
              <ChevronRight size={14} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={pending || totalImages === 0}
              className="btn btn-green flex items-center gap-1.5"
              style={{ opacity: pending || totalImages === 0 ? 0.65 : 1 }}
            >
              {pending ? (
                <><Loader2 size={15} className="animate-spin" /> Saving…</>
              ) : submitLabel}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold" style={{ color: 'var(--tx-primary)' }}>{title}</h2>
      <p className="text-sm mt-0.5" style={{ color: 'var(--tx-faint)' }}>{subtitle}</p>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="field-label" dangerouslySetInnerHTML={{ __html: label }} />
      {children}
    </div>
  )
}