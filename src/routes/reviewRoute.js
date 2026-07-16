import express from "express";

import {
  addReview,
  buildEditReview,
  editReview,
  removeReview
} from "../controllers/reviewController.js";

import {checkLogin} from "../middleware/authMiddleware.js";

import { reviewRules } from "../utilities/validation.js";

const router = express.Router();

router.post(
  "/vehicle/:vehicleId",
  checkLogin,
  reviewRules,
  addReview
);

router.get(
  "/edit/:reviewId",
  checkLogin,
  buildEditReview
);

router.post(
  "/edit/:reviewId",
  checkLogin,
  editReview
);

router.post(
  "/delete/:reviewId",
  checkLogin,
  removeReview
);

export default router;