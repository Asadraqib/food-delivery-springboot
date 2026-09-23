import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { decodeToken } from "../utils/jwt";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", email);

      const decoded = decodeToken(token);
      const actualRole = decoded?.role || "CUSTOMER";
      localStorage.setItem("role", actualRole);

      // Verify role if specific login was intended, otherwise follow token
      if (actualRole === "RESTAURANT_ADMIN") navigate("/restaurant-dashboard");
      else navigate("/restaurants");
    } catch (err) {
      setError("Invalid email or password. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>🍔 Tiffin</h1>
          <p>Login to {role === "RESTAURANT_ADMIN" ? "Restaurant Portal" : "your account"}</p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="role">Login as</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="CUSTOMER">Customer</option>
              <option value="RESTAURANT_ADMIN">Restaurant Admin</option>
            </select>
          </div>
          <div className="field">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="form-footnote" style={{ marginTop: "1rem" }}>
          New here? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
