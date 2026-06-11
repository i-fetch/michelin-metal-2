"use server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { connectDB } from "@/lib/connectDB";

export interface AdminUpdatePayload {
  username: string;
  email: string;
  password?: string;
}

export async function getAdminUser() {
  await connectDB();
  return User.findOne({ role: 'admin' }).select('+password').lean();
}

export async function updateAdminUser(payload: AdminUpdatePayload) {
  await connectDB();
  const updateData: Record<string, unknown> = {
    username: payload.username.trim(),
    email: payload.email.trim().toLowerCase(),
  };

  if (payload.password) {
    updateData.password = await bcrypt.hash(payload.password, 12);
  }

  return User.findOneAndUpdate({ role: 'admin' }, updateData, { new: true, runValidators: true }).select('+password').lean();
}

export async function updateAdminUserAction(formData: FormData) {
  const username = String(formData.get('username') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '').trim();

  if (!username || !email) {
    throw new Error('Username and email are required.');
  }

  await updateAdminUser({
    username,
    email,
    password: password || undefined,
  });
}
