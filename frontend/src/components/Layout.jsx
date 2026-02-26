import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="page">
      <header className="header">
        <Link to="/" className="brand">
          <h1 className="logo-text">UMS</h1>
          <span>University Management System</span>
        </Link>
        {user && (
          <div className="header-right">
            <span className="user-info">
              {user.name}
              <span className="role-pill">{user.role}</span>
            </span>
            <button className="btn-secondary" onClick={handleLogout}>Sign out</button>
          </div>
        )}
      </header>
      <main className="content">{children}</main>
    </div>
  );
}
