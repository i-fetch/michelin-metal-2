import AdminLayout from "./components/AdminLayout";
import { DashboardSkeleton } from "./components/custom-ui/Skeletons";


export default function Loading() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Admin" }, { label: "Loading…" }]}>
      <DashboardSkeleton />
    </AdminLayout>
  )
}
