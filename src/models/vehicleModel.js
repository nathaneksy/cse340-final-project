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

export async function createVehicle(
  vehicle
) {
  const sql = `
    INSERT INTO vehicles (
      category_id,
      year,
      make,
      model,
      mileage,
      price,
      description
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
  `;

  const result =
    await pool.query(sql, [
      vehicle.category_id,
      vehicle.year,
      vehicle.make,
      vehicle.model,
      vehicle.mileage,
      vehicle.price,
      vehicle.description,
    ]);

  return result.rows[0];
}

export async function updateVehicle(
  id,
  vehicle
) {
  const sql = `
    UPDATE vehicles
    SET
      category_id=$1,
      year=$2,
      make=$3,
      model=$4,
      mileage=$5,
      price=$6,
      description=$7
    WHERE vehicle_id=$8
    RETURNING *;
  `;

  const result =
    await pool.query(sql, [
      vehicle.category_id,
      vehicle.year,
      vehicle.make,
      vehicle.model,
      vehicle.mileage,
      vehicle.price,
      vehicle.description,
      id,
    ]);

  return result.rows[0];
}

export async function deleteVehicle(
  id
) {
  const sql = `
    DELETE FROM vehicles
    WHERE vehicle_id = $1;
  `;

  await pool.query(sql, [id]);
}