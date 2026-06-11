/**
 * Mechelin Metals Product Type Definitions
 * Following the requested MongoDB Schema
 */

export interface ProductSpecs {
  grade?: string;
  form?: string;
  purity?: string;
  source?: string;
  hazardCompliance?: string;
  zincContent?: string;
}

export interface ProductMOQ {
  value: number;
  unit: "kg" | "tonne";
}

export interface ProductCategory {
  name: string;
  slug: string;
}

export interface Product {
  _id: string; // Used for unique references in edit lists
  title: string;
  slug: string;
  description: string;
  category: ProductCategory;
  badge?: string; // e.g., "Highly Pure", "Industrial Grade", "Best Seller"
  specs: ProductSpecs;
  moq: ProductMOQ;
  applications: string[];
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const CATEGORIES: ProductCategory[] = [
  { name: "Aluminum", slug: "aluminum" },
  { name: "Copper", slug: "copper" },
  { name: "Brass", slug: "brass" },
  { name: "Lead", slug: "lead" },
  { name: "Battery", slug: "battery" },
  { name: "Zinc", slug: "zinc" },
];

export interface DashboardMetric {
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  description: string;
}

export interface Inquiry {
  _id: string;
  productTitle: string;
  productSlug: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  quantityRequested: number;
  quantityUnit: string;
  inquiryType: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// export interface IInquiry {
//   productTitle: string;
//   productSlug: string;
//   companyName: string;
//   contactName: string;
//   contactEmail: string;
//   quantityRequested: number;
//   quantityUnit: string;
//   inquiryType: string;
//   notes?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface AnalyticsData {
  month: string;
  pageViews: number;
  inquiries: number;
  sampleRequests: number;
}

export const BADGE_OPTIONS = [
  "Premium Active",
  "Eco-Certified",
  "Top Seller",
  "Industrial Grade",
  "Fast Dispatch",
  "Custom",
] as const;

export const GRADE_OPTIONS = [
  "Standard",
  "Premium",
  "Industrial",
  "Pharmaceutical",
  "Recycled",
  "Custom",
] as const;

export const FORM_OPTIONS = [
  "Powder",
  "Granules",
  "Ingot",
  "Pellets",
  "Sheet",
  "Custom",
] as const;

export const PURITY_OPTIONS = [
  "99.99%",
  "99.9%",
  "99.5%",
  "98%",
  "95%",
  "Custom",
] as const;

export const ZINC_CONTENT_OPTIONS = [
  "95%",
  "96%",
  "97%",
  "98%",
  "99%",
  "Custom",
] as const;

export const SOURCE_OPTIONS = [
  "Electrolytic",
  "Hydrogen Reduction",
  "Primary Smelter",
  "Recycled",
  "Imported",
  "Custom",
] as const;

export const HAZARD_OPTIONS = [
  "GHS Class 4",
  "GHS Class 8",
  "GHS Class 9",
  "ADR Class 4",
  "ADR Class 8",
  "Custom",
] as const;


export interface ProductFormData {
  title: string;
  slug: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  badge: string;
  badgeOption: string;
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

export const defaultFormData: ProductFormData = {
  title: "",
  slug: "",
  description: "",
  categorySlug: CATEGORIES[0].slug,
  categoryName: CATEGORIES[0].name,
  badge: "",
  badgeOption: "",
  moqValue: 50,
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
};

export const buildSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");

export const getFormDataFromProduct = (product: Product): ProductFormData => ({
  title: product.title,
  slug: product.slug,
  description: product.description,
  categorySlug: product.category.slug,
  categoryName: product.category.name,
  badge: product.badge ?? "",
  badgeOption: product.badge ? (BADGE_OPTIONS.includes(product.badge as any) ? product.badge : "Custom") : "",
  moqValue: product.moq.value,
  moqUnit: product.moq.unit,
  specs: {
    grade: product.specs.grade ?? "",
    form: product.specs.form ?? "",
    purity: product.specs.purity ?? "",
    zincContent: product.specs.zincContent ?? "",
    source: product.specs.source ?? "",
    hazardCompliance: product.specs.hazardCompliance ?? "",
  },
  applications: product.applications ?? [],
  images: product.images ?? [],
});


