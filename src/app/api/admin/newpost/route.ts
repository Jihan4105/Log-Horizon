import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { posts, savedPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const sql = `
      SELECT json_agg(row_to_json(t)) AS result
      FROM (
        SELECT 
          id, 
          title, 
          content, 
          created_at AS "createdAt", 
          category
        FROM save_posts
        ORDER BY id
      ) t;
    `
    const result = await db.execute(sql)
    const savedPosts = !result.rows[0].result ? [] : result.rows[0].result
  
    return NextResponse.json(savedPosts)
  } catch(error) {
    console.error("Error Occured saving data: ", error)
    return NextResponse.json({ status: 500, message: "Failed to get save posts..." }, { status: 500 })
  }
}

async function insertPost(data: { title: string; category: string; content: string }) {
  await db.insert(posts).values(data);
}

async function insertSavedPost(data: { title: string; content: string; category: string }) {
  await db.insert(savedPosts).values(data);
}

async function updateAutoSave(data: { title: string; content: string; category: string }) {
  await db.update(savedPosts)
    .set(data)
    .where(eq(savedPosts.id, 0));
}

async function deleteSavedPost(data: { postId: number }) {
  await db.delete(savedPosts)
    .where(eq(savedPosts.id, data.postId))
}

export async function POST(req: NextRequest) {
  const datas = await req.json();
  const routeMethod: "New Post" | "Save Post" | "AutoSave" | "Delete Save" = datas.route;

  const { title, category, content, postId } = datas;

  try {
    if (routeMethod === "New Post") {
      await insertPost({ title, category, content });
      return NextResponse.json({ status: 200, message: "New post created successfully!" });
    }
    if (routeMethod === "Save Post") {
      await insertSavedPost({ title, category, content });
      return NextResponse.json({ status: 200, message: "Post saved successfully!" });
    }
    if (routeMethod === "AutoSave") {
      await updateAutoSave({ title, category, content });
      return NextResponse.json({ status: 200, message: "Autosaved" });
    }
    if(routeMethod === "Delete Save") {
      await deleteSavedPost({ postId });
      return NextResponse.json({ status: 200, message: "Delete Successfully!" });
    }
    return NextResponse.json({ status: 400, message: "Invalid route" }, { status: 400 });
  } catch (error) {
    console.error(`Error Occurred (${routeMethod}):`, error);
    return NextResponse.json(
      { status: 500, message: `Failed to process ${routeMethod}` },
      { status: 500 }
    );
  }
}