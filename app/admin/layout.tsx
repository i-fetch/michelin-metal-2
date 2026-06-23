import AdminShell from "./components/AdminShell";
import { getAllProducts } from "@/controllers/productController";
import { getAllInquiries } from "@/controllers/inquiryController";
import { getAllContacts } from "@/controllers/contactController";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [products, inquiries, contacts] = await Promise.all([
    getAllProducts(),
    getAllInquiries(),
    getAllContacts(),
  ]);

  return (
    <AdminShell
      productCount={products.length}
      inquiryCount={inquiries.length}
      contactsCount={contacts.length}
    >
      {children}
    </AdminShell>
  );
}