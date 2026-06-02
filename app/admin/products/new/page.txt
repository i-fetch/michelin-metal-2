"use client"

import AdminLayout from "../../components/AdminLayout"
import ProductForm from "../../components/product/ProductForm"

// ─── Replace this with your real server action ───────────────────────────────
async function createProduct(data: any, images: File[]) {
  // await createProductAction(data)
  await new Promise((r) => setTimeout(r, 800))
}

export default function NewProductPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Products", href: "/admin/products" },
        { label: "New Product" },
      ]}
    >
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight">New Product</h1>
        <p className="text-[13px] text-gray-500 mt-0.5">
          Fill in the details to create a new product listing.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-6 overflow-x-auto pb-1">
        {["Basic Info", "Media", "Specs", "Pricing"].map((step, i) => (
          <div key={step} className="flex items-center flex-shrink-0">
            {i > 0 && (
              <div className={`w-8 h-px mx-1.5 ${i <= 1 ? "bg-green-500" : "bg-gray-200"}`} />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                  i < 1
                    ? "bg-green-600 text-white"
                    : i === 1
                    ? "bg-green-50 text-green-800 border-2 border-green-500"
                    : "bg-gray-100 text-gray-400 border border-gray-200"
                }`}
              >
                {i < 1 ? "✓" : i + 1}
              </div>
              <span
                className={`text-[12px] whitespace-nowrap ${
                  i < 1
                    ? "text-green-700 font-medium"
                    : i === 1
                    ? "text-gray-900 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ProductForm
        mode="create"
        onSubmit={createProduct}
      />
    </AdminLayout>
  )
}
