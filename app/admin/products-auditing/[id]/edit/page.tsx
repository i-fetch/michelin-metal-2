import { INITIAL_PRODUCTS } from "@/lib/mockData";
import ProductAuditForm from "../../ProductAuditForm";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Auditor Product",
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const product = INITIAL_PRODUCTS.find((item) => item._id === resolvedParams.id);

  if (!product) {
    return (
      <div className="space-y-6 text-left p-6">
        <h1 className="text-3xl font-bold text-tx-primary">Product not found</h1>
        <p className="text-sm text-tx-secondary">
          The requested audit record does not exist in the mock dataset. Please return to the audit list and choose another item.
        </p>
      </div>
    );
  }

  return <ProductAuditForm mode="edit" product={product} />;
}

