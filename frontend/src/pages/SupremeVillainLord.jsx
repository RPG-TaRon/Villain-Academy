import { useCallback, useEffect, useState } from "react";
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

  const [editingVillainId, setEditingVillainId] = useState(null);
  const [editingClassId, setEditingClassId] = useState(null);
  const [editingAssignmentId, setEditingAssignmentId] = useState(null);

  const [villainFormData, setVillainFormData] = useState({
    username: "",
    email: "",
    isAdmin: false,
  });

  const [classFormData, setClassFormData] = useState({
    name: "",
    description: "",
  });

  const [assignmentFormData, setAssignmentFormData] = useState({
    title: "",
    description: "",
    status: "Assigned",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAcademyData = useCallback(async () => {
    try {
      const response = await api.get("/admin/academy", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data.stats);
      setAcademyData(response.data.academyData);
      setLoading(false);
    } catch {
      setError("The throne room rejected your authority. Unacceptable.");
      setLoading(false);
    }
  }, [token]);

  const startEditingVillain = (villain) => {
    setEditingVillainId(villain._id);

    setVillainFormData({
      username: villain.username,
      email: villain.email,
      isAdmin: villain.isAdmin,
    });
  };

  const startEditingClass = (classItem) => {
    setEditingClassId(classItem._id);

    setClassFormData({
      name: classItem.name,
      description: classItem.description,
    });
  };

  const startEditingAssignment = (assignment) => {
    setEditingAssignmentId(assignment._id);

    setAssignmentFormData({
      title: assignment.title,
      description: assignment.description,
      status: assignment.status,
    });
  };

  const cancelEditing = () => {
    setEditingVillainId(null);
    setEditingClassId(null);
    setEditingAssignmentId(null);

    setVillainFormData({
      username: "",
      email: "",
      isAdmin: false,
    });

    setClassFormData({
      name: "",
      description: "",
    });

    setAssignmentFormData({
      title: "",
      description: "",
      status: "Assigned",
    });
  };

  const handleVillainChange = (event) => {
    const { name, value, type, checked } = event.target;

    setVillainFormData({
      ...villainFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleClassChange = (event) => {
    setClassFormData({
      ...classFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAssignmentChange = (event) => {
    setAssignmentFormData({
      ...assignmentFormData,
      [event.target.name]: event.target.value,
    });
  };

  const updateVillain = async (villainId) => {
    try {
      await api.put(`/admin/users/${villainId}`, villainFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      cancelEditing();
      fetchAcademyData();
    } catch {
      setError("The villain resisted royal editing. Disrespectful.");
    }
  };

  const updateClass = async (classId) => {
    try {
      await api.put(`/admin/classes/${classId}`, classFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      cancelEditing();
      fetchAcademyData();
    } catch {
      setError("The class refused your royal correction.");
    }
  };

  const updateAssignment = async (assignmentId) => {
    try {
      await api.put(`/admin/assignments/${assignmentId}`, assignmentFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      cancelEditing();
      fetchAcademyData();
    } catch {
      setError("The assignment rejected your superior wisdom.");
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
      setError("The villain resisted banishment. Send louder goblins.");
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
      await fetchAcademyData();
    };

    loadAcademyData();
  }, [fetchAcademyData]);

  if (loading) {
    return (
      <main>
        <h1>SUPER ULTRA MEGA SUPREME VILLAIN LORD</h1>
        <p>Polishing your throne and intimidating the database...</p>
      </main>
    );
  }

  return (
    <main
      className="supreme-page"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.78),
          rgba(0,0,0,0.9)
        ), url(${throneImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <h1>SUPER ULTRA MEGA SUPREME VILLAIN LORD</h1>

      <h2>Welcome, {user?.username}</h2>

      <p>
        From this sacred chamber of unreasonable authority, you may observe,
        edit, judge, and erase every villain, every class, and every assignment
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
            {editingVillainId === villain._id ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={villainFormData.username}
                  onChange={handleVillainChange}
                />

                <input
                  type="email"
                  name="email"
                  value={villainFormData.email}
                  onChange={handleVillainChange}
                />

                <label>
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={villainFormData.isAdmin}
                    onChange={handleVillainChange}
                  />
                  Supreme Access
                </label>

                <button onClick={() => updateVillain(villain._id)}>
                  SAVE ROYAL VILLAIN DECREE
                </button>

                <button onClick={cancelEditing}>CANCEL THIS COMMAND</button>
              </>
            ) : (
              <>
                <h2>{villain.username}</h2>
                <p>{villain.email}</p>
                <p>
                  Rank:{" "}
                  {villain.isAdmin
                    ? "Super Ultra Mega Supreme Villain Lord"
                    : "Regular Villain"}
                </p>

                <button onClick={() => startEditingVillain(villain)}>
                  EDIT THIS VILLAIN
                </button>

                {villain._id !== user?.id && (
                  <button onClick={() => deleteVillain(villain._id)}>
                    BANISH THIS VILLAIN
                  </button>
                )}

                {villain._id === user?.id && (
                  <p>
                    This is you, Supreme One. The academy refuses to let
                    perfection delete itself.
                  </p>
                )}
              </>
            )}

            {villain.classes.length === 0 ? (
              <p>
                This villain has created no classes. Weak ambition detected.
              </p>
            ) : (
              villain.classes.map((classItem) => (
                <div key={classItem._id}>
                  {editingClassId === classItem._id ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={classFormData.name}
                        onChange={handleClassChange}
                      />

                      <input
                        type="text"
                        name="description"
                        value={classFormData.description}
                        onChange={handleClassChange}
                      />

                      <button onClick={() => updateClass(classItem._id)}>
                        SAVE ROYAL CLASS DECREE
                      </button>

                      <button onClick={cancelEditing}>
                        CANCEL THIS CLASS COMMAND
                      </button>
                    </>
                  ) : (
                    <>
                      <h3>{classItem.name}</h3>
                      <p>{classItem.description}</p>

                      <button onClick={() => startEditingClass(classItem)}>
                        EDIT THIS CLASS
                      </button>

                      <button onClick={() => deleteClass(classItem._id)}>
                        DESTROY THIS CLASS
                      </button>
                    </>
                  )}

                  {classItem.assignments.length === 0 ? (
                    <p>No assignments. Academic villainy is collapsing.</p>
                  ) : (
                    classItem.assignments.map((assignment) => (
                      <div key={assignment._id}>
                        {editingAssignmentId === assignment._id ? (
                          <>
                            <input
                              type="text"
                              name="title"
                              value={assignmentFormData.title}
                              onChange={handleAssignmentChange}
                            />

                            <input
                              type="text"
                              name="description"
                              value={assignmentFormData.description}
                              onChange={handleAssignmentChange}
                            />

                            <select
                              name="status"
                              value={assignmentFormData.status}
                              onChange={handleAssignmentChange}
                            >
                              <option value="Assigned">Assigned</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>

                            <button
                              onClick={() => updateAssignment(assignment._id)}
                            >
                              SAVE ROYAL ASSIGNMENT DECREE
                            </button>

                            <button onClick={cancelEditing}>
                              CANCEL THIS ASSIGNMENT COMMAND
                            </button>
                          </>
                        ) : (
                          <>
                            <h4>{assignment.title}</h4>
                            <p>{assignment.description}</p>
                            <p>Status: {assignment.status}</p>

                            <button
                              onClick={() => startEditingAssignment(assignment)}
                            >
                              EDIT THIS ASSIGNMENT
                            </button>

                            <button
                              onClick={() => deleteAssignment(assignment._id)}
                            >
                              ERASE THIS ASSIGNMENT
                            </button>
                          </>
                        )}
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
