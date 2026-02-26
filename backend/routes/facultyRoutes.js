import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import authorizeFeatures from "../middleware/featureMiddleware.js";
import {
  createFaculty,
  getFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), authorizeFeatures("faculty:create"), createFaculty);
router.get("/", protect, authorizeRoles("admin", "faculty"), authorizeFeatures("faculty:read"), getFaculties);
router.get("/:id", protect, authorizeRoles("admin", "faculty"), authorizeFeatures("faculty:read"), getFacultyById);
router.put("/:id", protect, authorizeRoles("admin"), authorizeFeatures("faculty:update"), updateFaculty);
router.delete("/:id", protect, authorizeRoles("admin"), authorizeFeatures("faculty:delete"), deleteFaculty);

export default router;
