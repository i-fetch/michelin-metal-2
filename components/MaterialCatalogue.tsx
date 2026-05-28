"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Shield, ArrowRight, Scale } from 'lucide-react';
import { Material, MATERIALS } from '@/types';

interface MaterialCatalogueProps {
  onSelectMaterial: (material: Material) => void;
}

const CATEGORIES = ['All', 'Non-Ferrous', 'Ferrous', 'Industrial', 'Auto Scrap'] as const;

export default function MaterialCatalogue({ onSelectMaterial }: MaterialCatalogueProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('All');
  const filteredMaterials = MATERIALS.filter((material) => {
    const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
    const matchesSearch =
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.specifications.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="products font-sans" className="space-y-8">
      {/* Dynamic Filter / Search Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search materials (e.g. Copper, UBC, 6061)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Categories Slider/Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-zinc-400 text-sm hidden lg:inline mr-2 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter by:
            </span>
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/10 font-semibold'
                      : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredMaterials.map((material, idx) => (
              <motion.div
                key={material.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300"
              >
                {/* Image Section with badge overlay */}
                <div className="relative h-48 overflow-hidden bg-zinc-950">
                  <img
                    src={material.imageUrl}
                    alt={material.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-1 bg-zinc-950/80 backdrop-blur-md text-zinc-300 text-xs font-semibold rounded-lg border border-zinc-800/80 shadow-md">
                      {material.category}
                    </span>
                  </div>

                  {/* Market Pricing Overlay Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-emerald-500 text-zinc-950 text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                    <Scale className="h-3 w-3" />
                    Est: ${material.pricePerLbMin.toFixed(2)}-${material.pricePerLbMax.toFixed(2)}/lb
                  </div>
                </div>

                {/* Content info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold text-zinc-100 tracking-tight group-hover:text-emerald-400 transition-colors">
                        {material.name}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                      {material.description}
                    </p>

                    {/* Specifications List */}
                    <div className="pt-3 border-t border-zinc-800/60">
                      <div className="text-zinc-500 text-xs font-semibold mb-2 uppercase tracking-wider flex items-center gap-1">
                        <Shield className="h-3 w-3 text-emerald-500/70" /> Specifications
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {material.specifications.slice(0, 3).map((spec, sidx) => (
                          <span
                            key={sidx}
                            className="text-[11px] font-mono font-medium text-zinc-300 bg-zinc-950 px-2 py-0.5 rounded-md border border-zinc-800/80"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Action */}
                  <div className="mt-5 pt-3 border-t border-zinc-800/50 flex items-center justify-between">
                    <button
                      onClick={() => onSelectMaterial(material)}
                      className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-emerald-500 hover:text-zinc-950 border border-zinc-800 hover:border-transparent text-zinc-300 font-semibold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-sm group/btn"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
          })}
        </AnimatePresence>

        {filteredMaterials.length === 0 && (
          <div className="col-span-full py-16 text-center space-y-4">
            <div className="bg-zinc-900 h-16 w-16 mx-auto rounded-full flex items-center justify-center border border-zinc-800">
              <Search className="h-6 w-6 text-zinc-500" />
            </div>
            <div className="space-y-1">
              <h4 className="text-zinc-300 font-semibold text-lg">No materials found</h4>
              <p className="text-zinc-500 text-sm max-w-md mx-auto">
                We couldn't find any metals matching "{searchQuery}" under category "{selectedCategory}". Try adjusting your keywords.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
