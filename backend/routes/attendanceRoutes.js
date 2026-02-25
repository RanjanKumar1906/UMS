import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  markAttendance,
  getAttendanceBySubject,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("faculty"), markAttendance);
router.get(
  "/subject/:subjectId",
  protect,
  authorizeRoles("admin", "faculty"),
  getAttendanceBySubject
);

export default router;