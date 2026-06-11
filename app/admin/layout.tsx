import AdminShell from "./components/AdminShell";
import { getAllProducts } from "@/controllers/productController";
import { getAllInquiries } from "@/controllers/inquiryController";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [products, inquiries] = await Promise.all([
    getAllProducts(),
    getAllInquiries(),
  ]);

  return (
    <AdminShell
      productCount={products.length}
      inquiryCount={inquiries.length}
    >
      {children}
    </AdminShell>
  );
}