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
  { name: "Zinc Oxide", slug: "zinc-oxide" },
  { name: "Zinc Dust", slug: "zinc-dust" },
  { name: "Zinc Granules", slug: "zinc-granules" },
  { name: "Copper & Alloys", slug: "copper-alloys" },
  { name: "Chemical Compounds", slug: "chemical-compounds" },
];

export interface DashboardMetric {
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  description: string;
}

export interface AnalyticsData {
  month: string;
  pageViews: number;
  inquiries: number;
  sampleRequests: number;
}


