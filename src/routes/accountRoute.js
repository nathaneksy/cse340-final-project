import express from "express";

import {
  buildRegister,
  registerAccount,
  buildLogin,
  accountLogin,
  accountLogout,
} from "../controllers/accountController.js";

import {
  registrationRules,
  loginRules,
  validate,
} from "../utilities/validation.js";

const router = express.Router();

router.get("/register", buildRegister);

router.post(
  "/register",
  registrationRules,
  validate(
    "account/register",
    "Register"
  ),
  registerAccount
);

router.get("/login", buildLogin);

router.post(
  "/login",
  loginRules,
  validate(
    "account/login",
    "Login"
  ),
  accountLogin
);

router.get("/test-session", (req, res) => {
  res.send(req.session.user);
});

router.get("/logout", accountLogout);

export default router;