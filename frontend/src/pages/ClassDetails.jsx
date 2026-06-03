import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

function ClassDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [classInfo, setClassInfo] = useState(null);
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
          <p>No assignments yet. Lazy villain behavior detected.</p>
        </>
      ) : (
        <p>Loading secret class files...</p>
      )}
    </main>
  );
}

export default ClassDetails;