"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FileText, Image as ImageIcon, Tag, DollarSign, Settings, AlertCircle, CheckCircle2 } from "lucide-react"
import { Product, PRODUCT_CATEGORIES } from "@/types"
import ImageUpload from "../custom-ui/ImageUpload"
import TagInput from "../custom-ui/TagInput"
import { InlineError, InlineSuccess } from "../custom-ui/EmptyStates"
import Toggle from "../custom-ui/Toggle"


type ProductFormData = Omit<Product, "_id">

interface ProductFormProps {
  initialData?: Partial<ProductFormData>
  onSubmit: (data: ProductFormData, images: File[]) => Promise<void>
  mode: "create" | "edit"
  productId?: string
}

const STEPS = [
  { label: "Basic Info", icon: FileText },
  { label: "Media", icon: ImageIcon },
  { label: "Specs", icon: Tag },
  { label: "Pricing", icon: DollarSign },
]

const DEFAULT_DATA: ProductFormData = {
  title: "", slug: "", images: [], shortDescription: "", fullDescription: "",
  category: "aluminium", subcategory: "", featured: false, status: "draft",
  specs: [], applications: [], purity: "", materialGrade: "", condition: "",
  recyclingClass: "", price: null, currency: "USD", showPrice: true, bulkPricing: "", requestQuote: true,
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export default function ProductForm({ initialData, onSubmit, mode, productId }: ProductFormProps) {
  const router = useRouter()
  const [data, setData] = useState<ProductFormData>({ ...DEFAULT_DATA, ...initialData })
  const [newImages, setNewImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({})

  const set = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: "" }))
  }

  const validate = (): boolean => {
    const errs: typeof errors = {}
    if (!data.title.trim()) errs.title = "Title is required"
    if (!data.slug.trim()) errs.slug = "Slug is required"
    if (!data.shortDescription.trim()) errs.shortDescription = "Short description is required"
    if (!data.subcategory) errs.subcategory = "Please select a subcategory"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (status: "active" | "draft") => {
    if (!validate()) return
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      await onSubmit({ ...data, status }, newImages)
      setSuccess(mode === "create" ? "Product created successfully!" : "Changes saved!")
      if (mode === "create") setTimeout(() => router.push("/admin/products"), 1200)
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const selectedCat = PRODUCT_CATEGORIES.find((c) => c.id === data.category)!

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
      {/* ── Left column: form sections ────────────────────────── */}
      <div className="space-y-4">

        {/* Basic info */}
        <FormSection title="Basic Information" icon={<FileText className="w-4 h-4 text-green-700" />}>
          <div className="space-y-3">
            <Field label="Product Title" required error={errors.title}>
              <input
                value={data.title}
                onChange={(e) => {
                  set("title", e.target.value)
                  if (mode === "create") set("slug", slugify(e.target.value))
                }}
                placeholder="e.g. Aluminium UBC Scrap — Premium Grade"
                className={cn("form-input", errors.title && "border-red-400 focus:border-red-500 focus:ring-red-500/10")}
              />
            </Field>

            <Field label="Slug" hint="Auto-generated from title. Changing it may break existing links.">
              <input
                value={data.slug}
                onChange={(e) => set("slug", slugify(e.target.value))}
                placeholder="aluminium-ubc-scrap"
                className="form-input font-mono text-[12.5px]"
              />
            </Field>

            <Field label="Short Description" required error={errors.shortDescription} hint="Shown on listing cards (1–2 sentences)">
              <textarea
                value={data.shortDescription}
                onChange={(e) => set("shortDescription", e.target.value)}
                rows={2}
                placeholder="Brief summary for listing cards…"
                className={cn("form-input resize-y", errors.shortDescription && "border-red-400")}
              />
            </Field>

            <Field label="Full Description" hint="Detailed product info, sourcing, handling notes…">
              <textarea
                value={data.fullDescription}
                onChange={(e) => set("fullDescription", e.target.value)}
                rows={5}
                placeholder="Full product description…"
                className="form-input resize-y"
              />
            </Field>
          </div>
        </FormSection>

        {/* Media */}
        <FormSection title="Product Images" icon={<ImageIcon className="w-4 h-4 text-green-700" />}>
          <ImageUpload
            value={data.images}
            onChange={setNewImages}
            maxFiles={8}
          />
        </FormSection>

        {/* Specs */}
        <FormSection title="Technical Specifications" icon={<Tag className="w-4 h-4 text-green-700" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Purity">
              <input value={data.purity} onChange={(e) => set("purity", e.target.value)} placeholder="e.g. 99.5%" className="form-input" />
            </Field>
            <Field label="Material Grade">
              <input value={data.materialGrade} onChange={(e) => set("materialGrade", e.target.value)} placeholder="e.g. Grade A, LME Standard" className="form-input" />
            </Field>
            <Field label="Condition">
              <select value={data.condition} onChange={(e) => set("condition", e.target.value)} className="form-input">
                <option value="">Select condition…</option>
                {["New", "Used / Scrap", "Processed", "Baled", "Compressed", "Stripped", "Mixed", "Drained"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Recycling Class">
              <select value={data.recyclingClass} onChange={(e) => set("recyclingClass", e.target.value)} className="form-input">
                <option value="">Select class…</option>
                <option>Class 1</option>
                <option>Class 2</option>
                <option>Class 3</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Spec Tags" hint="Press Enter or comma to add a tag">
                <TagInput value={data.specs} onChange={(v) => set("specs", v)} placeholder="e.g. LME Certified, ISRI Standard…" />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Applications" hint="End uses and industries for this material">
                <TagInput value={data.applications} onChange={(v) => set("applications", v)} placeholder="e.g. Automotive, Aerospace…" />
              </Field>
            </div>
          </div>
        </FormSection>

        {/* Pricing */}
        <FormSection title="Pricing" icon={<DollarSign className="w-4 h-4 text-green-700" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Price (per MT)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">$</span>
                <input
                  type="number"
                  value={data.price ?? ""}
                  onChange={(e) => set("price", e.target.value ? Number(e.target.value) : null)}
                  placeholder="0.00"
                  className="form-input pl-6"
                />
              </div>
            </Field>
            <Field label="Currency">
              <select value={data.currency} onChange={(e) => set("currency", e.target.value)} className="form-input">
                <option>USD</option><option>EUR</option><option>GBP</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Bulk Pricing Notes" hint="e.g. 10+ MT: $1,150 · 50+ MT: $1,100">
                <input value={data.bulkPricing} onChange={(e) => set("bulkPricing", e.target.value)} placeholder="Bulk pricing description…" className="form-input" />
              </Field>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <ToggleRow
              title="Show Price Publicly"
              description="Display price on the storefront. Disable for quote-only listings."
              checked={data.showPrice}
              onChange={(v) => set("showPrice", v)}
            />
            <ToggleRow
              title="Enable Request Quote"
              description="Show a quote request button to visitors on the product page."
              checked={data.requestQuote}
              onChange={(v) => set("requestQuote", v)}
            />
          </div>
        </FormSection>

        {/* Feedback */}
        {error && <InlineError message={error} />}
        {success && <InlineSuccess message={success} />}
      </div>

      {/* ── Right sidebar ─────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 sticky top-4 space-y-4">
          {/* Publish */}
          <div>
            <h3 className="text-[13.5px] font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Settings className="w-3.5 h-3.5 text-green-700" />
              Publish Settings
            </h3>
            <Field label="Status">
              <select
                value={data.status}
                onChange={(e) => set("status", e.target.value as any)}
                className="form-input"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
            <div className="mt-3">
              <ToggleRow
                title="Featured"
                description="Show on homepage spotlight"
                checked={data.featured}
                onChange={(v) => set("featured", v)}
                compact
              />
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Publish buttons */}
          <div className="space-y-2">
            <button
              onClick={() => handleSubmit("active")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[13px] font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              {mode === "create" ? "Publish Product" : "Save Changes"}
            </button>
            {mode === "create" && (
              <button
                onClick={() => handleSubmit("draft")}
                disabled={loading}
                className="w-full py-2.5 border border-gray-200 text-gray-700 rounded-lg text-[13px] font-medium hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Save as Draft
              </button>
            )}
          </div>

          <div className="h-px bg-gray-100" />

          {/* Category */}
          <div>
            <h3 className="text-[13.5px] font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-green-700" />
              Category
            </h3>
            <div className="space-y-2">
              <Field label="Category" error={errors.category}>
                <select
                  value={data.category}
                  onChange={(e) => { set("category", e.target.value as any); set("subcategory", "") }}
                  className="form-input"
                >
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Subcategory" error={errors.subcategory}>
                <select
                  value={data.subcategory}
                  onChange={(e) => set("subcategory", e.target.value)}
                  className={cn("form-input", errors.subcategory && "border-red-400")}
                >
                  <option value="">Select subcategory…</option>
                  {selectedCat.subcategories.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {/* Edit mode: metadata */}
          {mode === "edit" && productId && (
            <>
              <div className="h-px bg-gray-100" />
              <div className="space-y-1">
                <MetaRow label="Product ID" value={<span className="font-mono text-[11px]">{productId}</span>} />
                <MetaRow label="Status" value={data.status} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FormSection({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl p-5"
    >
      <h3 className="text-[14px] font-semibold text-gray-900 mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </motion.div>
  )
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <label className="block text-[12.5px] font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11.5px] text-gray-400">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 text-[11.5px] text-red-600">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
  compact = false,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
  compact?: boolean
}) {
  return (
    <div className={`flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg ${compact ? "p-2.5" : "p-3"}`}>
      <div>
        <p className={`font-medium text-gray-800 ${compact ? "text-[12.5px]" : "text-[13px]"}`}>{title}</p>
        {!compact && <p className="text-[11.5px] text-gray-400 mt-0.5">{description}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} size={compact ? "sm" : "md"} />
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between text-[12px]">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-gray-700">{value}</span>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// Add this to your globals.css or tailwind layer:
// .form-input { @apply w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-[13px] text-gray-800 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all bg-white placeholder-gray-400; }
