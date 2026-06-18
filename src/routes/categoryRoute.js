import express from "express";
import { buildCategoryView } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", buildCategoryView);

export default router;