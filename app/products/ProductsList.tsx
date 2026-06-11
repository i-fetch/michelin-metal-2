import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAllProducts } from "@/controllers/productController";
import ProductCardList from "@/components/ProductCardList";
import ProductCardSkeletonGrid from "@/components/ProductCardSkeletonGrid";

export default async function ProductsList() {
  const products = await getAllProducts();
  if (!products) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductCardSkeletonGrid />}> 
      <ProductCardList products={products} onNavigate={(slug) => window.location.assign(`/products/${slug}`)} />
    </Suspense>
  );
}
