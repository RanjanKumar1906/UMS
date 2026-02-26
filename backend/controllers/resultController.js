import Result from "../models/Result.js";
import Student from "../models/Student.js";

const calculateGrade = (marks) => {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
};

const withComputedGrade = (resultDoc) => {
  const item = resultDoc.toObject ? resultDoc.toObject() : resultDoc;
  return {
    ...item,
    grade: item.grade || calculateGrade(item.marks),
  };
};

export const addResult = async (req, res) => {
  const studentDoc = await Student.findById(req.body.student).select("_id");
  if (!studentDoc) {
    return res.status(400).json({ message: "Invalid student id. Use a student profile id." });
  }

  const marks = Number(req.body.marks);
  const grade = calculateGrade(marks);

  const result = await Result.create({
    ...req.body,
    marks,
    grade,
    addedBy: req.user.id,
  });

  res.status(201).json(withComputedGrade(result));
};

export const getResultsByStudent = async (req, res) => {
  const results = await Result.find({ student: req.params.studentId })
    .populate("subject", "name code")
    .populate("student", "name rollNo");
  res.json(results.map(withComputedGrade));
};

export const getMyResults = async (req, res) => {
  let student = await Student.findOne({ user: req.user.id }).select("_id");

  // Backfill legacy student accounts where Student exists but wasn't linked to User.
  if (!student) {
    const byEmail = await Student.findOne({ email: req.user.email }).select("_id user");
    if (byEmail) {
      if (!byEmail.user) {
        byEmail.user = req.user.id;
        await byEmail.save();
      }
      student = byEmail;
    }
  }

  if (!student) {
    return res.json([]);
  }

  const results = await Result.find({
    $or: [{ student: student._id }, { student: req.user.id }]
  })
    .populate("subject", "name code")
    .populate("student", "name rollNo");
  res.json(results.map(withComputedGrade));
};
