import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { inArray } from "drizzle-orm";

export async function GET() {
  try {
    const sql = `
      SELECT json_agg(
          json_build_object(
              'id', id,
              'title', title,
              'content', content,
              'createdAt', created_at,
              'updatedAt', updated_at,
              'likes', likes,
              'hmms', hmms,
              'unlikes', unlikes,
              'category', category,
              'status', status
          )
      ) AS data
      FROM (
        SELECT *
        FROM posts
        ORDER BY id ASC
      ) t;
    `

    const result = await db.execute(sql);
    const postsDatas = result.rows[0].data || [];
    return NextResponse.json(postsDatas);
  } catch(error) {
    console.error("Error Occurred fetching posts: ", error);
    return NextResponse.json({ status: 500, message: "Failed to get posts..." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { mode, changedValue, targetPostsId } = data;
  if (
    !["status", "category"].includes(mode) ||
    typeof changedValue !== "string" ||
    !Array.isArray(targetPostsId) ||
    targetPostsId.length === 0
  ) {
    return NextResponse.json(
      { status: 400, message: "Invalid input" },
      { status: 400 }
    );
  }

  try {
    if (mode === "status") {
      await db.update(posts)
        .set({ status: changedValue, updatedAt: new Date() })
        .where(inArray(posts.id, targetPostsId));
    } else if (mode === "category") {
      await db.update(posts)
        .set({ category: changedValue, updatedAt: new Date() })
        .where(inArray(posts.id, targetPostsId));
    }
    return NextResponse.json({ status: 200, message: "Posts updated." });
  } catch (error) {
    console.error("Update failed: ", error);
    return NextResponse.json(
      { status: 500, message: "Update failed..." },
      { status: 500 }
    );
  }

}