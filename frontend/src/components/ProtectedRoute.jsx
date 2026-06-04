import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
// ProtectedRoute component to protect routes that require authentication
function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
