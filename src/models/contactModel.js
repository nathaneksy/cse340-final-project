import pool from "../database/pool.js";

export async function createContactMessage(
  name,
  email,
  subject,
  message
) {
  const sql = `
    INSERT INTO contact_messages (
      name,
      email,
      subject,
      message
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    name,
    email,
    subject,
    message,
  ]);

  return result.rows[0];
}

export async function getAllContactMessages() {
  const sql = `
    SELECT *
    FROM contact_messages
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(sql);

  return result.rows;
}