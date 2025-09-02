import React from "react";
import { Routes, Route, Link } from "react-router-dom";
<<<<<<< HEAD
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Prescriptions from "./pages/Prescriptions";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="font-bold text-lg">Raksha360 Doctor Portal 🩺</h1>
        <div>
          <Link className="px-3 hover:underline" to="/">Login</Link>
          <Link className="px-3 hover:underline" to="/dashboard">Dashboard</Link>
          <Link className="px-3 hover:underline" to="/prescriptions">Prescriptions</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
=======
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <nav style={{ padding: "10px", background: "#0077b6" }}>
        <Link to="/" style={{ color: "white", marginRight: "15px" }}>Home</Link>
        <Link to="/login" style={{ color: "white", marginRight: "15px" }}>Login</Link>
        <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> dd2856b5340a04191d8992d0ff498edeea9e6a18
      </Routes>
    </div>
  );
}

export default App;
