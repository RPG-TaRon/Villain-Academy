import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssignmentCard from "../components/AssignmentCard";
import { useAuth } from "../context/useAuth";
import api from "../utils/api";

function ClassDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [classInfo, setClassInfo] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Assigned",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const createAssignment = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(`/assignments/class/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAssignments([...assignments, response.data]);

      setFormData({
        title: "",
        description: "",
        status: "Assigned",
      });
    } catch {
      setError("The assignment spell failed. The goblins deny involvement.");
    }
  };

  const deleteAssignment = async (assignmentId) => {
    try {
      await api.delete(`/assignments/class/${id}/${assignmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAssignments(
        assignments.filter((assignment) => assignment._id !== assignmentId)
      );
    } catch {
      setError("The volcano rejected your assignment. Suspicious.");
    }
  };

  const updateAssignmentStatus = async (assignment, direction) => {
    const statuses = ["Assigned", "In Progress", "Completed"];
    const currentIndex = statuses.indexOf(assignment.status);

    let nextIndex = currentIndex;

    if (direction === "advance" && currentIndex < statuses.length - 1) {
      nextIndex = currentIndex + 1;
    }

    if (direction === "demote" && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex === currentIndex) {
      return;
    }

    try {
      const response = await api.put(
        `/assignments/class/${id}/${assignment._id}`,
        {
          title: assignment.title,
          description: assignment.description,
          status: statuses[nextIndex],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAssignments(
        assignments.map((item) =>
          item._id === assignment._id ? response.data : item
        )
      );
    } catch {
      setError(
        "The status ritual failed. Someone fed the goblin after midnight."
      );
    }
  };

  useEffect(() => {
    const fetchClass = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/classes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClassInfo(response.data);

        const assignmentResponse = await api.get(`/assignments/class/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAssignments(assignmentResponse.data);
        setLoading(false);
      } catch {
        setError("This class has vanished into the villain fog.");
        setLoading(false);
      }
    };

    fetchClass();
  }, [id, token]);

  if (loading) {
    return (
      <main>
        <p>Unlocking forbidden class files...</p>
      </main>
    );
  }

  return (
    <main>
      {error && <p>{error}</p>}

      {classInfo ? (
        <>
          <h1>{classInfo.name}</h1>

          <p>{classInfo.description}</p>

          <form onSubmit={createAssignment}>
            <h2>Create Assignment of Doom</h2>

            <input
              type="text"
              name="title"
              placeholder="Assignment Title"
              value={formData.title}
              onChange={handleChange}
            />

            <input
              type="text"
              name="description"
              placeholder="Assignment Description"
              value={formData.description}
              onChange={handleChange}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <button type="submit">Summon Assignment</button>
          </form>

          <h2>Assignments of Doom</h2>

          {assignments.length === 0 ? (
            <p>No assignments yet. Lazy villain behavior detected.</p>
          ) : (
            assignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                updateAssignmentStatus={updateAssignmentStatus}
                deleteAssignment={deleteAssignment}
              />
            ))
          )}
        </>
      ) : (
        <p>This class does not exist. The academy denies everything.</p>
      )}
    </main>
  );
}

export default ClassDetails;
