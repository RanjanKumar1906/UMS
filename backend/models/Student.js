import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      sparse: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollNo: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
