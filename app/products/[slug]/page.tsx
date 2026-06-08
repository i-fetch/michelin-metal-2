"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/mockData";

export default function ProductDetailPage() {
  const params = useParams() as Record<string, string | undefined> | undefined;
  const router = useRouter();
  const slug = params?.slug;

  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center space-y-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
        <h2 className="text-bebas text-2xl">Product Not Found</h2>
        <p className="text-xs text-tx-secondary">The requested product slug "{slug ?? "?"}" was not found.</p>
        <button onClick={() => router.push("/products")} className="px-6 py-2 bg-green-brand text-white font-semibold text-xs rounded">
          Back to Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      <button
        onClick={() => router.back()}
        className="cursor-pointer inline-flex items-center space-x-2 text-xs font-semibold text-tx-secondary hover:text-green-brand transition-colors"
      >
        <span>Return to Resource Catalog</span>
      </button>

      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-sm text-tx-secondary mt-2">{product.description}</p>
      </div>
    </div>
  );
}