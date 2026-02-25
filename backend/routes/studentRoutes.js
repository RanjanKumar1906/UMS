import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createStudent);
router.get("/", protect, authorizeRoles("admin", "faculty"), getStudents);
router.get("/:id", protect, authorizeRoles("admin", "faculty"), getStudentById);
router.put("/:id", protect, authorizeRoles("admin"), updateStudent);
router.delete("/:id", protect, authorizeRoles("admin"), deleteStudent);

export default router;