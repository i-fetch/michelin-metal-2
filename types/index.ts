// types/index.ts
export interface Product {
  _id: string
  title: string
  slug: string
  images: string[]
  shortDescription: string
  fullDescription: string
  category: ProductCategory
  subcategory: string
  featured: boolean
  status: "active" | "draft" | "archived"
  specs: string[]
  applications: string[]
  purity: string
  materialGrade: string
  condition: string
  recyclingClass: string
  price: number | null
  currency: string
  showPrice: boolean
  bulkPricing: string
  requestQuote: boolean
}

export type ProductCategory = "aluminium" | "metals" | "non-ferrous" | "bulk"

export interface CategoryConfig {
  id: ProductCategory
  label: string
  accent: string
  icon: string
  subcategories: string[]
}

export const PRODUCT_CATEGORIES: CategoryConfig[] = [
  {
    id: "aluminium",
    label: "Aluminium",
    accent: "#16a34a",
    icon: "🔩",
    subcategories: [
      "Profile","UBC","Soft Aluminum","Zinc","Radiator",
      "Rim","Printing & Letto Sheets","Chaff","Cast Aluminum",
    ],
  },
  {
    id: "metals",
    label: "Metals",
    accent: "#0284c7",
    icon: "⚙️",
    subcategories: ["Copper","Brass","Radiator Brass","Lead","Battery Scrap"],
  },
  {
    id: "non-ferrous",
    label: "Non-Ferrous",
    accent: "#d97706",
    icon: "✨",
    subcategories: ["Copper Wire","Aluminum Ingots","Zinc Scrap","Lead Ingots","Brass Scrap"],
  },
  {
    id: "bulk",
    label: "Bulk Supply",
    accent: "#7c3aed",
    icon: "📦",
    subcategories: [
      "Industrial Bulk Orders","Container Supply","Export Supply","Factory Supply Contracts",
    ],
  },
]

export const STATUS_CONFIG = {
  active: { label: "Active", class: "badge-green" },
  draft: { label: "Draft", class: "badge-yellow" },
  archived: { label: "Archived", class: "badge-gray" },
} as const

export const CATEGORY_BADGE_CLASS: Record<ProductCategory, string> = {
  aluminium: "badge-green",
  metals: "badge-blue",
  "non-ferrous": "badge-yellow",
  bulk: "badge-purple",
}


export type ActionResult<T = void> =
  | { success: true; data: T; error?: never }
  | { success: false; error: string; data?: never }

export interface IUser extends Document {
  username: string
  email: string
  password: string
  role: 'admin'
}
