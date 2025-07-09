import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { categoryTree } from "@/db/schema";

export async function GET() {
  const sql = `
    WITH RECURSIVE tree AS (
      SELECT
        id,
        value,
        parent_id,
        ARRAY[]::jsonb[] AS children
      FROM category_tree
      WHERE parent_id IS NULL

      UNION ALL

      SELECT
        c.id,
        c.value,
        c.parent_id,
        ARRAY[]::jsonb[]
      FROM category_tree c
      JOIN tree t ON c.parent_id = t.id
    )
    SELECT
      jsonb_build_object(
        'id', t.id,
        'value', t.value,
        'children', (
          SELECT
            COALESCE(jsonb_agg(child), '[]'::jsonb)
          FROM (
            SELECT
              jsonb_build_object(
                'id', c.id,
                'value', c.value
              ) AS child
            FROM category_tree c
            WHERE c.parent_id = t.id
          ) sub
        )
      ) AS tree_item
    FROM tree t
    WHERE t.parent_id IS NULL;
  `

  const result = await db.execute(sql);

  const categoryTree = result.rows.map(row => row.tree_item)
  
  return NextResponse.json(categoryTree);
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