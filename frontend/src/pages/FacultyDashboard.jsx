import AddResult from "./AddResult.jsx";
export default function FacultyDashboard() {
  return (
    <div className="dashboard-container">
      <div className="section-header card section-card">
        <p className="form-eyebrow">Faculty</p>
        <h1>Dashboard Overview</h1>
        <p className="section-subtitle">Publish and manage student results efficiently.</p>
      </div>
      <div className="kpi-grid">
        <article className="card kpi-card">
          <p>Result Workflow</p>
          <h3>Active</h3>
        </article>
        <article className="card kpi-card">
          <p>Pending Entries</p>
          <h3>--</h3>
        </article>
        <article className="card kpi-card">
          <p>Data Accuracy</p>
          <h3>High</h3>
        </article>
      </div>
      <AddResult />
    </div>
  );
}
