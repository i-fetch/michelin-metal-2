'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  ArrowRight,
  CheckCircle,
  Package,
  Tag,
  Truck,
  Search,
  Filter,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';

import { INITIAL_PRODUCTS } from '@/lib/mockData';
import ProductCard from './ProductCard';
// import ProductCard from '../admin/components/ProductCard';

/* -----------------------------
   CATEGORY DATA (hero pills)
------------------------------*/
const cats = [
  { id: 'aluminium', label: 'Aluminium', accent: '#16a34a' },
  { id: 'ferrous', label: 'Ferrous Metals', accent: '#0284c7' },
  { id: 'non-ferrous', label: 'Non-Ferrous', accent: '#d97706' },
  { id: 'bulk', label: 'Bulk Supply', accent: '#7c3aed' },
];

const products = [
  {
    id: 1, cat: 'aluminium', name: 'Aluminium Bales', tag: 'Most Requested',
    imageUrl: 'https://images.unsplash.com/photo-1602455151248-0dc8d746d4bf?w=900&q=80',
    desc: 'High-density baled aluminium waste, sorted and compressed ready for smelting.',
    specs: ['Grade: Industrial / Mixed Alloy', 'Form: Compressed Bales', 'Purity: 95–99% post-sorting', 'MOQ: 1 Tonne'],
    uses: ['Aluminium smelters', 'Rolling mills', 'Foundries']
  },
  {
    id: 2, cat: 'aluminium', name: 'Aluminium Scrap (Loose)', tag: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1610440162764-4c3e5d8ea50e?w=900&q=80',
    desc: 'Loose sorted aluminium from household appliances, vehicles and building materials.',
    specs: ['Source: Mixed post-consumers', 'Form: Loose / Uncompressed', 'Grade: Extrusion / Cast Mix', 'MOQ: 500 kg'],
    uses: ['Die casting', 'Secondary smelters', 'Export']
  },
  {
    id: 3, cat: 'ferrous', name: 'Heavy Melting Steel (HMS)', tag: 'Industrial Grade',
    imageUrl: 'https://images.unsplash.com/photo-1563364210-ec1f7f1c801b?w=900&q=80',
    desc: 'Heavy gauge steel scrap from demolition and machinery — high iron content.',
    specs: ['Grade: HMS 1 & HMS 2', 'Thickness: ≥ 6mm', 'Iron Content: 90%+', 'MOQ: 5 Tonnes'],
    uses: ['Electric arc furnaces', 'Steel mills', 'Re-rollers']
  },
  {
    id: 4, cat: 'ferrous', name: 'Vehicle Body Scrap', tag: 'High Volume',
    imageUrl: 'https://images.unsplash.com/photo-1532574337480-99693111f6b7?w=900&q=80',
    desc: 'Ferrous scrap from end-of-life vehicles — shredded and de-contaminated.',
    specs: ['Source: End-of-life vehicles', 'Form: Shredded / Cut', 'Residual: < 2% non-metal', 'MOQ: 2 Tonnes'],
    uses: ['Steel production', 'Scrap dealers', 'Foundries']
  },
  {
    id: 5, cat: 'ferrous', name: 'Cast Iron Scrap', tag: 'Foundry Grade',
    imageUrl: 'https://images.unsplash.com/photo-1513093635060-3047252c3fdd?w=900&q=80',
    desc: 'High-carbon cast iron from industrial machinery, suitable for grey iron foundry use.',
    specs: ['Carbon Content: 2–4%', 'Grade: Foundry / No.2 Cast', 'Cleanliness: Oil-free batches', 'MOQ: 1 Tonne'],
    uses: ['Grey iron foundries', 'Ingot production', 'Pipe casting']
  },
  {
    id: 6, cat: 'non-ferrous', name: 'Copper Scrap', tag: 'Premium',
    imageUrl: 'https://images.unsplash.com/photo-1518873890627-d4f8efcdc23b?w=900&q=80',
    desc: 'Clean and mixed copper scrap from electrical wire, plumbing and industrial equipment.',
    specs: ['Grade: Bare Bright / #1 / #2', 'Form: Wire, tubing, bus bar', 'Purity: Up to 99.9%', 'MOQ: 200 kg'],
    uses: ['Wire drawing', 'Brass / Bronze alloy', 'Re-melting']
  },
  {
    id: 7, cat: 'non-ferrous', name: 'Brass Scrap', tag: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=900&q=80',
    desc: 'Mixed and clean brass scrap from plumbing fittings, valves and industrial components.',
    specs: ['Grade: Yellow Brass / Red Brass', 'Zinc Content: 10–40%', 'Form: Mixed / Sorted', 'MOQ: 200 kg'],
    uses: ['Brass ingot production', 'Foundries', 'Export']
  },
  {
    id: 8, cat: 'non-ferrous', name: 'Lead Scrap', tag: 'Industrial',
    imageUrl: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9bd02?w=900&q=80',
    desc: 'Recovered lead from batteries and cable sheathing — properly handled and classified.',
    specs: ['Source: Battery / Cable / Soft Lead', 'Purity: 95%+', 'Hazmat: Compliant', 'MOQ: 500 kg'],
    uses: ['Battery recycling', 'Lead ingot casting', 'Shielding']
  },
  {
    id: 9, cat: 'bulk', name: 'Bulk Raw Supply', tag: 'Contract Available',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80',
    desc: 'Direct bulk supply of processed recycled metals to manufacturers and exporters.',
    specs: ['Volume: Custom per contract', 'Packaging: Baled / Containerised', 'Delivery: FOB Lagos / Ex-Works', 'Payment: Bank / LC'],
    uses: ['Manufacturing plants', 'Export traders', 'Industrial distributors']
  },
]

