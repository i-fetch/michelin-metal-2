import ProductAuditPage from "./ProductAuditPage";
import { getAllProducts } from '@/controllers/productController';

export default async function Page() {
  const products = await getAllProducts();
  return <ProductAuditPage products={products} />;
}