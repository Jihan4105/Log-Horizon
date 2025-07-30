import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";

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