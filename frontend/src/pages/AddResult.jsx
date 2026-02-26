import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AddResult() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    // Fetch students and subjects
    const fetchData = async () => {
      try {
        const sRes = await api.get("/students");
        const subRes = await api.get("/subjects");
        setStudents(sRes.data);
        setSubjects(subRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/results", { student, subject, marks: Number(marks) });
      setMessage("Result added successfully!");
      setMessageType("success");
      setMarks("");
      setStudent("");
      setSubject("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding result");
      setMessageType("error");
    }
  };

  return (
    <div className="card section-card">
      <h2 className="section-title">Add Result</h2>
      {message && <p className={`alert ${messageType}`}>{message}</p>}
      <form className="grid-form" onSubmit={handleSubmit}>
        <select value={student} onChange={(e) => setStudent(e.target.value)} required>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        <select value={subject} onChange={(e) => setSubject(e.target.value)} required>
          <option value="">Select Subject</option>
          {subjects.map((sub) => (
            <option key={sub._id} value={sub._id}>{sub.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Marks (0-100)"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          min="0"
          max="100"
          required
        />

        <button className="btn-primary" type="submit">
          Add Result
        </button>
      </form>
    </div>
  );
}
