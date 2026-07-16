import {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
} from "../models/reviewModel.js";

import { validationResult } from "express-validator";

import {
  getVehicleById,
  getVehicleReviews,
  getVehicleImages,
} from "../models/vehicleModel.js";

export async function addReview(
  req,
  res,
  next
) {
  try {

    const errors = validationResult(req);

    const vehicleId = req.params.vehicleId;

    if (!errors.isEmpty()) {

      const vehicle = await getVehicleById(vehicleId);

      const reviews = await getVehicleReviews(vehicleId);

      const images = await getVehicleImages(vehicleId);

      return res.status(400).render(
        "vehicles/detail",
        {
          title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
          vehicle,
          reviews,
          images,
          sessionUser: req.session.user,
          errors: errors.array(),
          reviewForm: req.body,
        }
      );
    }

    const userId =
      req.session.user.user_id;

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