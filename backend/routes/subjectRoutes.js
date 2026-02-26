import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import authorizeFeatures from "../middleware/featureMiddleware.js";
import {
  createSubject,
  getSubjects
} from "../controllers/subjectController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), authorizeFeatures("subjects:create"), createSubject);
router.get("/", protect, authorizeRoles("admin", "faculty"), authorizeFeatures("subjects:read"), getSubjects);

export default router;
