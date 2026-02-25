import { useEffect, useState } from "react";
import api from "../api/axios";

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

  if (loading) return <p>Loading...</p>;

  if (!results.length) return <p>No results found</p>;

  return (
    <div>
      <h2>My Results</h2>
      <div className="card">
        <table className="results-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r._id}>
              <td data-label="Subject">{r.subject?.name}</td>
              <td data-label="Marks">{r.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}