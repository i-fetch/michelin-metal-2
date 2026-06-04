'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Package, Tag, Truck } from 'lucide-react';

interface Product {
  id: number | string;
  cat: string;
  name: string;
  tag: string;
  imageUrl: string;
  desc: string;
  specs: string[];
  uses: string[];
}

interface Props {
  product: Product;
  accent: string;
}

const ProductCard: React.FC<Props> = ({ product, accent }) => {
  return (
    <div className="card rounded-xl overflow-hidden flex flex-col h-full">
      {/* Accent Top Bar */}
      <div className="h-1 w-full" style={{ background: accent }} />

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${accent}15` }}
          >
            <Package size={18} style={{ color: accent }} />
          </div>

          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: `${accent}15`, color: accent }}
          >
            {product.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-3 text-xl"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--tx-primary)',
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: 'var(--tx-muted)' }}
        >
          {product.desc}
        </p>

        {/* Specs */}
        <div className="mb-4">
          <p
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-2.5"
            style={{ color: 'var(--tx-faint)' }}
          >
            <Tag size={10} /> Specs
          </p>

          <ul className="space-y-1.5">
            {product.specs.map((s) => (
              <li
                key={s}
                className="flex items-center gap-2 text-xs"
                style={{ color: 'var(--tx-secondary)' }}
              >
                <CheckCircle
                  size={10}
                  style={{ color: accent, flexShrink: 0 }}
                />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Uses */}
        <div className="mb-6">
          <p
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-2.5"
            style={{ color: 'var(--tx-faint)' }}
          >
            <Truck size={10} /> Applications
          </p>

          <div className="flex flex-wrap gap-1.5">
            {product.uses.map((u) => (
              <span
                key={u}
                className="text-xs px-2.5 py-0.5 rounded-full"
                style={{
                  background: 'var(--bg-3)',
                  color: 'var(--tx-muted)',
                }}
              >
                {u}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          className="mt-auto btn btn-green text-xs justify-center"
          style={{ padding: '0.6rem 1rem' }}
        >
          Enquire Now <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;