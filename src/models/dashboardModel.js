import pool from "../database/pool.js";

export async function getDashboardStats() {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM vehicles) AS vehicle_count,
      (SELECT COUNT(*) FROM users) AS user_count,
      (
        SELECT COUNT(*)
        FROM service_requests
        WHERE status <> 'Completed'
      ) AS open_service_count,
      (SELECT COUNT(*) FROM contact_messages) AS contact_count;
  `;

  const result = await pool.query(sql);

  return result.rows[0];
}