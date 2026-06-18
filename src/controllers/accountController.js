import bcrypt from "bcrypt";
import {
  registerUser,
  getUserByEmail,
} from "../models/accountModel.js";

export async function buildRegister(req, res) {
  res.render("account/register", {
    title: "Register",
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
      return res.send("Email already exists");
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await registerUser({
      first_name,
      last_name,
      email,
      password_hash,
    });

    res.send(`
      Account created successfully!
      <br>
      User ID: ${user.user_id}
    `);

  } catch (error) {
    next(error);
  }
}

export async function buildLogin(req, res) {
  res.render("account/login", {
    title: "Login",
  });
}

export async function accountLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    const account = await getUserByEmail(email);

    if (!account) {
      return res.send("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(
      password,
      account.password_hash
    );

    if (!validPassword) {
      return res.send("Invalid email or password");
    }

    req.session.user = {
      user_id: account.user_id,
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      role: account.role,
    };

    res.send(`
      Login successful!
      <br>
      Welcome ${account.first_name}
    `);

  } catch (error) {
    next(error);
  }
}

export function accountLogout(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}