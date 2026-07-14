import express from "express";
import { checkEmployee, checkOwner } from "../middleware/authMiddleware.js";
import {
  getAllVehicles,
  createVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../models/vehicleModel.js";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../models/categoryModel.js";

import { vehicleRules, validate } from "../utilities/validation.js";
import { validationResult } from "express-validator";

const router = express.Router();

router.get(
  "/",
  checkEmployee,
  (req, res) => {
    res.render("admin/index", {
      title: "Admin Dashboard",
      user: req.session.user,
    });
  }
);

router.get(
  "/vehicles",
  checkEmployee,
  async (req, res, next) => {
    try {
      const vehicles = await getAllVehicles();

      res.render("admin/vehicles", {
        title: "Manage Vehicles",
        vehicles,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/vehicles/new",
  checkEmployee,
  async (req, res, next) => {
    try {
      const categories = await getCategories();

      res.render("admin/add-vehicle", {
        title: "Add Vehicle",
        categories,
        errors: [],
        formData: {},
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/vehicles/new",
  checkEmployee,
  vehicleRules,
  async (req, res, next) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {

        const categories = await getCategories();

        return res.status(400).render(
          "admin/add-vehicle",
          {
            title: "Add Vehicle",
            categories,
            errors: errors.array(),
            formData: req.body,
          }
        );
      }

      await createVehicle(req.body);

      res.redirect("/admin/vehicles");

    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/vehicles/edit/:id",
  checkEmployee,
  async (req, res, next) => {
    try {
      const vehicle = await getVehicleById(
        req.params.id
      );

      const categories =
        await getCategories();

      if (!vehicle) {
        return res
          .status(404)
          .send("Vehicle not found");
      }

      res.render("admin/edit-vehicle", {
        title: "Edit Vehicle",
        vehicle,
        categories,
        errors: [],
        formData: {},
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/vehicles/edit/:id",
  checkEmployee,
  vehicleRules,
  async (req, res, next) => {
    try {
      await updateVehicle(
        req.params.id,
        req.body
      );
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const categories = await getCategories();

            const vehicle = {
                vehicle_id: req.params.id,
                ...req.body,
            };

            return res.status(400).render(
                "admin/edit-vehicle",
                {
                    title: "Edit Vehicle",
                    vehicle,
                    categories,
                    errors: errors.array(),
                    formData: req.body,
                }
            );
        }
      res.redirect(
        "/admin/vehicles"
      );
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/vehicles/delete/:id",
  checkEmployee,
  async (req, res, next) => {
    try {
      await deleteVehicle(
        req.params.id
      );

      res.redirect(
        "/admin/vehicles"
      );
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/categories",
  checkOwner,
  async (req, res, next) => {
    try {
      const categories = await getCategories();

      res.render("admin/categories", {
        title: "Manage Categories",
        categories,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/categories/new",
  checkOwner,
  (req, res) => {
    res.render("admin/add-category", {
      title: "Add Category",
    });
  }
);

router.post(
  "/categories/new",
  checkOwner,
  async (req, res, next) => {
    try {
      const { category_name } = req.body;

      await createCategory(category_name);

      res.redirect("/admin/categories");
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/categories/edit/:id",
  checkOwner,
  async (req, res, next) => {
    try {
      const category = await getCategoryById(
        req.params.id
      );

      if (!category) {
        return res
          .status(404)
          .send("Category not found");
      }

      res.render("admin/edit-category", {
        title: "Edit Category",
        category,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/categories/edit/:id",
  checkOwner,
  async (req, res, next) => {
    try {
      const { category_name } = req.body;

      await updateCategory(
        req.params.id,
        category_name
      );

      res.redirect("/admin/categories");
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/categories/delete/:id",
  checkOwner,
  async (req, res, next) => {
    try {
      await deleteCategory(req.params.id);

      res.redirect("/admin/categories");
    } catch (error) {
      next(error);
    }
  }
);

export default router;

