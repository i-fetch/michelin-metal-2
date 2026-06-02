import { notFound } from "next/navigation"
import Link from "next/link"
import { ExternalLink, Info } from "lucide-react"
import { Product } from "@/types"
import AdminLayout from "@/app/admin/components/AdminLayout"
import ProductForm from "@/app/admin/components/product/ProductForm"

// ─── Replace with your real server actions ───────────────────────────────────
async function getProduct(id: string): Promise<Product | null> {
  // return await getProductAction(id)
  return {
    _id: id,
    title: "Aluminium UBC Scrap — Premium Grade",
    slug: "aluminium-ubc-scrap",
    images: [],
    shortDescription: "High-quality aluminium UBC scrap sourced from certified recycling partners. LME-standard grade, baled and ready for international export.",
    fullDescription: "Premium aluminium UBC (Used Beverage Cans) scrap, cleaned and baled to international export standards. Ideal for aluminium smelting operations. Available in 20MT and full FCL container lots.",
    category: "aluminium",
    subcategory: "UBC",
    featured: true,
    status: "active",
    specs: ["LME Certified", "Baled", "ISRI Standard"],
    applications: ["Automotive", "Aerospace", "Construction"],
    purity: "99.5%",
    materialGrade: "Grade A",
    condition: "Baled",
    recyclingClass: "Class 1",
    price: 1200,
    currency: "USD",
    showPrice: true,
    bulkPricing: "10+ MT: $1,150 · 50+ MT: $1,100",
    requestQuote: true,
  }
}

async function updateProduct(id: string, data: any, images: File[]) {
  // await updateProductAction(id, data)
  await new Promise((r) => setTimeout(r, 800))
}

interface EditProductPageProps {
  params: { id: string }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await getProduct(params.id)
  if (!product) notFound()

  async function handleUpdate(data: any, images: File[]) {
    "use server"
    await updateProduct(params.id, data, images)
  }

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Products", href: "/admin/products" },
        { label: product.title },
      ]}
    >
      {/* Page header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight">Edit Product</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[13px] text-gray-500">{product.title}</p>
            <Link
              href={`/product/${product.slug}`}
              target="_blank"
              className="flex items-center gap-1 text-[12px] text-green-700 hover:underline"
            >
              View live <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Edit mode info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3.5 mb-5">
        <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Info className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-[13px] font-medium text-blue-900">Editing existing product</p>
          <p className="text-[12px] text-blue-600 mt-0.5">
            Changes save immediately when you click &quot;Save Changes&quot;. Slug changes may affect existing links.
          </p>
        </div>
      </div>

      <ProductForm
        mode="edit"
        productId={product._id}
        initialData={product}
        onSubmit={handleUpdate}
      />
    </AdminLayout>
  )
}
