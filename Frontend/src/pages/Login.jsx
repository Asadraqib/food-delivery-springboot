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
    <div className="page page--narrow">
      <h1>Welcome back</h1>
      <p>Log in to reorder from your favourite kitchens.</p>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="form-footnote">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}
