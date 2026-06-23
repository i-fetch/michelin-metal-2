//models/Inquiry.ts
import { Schema, model, models } from "mongoose";

export interface IInquiry {
    productTitle: string;
    productSlug: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    quantityRequested: number;
    quantityUnit: string;
    inquiryType: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
    {
        productTitle: { type: String, required: true, trim: true },
        productSlug: { type: String, required: true, lowercase: true, trim: true, index: true },
        companyName: { type: String, required: true, trim: true },
        contactName: { type: String, required: true, trim: true },
        contactEmail: { type: String, required: true, lowercase: true, trim: true },
        quantityRequested: { type: Number, required: true, min: 1 },
        quantityUnit: { type: String, required: true, trim: true },
        inquiryType: { type: String, required: true, trim: true },
        notes: { type: String, trim: true },
    },
    {
        timestamps: true,
    }
);

const Inquiry = models.Inquiry || model<IInquiry>("Inquiry", InquirySchema);
export default Inquiry;
