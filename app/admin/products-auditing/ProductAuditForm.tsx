// ProductAuditForm.tsx 
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Save } from "lucide-react";
import { toast } from "sonner";
import type { Product, ProductFormData } from "@/lib/types";
import { BADGE_OPTIONS, buildSlug, CATEGORIES, defaultFormData, FORM_OPTIONS, getFormDataFromProduct, GRADE_OPTIONS, HAZARD_OPTIONS, PURITY_OPTIONS, SOURCE_OPTIONS, ZINC_CONTENT_OPTIONS } from "@/lib/types";

type FormMode = "create" | "edit";


interface ProductAuditFormProps {
  mode: FormMode;
  product?: Product;
}

export default function ProductAuditForm({ mode, product }: ProductAuditFormProps) {
  const router = useRouter();
  const isEditMode = mode === "edit";
  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
  const [newAppInput, setNewAppInput] = useState("");
  const [newImageInput, setNewImageInput] = useState("");
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(getFormDataFromProduct(product));
    }
  }, [product]);

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, title: value, slug: buildSlug(value) }));
  };


  const handleSaveProduct = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("slug", formData.slug);
      payload.append("description", formData.description);
      payload.append("categoryName", formData.categoryName);
      payload.append("categorySlug", formData.categorySlug);
      payload.append("badge", formData.badge);
      payload.append("moqValue", String(formData.moqValue));
      payload.append("moqUnit", formData.moqUnit);

      payload.append("grade", formData.specs.grade);
      payload.append("form", formData.specs.form);
      payload.append("purity", formData.specs.purity);
      payload.append("source", formData.specs.source);
      payload.append(
        "hazardCompliance",
        formData.specs.hazardCompliance
      );
      payload.append("zincContent", formData.specs.zincContent);
      payload.append(
        "applications",
        formData.applications.join(",")
      );

      formData.images.forEach((image) =>
        payload.append("images", image)
      );

      newFiles.forEach((file) =>
        payload.append("images", file)
      );

      if (isEditMode && product?._id) {
        payload.append("id", product._id);
      }

      const endpoint = isEditMode
        ? "/api/update-product"
        : "/api/create-product";

      const res = await fetch(endpoint, {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Request failed");
      }

      toast.success(
        isEditMode
          ? "Product updated successfully."
          : "Product created successfully."
      );

      router.push("/admin/products-auditing");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save product."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left" id="subview-admin-form">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border-subtle gap-4">
        <div>
          <h2 className="text-bebas text-3xl text-tx-primary tracking-wide">
            {isEditMode ? "Edit Metal Listing Schema Structure" : "Create Brand New Metallic Listing"}
          </h2>
          <p className="text-xs text-tx-secondary mt-0.5">
            Adheres rigorously to standard MongoDB database validation schema constraints outlined.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (product) {
              router.push(`/products/${product.slug}`);
            }
          }}
          disabled={!product}
          className="text-xs cursor-pointer flex items-center space-x-2 rounded-lg bg-brand-green p-2 text-white shadow transition-all hover:bg-green-700 self-start sm:self-auto"

        >
          <ExternalLink className="h-4 w-4" />
          <span>{product ? "Review Product" : "Review"}</span>
        </button>
      </div>

      <form onSubmit={handleSaveProduct} className="bg-white rounded-xl border border-border-subtle p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg tracking-wider text-tx-primary border-b border-gray-100 pb-1 uppercase">
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
                readOnly
                title="Auto-generated from product title"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs bg-bg-subtle font-mono-custom text-tx-primary cursor-not-allowed"
              />
              <p className="text-[11px] text-tx-secondary mt-1">Auto-generated from the <strong>Product Title</strong>. Slug is product-specific (e.g. <em>ultrafine-reactive-zinc-dust</em>), not the category.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1">Classification Category *</label>
              <select
                value={formData.categorySlug}
                onChange={(e) => {
                  const matched = CATEGORIES.find((c) => c.slug === e.target.value);
                  if (matched) {
                    setFormData((prev) => ({
                      ...prev,
                      categorySlug: matched.slug,
                      categoryName: matched.name,
                    }));
                  }
                }}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1">Status Badge Overlay</label>
              <div className="grid gap-2">
                <select
                  value={formData.badgeOption}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({ ...prev, badgeOption: val, badge: val === "Custom" ? prev.badge : val }));
                  }}
                  className="w-full rounded-lg border border-green-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900 focus:border-brand-green outline-none"
                >
                  <option value="">Select a badge</option>
                  {BADGE_OPTIONS.map((badge) => (
                    <option key={badge} value={badge}>
                      {badge}
                    </option>
                  ))}
                </select>

                {formData.badgeOption === "Custom" ? (
                  <input
                    type="text"
                    placeholder="Custom badge text"
                    value={formData.badge}
                    onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))}
                    className="w-full rounded-lg border border-green-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
                  />
                ) : formData.badgeOption ? (
                  <div className="hidden rounded-lg border border-green-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
                    Selected badge: <strong>{formData.badgeOption}</strong>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-tx-secondary mb-1">MOQ Vol *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.moqValue}
                  onChange={(e) => setFormData((prev) => ({ ...prev, moqValue: Number(e.target.value) }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none font-semibold text-tx-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-tx-secondary mb-1">MOQ Unit *</label>
                <select
                  value={formData.moqUnit}
                  onChange={(e) => setFormData((prev) => ({ ...prev, moqUnit: e.target.value as "kg" | "tonne" }))}
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
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none leading-relaxed"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bebas text-lg tracking-wider text-tx-primary border-b border-gray-100 pb-1 uppercase">
            2. Technical Specification Parameters (Schema specs)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-custom">
            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Quality Grade Name</label>
              <select
                value={formData.specs.grade}
                onChange={(e) => setFormData((p) => ({ ...p, specs: { ...p.specs, grade: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              >
                <option value="">Select grade</option>
                {GRADE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                {formData.specs.grade && !GRADE_OPTIONS.includes(formData.specs.grade as (typeof GRADE_OPTIONS)[number]) ? (
                  <option value={formData.specs.grade}>
                    Custom: {formData.specs.grade}
                  </option>
                ) : null}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Physical Form Element</label>
              <select
                value={formData.specs.form}
                onChange={(e) => setFormData((p) => ({ ...p, specs: { ...p.specs, form: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              >
                <option value="">Select form</option>
                {FORM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                {formData.specs.form && !FORM_OPTIONS.includes(formData.specs.form as (typeof FORM_OPTIONS)[number]) ? (
                  <option value={formData.specs.form}>
                    Custom: {formData.specs.form}
                  </option>
                ) : null}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Chemical Purity %</label>
              <select
                value={formData.specs.purity}
                onChange={(e) => setFormData((p) => ({ ...p, specs: { ...p.specs, purity: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              >
                <option value="">Select purity</option>
                {PURITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                {formData.specs.purity && !PURITY_OPTIONS.includes(formData.specs.purity as (typeof PURITY_OPTIONS)[number]) ? (
                  <option value={formData.specs.purity}>
                    Custom: {formData.specs.purity}
                  </option>
                ) : null}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-custom">
            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Zinc Content Fraction %</label>
              <select
                value={formData.specs.zincContent}
                onChange={(e) => setFormData((p) => ({ ...p, specs: { ...p.specs, zincContent: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              >
                <option value="">Select zinc content</option>
                {ZINC_CONTENT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                {formData.specs.zincContent && !ZINC_CONTENT_OPTIONS.includes(formData.specs.zincContent as (typeof ZINC_CONTENT_OPTIONS)[number]) ? (
                  <option value={formData.specs.zincContent}>
                    Custom: {formData.specs.zincContent}
                  </option>
                ) : null}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Extraction Source Loop</label>
              <select
                value={formData.specs.source}
                onChange={(e) => setFormData((p) => ({ ...p, specs: { ...p.specs, source: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none"
              >
                <option value="">Select source</option>
                {SOURCE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                {formData.specs.source && !SOURCE_OPTIONS.includes(formData.specs.source as (typeof SOURCE_OPTIONS)[number]) ? (
                  <option value={formData.specs.source}>
                    Custom: {formData.specs.source}
                  </option>
                ) : null}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-tx-secondary mb-1 font-sans">Hazard Compliance Class (ADR/GHS)</label>
              <select
                value={formData.specs.hazardCompliance}
                onChange={(e) => setFormData((p) => ({ ...p, specs: { ...p.specs, hazardCompliance: e.target.value } }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none col-span-1"
              >
                <option value="">Select hazard compliance</option>
                {HAZARD_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                {formData.specs.hazardCompliance && !HAZARD_OPTIONS.includes(formData.specs.hazardCompliance as (typeof HAZARD_OPTIONS)[number]) ? (
                  <option value={formData.specs.hazardCompliance}>
                    Custom: {formData.specs.hazardCompliance}
                  </option>
                ) : null}
              </select>
            </div>
          </div>
        </div>

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
                    setFormData((p) => ({ ...p, applications: [...p.applications, newAppInput.trim()] }));
                    setNewAppInput("");
                  }
                }}
                className="cursor-pointer bg-tx-primary hover:bg-tx-secondary text-white p-2 rounded-lg text-xs font-bold uppercase transition-colors"
              >
                Add Bullet
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1" id="bullet-indicators">
              {formData.applications.map((app, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 rounded-full bg-bg-subtle border px-3 py-1 text-[11px] text-tx-secondary"
                >
                  <span>{app}</span>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, applications: p.applications.filter((_, i) => i !== idx) }))}
                    className="cursor-pointer text-red-500 font-bold hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bebas text-lg tracking-wider text-tx-primary border-b border-gray-100 pb-1 uppercase">
            4. Product Image Carousel Anchors (Multi-Image URL Array)
          </h3>

          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              {/* <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2"> */}
              <div className="flex-grow">
                <input
                  type="url"
                  placeholder="Paste raw Unsplash/industrial image online URL anchor"
                  value={newImageInput}
                  onChange={(e) => setNewImageInput(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-brand-green outline-none font-mono-custom"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (newImageInput.trim()) {
                      setFormData((p) => ({ ...p, images: [...p.images, newImageInput.trim()] }));
                      setNewImageInput("");
                    }
                  }}
                  className="cursor-pointer bg-tx-primary hover:bg-tx-secondary text-white p-2 rounded-lg text-xs font-bold uppercase transition-colors"
                >
                  Add via Link
                </button>
                <label className="cursor-pointer bg-brand-gold hover:bg-tx-secondary text-white p-2 rounded-lg text-xs font-bold uppercase transition-colors"
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setNewFiles((prev) => [...prev, ...files]);
                    }}
                    className="hidden"
                  />
                  Upload From Device
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1" id="image-url-matrix">
              {formData.images.map((img, idx) => (
                <div key={`ref-${idx}`} className="relative aspect-16/10 rounded-lg overflow-hidden border bg-bg-subtle group">
                  <img src={/^[a-fA-F0-9]{24}$/.test(img) ? `/api/files/${img}` : img} alt={`Product ${idx + 1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))}
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

              {newFiles.map((f, idx) => (
                <div key={`file-${idx}`} className="relative aspect-16/10 rounded-lg overflow-hidden border bg-bg-subtle group">
                  <img src={URL.createObjectURL(f)} alt={f.name} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setNewFiles((prev) => prev.filter((_, i) => i !== idx))}
                    className="cursor-pointer absolute top-1.5 right-1.5 bg-black/75 hover:bg-red-600 font-bold text-white h-5 w-5 rounded-full flex items-center justify-center text-xs transition-colors"
                    title="Remove selected file"
                  >
                    ×
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 py-0.5 text-center text-[8px] text-gray-300 font-mono-custom truncate px-1">
                    {f.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
            disabled={isLoading}
            className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center space-x-2 transition-all ${isLoading
                ? "bg-brand-green/60 cursor-not-allowed opacity-70"
                : "bg-brand-green hover:bg-brand-green/95 cursor-pointer text-white"
              }`}
          >
            <Save className={`h-4 w-4 ${isLoading ? "animate-pulse" : ""}`} />

            <span>
              {isLoading
                ? isEditMode
                  ? "Saving Changes..."
                  : "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Save"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
