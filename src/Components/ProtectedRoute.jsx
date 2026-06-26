import { Navigate } from "react-router-dom";

// NORMAL USER PROTECTION
export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

// ADMIN PROTECTION
export function AdminRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
