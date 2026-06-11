"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Filter,
  RotateCcw,
  AlertTriangle,
  Search,
} from 'lucide-react';
import ProductCard from './ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CATEGORIES, type Product, type ProductCategory } from '@/lib/types';

interface ProductPageClientProps {
  products: Product[];
}

export default function ProductPageClient({ products }: ProductPageClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = React.useState<string | null>(null);

  const navigate = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  const filtered = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return products.filter((p) => {
      const matchesCategory = selectedCategorySlug
        ? p.category.slug === selectedCategorySlug
        : true;

      const matchesSearch = query
        ? p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.specs.grade?.toLowerCase().includes(query) ||
          p.specs.purity?.toLowerCase().includes(query) ||
          p.applications.some((a) => a.toLowerCase().includes(query))
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategorySlug]);

  return (
    <>
      <Navbar />
      {/* ================= HERO ================= */}
      <section className="pt-32 pb-16 relative" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="wrap px-5 relative z-10">
          <p className="tag mb-5">Our Catalogue</p>

          <h1
            className="mb-4 leading-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem,7vw,5rem)',
              color: 'var(--tx-primary)',
            }}
          >
            PRODUCTS &<br />
            <span style={{ color: 'var(--clr-green)' }}>MATERIALS</span>
          </h1>

          <p className="text-lg max-w-xl" style={{ color: 'var(--tx-muted)', fontWeight: 300 }}>
            From aluminium bales to ferrous scrap and non-ferrous metals — available for bulk supply.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setSelectedCategorySlug(c.slug)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{
                  background: 'rgba(34, 197, 94, 0.12)',
                  color: 'var(--clr-green)',
                  border: '1px solid rgba(34, 197, 94, 0.22)',
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODERN FILTER UI ================= */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">

          {/* Header */}
          <div className="flex justify-between border-b pb-4">
            <div>
              <h2 className="text-3xl font-bold">Product Explorer</h2>
              <p className="text-sm text-gray-500">Search and filter materials</p>
            </div>

            <div className="text-sm text-gray-500">
              Showing {filtered.length} / {products.length}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Sidebar */}
            <div className="space-y-4">

              {/* Search */}
              <div className="p-4 border rounded-xl bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <Search size={14} />
                  <span className="text-xs font-semibold">Search</span>
                </div>

                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border px-3 py-2 text-xs rounded-lg"
                  placeholder="Search products..."
                />
              </div>

              {/* Category */}
              <div className="p-4 border rounded-xl bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <Filter size={14} />
                  <span className="text-xs font-semibold">Categories</span>
                </div>

                <button
                  onClick={() => setSelectedCategorySlug(null)}
                  className="text-xs w-full text-left py-1"
                >
                  All
                </button>

                {CATEGORIES.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setSelectedCategorySlug(c.slug)}
                    className="text-xs w-full text-left py-1"
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Reset */}
              {(searchQuery || selectedCategorySlug) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategorySlug(null);
                  }}
                  className="w-full py-2 text-xs bg-black text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              )}
            </div>

            {/* Results */}
            <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.length === 0 ? (
                <div className="col-span-full text-center p-10 border rounded-xl">
                  <AlertTriangle className="mx-auto mb-2" />
                  No products found
                </div>
              ) : (
                filtered.map((p) => (
                  <ProductCard key={p._id} product={p} onNavigate={navigate} />
                ))
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
