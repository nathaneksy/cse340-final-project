import {
  getAllVehicles,
  getVehicleById,
  getVehicleReviews,
} from "../models/vehicleModel.js";

import {
  getVehicleImages,
} from "../models/imageModel.js";

export async function buildInventory(req, res, next) {
  try {
    const vehicles = await getAllVehicles();

    res.render("vehicles/inventory", {
      title: "Vehicle Inventory",
      vehicles,
    });
  } catch (error) {
    next(error);
  }
}

export async function buildVehicleDetail(
  req,
  res,
  next
) {
  try {
    const vehicleId = req.params.vehicleId;

    const vehicle =
      await getVehicleById(vehicleId);

    const reviews =
      await getVehicleReviews(vehicleId);

    const images =
      await getVehicleImages(vehicleId);

    if (!vehicle) {
      return res.status(404).send(
        "Vehicle not found"
      );
    }

    res.render("vehicles/detail", {
        title,
        vehicle,
        reviews,
        images,
        sessionUser: req.session.user,
        errors: [],
        reviewForm: {},
        serviceForm: {},
    });
  } catch (error) {
    next(error);
  }
}