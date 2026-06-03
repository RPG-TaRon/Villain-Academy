import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

function SuperUltraMegaVillainLord() {
  const { token, user } = useAuth();

  const [academyData, setAcademyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAcademyData = async () => {
      try {
        const response = await api.get("/admin/academy", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAcademyData(response.data);
        setLoading(false);
      } catch {
        setError(
          "The throne room rejected your authority. Unacceptable."
        );
        setLoading(false);
      }
    };

    fetchAcademyData();
  }, [token]);

  if (loading) {
    return (
      <main>
        <h1>SUPER ULTRA MEGA SUPREME VILLAIN LORD</h1>
        <p>Polishing your throne and intimidating the database...</p>
      </main>
    );
  }

  return (
    <main className="supreme-page">
      <h1>SUPER ULTRA MEGA SUPREME VILLAIN LORD</h1>

      <h2>Welcome, {user?.username}</h2>

      <p>
        From this sacred chamber of unreasonable authority, you may observe
        every villain, every class, and every assignment beneath your glorious
        rule.
      </p>

      {error && <p>{error}</p>}

      {academyData.length === 0 ? (
        <p>No villains exist. Your empire is disturbingly quiet.</p>
      ) : (
        academyData.map((villain) => (
          <div key={villain._id}>
            <h2>{villain.username}</h2>
            <p>{villain.email}</p>

            {villain.classes.length === 0 ? (
              <p>
                This villain has created no classes. Weak ambition detected.
              </p>
            ) : (
              villain.classes.map((classItem) => (
                <div key={classItem._id}>
                  <h3>{classItem.name}</h3>
                  <p>{classItem.description}</p>

                  {classItem.assignments.length === 0 ? (
                    <p>No assignments. Academic villainy is collapsing.</p>
                  ) : (
                    classItem.assignments.map((assignment) => (
                      <div key={assignment._id}>
                        <h4>{assignment.title}</h4>
                        <p>{assignment.description}</p>
                        <p>Status: {assignment.status}</p>
                      </div>
                    ))
                  )}
                </div>
              ))
            )}
          </div>
        ))
      )}
    </main>
  );
}

export default SuperUltraMegaVillainLord;