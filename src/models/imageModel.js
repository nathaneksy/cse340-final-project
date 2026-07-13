import pool from "../database/pool.js";

export async function getVehicleImages(vehicleId) {
  const sql = `
    SELECT *
    FROM vehicle_images
    WHERE vehicle_id = $1
    ORDER BY is_primary DESC, image_id;
  `;

  const result = await pool.query(sql, [vehicleId]);

  return result.rows;
}