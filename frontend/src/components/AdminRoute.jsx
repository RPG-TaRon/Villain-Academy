import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
// AdminRoute component to protect admin-only routes
function AdminRoute({ children }) {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;
