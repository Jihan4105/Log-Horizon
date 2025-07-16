import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdirSync, existsSync } from "fs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = sanitizeFileName(file.name);
  const fileName = `${Date.now()}-${safeName}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads");

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);

  try {
    await writeFile(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/${fileName}` // URL to be returned to the editor
    });
  } catch (error) {
    console.error("File write error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}

function sanitizeFileName(original: string): string {
  return original
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_\-\.]/g, "") 
}