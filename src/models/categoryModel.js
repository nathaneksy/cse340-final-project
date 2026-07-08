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

export async function createCategory(categoryName) {
  const sql = `
    INSERT INTO categories (category_name)
    VALUES ($1)
    RETURNING *;
  `;

  const result = await pool.query(sql, [categoryName]);

  return result.rows[0];
}

export async function updateCategory(
  id,
  categoryName
) {
  const sql = `
    UPDATE categories
    SET category_name = $1
    WHERE category_id = $2
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    categoryName,
    id,
  ]);

  return result.rows[0];
}

export async function deleteCategory(id) {
  const sql = `
    DELETE FROM categories
    WHERE category_id = $1;
  `;

  await pool.query(sql, [id]);
}

export async function getCategoryById(id) {
  const sql = `
    SELECT *
    FROM categories
    WHERE category_id = $1;
  `;

  const result = await pool.query(sql, [id]);

  return result.rows[0];
}