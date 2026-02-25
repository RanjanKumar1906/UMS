import User from "../models/User.js";

// only admins should be able to access these
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
