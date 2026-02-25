import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createCourse);
router.get("/", protect, authorizeRoles("admin", "faculty"), getCourses);
router.put("/:id", protect, authorizeRoles("admin"), updateCourse);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCourse);

export default router;