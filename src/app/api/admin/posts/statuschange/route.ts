import { db } from "@/db";
import { posts } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { postId, statusValue } = await req.json();
  try {
    await db.update(posts).set({ status: statusValue }).where(eq(posts.id, Number(postId)));
    return NextResponse.json({ status: 200, message: "Post status updated successfully" }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ status: 500, error: `Failed to update post status: ${error}` }, { status: 500 });
  }
}