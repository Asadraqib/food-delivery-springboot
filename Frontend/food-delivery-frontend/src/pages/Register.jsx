import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      if (res.data === "Email already registered") {
        setError(res.data);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-3 rounded-full">
            <UserPlus className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Create an account</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 px-4 py-2 border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 px-4 py-2 border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 px-4 py-2 border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
