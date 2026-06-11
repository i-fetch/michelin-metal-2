// app/api/create-product/route.ts
import { connectDB } from "@/lib/connectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

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
      applications: Array.isArray(body.applications)
        ? body.applications
        : (body.applications || "").split(",").filter(Boolean),

      images: body.images || [],
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