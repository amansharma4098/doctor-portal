import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Patients from "./pages/Patients.jsx";


function PrivateRoute({ children }) {
  const token = localStorage.getItem("doctorToken");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="font-bold text-xl">Raksha360 Doctor Portal 👨‍⚕️</h1>
        <div className="space-x-4">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/patients">Patients</Link>
          <button onClick={handleLogout} className="ml-4 bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
