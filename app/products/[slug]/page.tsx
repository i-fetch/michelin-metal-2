import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/products/ProductDetailClient";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { createInquiryAction } from "@/controllers/inquiryController";
import type { Metadata } from "next";
import { getProductBySlug } from "@/controllers/productController";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function ProductDetailLoader({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} onCreateInquiry={createInquiryAction} />;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | Products`,
    description: product.description,
  };
}

export default async function Page({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailLoader slug={slug} />
    </Suspense>
  );
}


