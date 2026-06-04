import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      {!user ? (
        <>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>

          {user?.isAdmin && (
            <Link to="/supreme-villain-lord">
              👑 Enter The Throne Room my glorious King!
            </Link>
          )}

          <button onClick={logout}>
            Abandon Evil Plans
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
