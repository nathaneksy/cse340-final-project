import bcrypt from "bcrypt";
import {
  registerUser,
  getUserByEmail,
} from "../models/accountModel.js";

export async function buildRegister(req, res) {
  res.render("account/register", {
    title: "Register",
    errors: [],
    formData: {},
  });
}

export async function registerAccount(req, res, next) {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
    } = req.body;

    const existingUser = await getUserByEmail(email);

      if (existingUser) {
        return res.status(400).render("account/register", {
          title: "Register",
          errors: [
            {
              msg: "An account with that email already exists.",
            },
          ],
          formData: req.body,
        });
      }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await registerUser({
      first_name,
      last_name,
      email,
      password_hash,
    });

    res.redirect("/account/login");

  } catch (error) {
    next(error);
  }
}

export async function buildLogin(req, res) {
  res.render("account/login", {
      title: "Login",
      errors: [],
      formData: {},
  });
}

export async function accountLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    const account = await getUserByEmail(email);

    if (!account) {
      return res.status(400).render("account/login", {
        title: "Login",
        errors: [
          { msg: "Invalid email or password." }
        ],
        formData: { email },
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      account.password_hash
    );

    if (!validPassword) {
      return res.status(400).render("account/login", {
        title: "Login",
        errors: [
          { msg: "Invalid email or password." }
        ],
        formData: { email },
      });
    }

    req.session.user = {
      user_id: account.user_id,
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      role: account.role,
    };

  res.redirect("/dashboard");

  } catch (error) {
    next(error);
  }
}

export function accountLogout(req, res) {
  req.session.destroy(() => {
    res.redirect("/account/login");
  });
}