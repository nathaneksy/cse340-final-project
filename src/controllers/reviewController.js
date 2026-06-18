import {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
} from "../models/reviewModel.js";

export async function addReview(
  req,
  res,
  next
) {
  try {

    const userId =
      req.session.user.user_id;

    const vehicleId =
      req.params.vehicleId;

    const {
      rating,
      review_text,
    } = req.body;

    await createReview(
      userId,
      vehicleId,
      rating,
      review_text
    );

    res.redirect(
      `/vehicles/${vehicleId}`
    );

  } catch (error) {
    next(error);
  }
}

export async function buildEditReview(
  req,
  res,
  next
) {
  try {

    const review =
      await getReviewById(
        req.params.reviewId
      );

    if (
      review.user_id !==
      req.session.user.user_id
    ) {
      return res
        .status(403)
        .send("Unauthorized");
    }

    res.render(
      "reviews/edit",
      {
        title: "Edit Review",
        review,
      }
    );

  } catch (error) {
    next(error);
  }
}

export async function editReview(
  req,
  res,
  next
) {
  try {

    const review =
      await getReviewById(
        req.params.reviewId
      );

    if (
      review.user_id !==
      req.session.user.user_id
    ) {
      return res
        .status(403)
        .send("Unauthorized");
    }

    await updateReview(
      review.review_id,
      req.body.rating,
      req.body.review_text
    );

    res.redirect(
      `/vehicles/${review.vehicle_id}`
    );

  } catch (error) {
    next(error);
  }
}

export async function removeReview(
  req,
  res,
  next
) {
  try {

    const review =
      await getReviewById(
        req.params.reviewId
      );

    const currentUser =
      req.session.user;

    const isOwner =
      review.user_id ===
      currentUser.user_id;

    const isEmployee =
      currentUser.role ===
      "employee";

    const isAdmin =
      currentUser.role ===
      "owner";

    if (
      !isOwner &&
      !isEmployee &&
      !isAdmin
    ) {
      return res
        .status(403)
        .send("Unauthorized");
    }

    const vehicleId =
      review.vehicle_id;

    await deleteReview(
      review.review_id
    );

    res.redirect(
      `/vehicles/${vehicleId}`
    );

  } catch (error) {
    next(error);
  }
}