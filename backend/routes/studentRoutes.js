import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import authorizeFeatures from "../middleware/featureMiddleware.js";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), authorizeFeatures("students:create"), createStudent);
router.get("/", protect, authorizeRoles("admin", "faculty"), authorizeFeatures("students:read"), getStudents);
router.get("/:id", protect, authorizeRoles("admin", "faculty"), authorizeFeatures("students:read"), getStudentById);
router.put("/:id", protect, authorizeRoles("admin"), authorizeFeatures("students:update"), updateStudent);
router.delete("/:id", protect, authorizeRoles("admin"), authorizeFeatures("students:delete"), deleteStudent);

export default router;
