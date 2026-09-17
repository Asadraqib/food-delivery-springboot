import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data);
      localStorage.setItem("userEmail", email);
      navigate("/restaurants");
    } catch (err) {
      setError("That email and password don't match. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>🍔 Tiffin</h1>
          <p>Welcome Back!</p>
          <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
            Sign in to satisfy your cravings
          </p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="field">
            <input
              id="email"
              type="email"
              placeholder="Email or Phone"
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

          <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
            <Link to="#" style={{ fontSize: "0.85rem" }}>
              Forgot Password?
            </Link>
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="social-auth">
          <button className="social-btn" type="button" title="Google">
            G
          </button>
          <button className="social-btn" type="button" title="Apple">
            🍎
          </button>
          <button className="social-btn" type="button" title="Facebook">
            f
          </button>
        </div>

        <p className="form-footnote">
          New to Tiffin? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
