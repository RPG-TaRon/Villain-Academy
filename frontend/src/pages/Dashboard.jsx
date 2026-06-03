import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { Link } from "react-router-dom";

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

  const createClass = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/classes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClasses([...classes, response.data]);

      setFormData({
        name: "",
        description: "",
      });
    } catch (err) {
      setError(
        "The academy rejected your class proposal. Try being more evil.",
      );
    }
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

      <form onSubmit={createClass}>
        <h3>Create a New Class of Questionable Morals</h3>

        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Class Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Create New Class</button>
      </form>

      <div>
        <h3>Here's your Classes, Lackey</h3>

        {error && <p>{error}</p>}

        {classes.length === 0 ? (
          <p>You don't have classes, you fake Villain.</p>
        ) : (
          classes.map((classItem) => (
            <div key={classItem._id}>
              <Link to={`/classes/${classItem._id}`}>
                <h4>{classItem.name}</h4>
              </Link>

              <p>{classItem.description}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Dashboard;
