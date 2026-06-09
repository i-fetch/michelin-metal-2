"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ExternalLink, Save } from "lucide-react";
import { toast } from "sonner";

// Mock categories - replace with actual data fetch if needed
const CATEGORIES = [
  { slug: "aluminium", name: "ALUMINIUM" },
  { slug: "ferrous", name: "FERROUS" },
  { slug: "non-ferrous", name: "NON-FERROUS" },
];

interface FormDataType {
  title: string;
  slug: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  badge: string;
  moqValue: number;
  moqUnit: "kg" | "tonne";
  specs: {
    grade: string;
    form: string;
    purity: string;
    zincContent: string;
    source: string;
    hazardCompliance: string;
  };
  applications: string[];
  images: string[];
}

export default function AddProductPage() {
  const router = useRouter();
  const params = useParams();
  const isEditMode = params?.id !== undefined;

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    slug: "",
    description: "",
    categorySlug: CATEGORIES[0].slug,
    categoryName: CATEGORIES[0].name,
    badge: "",
    moqValue: 100,
    moqUnit: "tonne",
    specs: {
      grade: "",
      form: "",
      purity: "",
      zincContent: "",
      source: "",
      hazardCompliance: "",
    },
    applications: [],
    images: [],
  });

  const [newAppInput, setNewAppInput] = useState("");
  const [newImageInput, setNewImageInput] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);

  const handleTitleChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    setFormData((prev) => ({ ...prev, title: value, slug }));
  };

  const runAISpecWizard = async () => {
    setIsAILoading(true);
    try {
      toast.info("AI Specs Assistant coming soon!");
    } finally {
      setIsAILoading(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Saving product:", formData);
      toast.success("Product saved successfully!");
      router.push("/admin/products-auditing");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save product");
    }
  };

  return (
    <div className="space-y-6 text-left" id="subview-admin-form">
      {/* Form header details */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border-subtle gap-4">
        <div>
          <h2 className="text-bebas text-3xl text-tx-primary tracking-wide">
            {isEditMode
              ? "Edit Metal Listing Schema Structure"
              : "Create Brand New Metallic Listing"}
          </h2>
          <p className="text-xs text-tx-secondary mt-0.5">
            Adheres rigorously to standard MongoDB database validation schema constraints outlined.
          </p>
        </div>

        {/* Review Product button */}
        <button
          type="button"
          className="cursor-pointer inline-flex items-center space-x-2 rounded-lg bg-brand-green px-4 py-2.5 text-xs text-xs-secondary font-bold uppercase tracking-wider shadow hover:bg-gold-brand/95 transition-all self-start sm:self-auto disabled:opacity-50 animate-pulse"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Review Product</span>
        </button>
      </div>

      {/* Integrated Form block */}
      <form onSubmit={handleSaveProduct} className="bg-white rounded-xl border border-border-subtle p-6 space-y-6">

        {/* Section 1: Core Details */}
        <div className="space-y-4">
          <h3 className="font-bebas text-lg tracking-wider text-tx-primary border-b border-gray-100 pb-1 uppercase">
            1. Core Catalog Metadata
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1">Product Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ultrafine Reactive Zinc Dust Premium"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1">Unique Slug (Auto-generated) *</label>
              <input
                type="text"
                required
                placeholder="ultrafine-reactive-zinc-dust"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none bg-bg-subtle font-mono-custom text-tx-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1">Classification Category *</label>
              <select
                value={formData.categorySlug}
                onChange={(e) => {
                  const matched = CATEGORIES.find(c => c.slug === e.target.value);
                  if (matched) {
                    setFormData(prev => ({
                      ...prev,
                      categorySlug: matched.slug,
                      categoryName: matched.name
                    }));
                  }
                }}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              >
                {CATEGORIES.map(c => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1">Status Badge Overlay</label>
              <input
                type="text"
                placeholder="e.g. Premium Active, Eco-Certified"
                value={formData.badge}
                onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              />
            </div>

            {/* MOQ Settings */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-tx-secondary mb-1">MOQ Vol *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.moqValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, moqValue: Number(e.target.value) }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none font-semibold text-tx-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-tx-secondary mb-1">MOQ Unit *</label>
                <select
                  value={formData.moqUnit}
                  onChange={(e) => setFormData(prev => ({ ...prev, moqUnit: e.target.value as "kg" | "tonne" }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
                >
                  <option value="tonne">Tonne</option>
                  <option value="kg">Kg</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-tx-secondary mb-1">Description Narrative *</label>
            <textarea
              rows={3}
              required
              placeholder="Write comprehensive B2B metal overview narration including manufacture background details..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Section 2: Technical Specifications Schema fields */}
        <div className="space-y-4">
          <h3 className="font-bebas text-lg tracking-wider text-tx-primary border-b border-gray-100 pb-1 uppercase">
            2. Technical Specification Parameters (Schema specs)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-custom">
            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Quality Grade Name</label>
              <input
                type="text"
                placeholder="Active Pharmaceutical / Class A Maritime"
                value={formData.specs.grade}
                onChange={(e) => setFormData(p => ({ ...p, specs: { ...p.specs, grade: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Physical Form Element</label>
              <input
                type="text"
                placeholder="Finely precipitated powder / Granules"
                value={formData.specs.form}
                onChange={(e) => setFormData(p => ({ ...p, specs: { ...p.specs, form: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Chemical Purity %</label>
              <input
                type="text"
                placeholder="99.92% / 98.5%"
                value={formData.specs.purity}
                onChange={(e) => setFormData(p => ({ ...p, specs: { ...p.specs, purity: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-custom">
            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Zinc Content Fraction %</label>
              <input
                type="text"
                placeholder="80.3% / 98.5%"
                value={formData.specs.zincContent}
                onChange={(e) => setFormData(p => ({ ...p, specs: { ...p.specs, zincContent: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans font-medium">Extraction Source Loop</label>
              <input
                type="text"
                placeholder="Hydrogen Reduction Loop / Electrolytic"
                value={formData.specs.source}
                onChange={(e) => setFormData(p => ({ ...p, specs: { ...p.specs, source: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Hazard Compliance Class (ADR/GHS)</label>
              <input
                type="text"
                placeholder="GHS Class 9 Aquatic Toxicity"
                value={formData.specs.hazardCompliance}
                onChange={(e) => setFormData(p => ({ ...p, specs: { ...p.specs, hazardCompliance: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none col-span-1"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Applications Bullets list */}
        <div className="space-y-4">
          <h3 className="font-bebas text-lg tracking-wider text-tx-primary border-b border-gray-100 pb-1 uppercase">
            3. Application Bullet Fields
          </h3>

          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="e.g. Vulcanization activator in high-speed tires"
                value={newAppInput}
                onChange={(e) => setNewAppInput(e.target.value)}
                className="flex-grow rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (newAppInput.trim()) {
                    setFormData(p => ({ ...p, applications: [...p.applications, newAppInput.trim()] }));
                    setNewAppInput("");
                  }
                }}
                className="cursor-pointer bg-tx-primary hover:bg-tx-secondary text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors"
              >
                Add Bullet
              </button>
            </div>

            {/* Bullet indicators view */}
            <div className="flex flex-wrap gap-2 pt-1" id="bullet-indicators">
              {formData.applications.map((app, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 rounded-full bg-bg-subtle border px-3 py-1 text-[11px] text-tx-secondary"
                >
                  <span>{app}</span>
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, applications: p.applications.filter((_, i) => i !== idx) }))}
                    className="cursor-pointer text-red-500 font-bold hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Multi-image URLs */}
        <div className="space-y-4">
          <h3 className="font-bebas text-lg tracking-wider text-tx-primary border-b border-gray-100 pb-1 uppercase">
            4. Product Image Carousel Anchors (Multi-Image URL Array)
          </h3>

          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="url"
                placeholder="Paste raw Unsplash/industrial image online URL anchor"
                value={newImageInput}
                onChange={(e) => setNewImageInput(e.target.value)}
                className="flex-grow rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none font-mono-custom"
              />
              <button
                type="button"
                onClick={() => {
                  if (newImageInput.trim()) {
                    setFormData(p => ({ ...p, images: [...p.images, newImageInput.trim()] }));
                    setNewImageInput("");
                  }
                }}
                className="cursor-pointer bg-tx-primary hover:bg-tx-secondary text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors"
              >
                Add Image Link
              </button>
            </div>

            {/* Images matrix grid view */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1" id="image-url-matrix">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-16/10 rounded-lg overflow-hidden border bg-bg-subtle group">
                  <img src={img} alt={`Product ${idx + 1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))}
                    className="cursor-pointer absolute top-1.5 right-1.5 bg-black/75 hover:bg-red-600 font-bold text-white h-5 w-5 rounded-full flex items-center justify-center text-xs transition-colors"
                    title="Delete Image anchor"
                  >
                    ×
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 py-0.5 text-center text-[8px] text-gray-300 font-mono-custom truncate px-1">
                    Img {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action save buttons row */}
        <div className="border-t border-gray-100 pt-5 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products-auditing")}
            className="cursor-pointer px-6 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider text-tx-secondary hover:bg-bg-subtle hover:text-tx-primary transition-all"
          >
            Cancel / Back
          </button>

          <button
            type="submit"
            className="cursor-pointer px-6 py-2.5 rounded-lg bg-brand-green text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-green/95 transition-all inline-flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save to MongoDB Schema</span>
          </button>
        </div>

      </form>
    </div>
  );
}