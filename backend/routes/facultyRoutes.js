import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createFaculty,
  getFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createFaculty);
router.get("/", protect, authorizeRoles("admin", "faculty"), getFaculties);
router.get("/:id", protect, authorizeRoles("admin", "faculty"), getFacultyById);
router.put("/:id", protect, authorizeRoles("admin"), updateFaculty);
router.delete("/:id", protect, authorizeRoles("admin"), deleteFaculty);

export default router;