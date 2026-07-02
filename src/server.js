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

dotenv.config();

const app = express();
const PgSession = pgSession(session);

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    store: new PgSession({
      pool: pool,
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

app.use("/", baseRoute);
app.use("/categories", categoryRoute);
app.use("/account", accountRoute);
app.use("/dashboard", dashboardRoute);
app.use("/vehicles", vehicleRoute);
app.use("/reviews", reviewRoute);
app.use("/service", serviceRoute);
app.use("/admin", adminRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});