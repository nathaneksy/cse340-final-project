import express from "express";

import {
  buildRegister,
  registerAccount,
  buildLogin,
  accountLogin,
  accountLogout,
} from "../controllers/accountController.js";

const router = express.Router();

router.get("/register", buildRegister);

router.post("/register", registerAccount);

router.get("/login", buildLogin);

router.post("/login", accountLogin);

router.get("/test-session", (req, res) => {
  res.send(req.session.user);
});

router.get("/logout", accountLogout);

export default router;