import pool from "../database/pool.js";

export async function createReview(
  userId,
  vehicleId,
  rating,
  reviewText
) {
  const sql = `
    INSERT INTO reviews (
      user_id,
      vehicle_id,
      rating,
      review_text
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    userId,
    vehicleId,
    rating,
    reviewText,
  ]);

  return result.rows[0];
}

export async function getReviewById(reviewId) {
  const sql = `
    SELECT *
    FROM reviews
    WHERE review_id = $1;
  `;

  const result = await pool.query(sql, [reviewId]);

  return result.rows[0];
}

export async function updateReview(
  reviewId,
  rating,
  reviewText
) {
  const sql = `
    UPDATE reviews
    SET
      rating = $1,
      review_text = $2
    WHERE review_id = $3
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    rating,
    reviewText,
    reviewId,
  ]);

  return result.rows[0];
}

export async function deleteReview(
  reviewId
) {
  const sql = `
    DELETE FROM reviews
    WHERE review_id = $1;
  `;

  await pool.query(sql, [reviewId]);
}