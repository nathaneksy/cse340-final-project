import pool from "../database/pool.js";

export async function createServiceRequest(
  userId,
  vehicleId,
  serviceType,
  description
) {
  const sql = `
    INSERT INTO service_requests (
      user_id,
      vehicle_id,
      service_type,
      description
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const result = await pool.query(
    sql,
    [
      userId,
      vehicleId,
      serviceType,
      description,
    ]
  );

  return result.rows[0];
}

export async function getUserServiceRequests(
  userId
) {
  const sql = `
    SELECT
      sr.*,
      v.year,
      v.make,
      v.model
    FROM service_requests sr
    LEFT JOIN vehicles v
      ON sr.vehicle_id = v.vehicle_id
    WHERE sr.user_id = $1
    ORDER BY sr.created_at DESC;
  `;

  const result = await pool.query(
    sql,
    [userId]
  );

  return result.rows;
}

export async function getAllServiceRequests() {
  const sql = `
    SELECT
      sr.*,
      u.first_name,
      u.last_name,
      v.year,
      v.make,
      v.model
    FROM service_requests sr
    JOIN users u
      ON sr.user_id = u.user_id
    LEFT JOIN vehicles v
      ON sr.vehicle_id = v.vehicle_id
    ORDER BY sr.created_at DESC;
  `;

  const result = await pool.query(sql);

  return result.rows;
}

export async function updateServiceStatus(
  requestId,
  status
) {
  const sql = `
    UPDATE service_requests
    SET
      status = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE request_id = $2;
  `;

  await pool.query(sql, [
    status,
    requestId,
  ]);
}

export async function addServiceNote(
  requestId,
  employeeId,
  noteText
) {
  const sql = `
    INSERT INTO service_notes (
      request_id,
      employee_id,
      note_text
    )
    VALUES ($1, $2, $3);
  `;

  await pool.query(sql, [
    requestId,
    employeeId,
    noteText,
  ]);
}

export async function getRequestById(
  requestId
) {
  const sql = `
    SELECT
      sr.*,
      u.first_name,
      u.last_name,
      v.year,
      v.make,
      v.model
    FROM service_requests sr
    JOIN users u
      ON sr.user_id = u.user_id
    LEFT JOIN vehicles v
      ON sr.vehicle_id = v.vehicle_id
    WHERE sr.request_id = $1;
  `;

  const result = await pool.query(
    sql,
    [requestId]
  );

  return result.rows[0];
}

export async function getServiceNotes(
  requestId
) {
  const sql = `
    SELECT
      sn.*,
      u.first_name,
      u.last_name
    FROM service_notes sn
    JOIN users u
      ON sn.employee_id = u.user_id
    WHERE sn.request_id = $1
    ORDER BY sn.created_at DESC;
  `;

  const result = await pool.query(
    sql,
    [requestId]
  );

  return result.rows;
}