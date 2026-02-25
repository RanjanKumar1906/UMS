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
        <Link to="/">
          <h1 className="logo-text">UMS</h1>
        </Link>
        {user && (
          <div className="header-right">
            <span className="user-info">
              {user.name} ({user.role})
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>
      <main className="content">{children}</main>
    </div>
  );
}