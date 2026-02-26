import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import authorizeFeatures from "../middleware/featureMiddleware.js";
import {
  markAttendance,
  getAttendanceBySubject,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("faculty"), authorizeFeatures("attendance:mark"), markAttendance);
router.get(
  "/subject/:subjectId",
  protect,
  authorizeRoles("admin", "faculty"),
  authorizeFeatures("attendance:read"),
  getAttendanceBySubject
);

export default router;
