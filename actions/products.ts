// actions/products.ts
'use server'

import { revalidatePath } from 'next/cache'
import slugify from 'slugify'
import { connectDB } from '@/lib/mongodb'
import { uploadImageToGridFS, deleteImageFromGridFS } from '@/lib/gridfs'
import { ProductModel } from '@/models/Product'
import type { Product, ActionResult } from '@/types'

function imgPath(id: any) {
  return id ? `/api/images/${id.toString()}` : '/placeholder.webp'
}

function toPlain(doc: any): Product {
  const imageIds = doc.imageIds ?? []
  const images   = imageIds.map(imgPath)
  return {
    _id:              doc._id.toString(),
    title:            doc.title,
    slug:             doc.slug,
    image:            images[0] ?? '/placeholder.webp',
    images,
    imageIds:         imageIds.map((i: any) => i.toString()),
    shortDescription: doc.shortDescription,
    fullDescription:  doc.fullDescription,
    category:         doc.category,
    subcategory:      doc.subcategory ?? '',
    featured:         doc.featured,
    status:           doc.status ?? 'active',
    specs:            doc.specs ?? [],
    applications:     doc.applications ?? [],
    purity:           doc.purity ?? '',
    materialGrade:    doc.materialGrade ?? '',
    condition:        doc.condition ?? 'Recycled',
    recyclingClass:   doc.recyclingClass ?? '',
    quantityAvailable:doc.quantityAvailable ?? '',
    unitType:         doc.unitType ?? 'Metric Tons',
    supplyCapacity:   doc.supplyCapacity ?? '',
    moq:              doc.moq ?? '',
    packagingType:    doc.packagingType ?? 'Baled',
    countryOfOrigin:  doc.countryOfOrigin ?? 'Nigeria',
    deliveryTimeline: doc.deliveryTimeline ?? '',
    exportAvailable:  doc.exportAvailable ?? true,
    stockAvailable:   doc.stockAvailable ?? true,
    price:            doc.price ?? null,
    currency:         doc.currency ?? 'USD',
    priceNegotiable:  doc.priceNegotiable ?? false,
    showPrice:        doc.showPrice ?? true,
    bulkPricing:      doc.bulkPricing ?? '',
    requestQuote:     doc.requestQuote ?? false,
    tags:             doc.tags ?? [],
    seoTitle:         doc.seoTitle ?? '',
    seoDescription:   doc.seoDescription ?? '',
    createdAt:        doc.createdAt?.toISOString() ?? '',
    updatedAt:        doc.updatedAt?.toISOString() ?? '',
  }
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = slugify(base, { lower: true, strict: true })
  let n = 0
  while (true) {
    const candidate = n === 0 ? slug : `${slug}-${n}`
    const q: any = { slug: candidate }
    if (excludeId) q._id = { $ne: excludeId }
    if (!(await ProductModel.findOne(q))) return candidate
    n++
  }
}

// ── Reads ─────────────────────────────────────────────────────────────────────

export async function getProducts(opts?: { category?: string; status?: string }): Promise<Product[]> {
  await connectDB()
  const filter: any = {}
  if (opts?.category) filter.category = opts.category
  if (opts?.status)   filter.status   = opts.status
  const docs = await ProductModel.find(filter).sort({ createdAt: -1 }).lean()
  return docs.map(toPlain)
}

export async function getPublicProducts(category?: string): Promise<Product[]> {
  await connectDB()
  const filter: any = { status: 'active' }
  if (category) filter.category = category
  const docs = await ProductModel.find(filter).sort({ featured: -1, createdAt: -1 }).lean()
  return docs.map(toPlain)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await connectDB()
  const doc = await ProductModel.findOne({ slug }).lean()
  return doc ? toPlain(doc) : null
}

export async function getProductById(id: string): Promise<Product | null> {
  await connectDB()
  const doc = await ProductModel.findById(id).lean()
  return doc ? toPlain(doc) : null
}

export async function getRelatedProducts(category: string, excludeSlug: string): Promise<Product[]> {
  await connectDB()
  const docs = await ProductModel.find({ category, slug: { $ne: excludeSlug }, status: 'active' })
    .limit(4).lean()
  return docs.map(toPlain)
}

// ── Mutations ─────────────────────────────────────────────────────────────────

