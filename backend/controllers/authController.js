import User from "../models/User.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import {
  getDefaultFeaturesByRole,
  sanitizeFeatures,
  ALL_FEATURES
} from "../utils/roleFeatures.js";

const getRequester = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const requester = await User.findById(decoded.id).select("role features");
    return requester;
  } catch {
    return null;
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password, role, rollNo, department, year } = req.body;
  const requestedRole = role || "student";
  if (!["student", "faculty", "admin"].includes(requestedRole)) {
    return res.status(400).json({ message: "Invalid role provided" });
  }

  const requester = await getRequester(req);
  const requesterFeatures = sanitizeFeatures(requester?.features, requester?.role);

  if (
    requestedRole !== "student" &&
    (!requester || requester.role !== "admin" || !requesterFeatures.includes("users:create"))
  ) {
    return res.status(403).json({
      message: "Only admin can create faculty or admin accounts"
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  if (requestedRole === "student") {
    if (!rollNo || !department || !year) {
      return res.status(400).json({
        message: "rollNo, department and year are required for student"
      });
    }

    const studentExists = await Student.findOne({
      $or: [{ email }, { rollNo }]
    });
    if (studentExists) {
      return res.status(400).json({
        message: "Student with same email or roll number already exists"
      });
    }
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: requestedRole,
    features: getDefaultFeaturesByRole(requestedRole)
  });

  if (requestedRole === "student") {
    await Student.create({
      user: user._id,
      name,
      email,
      rollNo,
      department,
      year: Number(year)
    });
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    features: user.features,
    token: generateToken(user._id, user.role)
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const normalizedFromDb = sanitizeFeatures(user.features, user.role);
    const computedFeatures = normalizedFromDb.filter((feature) =>
      ALL_FEATURES.includes(feature)
    );

    if (computedFeatures.length !== user.features.length || !user.features.length) {
      user.features = computedFeatures;
      await user.save();
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      features: computedFeatures,
      token: generateToken(user._id, user.role)
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
