import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    semester: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);