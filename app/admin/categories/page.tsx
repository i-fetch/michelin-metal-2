
import { Tag } from "lucide-react"
import AdminLayout from "../components/AdminLayout"
import { PRODUCT_CATEGORIES } from "@/types"

export default function CategoriesPage() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Categories" }]}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight">Categories</h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            {PRODUCT_CATEGORIES.length} categories · manage subcategories and groupings
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Icon", "Category", "Subcategories", "Products", "Accent Color"].map((h) => (
                  <th key={h} className="text-left text-[11.5px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCT_CATEGORIES.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-2xl">{cat.icon}</td>
                  <td className="px-4 py-4">
                    <div className="text-[13.5px] font-semibold text-gray-900">{cat.label}</div>
                    <div className="text-[11.5px] text-gray-400 font-mono mt-0.5">{cat.id}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub) => (
                        <span key={sub} className="text-[11.5px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      <Tag className="w-3 h-3" />
                      {cat.id === "aluminium" ? 9 : cat.id === "metals" ? 7 : cat.id === "non-ferrous" ? 5 : 3}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-md border border-black/10"
                        style={{ background: cat.accent }}
                      />
                      <span className="text-[12px] text-gray-500 font-mono">{cat.accent}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
