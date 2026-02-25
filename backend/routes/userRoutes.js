import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { getUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// profile route for any authenticated user
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// admin-only user management
router.get("/", protect, authorizeRoles("admin"), getUsers);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;