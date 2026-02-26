import { useEffect, useState } from "react";
import api from "../api/axios";

const getGrade = (marks) => {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
};

const gradePoints = {
  "A+": 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  F: 0
};

export default function StudentResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get("/results/my");
        setResults(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <p className="status-message">Loading results...</p>;

  if (!results.length) return <p className="status-message">No results found.</p>;

  const normalized = results.map((r) => {
    const marks = Number(r.marks) || 0;
    const grade = r.grade || getGrade(marks);
    return { ...r, marks, grade };
  });

  const totalSubjects = normalized.length;
  const avgMarks =
    normalized.reduce((sum, item) => sum + item.marks, 0) / totalSubjects;
  const cgpa =
    normalized.reduce((sum, item) => sum + (gradePoints[item.grade] ?? 0), 0) /
    totalSubjects;

  return (
    <div className="section-wrap">
      <h2 className="section-title">My Results</h2>
      <div className="kpi-grid">
        <article className="card kpi-card">
          <p>CGPA</p>
          <h3>{cgpa.toFixed(2)}</h3>
        </article>
        <article className="card kpi-card">
          <p>Average Marks</p>
          <h3>{avgMarks.toFixed(1)}</h3>
        </article>
        <article className="card kpi-card">
          <p>Total Subjects</p>
          <h3>{totalSubjects}</h3>
        </article>
      </div>
      <div className="card section-card">
        <table className="results-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {normalized.map((r) => (
              <tr key={r._id}>
                <td data-label="Subject">{r.subject?.name}</td>
                <td data-label="Marks">{r.marks}</td>
                <td data-label="Grade">{r.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
