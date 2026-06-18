import pool from "../database/pool.js";

export async function getCategories() {
  const sql = `
    SELECT *
    FROM categories
    ORDER BY category_name;
  `;

  const result = await pool.query(sql);

  return result.rows;
}