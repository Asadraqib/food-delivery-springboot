import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      // Auth Service's /register returns a plain success message, not a
      // token, so send them to log in with the account they just made.
      navigate("/login");
    } catch (err) {
      setError("Couldn't create that account. The email may already be registered.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page--narrow">
      <h1>Create your account</h1>
      <p>Takes less than a minute.</p>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleRegister}>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            minLength={4}
          />
        </div>
        <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="form-footnote">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
