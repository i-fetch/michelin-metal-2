// app/api/create-product/route.ts
import { connectDB } from "@/lib/connectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { uploadFilesToGridFS } from "@/controllers/productController";

function parseApplications(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item))
      .flatMap((item) => item.split(","))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const contentType = request.headers.get("content-type") || "";
    let body: any = {};
    let imageEntries: (File | string)[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = Object.fromEntries(
        Array.from(formData.entries()).filter(([key]) => key !== "images")
      );
      imageEntries = formData.getAll("images") as any[];
    } else {
      body = await request.json();
      imageEntries = Array.isArray(body.images) ? body.images : [];
    }

    const images = await uploadFilesToGridFS(imageEntries);

    // optional: transform flat payload into schema shape
    const productData = {
      title: body.title,
      slug: body.slug,
      description: body.description,
      category: {
        name: body.categoryName,
        slug: body.categorySlug,
      },
      badge: body.badge,
      specs: {
        grade: body.grade,
        form: body.form,
        purity: body.purity,
        source: body.source,
        hazardCompliance: body.hazardCompliance,
        zincContent: body.zincContent,
      },
      moq: {
        value: Number(body.moqValue),
        unit: body.moqUnit,
      },
      applications: parseApplications(body.applications),
      images: images,
    };

    const product = await Product.create(productData);

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}