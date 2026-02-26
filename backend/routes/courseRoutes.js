import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import authorizeFeatures from "../middleware/featureMiddleware.js";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), authorizeFeatures("courses:create"), createCourse);
router.get("/", protect, authorizeRoles("admin", "faculty"), authorizeFeatures("courses:read"), getCourses);
router.put("/:id", protect, authorizeRoles("admin"), authorizeFeatures("courses:update"), updateCourse);
router.delete("/:id", protect, authorizeRoles("admin"), authorizeFeatures("courses:delete"), deleteCourse);

export default router;
