import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/useAuth";
import baseImage from "../Images/BaseImage.png";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/users/register", formData);

      login(response.data.user, response.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.65),
          rgba(0,0,0,0.85)
        ), url(${baseImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <h1>Enter the Villain Realm where we train you to be the worst!</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Villain Name"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Villain Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Secret Evil Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Become a Villain</button>
      </form>

      {error && <p>{error}</p>}

      <p>
        Already a Villain in training? <Link to="/">Login</Link>
      </p>
    </main>
  );
}

export default Register;