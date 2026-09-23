import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = password.length >= 8 ? "Strong" : password.length >= 4 ? "Medium" : "";

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!agreed) {
      setError("You must agree to the Terms & Privacy Policy");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password, role });
      navigate("/login");
    } catch (err) {
      setError("Couldn't create that account. The email may already be registered.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>🍔 Tiffin</h1>
          <p>Create Account</p>
          <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
            Join the feast and get fast delivery
          </p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="field">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <input
              type="tel"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </div>

          <div className="field">
            <div style={{ position: "relative" }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={4}
              />
              {passwordStrength && <div className="password-strength">{passwordStrength} ✓</div>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="role" style={{ marginBottom: "0.5rem", display: "block", fontWeight: 500 }}>
              I am a
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm, 8px)",
                border: "1px solid var(--hairline, #ddd)",
                fontSize: "1rem",
                background: "var(--surface, #fff)",
              }}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="RESTAURANT_ADMIN">Restaurant Admin</option>
            </select>
          </div>

          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <label htmlFor="terms" style={{ margin: 0, cursor: "pointer" }}>
              I agree to the <Link to="#">Terms & Privacy Policy</Link>
            </label>
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={loading || !agreed}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or sign up with</span>
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
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
