import {
  createServiceRequest,
  getUserServiceRequests,
  getAllServiceRequests,
  updateServiceStatus,
  addServiceNote,
  getRequestById,
  getServiceNotes,
} from "../models/serviceModel.js";

import { validationResult } from "express-validator";

import {
  getVehicleById,
  getVehicleReviews,
  getVehicleImages,
} from "../models/vehicleModel.js";

export async function submitRequest(
  req,
  res,
  next
) {
  try {

    const errors =
      validationResult(req);

    const vehicleId =
      req.params.vehicleId;

    if (!errors.isEmpty()) {

      const vehicle =
        await getVehicleById(vehicleId);

      const reviews =
        await getVehicleReviews(vehicleId);

      const images =
        await getVehicleImages(vehicleId);

      return res.status(400).render(
        "vehicles/detail",
        {
          title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
          vehicle,
          reviews,
          images,
          sessionUser:
            req.session.user,
          errors:
            errors.array(),
          reviewForm: {},
          serviceForm:
            req.body,
        }
      );
    }

    const userId =
      req.session.user.user_id;

    const {
      service_type,
      description,
    } = req.body;

    await createServiceRequest(
      userId,
      vehicleId,
      service_type,
      description
    );

    res.redirect(
      "/service/my-requests"
    );

  } catch (error) {
    next(error);
  }
}

export async function buildMyRequests(
  req,
  res,
  next
) {
  try {
    const requests =
      await getUserServiceRequests(
        req.session.user.user_id
      );

    res.render(
      "service/my-requests",
      {
        title: "My Service Requests",
        requests,
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function buildManageRequests(
  req,
  res,
  next
) {
  try {
    const requests =
      await getAllServiceRequests();

    res.render(
      "service/manage",
      {
        title:
          "Manage Service Requests",
        requests,
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function buildRequestDetail(
  req,
  res,
  next
) {
  try {
    const request =
      await getRequestById(
        req.params.requestId
      );

    const notes =
      await getServiceNotes(
        req.params.requestId
      );

    res.render(
      "service/detail",
      {
        title:
          "Manage Service Request",
        request,
        notes,
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function changeStatus(
  req,
  res,
  next
) {
  try {
    await updateServiceStatus(
      req.params.requestId,
      req.body.status
    );

    res.redirect(
      `/service/manage/${req.params.requestId}`
    );
  } catch (error) {
    next(error);
  }
}

export async function createNote(
  req,
  res,
  next
) {
  try {
    await addServiceNote(
      req.params.requestId,
      req.session.user.user_id,
      req.body.note_text
    );

    res.redirect(
      `/service/manage/${req.params.requestId}`
    );
  } catch (error) {
    next(error);
  }
}