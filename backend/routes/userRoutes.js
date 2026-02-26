import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import authorizeFeatures from "../middleware/featureMiddleware.js";
import {
  getUsers,
  deleteUser,
  getMyFeatures,
  updateUserFeatures
} from "../controllers/userController.js";

const router = express.Router();

// profile route for any authenticated user
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});
router.get("/my-features", protect, getMyFeatures);

// admin-only user management
router.get("/", protect, authorizeRoles("admin"), authorizeFeatures("users:read"), getUsers);
router.delete("/:id", protect, authorizeRoles("admin"), authorizeFeatures("users:delete"), deleteUser);
router.put("/:id/features", protect, authorizeRoles("admin"), authorizeFeatures("users:features:update"), updateUserFeatures);

export default router;
