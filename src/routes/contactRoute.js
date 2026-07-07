import express from "express";

import {
  buildContactPage,
  submitContactForm,
  buildManageMessages,
} from "../controllers/contactController.js";

import {
  checkEmployee,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  buildContactPage
);

router.post(
  "/",
  submitContactForm
);

router.get(
  "/manage",
  checkEmployee,
  buildManageMessages
);

export default router;