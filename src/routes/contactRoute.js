import express from "express";

import {
  buildContactPage,
  submitContactForm,
  buildManageMessages,
} from "../controllers/contactController.js";

import {checkEmployee,} from "../middleware/authMiddleware.js";

import {
  contactRules,
  validate,
} from "../utilities/validation.js";

const router = express.Router();

router.get(
  "/",
  buildContactPage
);

router.post(
  "/",
  contactRules,
  validate(
    "contact/index",
    "Contact Us"
  ),
  submitContactForm
);

router.get(
  "/manage",
  checkEmployee,
  buildManageMessages
);

export default router;