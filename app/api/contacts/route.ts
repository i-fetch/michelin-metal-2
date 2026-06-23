import { connectDB } from "@/lib/connectDB";
import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      message,
      channel,
      company,
      phone,
      country,
      type,
      product,
      volume,
    } = body;

    if (!name || !email || !message || !channel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      message: message.trim(),
      channel: channel.trim(),
      company: company?.trim(),
      phone: phone?.trim(),
      country: country?.trim(),
      type: type?.trim(),
      product: product?.trim(),
      volume: volume?.trim(),
    });

    return NextResponse.json({ success: true, contactId: contact._id }, { status: 201 });
  } catch (error) {
    console.error("Contact creation error:", error);
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}
