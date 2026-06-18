import pool from "../database/pool.js";

export async function registerUser(userData) {
  const sql = `
    INSERT INTO users (
      first_name,
      last_name,
      email,
      password_hash
    )
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, email, role;
  `;

  const values = [
    userData.first_name,
    userData.last_name,
    userData.email,
    userData.password_hash,
  ];

  const result = await pool.query(sql, values);

  return result.rows[0];
}

export async function getUserByEmail(email) {
  const sql = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;

  const result = await pool.query(sql, [email]);

  return result.rows[0];
}