export default function ProductPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = React.useState<string | null>(null);

  const products = INITIAL_PRODUCTS;

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
            {cats.map((c) => (
              <Link
                key={c.id}
                href={`#${c.id}`}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{
                  background: `${c.accent}18`,
                  color: c.accent,
                  border: `1px solid ${c.accent}40`,
                }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORY GRID ================= */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap px-5">
          {cats.map((cat) => {
            const items = products.filter((p) => p.category.slug === cat.id);

            return (
              <div key={cat.id} id={cat.id} className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-1 h-8 rounded-full" style={{ background: cat.accent }} />

                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      color: 'var(--tx-primary)',
                    }}
                  >
                    {cat.label.toUpperCase()}
                  </h2>

                  <hr className="flex-1" style={{ borderTop: '1px solid var(--border)' }} />

                  <span className="text-xs font-semibold" style={{ color: 'var(--tx-faint)' }}>
                    {items.length} products
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p) => (
                    <div key={p._id} className="card rounded-xl overflow-hidden flex flex-col">
                      <div className="h-1 w-full" style={{ background: cat.accent }} />

                      <div className="relative h-52">
                        <Image
                          src={p.images?.[0]}
                          alt={p.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex justify-between mb-3">
                          <Package size={18} style={{ color: cat.accent }} />

                          <span
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ background: `${cat.accent}15`, color: cat.accent }}
                          >
                            {p.badge}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold">{p.title}</h3>
                        <p className="text-xs text-gray-500 mt-2">{p.description}</p>

                        <button
                          onClick={() => navigate(p.slug)}
                          className="mt-auto btn btn-green text-xs flex items-center justify-center gap-2"
                        >
                          View Product <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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
                  <ProductCard
                    key={p.id}
                    product={p}
                    accent={cat.accent}
                  />
                ))
              )}
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-green-600 text-white text-center py-20">
        <h2 className="text-3xl font-bold mb-3">Need Custom Quote?</h2>
        <p className="text-sm mb-6">Talk to our team for bulk pricing</p>

        <Link href="/contact" className="bg-white text-green-600 px-6 py-3 rounded-lg">
          Request Quote <ArrowRight size={14} />
        </Link>
      </section>
    </>
  );
}