import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { categoryTree } from "@/db/schema";

export async function GET() {
  const createSQL = `
    CREATE OR REPLACE FUNCTION get_category_tree(parent INT DEFAULT NULL)
    RETURNS JSONB LANGUAGE plpgsql AS $$
    DECLARE
      result JSONB;
    BEGIN
      SELECT jsonb_agg(
              jsonb_build_object(
                'id', id,
                'value', value,
                'children', get_category_tree(id)
              ) ORDER BY id
            )
        INTO result
        FROM category_tree
      WHERE parent_id IS NOT DISTINCT FROM parent;

      RETURN COALESCE(result, '[]');
    END;
    $$;
  `

  const sql = `SELECT jsonb_pretty(get_category_tree(NULL));`

  await db.execute(createSQL)
  const result = await db.execute(sql)

  const categoryTree = result.rows[0].jsonb_pretty as string;
  
  return NextResponse.json(JSON.parse(categoryTree));
}

export async function POST(req: NextRequest) {
  const newItems = await req.json();
  console.log(newItems)

  try {
    await db.insert(categoryTree)
      .values(newItems)
      .onConflictDoUpdate({
        target: categoryTree.id,
        set: {
          value: sql`excluded.value`,
          parentId: sql`excluded.parent_id`
        }
      })
    return NextResponse.json({ status: 200, message: "POST request received" });
  } catch(error) {
    console.error("Error inserting/updating categories:", error);
    return NextResponse.json({ status: 500,  error: "Failed to update categories" }, { status: 500 });
  }

}