import pool from "../database/pool.js";

export async function getAllVehicles() {
  const sql = `
    SELECT
      v.*,
      c.category_name
    FROM vehicles v
    JOIN categories c
      ON v.category_id = c.category_id
    ORDER BY make, model;
  `;

  const result = await pool.query(sql);

  return result.rows;
}

export async function getVehicleById(vehicleId) {
  const sql = `
    SELECT
      v.*,
      c.category_name
    FROM vehicles v
    JOIN categories c
      ON v.category_id = c.category_id
    WHERE v.vehicle_id = $1;
  `;

  const result = await pool.query(sql, [vehicleId]);

  return result.rows[0];
}

export async function getVehicleReviews(vehicleId) {
  const sql = `
    SELECT
      r.review_id,
      r.rating,
      r.review_text,
      r.created_at,
      u.first_name,
      u.last_name,
      u.user_id
    FROM reviews r
    JOIN users u
      ON r.user_id = u.user_id
    WHERE r.vehicle_id = $1
    ORDER BY r.created_at DESC;
  `;

  const result = await pool.query(sql, [vehicleId]);

  return result.rows;
}