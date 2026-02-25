import Faculty from "../models/Faculty.js";

export const createFaculty = async (req, res) => {
  const faculty = await Faculty.create(req.body);
  res.status(201).json(faculty);
};

export const getFaculties = async (req, res) => {
  const faculties = await Faculty.find();
  res.json(faculties);
};

export const getFacultyById = async (req, res) => {
  const faculty = await Faculty.findById(req.params.id);
  if (!faculty) return res.status(404).json({ message: "Not found" });
  res.json(faculty);
};

export const updateFaculty = async (req, res) => {
  const faculty = await Faculty.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(faculty);
};

export const deleteFaculty = async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ message: "Faculty deleted" });
};