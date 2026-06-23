
"use server";
import { redirect } from "next/navigation";
import Product from "@/models/Product";
import type { Product as ProductType } from "@/lib/types";
import { connectDB } from "@/lib/connectDB";
import crypto from "crypto";

export interface ProductPayload {
    title: string;
    slug: string;
    description: string;
    category: {
        name: string;
        slug: string;
    };
    badge?: string;
    specs: {
        grade?: string;
        form?: string;
        purity?: string;
        source?: string;
        hazardCompliance?: string;
        zincContent?: string;
    };
    moq: {
        value: number;
        unit: "kg" | "tonne";
    };
    applications: string[];
    images: string[]; // will store GridFS file ids as strings
}

async function ensureDb() {
    const mongoose = await connectDB();
    // mongoose.connection.db is the native db
    // @ts-ignore
    const db = mongoose.connection.db;
    return { mongoose, db } as { mongoose: typeof import("mongoose"); db: import("mongodb").Db };
}

export async function uploadFilesToGridFS(files: (File | string)[]): Promise<string[]> {
    const { db, mongoose } = await ensureDb();
    const bucket = new mongoose.mongo.GridFSBucket(db);

    const results: string[] = [];

    for (const f of files) {
        if (typeof f === "string") {
            if (f.trim()) {
                results.push(f);
            }
            continue;
        }

        // File object from FormData
        try {
            const arrayBuffer = await f.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // compute hash for dedupe
            const hash = crypto.createHash("sha256").update(buffer).digest("hex");

            // check existing files by metadata.hash
            const existing = await db.collection("fs.files").findOne({ "metadata.hash": hash });
            if (existing) {
                results.push(String(existing._id));
                continue;
            }

            // upload
            const uploadStream = bucket.openUploadStream(f.name || `upload-${Date.now()}`, {
                metadata: { hash, originalName: f.name },
            });

            uploadStream.end(buffer);

            await new Promise<void>((res, rej) => {
                uploadStream.on("finish", () => res());
                uploadStream.on("error", (err) => rej(err));
            });

            results.push(String(uploadStream.id));
        } catch (err) {
            console.error("GridFS upload failed:", err);
        }
    }

    return results;
}

export async function getAllProducts(): Promise<ProductType[]> {
    await connectDB();
    const docs = await Product.find().sort({ createdAt: -1 }).lean();
    return docs.map((p: any) => {
        const plain = JSON.parse(JSON.stringify(p));
        if (plain.createdAt) plain.createdAt = new Date(plain.createdAt).toISOString();
        if (plain.updatedAt) plain.updatedAt = new Date(plain.updatedAt).toISOString();
        if (plain._id) plain._id = String(plain._id);
        return plain;
    });
}

export async function getProductBySlug(slug: string): Promise<ProductType | null> {
    await connectDB();
    const p = await Product.findOne({ slug }).lean();
    if (!p) return null;
    const plain = JSON.parse(JSON.stringify(p));
    if (plain.createdAt) plain.createdAt = new Date(plain.createdAt).toISOString();
    if (plain.updatedAt) plain.updatedAt = new Date(plain.updatedAt).toISOString();
    if (plain._id) plain._id = String(plain._id);
    return plain;
}

export async function getProductById(id: string): Promise<ProductType | null> {
    await connectDB();
    const p = await Product.findById(id).lean();
    if (!p) return null;
    const plain = JSON.parse(JSON.stringify(p));
    if (plain.createdAt) plain.createdAt = new Date(plain.createdAt).toISOString();
    if (plain.updatedAt) plain.updatedAt = new Date(plain.updatedAt).toISOString();
    if (plain._id) plain._id = String(plain._id);
    return plain;
}

export async function createProduct(payload: ProductPayload): Promise<ProductType> {
    await connectDB();
    const product = await Product.create(payload);
    return product.toObject();
}

export async function updateProduct(id: string, payload: Partial<ProductPayload>): Promise<ProductType | null> {
    await connectDB();
    return Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
}

export async function createProductAction(formData: FormData) {
    'use server';

    const title = String(formData.get('title') || '').trim();
    const slug = String(formData.get('slug') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const categoryName = String(formData.get('categoryName') || '').trim();
    const categorySlug = String(formData.get('categorySlug') || '').trim();
    const badge = String(formData.get('badge') || '').trim() || undefined;
    const moqValue = Number(formData.get('moqValue') || 0);
    const moqUnit = String(formData.get('moqUnit') || 'tonne') as 'kg' | 'tonne';
    const specs = {
        grade: String(formData.get('grade') || '').trim(),
        form: String(formData.get('form') || '').trim(),
        purity: String(formData.get('purity') || '').trim(),
        source: String(formData.get('source') || '').trim(),
        hazardCompliance: String(formData.get('hazardCompliance') || '').trim(),
        zincContent: String(formData.get('zincContent') || '').trim(),
    };

    // collect files from formData: may be multiple 'images' fields
    const imageEntries = formData.getAll('images') as any[];
    const files: (File | string)[] = [];
    for (const e of imageEntries) {
        if (e instanceof File) files.push(e);
        else if (typeof e === 'string' && e) files.push(e);
    }

    const uploadedIds = await uploadFilesToGridFS(files);

    const payload: ProductPayload = {
        title,
        slug,
        description,
        category: { name: categoryName, slug: categorySlug },
        badge,
        moq: { value: moqValue, unit: moqUnit },
        specs,
        applications: String(formData.get('applications') || '')
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
        images: uploadedIds,
    };

    await createProduct(payload);
    redirect('/admin/products-auditing');
}

export async function updateProductAction(formData: FormData) {
    'use server';

    const id = String(formData.get('id'));
    if (!id) throw new Error('Product id is required for update');

    const title = String(formData.get('title') || '').trim();
    const slug = String(formData.get('slug') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const categoryName = String(formData.get('categoryName') || '').trim();
    const categorySlug = String(formData.get('categorySlug') || '').trim();
    const badge = String(formData.get('badge') || '').trim() || undefined;
    const moqValue = Number(formData.get('moqValue') || 0);
    const moqUnit = String(formData.get('moqUnit') || 'tonne') as 'kg' | 'tonne';

    const specs = {
        grade: String(formData.get('grade') || '').trim(),
        form: String(formData.get('form') || '').trim(),
        purity: String(formData.get('purity') || '').trim(),
        source: String(formData.get('source') || '').trim(),
        hazardCompliance: String(formData.get('hazardCompliance') || '').trim(),
        zincContent: String(formData.get('zincContent') || '').trim(),
    };

    // files
    const imageEntries = formData.getAll('images') as any[];
    const files: (File | string)[] = [];
    for (const e of imageEntries) {
        if (e instanceof File) files.push(e);
        else if (typeof e === 'string' && e) files.push(e);
    }

    const uploadedIds = await uploadFilesToGridFS(files);

    const payload: Partial<ProductPayload> = {
        title,
        slug,
        description,
        category: { name: categoryName, slug: categorySlug },
        badge,
        moq: { value: moqValue, unit: moqUnit },
        specs,
        applications: String(formData.get('applications') || '')
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
    };

    if (uploadedIds.length > 0) payload.images = uploadedIds;

    await updateProduct(id, payload);
    redirect('/admin/products-auditing');
}
