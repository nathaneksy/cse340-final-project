import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session";
import pgSession from "connect-pg-simple";
import vehicleRoute from "./routes/vehicleRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
import baseRoute from "./routes/baseRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import accountRoute from "./routes/accountRoute.js";
import pool from "./database/pool.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import adminRoute from "./routes/adminRoute.js";
import contactRoute from "./routes/contactRoute.js";

dotenv.config();

const app = express();
const PgSession = pgSession(session);

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("src/public"));

app.use(
  session({
    store: new PgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use((req, res, next) => {
  res.locals.sessionUser = req.session.user || null;
  next();
});

app.use("/", baseRoute);
app.use("/categories", categoryRoute);
app.use("/account", accountRoute);
app.use("/dashboard", dashboardRoute);
app.use("/vehicles", vehicleRoute);
app.use("/reviews", reviewRoute);
app.use("/service", serviceRoute);
app.use("/admin", adminRoute);
app.use("/contact", contactRoute);

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.status(404).render("errors/404", {
    title: "Page Not Found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).render("errors/500", {
    title: "Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});