import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ClassDetails from "./pages/ClassDetails";
import SupremeVillainLord from "./pages/SupremeVillainLord";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classes/:id"
          element={
            <ProtectedRoute>
              <ClassDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supreme-villain-lord"
          element={
            <AdminRoute>
              <SupremeVillainLord />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;