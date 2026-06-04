// models/Product.ts
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    category: {
      name: { type: String, required: true },
      slug: { type: String, required: true, lowercase: true },
    },
    badge: { type: String },
    specs: {
      grade: String,
      form: String,
      purity: String,
      source: String,
      hazardCompliance: String,
      zincContent: String,
    },
    moq: {
      value: { type: Number, required: true },
      unit: { type: String, enum: ["kg", "tonne"], required: true },
    },
    applications: [{ type: String }],
    images: [{ type: String }], // Multi-image setup
  },
  { timestamps: true }
);

ProductSchema.index({ title: "text", description: "text" });

const Product = models.Product || model("Product", ProductSchema);
export default Product;