"use server";
import { connectDB } from "@/lib/connectDB";
import Contact from "@/models/Contact";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  channel: string;
  company?: string;
  phone?: string;
  country?: string;
  type?: string;
  product?: string;
  volume?: string;
}

export async function getAllContacts() {
  await connectDB();
  const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(contacts));
}


export async function deleteContact(id: string) {
  await connectDB();
  return Contact.findByIdAndDelete(id);
}

export async function deleteContactAction(id: string) {
  if (!id) {
    throw new Error('Contact id is required for delete');
  }
  await deleteContact(id);
}
