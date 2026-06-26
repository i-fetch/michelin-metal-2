// app/api/update-product/route.ts
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

    const { id, ...payload } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const images = await uploadFilesToGridFS(imageEntries);

    const updatePayload: any = {
      ...payload,
      applications: parseApplications(body.applications),
    };

    if (images.length > 0) {
      updatePayload.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatePayload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error("Update product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}