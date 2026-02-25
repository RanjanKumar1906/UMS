import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res) => {
  const attendance = await Attendance.create({
    ...req.body,
    markedBy: req.user.id,
  });
  res.status(201).json(attendance);
};

export const getAttendanceBySubject = async (req, res) => {
  const records = await Attendance.find({ subject: req.params.subjectId })
    .populate("student", "name rollNo")
    .populate("subject", "name code");
  res.json(records);
};