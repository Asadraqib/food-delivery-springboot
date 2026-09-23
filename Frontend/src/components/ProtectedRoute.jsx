import { Navigate } from "react-router-dom";
import { decodeToken } from "../utils/jwt";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    const decoded = decodeToken(token);
    const role = decoded?.role || "CUSTOMER";
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/restaurants" replace />;
    }
  }

  return children;
}
