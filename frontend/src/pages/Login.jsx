import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    login: "",
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
      const response = await api.post("/users/login", formData);

      login(response.data.user, response.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main>
      <h1>Villain Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Username or Email"
          value={formData.login}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Secret Evil Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Enter the Academy</button>
      </form>

      {error && <p>{error}</p>}

      <p>
        Not enrolled? <Link to="/register">Join here</Link>
      </p>
    </main>
  );
}

export default Login;