function parseFormFields(formData: FormData) {
  const str  = (k: string) => (formData.get(k) as string) ?? ''
  const bool = (k: string) => formData.get(k) === 'true' || formData.get(k) === 'on'
  const lines = (k: string) => str(k).split('\n').map(s => s.trim()).filter(Boolean)
  const num  = (k: string) => { const v = str(k); return v ? parseFloat(v) : null }

  return {
    title:             str('title'),
    shortDescription:  str('shortDescription'),
    fullDescription:   str('fullDescription'),
    category:          str('category'),
    subcategory:       str('subcategory'),
    featured:          bool('featured'),
    status:            str('status') || 'active',
    specs:             lines('specs'),
    applications:      lines('applications'),
    purity:            str('purity'),
    materialGrade:     str('materialGrade'),
    condition:         str('condition'),
    recyclingClass:    str('recyclingClass'),
    quantityAvailable: str('quantityAvailable'),
    unitType:          str('unitType'),
    supplyCapacity:    str('supplyCapacity'),
    moq:               str('moq'),
    packagingType:     str('packagingType'),
    countryOfOrigin:   str('countryOfOrigin'),
    deliveryTimeline:  str('deliveryTimeline'),
    exportAvailable:   bool('exportAvailable'),
    stockAvailable:    bool('stockAvailable'),
    price:             num('price'),
    currency:          str('currency') || 'USD',
    priceNegotiable:   bool('priceNegotiable'),
    showPrice:         bool('showPrice'),
    bulkPricing:       str('bulkPricing'),
    requestQuote:      bool('requestQuote'),
    tags:              str('tags').split(',').map(t => t.trim()).filter(Boolean),
    seoTitle:          str('seoTitle'),
    seoDescription:    str('seoDescription'),
  }
}

async function collectImages(formData: FormData): Promise<File[]> {
  const files: File[] = []
  const single = formData.get('image')
  if (single instanceof File && single.size > 0) files.push(single)
  for (const img of formData.getAll('images')) {
    if (img instanceof File && img.size > 0) files.push(img)
  }
  return files
}

export async function createProduct(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult<{ slug: string }>> {
  try {
    await connectDB()
    const fields = parseFormFields(formData)
    if (!fields.title || !fields.shortDescription || !fields.fullDescription || !fields.category) {
      return { success: false, error: 'Title, descriptions and category are required.' }
    }
    const imageFiles = await collectImages(formData)
    if (imageFiles.length === 0) {
      return { success: false, error: 'At least one product image is required.' }
    }
    const [imageIds, slug] = await Promise.all([
      Promise.all(imageFiles.map(f => uploadImageToGridFS(f))),
      uniqueSlug(fields.title),
    ])
    await ProductModel.create({ ...fields, slug, imageIds })
    revalidatePath('/products')
    revalidatePath('/admin/products')
    return { success: true, data: { slug } }
  } catch (err) {
    console.error('[createProduct]', err)
    return { success: false, error: 'Failed to create product.' }
  }
}

export async function updateProduct(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult<{ slug: string }>> {
  try {
    await connectDB()
    const id = formData.get('id') as string
    if (!id) return { success: false, error: 'Missing product ID.' }

    const fields = parseFormFields(formData)
    if (!fields.title || !fields.shortDescription || !fields.fullDescription || !fields.category) {
      return { success: false, error: 'Title, descriptions and category are required.' }
    }

    const existingImageIdsRaw = formData.get('existingImageIds') as string
    const existingImageIds: string[] = existingImageIdsRaw ? JSON.parse(existingImageIdsRaw) : []

    const newFiles = await collectImages(formData)
    const newIds   = await Promise.all(newFiles.map(f => uploadImageToGridFS(f)))

    const existing = await ProductModel.findById(id)
    if (!existing) return { success: false, error: 'Product not found.' }

    const prevIds = existing.imageIds?.map((i: any) => i.toString()) ?? []
    const removed = prevIds.filter((old: string) => !existingImageIds.includes(old))
    if (removed.length > 0) {
      await Promise.all(removed.map(deleteImageFromGridFS))
    }

    const finalIds = [...existingImageIds, ...newIds.map(String)]
    if (finalIds.length === 0) return { success: false, error: 'At least one image is required.' }

    const slug = await uniqueSlug(fields.title, id)
    await ProductModel.findByIdAndUpdate(id, { ...fields, slug, imageIds: finalIds })

    revalidatePath('/products')
    revalidatePath(`/products/${slug}`)
    revalidatePath('/admin/products')
    return { success: true, data: { slug } }
  } catch (err) {
    console.error('[updateProduct]', err)
    return { success: false, error: 'Failed to update product.' }
  }
}

export async function updateProductStatus(id: string, status: string): Promise<ActionResult> {
  try {
    await connectDB()
    await ProductModel.findByIdAndUpdate(id, { status })
    revalidatePath('/products')
    revalidatePath('/admin/products')
    return { success: true, data: undefined }
  } catch {
    return { success: false, error: 'Failed to update status.' }
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    await connectDB()
    const product = await ProductModel.findById(id)
    if (!product) return { success: false, error: 'Product not found.' }
    if (product.imageIds?.length) {
      await Promise.all(product.imageIds.map((imgId: any) => deleteImageFromGridFS(imgId.toString())))
    }
    await ProductModel.findByIdAndDelete(id)
    revalidatePath('/products')
    revalidatePath('/admin/products')
    return { success: true, data: undefined }
  } catch (err) {
    console.error('[deleteProduct]', err)
    return { success: false, error: 'Failed to delete product.' }
  }
}
