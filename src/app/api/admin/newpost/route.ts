import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { posts, savedPosts } from "@/db/schema";

export async function POST(req: NextRequest) {
  const datas = await req.json();
  const routeMethod: "New Post" | "Save Post" = datas.route

  switch (routeMethod) {
    case "New Post": {
      const { title, category, content } = datas

      try {
        await db.insert(posts).values({
          title,
          category,
          content,
        })
        return NextResponse.json({ status: 200, message: "New post created Succesffuly!"}, { status: 200 })
      } catch(error) {
        console.error("Error Occured inserting post data: ", error)
        return NextResponse.json({ status: 500, error: "Failed to insert post" }, { status: 500 })
      }
    }
    case "Save Post": {
      const { title, category, content } = datas

      try {
        await db.insert(savedPosts).values({
          title,
          content,
          category
        })
        return NextResponse.json({ status: 200, message: "Post Saved Succesfully!"}, { status: 200 })
      } catch(error) {
        console.error("Error Occured savaing data: ", error)
        return NextResponse.json({ status: 500, error: "Failed to save post" }, { status: 500 })
      }
    }
  }
}