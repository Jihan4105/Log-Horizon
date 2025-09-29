import { NextRequest, NextResponse } from "next/server";
import { posts } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { editPostId, category, title, content } = await req.json();
  try {
    await db.update(posts)
      .set({
        title: title,
        content: content,
        updatedAt: new Date(),
        category: category,
      })
      .where(eq(posts.id, Number(editPostId)))
    
    return NextResponse.json({ status: 200, message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { status: 500, error: "Failed to update post" },
      { status: 500 }
    );
  }
}