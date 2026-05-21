import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema(
  {
    title:            { type: String, required: true, trim: true },
    slug:             { type: String, required: true, unique: true, lowercase: true, trim: true },
    image:            { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription:  { type: String, required: true },
    specs:            [{ type: String }],
    applications:     [{ type: String }],
    category: {
      type:     String,
      enum:     ['aluminium', 'ferrous', 'non-ferrous', 'bulk'],
      required: true,
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Index for fast slug lookups and category filtering
ProductSchema.index({ slug: 1 })
ProductSchema.index({ category: 1 })
ProductSchema.index({ featured: 1 })

const Product = models.Product ?? model('Product', ProductSchema)
export default Product
