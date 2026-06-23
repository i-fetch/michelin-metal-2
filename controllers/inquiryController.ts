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
    return Inquiry.find().sort({ createdAt: -1 }).lean();
}

// export async function createInquiry(payload: InquiryPayload) {
//     await connectDB();
//     return Inquiry.create(payload);
// }

export async function archiveInquiry(id: string) {
    await connectDB();
    return Inquiry.findByIdAndDelete(id);
}

export async function archiveInquiryAction(id: string) {
    if (!id) {
        throw new Error('Inquiry id is required for archive');
    }
    await archiveInquiry(id);
}

// export async function createInquiryAction(formData: FormData) {

//     await createInquiry({
//         productTitle: String(formData.get('productTitle') || '').trim(),
//         productSlug: String(formData.get('productSlug') || '').trim(),
//         companyName: String(formData.get('companyName') || '').trim(),
//         contactName: String(formData.get('contactName') || '').trim(),
//         contactEmail: String(formData.get('contactEmail') || '').trim(),
//         quantityRequested: Number(formData.get('quantityRequested') || 0),
//         quantityUnit: String(formData.get('quantityUnit') || 'tonne').trim(),
//         inquiryType: String(formData.get('inquiryType') || '').trim(),
//         notes: String(formData.get('notes') || '').trim() || undefined,
//     });
// }
