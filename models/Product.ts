// models/Product.ts
import mongoose, { Schema, Document, Types } from 'mongoose'
import { PRODUCT_CATEGORIES, type ProductCategory } from '@/lib/productCategories'

const CATEGORY_VALUES = PRODUCT_CATEGORIES.map(c => c.id)

export interface IProduct extends Document {
  title:             string
  slug:              string
  imageIds:          Types.ObjectId[]
  shortDescription:  string
  fullDescription:   string
  category:          ProductCategory
  subcategory:       string
  featured:          boolean
  status:            'active' | 'draft' | 'archived'
  specs:             string[]
  applications:      string[]
  purity:            string
  materialGrade:     string
  condition:         string
  recyclingClass:    string
  quantityAvailable: string
  unitType:          string
  supplyCapacity:    string
  moq:               string
  packagingType:     string
  countryOfOrigin:   string
  deliveryTimeline:  string
  exportAvailable:   boolean
  stockAvailable:    boolean
  price:             number | null
  currency:          string
  priceNegotiable:   boolean
  showPrice:         boolean
  bulkPricing:       string
  requestQuote:      boolean
  tags:              string[]
  seoTitle:          string
  seoDescription:    string
  createdAt:         Date
  updatedAt:         Date
}

const ProductSchema = new Schema<IProduct>(
  {
    title:             { type: String, required: true, trim: true },
    slug:              { type: String, required: true, unique: true, lowercase: true },
    imageIds:          [{ type: Schema.Types.ObjectId }],
    shortDescription:  { type: String, required: true },
    fullDescription:   { type: String, required: true },
    category:          { type: String, required: true, enum: CATEGORY_VALUES },
    subcategory:       { type: String, default: '' },
    featured:          { type: Boolean, default: false },
    status:            { type: String, default: 'active', enum: ['active', 'draft', 'archived'] },
    specs:             [{ type: String }],
    applications:      [{ type: String }],
    purity:            { type: String, default: '' },
    materialGrade:     { type: String, default: '' },
    condition:         { type: String, default: 'Recycled' },
    recyclingClass:    { type: String, default: '' },
    quantityAvailable: { type: String, default: '' },
    unitType:          { type: String, default: 'Metric Tons' },
    supplyCapacity:    { type: String, default: '' },
    moq:               { type: String, default: '' },
    packagingType:     { type: String, default: 'Baled' },
    countryOfOrigin:   { type: String, default: 'Nigeria' },
    deliveryTimeline:  { type: String, default: '' },
    exportAvailable:   { type: Boolean, default: true },
    stockAvailable:    { type: Boolean, default: true },
    price:             { type: Number, default: null },
    currency:          { type: String, default: 'USD' },
    priceNegotiable:   { type: Boolean, default: false },
    showPrice:         { type: Boolean, default: true },
    bulkPricing:       { type: String, default: '' },
    requestQuote:      { type: Boolean, default: false },
    tags:              [{ type: String }],
    seoTitle:          { type: String, default: '' },
    seoDescription:    { type: String, default: '' },
  },
  { timestamps: true }
)

ProductSchema.index({ slug: 1 })
ProductSchema.index({ category: 1 })
ProductSchema.index({ status: 1 })
ProductSchema.index({ featured: 1 })

// Safe registration pattern — avoids crash when module is re-evaluated
let ProductModel: mongoose.Model<IProduct>
try {
  ProductModel = mongoose.model<IProduct>('Product')
} catch {
  ProductModel = mongoose.model<IProduct>('Product', ProductSchema)
}

export { ProductModel }
