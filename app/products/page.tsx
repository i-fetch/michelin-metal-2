import { Suspense } from "react";
import ProductPage from "./ProductPage";
import ProductPageSkeleton from "@/components/ProductPageSkeleton";
import { getAllProducts } from "@/controllers/productController";

export default async function page() {
  const products = await getAllProducts();
  return <ProductPage products={products} />;
}

