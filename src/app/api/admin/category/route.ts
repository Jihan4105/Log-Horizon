import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
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
    await db.delete(categoryTree)

    await db.insert(categoryTree).values(newItems)

    const result = await db.execute(`SELECT jsonb_pretty(get_category_tree(NULL));`);
    const updatedTree = result.rows[0].jsonb_pretty as string;

    return NextResponse.json({ status: 200, message: "POST request received", newItemsTree: JSON.parse(updatedTree) });
  } catch(error) {
    console.error("Error inserting/updating categories:", error);
    return NextResponse.json({ status: 500,  error: "Failed to update categories" }, { status: 500 });
  }

}