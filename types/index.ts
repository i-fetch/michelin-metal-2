// types/index.ts
import type { ProductCategory } from '@/lib/productCategories'
export type { ProductCategory }

export interface Product {
  _id:              string
  title:            string
  slug:             string
  image:            string
  images:           string[]
  imageIds?:        string[]
  shortDescription: string
  fullDescription:  string
  category:         ProductCategory
  subcategory:      string
  featured:         boolean
  status:           'active' | 'draft' | 'archived'
  // Specs
  specs:            string[]
  applications:     string[]
  purity:           string
  materialGrade:    string
  condition:        string
  recyclingClass:   string
  // Logistics
  quantityAvailable:string
  unitType:         string
  supplyCapacity:   string
  moq:              string
  packagingType:    string
  countryOfOrigin:  string
  deliveryTimeline: string
  exportAvailable:  boolean
  stockAvailable:   boolean
  // Pricing
  price:            number | null
  currency:         string
  priceNegotiable:  boolean
  showPrice:        boolean
  bulkPricing:      string
  requestQuote:     boolean
  // SEO
  tags:             string[]
  seoTitle:         string
  seoDescription:   string
  createdAt:        string
  updatedAt:        string
}

export type ActionResult<T = void> =
  | { success: true;  data: T;       error?: never }
  | { success: false; error: string; data?: never  }
