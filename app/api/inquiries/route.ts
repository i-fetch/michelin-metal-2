import { connectDB } from "@/lib/connectDB";
import Inquiry from "@/models/Inquiry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { productTitle, productSlug, companyName, contactName, contactEmail, quantityRequested, quantityUnit, inquiryType, notes } = body;

    // Validate required fields
    if (!productTitle || !productSlug || !companyName || !contactName || !contactEmail || !quantityRequested || !quantityUnit || !inquiryType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    
    await connectDB();

    const inquiry = await Inquiry.create({
      productTitle: productTitle.trim(),
      productSlug: productSlug.toLowerCase().trim(),
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      contactEmail: contactEmail.toLowerCase().trim(),
      quantityRequested: Number(quantityRequested),
      quantityUnit: quantityUnit.trim(),
      inquiryType: inquiryType.trim(),
      notes: notes ? notes.trim() : undefined,
    });

    return NextResponse.json({ success: true, inquiryId: inquiry._id }, { status: 201 });
  } catch (error) {
    console.error("Inquiry creation error:", error);
    return NextResponse.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    );
  }
}
