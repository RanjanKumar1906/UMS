import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createSubject,
  getSubjects
} from "../controllers/subjectController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createSubject);
router.get("/", protect, authorizeRoles("admin", "faculty"), getSubjects);

export default router;