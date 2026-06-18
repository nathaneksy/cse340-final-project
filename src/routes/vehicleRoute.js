import express from "express";

import {
  buildInventory,
  buildVehicleDetail,
} from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", buildInventory);

router.get(
  "/:vehicleId",
  buildVehicleDetail
);

export default router;