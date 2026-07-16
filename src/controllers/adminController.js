import { getDashboardStats } from "../models/dashboardModel.js";

export async function buildAdminDashboard(req, res, next) {
  try {
    const stats = await getDashboardStats();

    res.render("admin/index", {
      title: "Admin Dashboard",
      user: req.session.user,
      stats,
    });
  } catch (error) {
    next(error);
  }
}