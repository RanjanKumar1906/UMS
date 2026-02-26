import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      // adapt to whichever shape the backend returns
      const returned = res.data;
      login(returned);

      const role = returned.user?.role || returned.role;
      if (role === "student") navigate("/student");
      else if (role === "faculty") navigate("/faculty");
      else if (role === "admin") navigate("/admin");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-shell">
      <section className="card login-showcase">
        <p className="form-eyebrow">Modern Campus Platform</p>
        <h1>UMS Portal</h1>
        <p className="section-subtitle">
          Centralize student progress, faculty workflows, and admin control in one place.
        </p>
        <div className="pill-row">
          <span className="feature-pill">Smart Results</span>
          <span className="feature-pill">Role Access</span>
          <span className="feature-pill">Fast Management</span>
        </div>
      </section>
      <form className="card form-card login-card" onSubmit={handleSubmit}>
        <p className="form-eyebrow">University Management System</p>
        <h2>Welcome Back</h2>
        <p className="section-subtitle">Sign in to continue</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
