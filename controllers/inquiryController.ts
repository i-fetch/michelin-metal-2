"use server";
import { connectDB } from "@/lib/connectDB";
import Inquiry from "@/models/Inquiry";

export interface InquiryPayload {
    productTitle: string;
    productSlug: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    quantityRequested: number;
    quantityUnit: string;
    inquiryType: string;
    notes?: string;
}

export async function getAllInquiries() {
    await connectDB();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(inquiries));
}
export async function deleteInquiry(id: string) {
    await connectDB();
    return Inquiry.findByIdAndDelete(id);
}
export async function deleteInquiryAction(id: string) {
    if (!id) {
        throw new Error('Inquiry id is required for delete');
    }
    await deleteInquiry(id);
}

