import React from "react";
import { ArrowRight, Package, ShieldCheck, Layers } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onNavigate: (hashPath: string) => void;
  key?: React.Key | string;
}

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  const primaryImage = product.images?.[0] || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=60";

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
      id={`product-card-${product._id}`}
    >
      {/* Top Image block */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-bg-subtle">
        <img
          src={primaryImage}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating Grade Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-tx-primary px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Brand category identifier overlay */}
        <span className="absolute bottom-3 right-3 rounded bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-tx-secondary uppercase tracking-widest shadow-xs">
          {product.category.name}
        </span>
      </div>

      {/* Listing Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 
            onClick={() => onNavigate(`#/product/${product.slug}`)}
            className="cursor-pointer text-bebas text-lg font-normal tracking-wide text-tx-primary hover:text-green-brand transition-colors line-clamp-1"
          >
            {product.title}
          </h3>
          
          <p className="mt-2 text-xs text-tx-secondary line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Direct Technical Parameters Table Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-b border-border-subtle py-3 text-[11px] font-mono-custom">
            <div className="space-y-1">
              <span className="text-tx-muted block uppercase tracking-wider text-[9px]">Purity Level</span>
              <span className="text-tx-primary font-medium">{product.specs.purity || "Analytical"}</span>
            </div>
            <div className="space-y-1">
              <span className="text-tx-muted block uppercase tracking-wider text-[9px]">Zinc Content</span>
              <span className="text-tx-primary font-medium">{product.specs.zincContent || "N/A"}</span>
            </div>
            <div className="space-y-1 col-span-2">
              <span className="text-tx-muted block uppercase tracking-wider text-[9px]">Physical Form</span>
              <span className="text-tx-primary font-medium line-clamp-1">{product.specs.form || "Powder"}</span>
            </div>
          </div>
        </div>

        {/* Bottom MOQ and CTA section */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border-subtle/40">
          <div className="flex items-center space-x-1.5 text-xs text-tx-secondary">
            <Package className="h-4 w-4 text-green-brand flex-shrink-0" />
            <span>
              MOQ: <strong className="text-tx-primary font-semibold">{product.moq.value} {product.moq.unit}</strong>
            </span>
          </div>

          <button
            onClick={() => onNavigate(`#/product/${product.slug}`)}
            className="cursor-pointer group inline-flex items-center space-x-1.5 text-xs font-semibold text-green-brand transition-all hover:text-green-brand/80"
          >
            <span>RFQ & Specs</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
