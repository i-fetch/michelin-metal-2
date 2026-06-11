import React from "react";
import ProductCard from "@/app/products/ProductCard";
import type { Product } from "@/lib/types";

interface ProductCardListProps {
  products: Product[];
  onNavigate: (slug: string) => void;
}

export default function ProductCardList({ products, onNavigate }: ProductCardListProps) {
  return (
    <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onNavigate={onNavigate} />
      ))}
    </div>
  );
}
