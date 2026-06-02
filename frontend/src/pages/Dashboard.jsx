import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <main>
      <h1>Villain Dashboard</h1>

      <h2>Welcome, {user?.username}</h2>

      <button>Create New Class</button>

      <div>
        <h3>Here's your Classes Lackie</h3>

        <p>You don't have classes you fake Villain.</p>
      </div>
    </main>
  );
}

export default Dashboard;