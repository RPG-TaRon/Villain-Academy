import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

function ClassDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [classInfo, setClassInfo] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClass = async () => {
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
      } catch (err) {
        setError("This class has vanished into the villain fog.");
      }
    };

    fetchClass();
  }, [id, token]);

  return (
    <main>
      {error && <p>{error}</p>}

      {classInfo ? (
        <>
          <h1>{classInfo.name}</h1>
          <p>{classInfo.description}</p>

          <h2>Assignments of Doom</h2>

          {assignments.length === 0 ? (
            <p>No assignments yet. Lazy villain behavior detected.</p>
          ) : (
            assignments.map((assignment) => (
              <div key={assignment._id}>
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                <p>Status: {assignment.status}</p>
              </div>
            ))
          )}
        </>
      ) : (
        <p>Loading secret class files...</p>
      )}
    </main>
  );
}

export default ClassDetails;