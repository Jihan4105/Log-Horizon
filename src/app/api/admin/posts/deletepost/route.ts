import { db } from "@/db";
import { posts } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest) {
  const { postId } = await req.json();
  try {
    await db.delete(posts).where(eq(posts.id, Number(postId)));
    return NextResponse.json({ status: 200, message: "Post deleted successfully" }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ status: 500, error: `Failed to delete post: ${error}` }, { status: 500 });
  }
}