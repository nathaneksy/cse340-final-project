import express from "express";

import {
  checkLogin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  checkLogin,
  (req, res) => {
    res.render("dashboard", {
      title: "Dashboard",
      user: req.session.user,
    });
  }
);

export default router;