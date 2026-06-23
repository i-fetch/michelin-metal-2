import { Schema, model, models } from "mongoose";

export interface IContact {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  type?: string;
  product?: string;
  volume?: string;
  message: string;
  channel: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    type: { type: String, trim: true },
    product: { type: String, trim: true },
    volume: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    channel: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Contact = models.Contact || model<IContact>("Contact", ContactSchema);
export default Contact;
