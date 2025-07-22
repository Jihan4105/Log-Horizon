import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";

export async function POST(req: NextRequest) {
  const datas = await req.json();
  const routeMethod: "New Post" | "Save Post" = datas.route

  switch (routeMethod) {
    case "New Post":
      
      break;
  }
  return NextResponse.json({ message: "Req Sucessfully recieved!"})
}