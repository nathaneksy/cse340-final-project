import express from "express";

import {
  submitRequest,
  buildMyRequests,
  buildManageRequests,
  buildRequestDetail,
  changeStatus,
  createNote
} from "../controllers/serviceController.js";

import {
  checkLogin,
  checkEmployee,
} from "../middleware/authMiddleware.js";

import {serviceRequestRules,} from "../utilities/validation.js";

const router = express.Router();

router.post(
  "/vehicle/:vehicleId",
  checkLogin,
  serviceRequestRules,
  submitRequest
);

router.get(
  "/my-requests",
  checkLogin,
  buildMyRequests
);

router.get(
  "/manage",
  checkEmployee,
  buildManageRequests
);

router.get(
  "/manage/:requestId",
  checkEmployee,
  buildRequestDetail
);

router.post(
  "/manage/:requestId/status",
  checkEmployee,
  changeStatus
);

router.post(
  "/manage/:requestId/note",
  checkEmployee,
  createNote
);

export default router;