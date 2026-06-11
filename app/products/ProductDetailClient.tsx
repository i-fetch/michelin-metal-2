"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, ArrowLeft, BookOpen, ShieldCheck } from 'lucide-react';
import type { Product } from '@/lib/types';
import Footer from '@/components/Footer';
import QuoteModal from './QuoteModal';
import ImageCarousel from './ImageCarousel';

type InquiryAction = (formData: FormData) => Promise<void>;

interface ProductDetailClientProps {
  product: Product;
  onCreateInquiry: InquiryAction;
}

export default function ProductDetailClient({ product, onCreateInquiry }: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<Product | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left" id="view-public-detail">
      <button
        onClick={() => router.push('/products')}
        className="cursor-pointer inline-flex items-center space-x-2 text-xs font-semibold text-tx-secondary hover:text-brand-green transition-colors"
        id="back-to-catalog"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Resource Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <ImageCarousel images={product.images} productTitle={product.title} />

          <div className="rounded-xl border border-brand-green/10 bg-green-alpha/50 p-4 flex items-center space-x-3">
            <ShieldCheck className="h-5 w-5 text-brand-green flex-shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-brand-green uppercase tracking-wider text-[10px]">REACH Registered Source</p>
              <p className="text-tx-secondary mt-0.5">Strict quality tracing reports available under lab inquiry submission.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-gray-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-tx-secondary">
              {product.category.name}
            </span>
            {product.badge && (
              <span className="rounded bg-brand-green text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>

          <h2 className="text-bebas text-4xl sm:text-5xl lg:text-6xl text-tx-primary tracking-wide leading-tight">
            {product.title}
          </h2>

          <p className="text-sm text-tx-secondary leading-relaxed">{product.description}</p>

          <div className="rounded-xl border border-border-subtle bg-white p-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-tx-muted block text-[10px] uppercase tracking-wider font-semibold">Minimum Trade Order Vol (MOQ)</span>
              <span className="text-base font-bold text-tx-primary mt-1 block">
                {product.moq.value} {product.moq.unit.toUpperCase()}
              </span>
            </div>

            <div>
              <span className="text-tx-muted block text-[10px] uppercase tracking-wider font-semibold">Logistical Lead Time</span>
              <span className="text-base font-bold text-tx-primary mt-1 block">Est: 2-3 Weeks CIP</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-tx-primary flex items-center space-x-1.5 border-b border-border-subtle pb-2">
              <BookOpen className="h-4 w-4 text-brand-green" />
              <span>Certified Industrial Applications</span>
            </h4>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.applications?.map((app, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-tx-secondary">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-green flex-shrink-0" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4" id="detail-quote-triggers">
            <button
              onClick={() => setSelectedProductForQuote(product)}
              className="cursor-pointer flex-1 py-3.5 px-6 rounded-lg bg-brand-green text-white font-bold text-xs uppercase tracking-wider text-center transition-all hover:bg-brand-green/95 shadow-md shadow-brand-green/10"
            >
              Request B2B Quote & Pricing
            </button>
            <button
              onClick={() => setSelectedProductForQuote(product)}
              className="hidden cursor-pointer py-3.5 px-6 rounded-lg bg-tx-primary hover:bg-tx-secondary text-white font-bold text-xs uppercase tracking-wider text-center transition-all"
            >
              Request Sample Box (Tubes)
            </button>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-xl border border-border-subtle p-6 sm:p-8 space-y-4" id="detail-specifications">
        <h3 className="font-bebas text-2xl tracking-wider text-tx-primary uppercase border-b border-border-subtle pb-3">
          Technical Specifications Sheet Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-tx-muted uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Quality Field Identifier</th>
                <th className="py-3 px-4 text-tx-primary font-bold">Standard Certified Thresholds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono-custom text-tx-secondary">
              <tr className="hover:bg-bg-subtle/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-tx-primary">Chemical Grade</td>
                <td className="py-3 px-4">{product.specs.grade || 'Industrial Standard Lab Grade'}</td>
              </tr>
              <tr className="hover:bg-bg-subtle/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-tx-primary">Physical Form</td>
                <td className="py-3 px-4">{product.specs.form || 'Fine Milled Solid Particles'}</td>
              </tr>
              <tr className="hover:bg-bg-subtle/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-tx-primary">Purity Percentage</td>
                <td className="py-3 px-4 text-brand-green font-semibold">{product.specs.purity || '99.0%+'}</td>
              </tr>
              <tr className="hover:bg-bg-subtle/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-tx-primary">Refinement Source Method</td>
                <td className="py-3 px-4">{product.specs.source || 'Hydrogen Reduction Lot'}</td>
              </tr>
              <tr className="hover:bg-bg-subtle/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-tx-primary">Zinc Composition Assay (By weight)</td>
                <td className="py-3 px-4">{product.specs.zincContent || '80.3% Approx'}</td>
              </tr>
              <tr className="hover:bg-bg-subtle/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-tx-primary">Dangerous Goods (GHS Safety / ADR)</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center space-x-1.5 text-tx-primary font-medium">
                    <AlertTriangle className="h-3.5 w-3.5 text-brand-gold" />
                    <span>{product.specs.hazardCompliance || 'Environmentally hazardous GHS 9'}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {selectedProductForQuote && (
        <QuoteModal
          product={selectedProductForQuote}
          onClose={() => setSelectedProductForQuote(null)}
          onSubmitInquiry={async (formData) => {
            await onCreateInquiry(formData);
          }}
        />
      )}

      <Footer />
    </div>
  );
}
