import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  addResult,
  getResultsByStudent,
  getMyResults
} from "../controllers/resultController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("faculty"), addResult);

router.get("/my", protect, authorizeRoles("student"), getMyResults);

router.get(
  "/student/:studentId",
  protect,
  authorizeRoles("admin", "faculty"),
  getResultsByStudent
);

export default router;