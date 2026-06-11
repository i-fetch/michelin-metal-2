import React from "react";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

interface ProductCardSkeletonGridProps {
  count?: number;
}

export default function ProductCardSkeletonGrid({ count = 6 }: ProductCardSkeletonGridProps) {
  return (
    <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
}
