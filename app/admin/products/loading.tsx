import AdminLayout from "../components/AdminLayout";
import { ProductListSkeleton } from "../components/custom-ui/Skeletons";

export default function Loading() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Products" }]}>
      <div className="mb-6 h-8 w-40 bg-gray-100 rounded-lg animate-pulse" />
      <ProductListSkeleton />
    </AdminLayout>
  )
}
