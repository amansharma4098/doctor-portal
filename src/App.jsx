import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Prescriptions from "./pages/Prescriptions";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="font-bold text-xl">Raksha360 Doctor Portal 🩺</h1>
        <div className="space-x-4">
          <Link
            to="/"
            className="hover:underline hover:text-gray-200 transition"
          >
            Login
          </Link>
          <Link
            to="/dashboard"
            className="hover:underline hover:text-gray-200 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/prescriptions"
            className="hover:underline hover:text-gray-200 transition"
          >
            Prescriptions
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
