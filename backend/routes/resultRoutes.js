import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import authorizeFeatures from "../middleware/featureMiddleware.js";
import {
  addResult,
  getResultsByStudent,
  getMyResults
} from "../controllers/resultController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("faculty"), authorizeFeatures("results:create"), addResult);

router.get("/my", protect, authorizeRoles("student"), authorizeFeatures("results:read:self"), getMyResults);

router.get(
  "/student/:studentId",
  protect,
  authorizeRoles("admin", "faculty"),
  authorizeFeatures("results:read:any"),
  getResultsByStudent
);

export default router;
