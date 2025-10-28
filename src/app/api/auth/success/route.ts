import { drizzle } from "drizzle-orm/neon-http";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);

export async function GET() {
  const { getUser, getClaim } = getKindeServerSession();
  const user = await getUser();
  const roles = await getClaim("roles");
  if ((!user?.id || !user?.email)) return NextResponse.redirect("/");

  // Identify if the user exists in the database
  const dbUser = await db.select().from(users).where(eq(users.id, user.id));
  if (!dbUser.length) {
    // Insert user into the database if not exists
    await db.insert(users).values({
      id: user.id,
      email: user.email,
      username: user.username || "",
      image: user.picture || "",
      role: roles ? roles.value[0].key : "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  if(roles && roles.value[0].key === "admin") {
    return NextResponse.redirect("http://localhost:3000/admin");
  }
  else if(roles && roles.value[0].key === "user") {
    return NextResponse.redirect("http://localhost:3000/home");
  }
  else {
    return NextResponse.redirect("http://localhost:3000/");
  }
}