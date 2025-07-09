import { db } from "@/db";

export async function getCategoryItems() {
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

  console.log(JSON.stringify(categoryTree, null, 2));
  return categoryTree;
}