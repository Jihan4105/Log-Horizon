import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { posts } from "@/db/schema";
import { db } from "@/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, Number(id)));

    if (post.length === 0) {
      return NextResponse.json(
        { status: 404, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post[0]);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { status: 500, error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest
) {
  const { category, title, content}
}