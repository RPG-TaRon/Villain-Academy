import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

function Dashboard() {
  const { user, token } = useAuth();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingClassId, setEditingClassId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditChange = (event) => {
    setEditFormData({
      ...editFormData,
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
    } catch {
      setError(
        "The academy rejected your class proposal. Try being more evil."
      );
    }
  };

  const startEditing = (classItem) => {
    setEditingClassId(classItem._id);

    setEditFormData({
      name: classItem.name,
      description: classItem.description,
    });
  };

  const cancelEditing = () => {
    setEditingClassId(null);

    setEditFormData({
      name: "",
      description: "",
    });
  };

  const updateClass = async (classId) => {
    try {
      const response = await api.put(`/classes/${classId}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClasses(
        classes.map((classItem) =>
          classItem._id === classId ? response.data : classItem
        )
      );

      setEditingClassId(null);

      setEditFormData({
        name: "",
        description: "",
      });
    } catch {
      setError(
        "The academy scribes failed to update this class. Embarrassing."
      );
    }
  };

  const deleteClass = async (classId) => {
    try {
      await api.delete(`/classes/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClasses(classes.filter((classItem) => classItem._id !== classId));
    } catch {
      setError(
        "The academy refuses to destroy this classroom. Bureaucracy strikes again."
      );
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);

      try {
        const response = await api.get("/classes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClasses(response.data);
        setLoading(false);
      } catch {
        setError("The academy records exploded. Try again, evil scholar.");
        setLoading(false);
      }
    };

    fetchClasses();
  }, [token]);

  if (loading) {
    return (
      <main>
        <h1>Villain Dashboard</h1>
        <p>Summoning academy records from the evil archives...</p>
      </main>
    );
  }

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
              {editingClassId === classItem._id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                  />

                  <input
                    type="text"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                  />

                  <button onClick={() => updateClass(classItem._id)}>
                    Save Evil Changes
                  </button>

                  <button onClick={cancelEditing}>
                    Cancel This Nonsense
                  </button>
                </>
              ) : (
                <>
                  <Link to={`/classes/${classItem._id}`}>
                    <h4>{classItem.name}</h4>
                  </Link>

                  <p>{classItem.description}</p>

                  <button onClick={() => startEditing(classItem)}>
                    Edit This Scheme
                  </button>

                  <button onClick={() => deleteClass(classItem._id)}>
                    Expel This Class From The Academy
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Dashboard;