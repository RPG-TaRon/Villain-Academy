import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import api from "../utils/api";
import throneImage from "../Images/ThroneImage.png";

function SupremeVillainLord() {
  const { token, user } = useAuth();

  const [academyData, setAcademyData] = useState([]);
  const [stats, setStats] = useState({
    totalVillains: 0,
    totalClasses: 0,
    totalAssignments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const throneBackground = {
    backgroundImage: `linear-gradient(
      rgba(0,0,0,0.65),
      rgba(0,0,0,0.78)
    ), url(${throneImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  const updateAcademyState = (data) => {
    setStats(
      data.stats || {
        totalVillains: 0,
        totalClasses: 0,
        totalAssignments: 0,
      }
    );
    setAcademyData(data.academyData || []);
    setError("");
  };

  const fetchAcademyData = async () => {
    try {
      const response = await api.get("/admin/academy", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      updateAcademyState(response.data);
      setLoading(false);
    } catch {
      setError("The throne room rejected your authority. Unacceptable.");
      setLoading(false);
    }
  };

  const deleteVillain = async (villainId) => {
    try {
      await api.delete(`/admin/users/${villainId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAcademyData();
    } catch {
      setError("The villain resisted banishment. Send louder minions.");
    }
  };

  const deleteClass = async (classId) => {
    try {
      await api.delete(`/admin/classes/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAcademyData();
    } catch {
      setError("The classroom refused destruction. Very rude.");
    }
  };

  const deleteAssignment = async (assignmentId) => {
    try {
      await api.delete(`/admin/assignments/${assignmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAcademyData();
    } catch {
      setError("The assignment clung to existence. Pathetic.");
    }
  };

  useEffect(() => {
    const loadAcademyData = async () => {
      try {
        const response = await api.get("/admin/academy", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        updateAcademyState(response.data);
      } catch {
        setError("The throne room rejected your authority. Unacceptable.");
      } finally {
        setLoading(false);
      }
    };

    loadAcademyData();
  }, [token]);

  if (loading) {
    return (
      <main className="supreme-page" style={throneBackground}>
        <h1>SUPER ULTRA MEGA SUPREME VILLAIN LORD</h1>
        <p>Polishing your throne and intimidating the database...</p>
      </main>
    );
  }

  return (
    <main
      className="supreme-page"
      style={throneBackground}
    >
      <h1>SUPER ULTRA MEGA SUPREME VILLAIN LORD</h1>

      <h2>Welcome, {user?.username}</h2>

      <p>
        From this sacred chamber of unreasonable authority, you may observe,
        judge, and erase every villain, every class, and every assignment
        beneath your glorious rule.
      </p>

      <section className="supreme-stats">
        <div>
          <h3>Total Villains</h3>
          <p>{stats.totalVillains}</p>
        </div>

        <div>
          <h3>Total Classes</h3>
          <p>{stats.totalClasses}</p>
        </div>

        <div>
          <h3>Total Assignments</h3>
          <p>{stats.totalAssignments}</p>
        </div>
      </section>

      {error && <p>{error}</p>}

      {academyData.length === 0 ? (
        <p>No villains exist. Your empire is disturbingly quiet.</p>
      ) : (
        academyData.map((villain) => (
          <div key={villain._id}>
            <h2>{villain.username}</h2>
            <p>{villain.email}</p>

            {villain._id !== user?.id && (
              <button onClick={() => deleteVillain(villain._id)}>
                BANISH THIS VILLAIN
              </button>
            )}

            {villain._id === user?.id && (
              <p>
                This is you, Supreme One. The academy refuses to let perfection
                delete itself.
              </p>
            )}

            {(villain.classes || []).length === 0 ? (
              <p>
                This villain has created no classes. Weak ambition detected.
              </p>
            ) : (
              (villain.classes || []).map((classItem) => (
                <div key={classItem._id}>
                  <h3>{classItem.name}</h3>
                  <p>{classItem.description}</p>

                  <button onClick={() => deleteClass(classItem._id)}>
                    DESTROY THIS CLASS
                  </button>

                  {(classItem.assignments || []).length === 0 ? (
                    <p>No assignments. Academic villainy is collapsing.</p>
                  ) : (
                    (classItem.assignments || []).map((assignment) => (
                      <div key={assignment._id}>
                        <h4>{assignment.title}</h4>
                        <p>{assignment.description}</p>
                        <p>Status: {assignment.status}</p>

                        <button
                          onClick={() => deleteAssignment(assignment._id)}
                        >
                          ERASE THIS ASSIGNMENT
                        </button>
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

export default SupremeVillainLord;
