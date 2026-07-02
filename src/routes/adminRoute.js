import express from "express";
import { checkEmployee } from "../middleware/authMiddleware.js";
import {
  getAllVehicles,
  createVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../models/vehicleModel.js";

import { getCategories }
  from "../models/categoryModel.js";

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
      const categories =
        await getCategories();

      res.render(
        "admin/add-vehicle",
        {
          title: "Add Vehicle",
          categories,
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/vehicles/new",
  checkEmployee,
  async (req, res, next) => {
    try {

      await createVehicle(
        req.body
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

      res.render(
        "admin/edit-vehicle",
        {
          title: "Edit Vehicle",
          vehicle,
          categories,
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/vehicles/edit/:id",
  checkEmployee,
  async (req, res, next) => {
    try {
      await updateVehicle(
        req.params.id,
        req.body
      );

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

export default router;

