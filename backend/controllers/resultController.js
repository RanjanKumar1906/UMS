import Result from "../models/Result.js";

const calculateGrade = (marks) => {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
};

export const addResult = async (req, res) => {
  const grade = calculateGrade(req.body.marks);

  const result = await Result.create({
    ...req.body,
    grade,
    addedBy: req.user.id,
  });

  res.status(201).json(result);
};

export const getResultsByStudent = async (req, res) => {
  const results = await Result.find({ student: req.params.studentId })
    .populate("subject", "name code")
    .populate("student", "name rollNo");
  res.json(results);
};

export const getMyResults = async (req, res) => {
  // assuming the authenticated user is a student
  const results = await Result.find({ student: req.user.id })
    .populate("subject", "name code")
    .populate("student", "name rollNo");
  res.json(results);
};