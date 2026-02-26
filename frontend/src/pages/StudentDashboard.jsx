import StudentResults from "./StudentResults.jsx";

export default function StudentDashboard() {
  return (
    <div className="dashboard-container">
      <div className="section-header card section-card">
        <p className="form-eyebrow">Student</p>
        <h1>Dashboard Overview</h1>
        <p className="section-subtitle">Track your latest performance and progress.</p>
      </div>
      <div className="kpi-grid">
        <article className="card kpi-card">
          <p>Total Subjects</p>
          <h3>6</h3>
        </article>
        <article className="card kpi-card">
          <p>Average Target</p>
          <h3>80+</h3>
        </article>
        <article className="card kpi-card">
          <p>Performance Trend</p>
          <h3>Stable</h3>
        </article>
      </div>
      <StudentResults />
    </div>
  );
}
