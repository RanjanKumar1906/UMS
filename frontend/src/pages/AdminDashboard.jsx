import AdminUsers from "./AdminUsers.jsx";
export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <div className="section-header card section-card">
        <p className="form-eyebrow">Admin</p>
        <h1>Dashboard Overview</h1>
        <p className="section-subtitle">Control users, roles, and platform access.</p>
      </div>
      <div className="kpi-grid">
        <article className="card kpi-card">
          <p>Access Control</p>
          <h3>Secure</h3>
        </article>
        <article className="card kpi-card">
          <p>User Management</p>
          <h3>Realtime</h3>
        </article>
        <article className="card kpi-card">
          <p>System Health</p>
          <h3>Stable</h3>
        </article>
      </div>
      <AdminUsers />
    </div>
  );
}
