import {
  getAllVehicles,
  getVehicleById,
  getVehicleReviews,
} from "../models/vehicleModel.js";

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

    if (!vehicle) {
      return res.status(404).send(
        "Vehicle not found"
      );
    }

    res.render("vehicles/detail", {
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      vehicle,
      reviews,
      sessionUser: req.session.user,
    });
  } catch (error) {
    next(error);
  }
}