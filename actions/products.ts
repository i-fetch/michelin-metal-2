'use server'

import { revalidatePath } from 'next/cache'
import { redirect }       from 'next/navigation'
import { auth }           from '@/auth'
import { connectDB }      from '@/lib/db'
import { uploadImage }    from '@/lib/cloudinary'
import Product            from '@/models/Product'
import type { ActionResult, IProduct } from '@/types'

// ─── Auth guard ───────────────────────────────────────────────────────────────
async function requireAdmin() {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'admin') {
    throw new Error('Unauthorized')
  }
}

// ─── Slug helper ──────────────────────────────────────────────────────────────
function toSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

// ─── Get all products ─────────────────────────────────────────────────────────
export async function getProducts(category?: string): Promise<IProduct[]> {
  await connectDB()
  const filter = category ? { category } : {}
  const docs = await Product.find(filter).sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(docs))
}

// ─── Get single product by slug ───────────────────────────────────────────────
export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  await connectDB()
  const doc = await Product.findOne({ slug }).lean()
  return doc ? JSON.parse(JSON.stringify(doc)) : null
}

// ─── Get single product by ID (admin) ────────────────────────────────────────
export async function getProductById(id: string): Promise<IProduct | null> {
  await connectDB()
  const doc = await Product.findById(id).lean()
  return doc ? JSON.parse(JSON.stringify(doc)) : null
}

// ─── Create product ───────────────────────────────────────────────────────────
export async function createProduct(formData: FormData): Promise<ActionResult> {
  await requireAdmin()

  const title            = formData.get('title') as string
  const shortDescription = formData.get('shortDescription') as string
  const fullDescription  = formData.get('fullDescription') as string
  const category         = formData.get('category') as string
  const featured         = formData.get('featured') === 'true'
  const specsRaw         = formData.get('specs') as string
  const applicationsRaw  = formData.get('applications') as string
  const imageFile        = formData.get('image') as File | null

  if (!title || !shortDescription || !fullDescription || !category) {
    return { success: false, error: 'Required fields missing' }
  }

  if (!imageFile || imageFile.size === 0) {
    return { success: false, error: 'Product image is required' }
  }

  try {
    await connectDB()

    const slug = toSlug(title)
    const existing = await Product.findOne({ slug })
    if (existing) return { success: false, error: 'A product with this title already exists' }

    const imageUrl     = await uploadImage(imageFile)
    const specs        = specsRaw ? specsRaw.split('\n').map(s => s.trim()).filter(Boolean) : []
    const applications = applicationsRaw ? applicationsRaw.split('\n').map(s => s.trim()).filter(Boolean) : []

    await Product.create({
      title, slug, image: imageUrl, shortDescription,
      fullDescription, specs, applications, category, featured,
    })

    revalidatePath('/products')
    revalidatePath('/admin/products')
  } catch (err: any) {
    return { success: false, error: err.message ?? 'Failed to create product' }
  }

  redirect('/admin/products')
}

// ─── Update product ───────────────────────────────────────────────────────────
export async function updateProduct(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()

  const title            = formData.get('title') as string
  const shortDescription = formData.get('shortDescription') as string
  const fullDescription  = formData.get('fullDescription') as string
  const category         = formData.get('category') as string
  const featured         = formData.get('featured') === 'true'
  const specsRaw         = formData.get('specs') as string
  const applicationsRaw  = formData.get('applications') as string
  const imageFile        = formData.get('image') as File | null

  if (!title || !shortDescription || !fullDescription || !category) {
    return { success: false, error: 'Required fields missing' }
  }

  try {
    await connectDB()
    const product = await Product.findById(id)
    if (!product) return { success: false, error: 'Product not found' }

    let imageUrl = product.image
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile)
    }

    const slug        = toSlug(title)
    const specs       = specsRaw ? specsRaw.split('\n').map(s => s.trim()).filter(Boolean) : []
    const applications = applicationsRaw ? applicationsRaw.split('\n').map(s => s.trim()).filter(Boolean) : []

    await Product.findByIdAndUpdate(id, {
      title, slug, image: imageUrl, shortDescription,
      fullDescription, specs, applications, category, featured,
    })

    revalidatePath('/products')
    revalidatePath(`/products/${slug}`)
    revalidatePath('/admin/products')
  } catch (err: any) {
    return { success: false, error: err.message ?? 'Failed to update product' }
  }

  redirect('/admin/products')
}

// ─── Delete product ───────────────────────────────────────────────────────────
export async function deleteProduct(id: string): Promise<ActionResult> {
  await requireAdmin()

  try {
    await connectDB()
    const product = await Product.findByIdAndDelete(id)
    if (!product) return { success: false, error: 'Product not found' }

    revalidatePath('/products')
    revalidatePath('/admin/products')
    return { success: true, message: 'Product deleted' }
  } catch (err: any) {
    return { success: false, error: err.message ?? 'Failed to delete product' }
  }
}

// ─── Login / logout ───────────────────────────────────────────────────────────
export async function loginAction(formData: FormData): Promise<ActionResult> {
  const { signIn } = await import('@/auth')
  try {
    await signIn('credentials', {
      email:    formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })
    return { success: true }
  } catch (err: any) {
    return { success: false, error: 'Invalid email or password' }
  }
}

export async function logoutAction(): Promise<void> {
  const { signOut } = await import('@/auth')
  await signOut({ redirectTo: '/admin/login' })
}
