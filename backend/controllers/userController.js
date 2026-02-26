import User from "../models/User.js";
import Student from "../models/Student.js";
import { sanitizeFeatures } from "../utils/roleFeatures.js";

// only admins should be able to access these
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.role === "student") {
    await Student.findOneAndDelete({ user: user._id });
  }

  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const getMyFeatures = async (req, res) => {
  const user = await User.findById(req.user._id).select("role features");
  res.json({
    role: user.role,
    features: sanitizeFeatures(user.features, user.role)
  });
};

export const updateUserFeatures = async (req, res) => {
  const { features } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.features = sanitizeFeatures(features, user.role);
  await user.save();

  res.json({
    message: "Features updated successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      features: user.features
    }
  });
};
