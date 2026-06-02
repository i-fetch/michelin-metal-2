import AdminLayout from "../../components/AdminLayout";
import { ProductFormSkeleton } from "../../components/custom-ui/Skeletons";


export default function Loading() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Products", href: "/admin/products" }, { label: "Loading…" }]}>
      <div className="mb-6 space-y-1">
        <div className="h-7 w-36 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-4 w-56 bg-gray-100 rounded animate-pulse" />
      </div>
      <ProductFormSkeleton />
    </AdminLayout>
  )
}
