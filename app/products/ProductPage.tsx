'use client';

import React from 'react';
import { useRouter } from 'next/navigation'
import {
  Filter,
  RotateCcw,
  AlertTriangle,
  Search,
} from 'lucide-react';
import ProductCard from './ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Product } from '@/lib/types';
import MaterialsSection from '@/components/homepage-components/MaterialSection';

interface ProductPageProps {
  products: Product[];
}


export default function ProductPage({ products }: ProductPageProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = React.useState<string | null>(null);



  const navigate = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  /* -----------------------------
     CATEGORY LIST (dynamic)
  ------------------------------*/
  const CATEGORIES = React.useMemo(() => {
    const map = new Map();

    products.forEach((p) => {
      map.set(p.category.slug, p.category);
    });

    return Array.from(map.values());
  }, [products]);

  /* -----------------------------
     FILTERED PRODUCTS
  ------------------------------*/
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
            PRODUCTS &<br className='hidden lg:block' />
            <span style={{ color: 'var(--clr-green)' }}>{" "}MATERIALS</span>
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


      {/* Results */}
      <section className="wrap px-5 py-10 mx-auto max-w-[1440px]">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center p-10 border rounded-xl">
              <AlertTriangle className="mx-auto mb-2" />
              No products found
            </div>
          ) : (
            filtered.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onNavigate={navigate}
              />
            ))
          )}
        </div>
      </section>

      {/* ── PRODUCTS PREVIEW ─────────────────────────────── */}
      <MaterialsSection />

      {/* CTA */}
      {/* <CTASection
        icon={<Package size={28} />}
        subtitle="Bulk Industrial Supply"
        title="Need a Custom Quote?"
        description="Get competitive pricing tailored to your material specifications. Our team responds within hours."
        primaryCta={{
          label: 'Request Quote',
          href: '/contact',
          icon: <ArrowRight size={16} />,
        }}
        trustText="Trusted by industrial buyers across West Africa"
      /> */}

      <Footer />
    </>
  );
}