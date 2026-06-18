import { getCategories } from "../models/categoryModel.js";

export async function buildCategoryView(req, res, next) {
  try {
    const categories = await getCategories();

    res.render("categories", {
      title: "Categories",
      categories,
    });
  } catch (error) {
    next(error);
  }
}