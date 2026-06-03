import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

function Dashboard() {
  const { user, token } = useAuth();

  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get("/classes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClasses(response.data);
      } catch (err) {
        setError("The academy records exploded. Try again, evil scholar.");
      }
    };

    fetchClasses();
  }, [token]);

  return (
    <main>
      <h1>Villain Dashboard</h1>

      <h2>Welcome, {user?.username}</h2>

      <button>Create New Class</button>

      <div>
        <h3>Here's your Classes, Lackey</h3>

        {error && <p>{error}</p>}

        {classes.length === 0 ? (
          <p>You don't have classes, you fake Villain.</p>
        ) : (
          classes.map((classItem) => (
            <div key={classItem._id}>
              <h4>{classItem.name}</h4>
              <p>{classItem.description}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Dashboard;
