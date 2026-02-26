import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import { syncAllUserFeatures } from "./utils/featureSync.js";
import { syncStudentProfiles } from "./utils/studentSync.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("UMS Backend Running");
});

// auth routes (PUBLIC)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/results", resultRoutes);
const PORT = 3000;

const startServer = async () => {
  await connectDB();

  try {
    const syncResult = await syncAllUserFeatures();
    console.log(
      `Feature sync complete: ${syncResult.updatedUsers}/${syncResult.totalUsers} users updated`
    );

    const studentSync = await syncStudentProfiles();
    console.log(
      `Student sync complete: ${studentSync.linkedProfiles} linked, ${studentSync.createdProfiles} created from ${studentSync.totalStudentUsers} student users`
    );
  } catch (error) {
    console.error("Startup sync failed");
    console.error(error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
